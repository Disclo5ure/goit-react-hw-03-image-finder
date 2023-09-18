import PropTypes from 'prop-types';

export const ImageGalleryItem = props => (
  <li>
    <img
      className="gallery-item"
      src={props.image.webformatURL}
      alt=""
      onClick={() => props.openModal(props.image.largeImageURL)}
    />
  </li>
);

ImageGalleryItem.propTypes = {
  image: PropTypes.shape(),
  openModal: PropTypes.func,
  largeImageURL: PropTypes.string,
};
