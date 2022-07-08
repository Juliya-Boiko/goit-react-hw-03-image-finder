import 'modern-normalize';
import { Component } from 'react';
import { Searchbar } from './components/Searchbar/Searchbar';
import { getImages } from './components/utils/getImages';
import { ImageGallery } from './components/ImageGallery/ImageGallery';

export class App extends Component {
    state = {
        q: '',
        page: 1,
        hits: [],
        totalHits: null,
        status: 'idle',
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

  render() {
    const { hits, totalHits, status} = this.state;
    return (
        <div>
            <Searchbar onSubmit={this.handlerSearchbarSubmit} />
            {status === 'idle' && <p>Enter a word</p>}
            {status === 'loading' && <p>Loading...</p>}
            {status === 'resolved' && totalHits === 0 && <p>No matches</p>}
            {status === 'resolved' && totalHits > 0 && <ImageGallery items={hits} />}
            {totalHits > 12 && <button type='button' onClick={this.handlerLoadMoreClick}>Load more</button>}
       </div>
    );
  }
}

//=======================================================




// import { Searchbar } from './Searchbar/Searchbar';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { ImageGallery } from './ImageGallery/ImageGallery'

// export class App extends Component {
//   state = {
//     query: '',
//   }

//   handlerSearchbarSubit = (value) => {
//     this.setState({
//       query: value,
//     })
//   }

//   render() {
//     return (
//       <div>
//         <Searchbar onSubmit={this.handlerSearchbarSubit} />
//         <ImageGallery query={this.state.query}/>
//        <ToastContainer
//         position="top-center"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         />
//       </div>
//     )
//   }
// }