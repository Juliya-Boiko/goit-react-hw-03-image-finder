import 'modern-normalize';
import { Component } from 'react';
import { Searchbar } from './components/Searchbar/Searchbar';
import { getImages } from './utils/getImages';
import { ImageGallery } from './components/ImageGallery/ImageGallery';
import { Idle } from './components/Idle/Idle';
import { LoaderSpinner } from './components/Loader/Loader';
import { UncorrectSearch } from './components/UncorrectSearch/UncorrectSearch';
import { PrimaryButton } from './components/common/PrimaryButton.styled';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
    state = {
        q: '',
        page: 1,
        hits: [],
        totalHits: null,
        status: 'idle',
    }

    componentDidUpdate(_, prevState) {
        const { q, page } = this.state;
        if (prevState.q !== q || prevState.page !== page) {
            this.setState({
                status: 'loading',
            });
            const params = {
                q: q,
                page: page,
            }
            getImages(params).then((response) => {
                this.setState((prevState) => ({
                    hits: [...prevState.hits, ...response.data.hits],
                    totalHits: response.data.totalHits,
                    status: 'resolved',
                }))
            })
        }
    }

    handlerSearchbarSubmit = (value) => {
        this.setState({
        q: value,
        page: 1,
        hits: [],
        totalHits: null
        })
    }

    handlerLoadMoreClick = () => {
        this.setState((prevState) => ({
        page: prevState.page + 1,
        }))
    }

  render() {
    const { hits, totalHits, status} = this.state;
    return (
        <div>
            <Searchbar onSubmit={this.handlerSearchbarSubmit} />
            {status === 'idle' && <Idle />}
            {status === 'loading' && <LoaderSpinner />}
            {status === 'resolved' && totalHits === 0 && <UncorrectSearch />}
            {status === 'resolved' && totalHits > 0 && <ImageGallery items={hits} />}
            {totalHits > 12 && <PrimaryButton type='button' onClick={this.handlerLoadMoreClick}>Load more</PrimaryButton>}
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
  }
}