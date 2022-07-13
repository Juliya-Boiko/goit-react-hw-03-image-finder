import 'modern-normalize';
import { Component } from 'react';
import { Searchbar } from './components/Searchbar/Searchbar';
import { getImages } from './API/getImages';
import { ImageGallery } from './components/ImageGallery/ImageGallery';
import { Idle } from './components/Idle/Idle';
import { LoaderSpinner } from './components/Loader/Loader';
import { UncorrectSearch } from './components/UncorrectSearch/UncorrectSearch';
import { PrimaryButton } from './components/common/PrimaryButton.styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
    state = {
        q: '',
        page: 1,
        hits: [],
        totalHits: null,
        status: 'idle',
        lastPage: null,
    }

    componentDidUpdate(_, prevState) {
        const { q, page } = this.state;
        if (prevState.q !== q || prevState.page !== page) {
            this.setState({
                status: 'loading',
            });
            getImages({
                q: q,
                page: page,
                image_type: "photo",
                orientation: "horizontal",
                per_page: 12,
            })
            .then((response) => {
                this.setState((prevState) => ({
                    lastPage: Math.ceil(response.data.totalHits / 12),
                    hits: [...prevState.hits, ...response.data.hits],
                    totalHits: response.data.totalHits,
                    status: 'resolved',
                }))
            })
        }
    }

    handlerSearchbarSubmit = (value) => {
        if (value.trim() === '') {
            toast.warn('Please, enter something!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        } else {
            this.setState({
                q: value,
                page: 1,
                hits: [],
                totalHits: null
            })
        }
    }

    handlerLoadMoreClick = () => {
        this.setState((prevState) => ({
        page: prevState.page + 1,
        }))
    }

  render() {
    const { page, lastPage, hits, totalHits, status} = this.state;
    return (
        <div>
            <Searchbar onSubmit={this.handlerSearchbarSubmit} />
            {status === 'idle' && <Idle />}
            {status === 'loading' && <LoaderSpinner />}
            {status === 'resolved' && totalHits === 0 && <UncorrectSearch />}
            {status === 'resolved' && totalHits > 0 && <ImageGallery items={hits} />}
            {status !== 'loading' && totalHits > 12 && page !== lastPage && <PrimaryButton type='button' onClick={this.handlerLoadMoreClick}>Load more</PrimaryButton>}
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