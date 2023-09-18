import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export const Searchbar = props => (
  <header className={css.searchbar}>
    <form className={css.form} onSubmit={props.handleSubmit}>
      <input
        type="text"
        name="query"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        className={css.input}
      />
      <button type="submit" className={css.searchButton}>
        Search
      </button>
    </form>
  </header>
);

Searchbar.propTypes = {
  handleSubmit: PropTypes.func,
};
