import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class Searchbar extends Component {
    state = {
        query: '',
    }

    handlerChange = (evt) => {
        this.setState({
            query: evt.currentTarget.value.toLowerCase(),
        })
    }

    handlerSubmit = (evt) => {
        evt.preventDefault();
        if (this.state.query.trim() === '') {
            // this.setState({query: '',})
            toast.warn('ENTER SEARCH QUERY!', {
                theme: "colored",
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            return;
        }
        this.props.onSubmit(this.state.query);
        this.setState({query: '',})
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handlerSubmit}>
                <input
                    type="text"
                    name='query'
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    onChange={this.handlerChange}
                    value={this.state.query}/>
                <button type='submit'>Search</button>
                </form>
            </div>
        )
    }
}