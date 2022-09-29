import { CredentialsManager, fetchApiWithAuth } from './api';

export interface Wallpaper {
  url: string;
  targets: string[];
  title: string;
}

export async function postWallpaper(
  credentialsManager: CredentialsManager,
  wallpaper: Wallpaper
) {
  return fetchApiWithAuth('/wallpaper', credentialsManager, 'POST', wallpaper);
}
