import { CredentialsManager, fetchApiWithAuth } from './api';

export interface Wallpaper {
  url: string;
  users: string[];
}

export async function postWallpaper(
  credentialsManager: CredentialsManager,
  wallpaper: Wallpaper
) {
  return fetchApiWithAuth('/wallpaper', credentialsManager, 'POST', wallpaper);
}
