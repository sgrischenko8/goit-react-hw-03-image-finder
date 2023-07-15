import styles from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ img, onClick }) => {
  const { id, webformatURL, tags } = img;

  return (
    <li key={id} className={styles.gallery_item}>
      <img
        className={styles.gallery_item_image}
        src={webformatURL}
        alt={tags}
        onClick={() => onClick(id)}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  img: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};
