import PropTypes from 'prop-types';

import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import { Component } from 'react';
import * as API from 'services/api';
import Button from 'components/Button';

const API_KEY = '33614277-14313d1389d57b7e80a4c1e60';

export default class App extends Component {
  state = {
    gallery: [],
    searchValue: '',
    page: 1,
    totalImgs: 0,
    status: 'idle',
  };

  onSubmit = async values => {
    try {
      this.setState({ status: 'pending', gallery: [] });
      const res = await API.searchImgs(values.search, API_KEY, 1);
      if (res.totalHits === 0) {
        return this.setState({
          searchValue: values.search,
          status: 'rejected',
        });
      }
      this.setState({
        gallery: [...res.hits],
        searchValue: values.search,
        page: 2,
        totalImgs: res.totalHits,
        status: 'resolved',
      });
    } catch (error) {
      this.setState({
        searchValue: values.search,
        status: 'rejected',
      });
      console.log(error);
    }
  };

  onLoadMore = async () => {
    const { gallery, searchValue, page } = this.state;
    try {
      this.setState({ status: 'pending' });
      const res = await API.searchImgs(searchValue, API_KEY, page);
      this.setState({
        gallery: [...gallery, ...res.hits],
        page: page + 1,
        status: 'resolved',
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { gallery, searchValue, totalImgs, status } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery
          items={gallery}
          status={status}
          searchValue={searchValue}
        />
        {gallery.length !== 0 && totalImgs > 12 && gallery.length % 2 === 0 && (
          <Button onClick={this.onLoadMore} classname={'Button'}>
            Load more
          </Button>
        )}
      </div>
    );
  }
}

App.propTypes = {
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  searchValue: PropTypes.string,
  page: PropTypes.number,
  totalImgs: PropTypes.number,
  status: PropTypes.string,
};
