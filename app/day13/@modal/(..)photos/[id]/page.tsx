import { photos } from '../../../photos-data';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Modal from '../../../components/Modal';

export default async function PhotoModal({ params: { id } }: { params: { id: string } }) {
    const photo = photos.find((p) => p.id === id);

    if (!photo) {
        return notFound();
    }

    return (
        <Modal>
            <Image
                src={photo.src}
                alt={photo.title}
                width={800}
                height={600}
                className="rounded-lg"
            />
            <h1 className="absolute bottom-6 left-6 text-white font-bold text-2xl bg-black bg-opacity-50 p-2 rounded">
                {photo.title}
            </h1>
        </Modal>
    );
}