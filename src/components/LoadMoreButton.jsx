import PropTypes from 'prop-types';

export const LoadMoreButton = props => (
  <div className="button-container">
    <button className="load-more" onClick={props.loadMore}>
      Load more
    </button>
  </div>
);

LoadMoreButton.propTypes = {
  loadMore: PropTypes.func,
};
