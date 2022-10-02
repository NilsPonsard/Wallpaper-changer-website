import {
  CredentialsManager,
  fetchApiWithAuth,
  MissingData,
  UnexpectedResponse,
} from './api';

// eslint-disable-next-line import/prefer-default-export
export async function generateClientToken(
  credentialsManager: CredentialsManager
) {
  const { status, data } = await fetchApiWithAuth<{ token: string }>(
    '/user/client',
    credentialsManager,
    'POST'
  );

  if (status === 200) {
    if (typeof data === 'undefined') throw MissingData;
    return data;
  }
  throw UnexpectedResponse;
}

export async function getClientToken(credentialsManager: CredentialsManager) {
  const { status, data } = await fetchApiWithAuth<{ token: string }>(
    '/user/client',
    credentialsManager,
    'GET'
  );

  if (status === 200) {
    if (typeof data === 'undefined') throw MissingData;
    return data;
  }
  throw UnexpectedResponse;
}
