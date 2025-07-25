import { photos } from '../../photos-data';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default async function PhotoPage({ params } : {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const photo = photos.find((p) => p.id === id);

    if (!photo) {
        return notFound(); // 画像が見つからない場合は404ページを表示
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="relative">
                <Image
                    src={photo.src}
                    alt={photo.title}
                    width={800}
                    height={600}
                    className="rounded-lg shadow-2xl"
                />
                <h1 className="absolute bottom-4 left-4 text-white font-bold text-2xl bg-black bg-opacity-50 p-2 rounded">
                    {photo.title}
                </h1>
            </div>
        </div>
    );
}