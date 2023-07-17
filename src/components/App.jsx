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
      this.setState({ isLoading: true });
      fetchImagies(query, page)
        .then(data => {
          if (data.hits.length === 0) {
            this.setState({ showBtn: false });
            alert(`There are no images by ${query}`);
            return;
          }

          this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
            showBtn: page < Math.ceil(data.totalHits / 12),
          }));
        })
        .catch(() => this.setState({ isLoading: false }))
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  onSubmit = query => {
    this.setState({ query, images: [], page: 1, showBtn: false });
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

  render() {
    const { images, showBtn, isLoading, showModal, largeImageURL } = this.state;
    return (
      <div
        style={{
          maxWidth: '1170',
          margin: '0, auto',
          padding: '20',
        }}
      >
        {isLoading && <Loader />}

        <SearchBar onSubmit={this.onSubmit} />

        <ImageGallery data={images} openModal={this.openModal} />

        {showBtn && <Button onClickBtnMore={this.onClickBtnMore} />}

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt=""></img>
          </Modal>
        )}
      </div>
    );
  }
}
