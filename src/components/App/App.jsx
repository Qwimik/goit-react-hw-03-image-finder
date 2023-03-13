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
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.page === prevState.page && prevState.searchValue === '') {
      this.setState(s => ({ page: s.page + 1 }));
    }
  }

  handleSubmit = async values => {
    const { page } = this.state;
    console.log(page);

    try {
      const res = await API.searchImgs(values.search, API_KEY, page);
      this.setState({
        gallery: [...res.hits],
        searchValue: values.search,
        page: 1,
      });
    } catch (error) {
      console.log(error);
    }
  };

  onLoadMore = async () => {
    const { gallery, searchValue, page } = this.state;
    console.log(page);
    try {
      const res = await API.searchImgs(searchValue, API_KEY, page);
      this.setState({ gallery: [...gallery, ...res.hits], page: page + 1 });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { gallery } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery items={gallery} />
        {gallery.length !== 0 ? (
          <Button onClick={this.onLoadMore} />
        ) : (
          <p>Please enter your request</p>
        )}
      </div>
    );
  }
}
