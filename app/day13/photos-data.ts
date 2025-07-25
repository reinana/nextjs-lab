export type Photo = {
  id: string;
  src: string;
  title: string;
};

// picsum.photos からランダムな画像を取得
export const photos: Photo[] = Array.from({ length: 9 }, (_, i) => ({
  id: (i + 1).toString(),
  src: `https://picsum.photos/id/${i + 10}/800/600`,
  title: `Image #${i + 1}`,
}));