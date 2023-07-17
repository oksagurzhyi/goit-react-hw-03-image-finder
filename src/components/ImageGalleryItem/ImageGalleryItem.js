import css from '../styles.module.css';

export function ImageGalleryItem({ data, openModal }) {
  return data.map(({ id, webformatURL, largeImageURL }) => {
    return (
      <li
        key={id}
        data-id={id}
        className={css.ImageGalleryItem}
        onClick={() => openModal(largeImageURL)}
      >
        <img src={webformatURL} alt="" />
      </li>
    );
  });
}
