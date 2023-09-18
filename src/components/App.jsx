import React from 'react';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { ImageGallery } from './ImageGallery';
import { Searchbar } from './searchbar/Searchbar';
import { Loader } from './Loader';
import { LoadMoreButton } from './LoadMoreButton';
import { Modal } from './modal/Modal';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '39010846-94b79845e5a284c0e487aa25e';
const perPage = 12;

export class App extends React.Component {
  state = {
    page: 1,
    images: [],
    isLoading: false,
    totalHits: 0,
    query: '',
    showLoadMore: false,
    modalIsHidden: true,
    modalImage: '',
  };

  async handleSubmit(e) {
    e.preventDefault();
    const query = e.currentTarget.query.value;
    this.setState({ query: query, isLoading: true, page: 1 });
  }

  async fetchData(query, page) {
    return await axios.get(`${BASE_URL}`, {
      params: {
        key: KEY,
        q: query,
        imageType: 'photo',
        orientation: 'horizontal',
        page: page,
        per_page: perPage,
      },
    });
  }

  async loadMore() {
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.setState(prev => {
        return { page: prev.page + 1 };
      });
    }, 200);
  }

  closeModal() {
    this.setState({ modalIsHidden: true, modalImage: '' });
    window.removeEventListener('keydown', this.handlePressEscape.bind(this));
  }

  handlePressEscape(e) {
    return e.code === 'Escape' ? this.closeModal() : null;
  }

  openModal(url) {
    this.setState({ modalIsHidden: false, modalImage: url });
    window.addEventListener('keydown', this.handlePressEscape.bind(this));
  }

  async componentDidUpdate(_, prevState) {
    if (prevState.query !== this.state.query) {
      const response = await this.fetchData(this.state.query, this.state.page);
      if (response.data.totalHits === 0) {
        this.setState({ isLoading: false });
        return Notify.failure(
          `Sorry, there are no images matching your search query. Please try again.`
        );
      }
      setTimeout(() => {
        Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
        this.setState({
          isLoading: false,
          images: response.data.hits,
          totalHits: response.data.totalHits,
          showLoadMore: response.data.totalHits > perPage ? true : false,
        });
      }, 200);
    }

    if (prevState.page !== this.state.page && this.state.page !== 1) {
      const newImages = (
        await this.fetchData(this.state.query, this.state.page)
      ).data.hits;
      this.setState(prev => {
        return {
          images: [...prev.images, ...newImages],
          isLoading: false,
          showLoadMore: newImages.length < perPage ? false : true,
        };
      });
    }
  }

  render() {
    return (
      <>
        <Searchbar handleSubmit={this.handleSubmit.bind(this)} />
        {this.state.images.length > 0 && (
          <ImageGallery
            images={this.state.images}
            openModal={this.openModal.bind(this)}
          />
        )}
        {this.state.isLoading && <Loader />}
        {this.state.showLoadMore && (
          <LoadMoreButton loadMore={this.loadMore.bind(this)} />
        )}
        <Modal
          closeModal={this.closeModal.bind(this)}
          isHidden={this.state.modalIsHidden}
          largeImageURL={this.state.modalImage}
        />
      </>
    );
  }
}
