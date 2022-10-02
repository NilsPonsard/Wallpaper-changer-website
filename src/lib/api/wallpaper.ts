import { CredentialsManager, fetchApiWithAuth } from './api';

export interface WallpaperRequest {
  url: string;
  target: number[];
  title: string;
}

export async function postWallpaper(
  credentialsManager: CredentialsManager,
  wallpaper: WallpaperRequest
) {
  return fetchApiWithAuth('/wallpaper', credentialsManager, 'POST', wallpaper);
}

export interface Wallpaper {
  id: number;
  url: string;
  title: string;
  likedBy?: string[];
  likedByMe?: boolean;
  target?: string[];
}

export async function getHistory(credentialsManager: CredentialsManager) {
  const { data, status } = await fetchApiWithAuth<{
    received: Wallpaper[];
    sent: Wallpaper[];
  }>(`/wallpaper/history`, credentialsManager);

  if (status === 200) {
    return data;
  }
  throw new Error('Failed to get history');
}

export async function likeWallpaper(
  credentialsManager: CredentialsManager,
  wallpaperId: string
) {
  return fetchApiWithAuth(
    `/wallpaper/${wallpaperId}/like`,
    credentialsManager,
    'POST'
  );
}
