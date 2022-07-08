import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ items }) => {
    return (
        <ul>
            {items.map((item) => {
                return <li key={item.id}>
                    <ImageGalleryItem item={item} />
                </li>
            })}
        </ul>
    );
}