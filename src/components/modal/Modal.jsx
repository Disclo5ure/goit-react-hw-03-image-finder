import css from './Modal.module.css';
import PropTypes from 'prop-types';

export const Modal = props => (
  <div
    className={`${css.backdrop} ${props.isHidden ? css.isHidden : null}`}
    onClick={props.closeModal}
  >
    <div className={css.modal}>
      <img src={props.largeImageURL} alt="" className={css.modalImage} />
    </div>
  </div>
);

Modal.propTypes = {
  isHidden: PropTypes.bool,
  closeModal: PropTypes.func,
  largeImageURL: PropTypes.string,
};
