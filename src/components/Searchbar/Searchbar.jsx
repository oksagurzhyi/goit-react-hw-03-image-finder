import { Component } from 'react';
import css from '../styles.module.css';
import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';

export class SearchBar extends Component {
  state = {
    query: null,
  };

  handleChangeInput = event => {
    this.setState({ query: event.currentTarget.value.toLowerCase() });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.props.onSubmit}>
          <button type="submit" className={css.SearchForm_button}>
            <ImSearch fill="blue" />
          </button>

          <input
            className={css.SearchForm_input}
            name="searchQuery"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChangeInput}
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
