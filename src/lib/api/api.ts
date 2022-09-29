// errors
export const MissingMetaData = new Error('Missing metadata in response');
export const MissingData = new Error('Missing data in response');
export const UnexpectedResponse = new Error('Unexpected response from server');
export const InvalidCredentialsError = new Error('Invalid credentials');
export const InvalidRefreshTokenError = new Error('Invalid refresh token');

// credentials
export interface Credentials {
  accessToken: string;
  refreshToken: string;
}
export type RefreshUser = () => any;
export type SetCredentials = (newCreds: Credentials | undefined) => void;
export interface CredentialsManager {
  credentials: Credentials | undefined;
  setCredentials: SetCredentials;
}

// API response
export interface AsyncResponse<T> {
  data?: T;
  loading: boolean;
  error: boolean;
}

// 1 minute timeout
const fetchTimeout = 60000;

let apiServer =
  process.env.NEXT_PUBLIC_API_URL ??
  (process.env.NODE_ENV === 'production'
    ? 'https://api.wall.nponsard.net'
    : 'http://localhost:3000');

const prefix = '';

export const setApiServer = (newApiServer: string) => {
  apiServer = newApiServer;
};

// Fetch the backend api
export async function fetchApi<DataType = {}>(
  ressource: string,
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'GET',
  body?: any,
  headers: HeadersInit = {}
): Promise<{
  data: DataType;
  status: number;
}> {
  const formatedBody = body ? JSON.stringify(body) : undefined;

  let requestHeaders = headers;

  if (body)
    requestHeaders = new Headers({
      'Content-Type': 'application/json',
      ...headers,
    });

  const response = await Promise.race([
    fetch(apiServer + prefix + ressource, {
      method,
      body: formatedBody,
      headers: requestHeaders,
    }),
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), fetchTimeout);
    }) as Promise<Response>,
  ]);

  // handle 204 - no content
  if (response.status === 204) {
    return {
      data: null as unknown as DataType,
      status: 204,
    };
  }

  const json = await response.json();
  return {
    data: json,
    status: response.status,
  };
}

export async function refreshTokens(
  credentialsManager: CredentialsManager
): Promise<boolean> {
  const { data, status } = await fetchApi<Credentials>(
    '/user/refresh',
    'POST',
    {
      refresh: credentialsManager.credentials?.refreshToken,
    }
  );

  if (status === 200) {
    credentialsManager.setCredentials(data);
    return true;
  }

  throw InvalidRefreshTokenError;
}

// Fetch the backend api with automatic refresh
export async function fetchApiWithAuth<DataType = {}>(
  ressource: string,
  credentialsManager: CredentialsManager,
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'GET',
  body?: any
): Promise<{
  data: DataType;
  status: number;
}> {
  const tryFetch = async () => {
    if (!credentialsManager.credentials) {
      throw new Error('No credentials');
    }

    return fetchApi<DataType>(ressource, method, body, {
      Authorization: `Bearer ${credentialsManager.credentials.accessToken}`,
    });
  };

  const response = await tryFetch();

  if (response.status === 403) {
    const success = await refreshTokens(credentialsManager);

    if (success) return tryFetch();
  }

  return response;
}

export async function login(
  username: string,
  password: string,
  credentialsManager: CredentialsManager
): Promise<boolean> {
  const { data, status } = await fetchApi<Credentials>('/user/login', 'POST', {
    username,
    password,
  });

  if (status === 200) {
    credentialsManager.setCredentials(data);
    return true;
  }
  throw InvalidCredentialsError;
}

export async function logout(credentialsManager: CredentialsManager) {
  return fetchApiWithAuth('/auth/logout', credentialsManager, 'POST')
    .catch(
      () => {} // ignore errors, logout not yet implemented in backend
    )
    .finally(() => {
      credentialsManager.setCredentials(undefined);
    });
}
