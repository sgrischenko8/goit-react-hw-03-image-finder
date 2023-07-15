import styles from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ pages, onLoadMore, query }) => {
  const loadMoreHandle = async () => {
    const page = pages + 1;
    await onLoadMore(query, page);
  };
  return (
    <button className={styles.button} type="button" onClick={loadMoreHandle}>
      Load more
    </button>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  pages: PropTypes.number.isRequired,
};
