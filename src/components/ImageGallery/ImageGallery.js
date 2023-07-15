import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { PureComponent } from 'react';
import styles from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export class ImageGallery extends PureComponent {
  state = { showModal: false, id: '' };

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  choseImage = id => {
    this.setState({ id: id, showModal: !this.state.showModal });
  };

  showBiggerImage = () => {
    const modalContent = this.props.img.find(el => el.id === this.state.id);
    return <img src={modalContent.largeImageURL} alt={modalContent.tags} />;
  };

  render() {
    const img = this.props.img;
    return (
      <>
        <ul className={styles.gallery}>
          {img.map(el => (
            <ImageGalleryItem key={el.id} img={el} onClick={this.choseImage} />
          ))}
        </ul>

        {this.props.isLoading && <Loader />}

        {!this.props.isLoading &&
          img.length !== 0 &&
          img[0].total !== img.length && (
            <Button
              pages={img.length / 12}
              onLoadMore={this.props.onLoadMore}
              query={this.props.query}
            />
          )}
        {this.state.showModal && (
          <Modal onClose={this.toggleModal}>{this.showBiggerImage()}</Modal>
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  img: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      total: PropTypes.number,
    })
  ).isRequired,
};
