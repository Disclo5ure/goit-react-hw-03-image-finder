import { ImageGalleryItem } from './ImageGalleryItem';
import PropTypes from 'prop-types';

export const ImageGallery = props => (
  <ul className="gallery">
    {props.images.map(image => (
      <ImageGalleryItem
        key={image.id}
        image={image}
        openModal={props.openModal}
      />
    ))}
  </ul>
);

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape()),
  openModal: PropTypes.func,
};
