import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from '../styles.module.css';

export function ImageGallery({ data, openModal }) {
  return (
    <ul className={css.ImageGallery}>
      {data.map(({ id, webformatURL, largeImageURL }) => (
        <li
          key={id}
          data-id={id}
          className={css.ImageGalleryItem}
          onClick={() => openModal(largeImageURL)}
        >
          <ImageGalleryItem src={webformatURL} />
        </li>
      ))}
    </ul>
  );
}
