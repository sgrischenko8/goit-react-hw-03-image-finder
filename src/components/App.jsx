import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import * as API from 'services/api';
import { PureComponent } from 'react';
import styles from './App.module.css';

export class App extends PureComponent {
  state = {
    img: [],
    query: '',
    isLoading: false,
    error: '',
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (prevState.query !== this.state.query) {
      this.setState({ error: '' });
      await this.renderImages(this.state.query);
    }
  };

  submitHandler = query => {
    this.setState({ query });
  };

  renderImages = async query => {
    this.setState({ isLoading: true });

    try {
      const data = await API.fetchImages(query);
      const img = data.map(el => ({
        id: el.id,
        webformatURL: el.webformatURL,
        largeImageURL: el.largeImageURL,
        tags: el.tags,
      }));
      img[0].total = data[0].total;
      this.setState({ img: img });
    } catch (e) {
      this.setState({ error: 'There is no such images' });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  loadMoreImages = async (query, page) => {
    this.setState({ isLoading: true });

    try {
      const data = await API.fetchImages(query, page);
      const img = data.map(el => ({
        id: el.id,
        webformatURL: el.webformatURL,
        largeImageURL: el.largeImageURL,
        tags: el.tags,
      }));
      img[0].total = data[0].total;
      this.setState(prevState => {
        return { img: [...prevState.img, ...img] };
      });
    } catch (error) {
      this.setState({ error: 'Something goes bad... Please, try later' });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { isLoading, query } = this.state;

    return (
      <div className={styles.app}>
        <Searchbar onSubmit={this.submitHandler} />
        {this.state.error ? (
          <p className={styles.error}>{this.state.error}</p>
        ) : (
          <ImageGallery
            img={this.state.img}
            onLoadMore={this.loadMoreImages}
            query={query}
            isLoading={isLoading}
          />
        )}
      </div>
    );
  }
}

export default App;
