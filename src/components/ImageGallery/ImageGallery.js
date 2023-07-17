import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from '../styles.module.css';

export function ImageGallery({ data, openModal }) {
  return (
    <ul className={css.ImageGallery}>
      <ImageGalleryItem data={data} openModal={openModal} />
    </ul>
  );
}
