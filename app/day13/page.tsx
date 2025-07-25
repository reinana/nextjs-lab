import Link from 'next/link';
import Image from 'next/image';
import { photos } from './photos-data';

export default function GalleryPage() {
    return (
        <main className="container mx-auto p-4 md:p-8">
            <h1 className="text-3xl font-bold mb-8 text-center text-slate-800">
                Image Gallery
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {photos.map((photo) => (
                    <Link
                        key={photo.id}
                        href={`/day13/photos/${photo.id}`}
                        className="group block overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                    >
                        <Image
                            src={photo.src}
                            alt={photo.title}
                            width={400}
                            height={300}
                            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </Link>
                ))}
            </div>
        </main>
    );
}