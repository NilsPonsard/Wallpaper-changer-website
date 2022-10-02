import {
  Credentials,
  CredentialsManager,
  fetchApi,
  fetchApiWithAuth,
  MissingData,
  UnexpectedResponse,
} from './api';

export const UserAlreadyExists = new Error('User already exists');

// Response structures (models)

export interface User {
  id: number;
  username: string;
  description?: string;
  email?: string;
}

// Request structure

export interface CreateUserRequest {
  email: string;
  username: string;
  password: string;
  description: string;
}

// Create functions

export async function createUser(request: CreateUserRequest): Promise<Credentials> {
  const { data, status } = await fetchApi<Credentials>('/user', 'POST', request);

  if (status === 201) {
    if (typeof data === 'undefined') throw MissingData;
    return data;
  }
  if (status === 409) throw UserAlreadyExists;
  throw UnexpectedResponse;
}

export async function getUser(
  credentialsManager: CredentialsManager,
  userId: string
): Promise<User> {
  const { data, status } = await fetchApiWithAuth<User>(
    `/user/${userId}`,
    credentialsManager,
    'GET'
  );
  if (status === 200) {
    if (typeof data === 'undefined') throw MissingData;
    return data;
  }
  throw UnexpectedResponse;
}

export async function resendEmail(emailId: string) {
  const { status } = await fetchApi(
    `/user/email/regenerate-token/${emailId}`,
    'POST'
  );
  if (status === 204) return true;
  throw UnexpectedResponse;
}

// validates the user's email, the code is sent to the user's email
export async function validateEmail(code: string) {
  const { status } = await fetchApi(`/user/email/validate/${code}`, 'POST');
  if (status === 204) return true;
  throw UnexpectedResponse;
}

export async function getFriends(credentialsManager: CredentialsManager) {
  const { data, status } = await fetchApiWithAuth<{
    friends: User[];
    requests: User[];
    sent: User[];
  }>(`/user/friend`, credentialsManager, 'GET');
  if (status === 200) {
    if (typeof data === 'undefined') throw MissingData;
    return data;
  }
  throw UnexpectedResponse;
}

export async function sendFriendRequest(
  credentialsManager: CredentialsManager,
  username: string
) {
  const { status } = await fetchApiWithAuth(
    `/user/friend/${username}`,
    credentialsManager,
    'POST'
  );
  if (status === 200) return true;
  throw UnexpectedResponse;
}
