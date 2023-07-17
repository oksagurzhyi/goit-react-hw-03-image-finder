import { Component } from 'react';
import { SearchBar } from './Searchbar/Searchbar';
import { fetchImagies } from 'services/fetchApi';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    showBtn: false,
    isLoading: false,
    showModal: false,
    largeImageURL: '',
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      fetchImagies(query, page)
        .then(data => {
          this.setState({ isLoading: true });
          if (data.hits.length === 0) {
            this.setState({ showBtn: false });
            alert(`There are no images by ${query}`);
            return;
          }

          if (page < Math.ceil(data.totalHits / 12)) {
            this.setState({ showBtn: true });
          }

          this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
          }));
        })
        .catch(() => this.setState({ isLoading: false }))
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    this.setState({ images: [] });
    const inputValue = e.currentTarget.elements.searchQuery.value;
    if (!inputValue.trim()) {
      return alert('Please, fill this field ');
    }
    this.setState({ query: inputValue });
    e.currentTarget.elements.searchQuery.value = '';
  };

  openModal = largeImageURL => {
    this.setState({ largeImageURL });
    this.toggleModal();
  };
  onClickBtnMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  toggleModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  onCloseModal = event => {
    if (event.code === 'Escape') {
      this.toggleModal();
    }
  };

  render() {
    const { images, showBtn, isLoading, showModal } = this.state;
    return (
      <div
        style={{
          maxWidth: '1170',
          margin: '0, auto',
          padding: '20',
        }}
      >
        <SearchBar onSubmit={this.onSubmit} />

        {isLoading && <Loader />}

        <ImageGallery data={images} openModal={this.openModal} />

        {showBtn && <Button onClickBtnMore={this.onClickBtnMore} />}

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={this.state.largeImageURL} alt=""></img>
          </Modal>
        )}
      </div>
    );
  }
}
