import React from 'react';
import Image from 'next/image';
import { Wallpaper } from '../lib/api/wallpaper';

export default function WallpaperDisplay({
  wallpaper,
}: {
  wallpaper: Wallpaper;
}) {
  return (
    <div>
      <h1>{wallpaper.title}</h1>
      <Image src={wallpaper.url} alt={wallpaper.title} />
    </div>
  );
}
