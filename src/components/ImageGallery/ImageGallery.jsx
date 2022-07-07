import { Component } from 'react';
// import { imgParams } from '../utils/getImages';
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
            this.setState({ status: 'loading', page: 1, hits: [], totalHits: null });
            const imgParams = {
                q: this.props.query,
                page: this.state.page,
            }
            getImages(imgParams).then((response) => {
                this.setState({
                    status: 'resolved',
                    hits: [...response.data.hits],
                    totalHits: response.data.totalHits,
                })
            });
        }
        if (prevState.page !== this.state.page) {
            const imgParams = {
                q: this.props.query,
                page: this.state.page,
            }
            getImages(imgParams).then((response) => {
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
                    <ul
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                        }}>
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