import { Component } from 'react';
import { imgParams } from '../utils/getImages';
import { getImages } from '../utils/getImages';

export class ImageGallery extends Component {
    state = {
        status: 'idle',
        page: 1,
        hits: [],
        totalHits: null,
    }

    handleLoadBtnClick = () => {
        this.setState((prevState) => ({
            page: prevState.page + 1,
        }));
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.query !== this.props.query || prevState.page !== this.state.page) {
            this.setState({ status: 'loading' });
            imgParams.q = this.props.query;
            imgParams.page = this.state.page;
            getImages(imgParams).then((response) => {
                console.log(response.data);
                this.setState((prevState) => ({
                    status: 'resolved',
                    hits: [...prevState.hits, ...response.data.hits],
                    totalHits: response.data.totalHits,
                }))
            });
        }
    }

    
    render() {
        const { status, hits, totalHits } = this.state;
        if (status === 'idle') {
            return <p>Enter a word</p>;
        }
        if (status === 'loading') {
            return <p>Loading...</p>;
        }
        if (totalHits === 0) {
            return <p>Empty array</p>
        }
        if (status === 'resolved') {
            return (
                <div>
                    <ul>
                        {hits.map((item) => {
                            return <li key={item.id}>
                                <img src={item.webformatURL} alt="" width="100px" />
                            </li>;
                        })}
                    </ul>
                    {totalHits > 12 && <button type='button' onClick={this.handleLoadBtnClick}>Load more</button>}
                </div>
            );
        }
    }
}

// export class ImageGallery extends Component {

//     state = {
//         data: null,
//         totalHits: null,
//         status: 'idle',
//         // page: 1,
//     }

//     handleLoadMoreBtn = (evt) => {
//         console.log(evt);
//         // this.setState((prevState) => {
//         //     console.log(prevState.page);
//         //     // return {
//         //     //     page: prevState.page + 1,
//         //     // }
//         // })
//     }

//     componentDidUpdate(prevProps, prevState) {
//         if (prevProps.query !== this.props.query) {

//             this.setState({ status: 'loading', });

//             imgParams.q = this.props.query;
//             // imgParams.page = this.state.page;

//             setTimeout(() => {
//                 getImages(imgParams)
//                     .then((result) => {
//                         this.setState({ data: result.data.hits, totalHits: result.data.totalHits, status: 'resolved',});
//                     });
//             }, 2000);
        
//         }
//     }

    

//     render() {
//         const { data, totalHits, status } = this.state;

//         if (status === 'idle') {
//             return <p>Enter a word</p>;
//         }
//         if (status === 'loading') {
//             return <div>Loading...</div>;
//         }
//         // if (status === 'resolved' && data.length === 0) {
//         //     return <p>empty array</p>
//         // }
//         if (status === 'resolved' && totalHits > 12) {
//             return (
//                 <div>
//                     <ul>
//                         {data.map((item) => {
//                             return <li key={item.id}>
//                                 <img src={item.webformatURL} alt="" width="100px" />
//                             </li>
//                         })}
//                     </ul>
//                     <button type="button" onClick={() => {
//                         this.setState(prevState => {
//                             return {
//                             page: prevState.page + 1,
//                         }
//                     })} }>Load more</button>
//                 </div>
//             );
//         }
//     }
// }