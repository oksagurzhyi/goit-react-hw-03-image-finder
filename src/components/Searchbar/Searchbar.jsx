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

  onSubmit = e => {
    e.preventDefault();

    if (!this.state.query.trim()) {
      return alert('Please, fill this field ');
    }
    this.props.onSubmit(this.state.query);
    e.currentTarget.search.value = '';
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.onSubmit}>
          <button type="submit" className={css.SearchForm_button}>
            <ImSearch fill="blue" />
          </button>

          <input
            className={css.SearchForm_input}
            type="text"
            name="search"
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
