import { Component } from 'react';

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
            alert('empty');            
            return;
        }
        this.props.onSubmit(this.state.query);
        this.setState({query: '',})
    }

    render() {
        return (
            <header>
                <form onSubmit={this.handlerSubmit}>
                    <input
                        type="text"
                        name='query'
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={this.handlerChange}
                        value={this.state.query}
                    />
                    <button type='submit'>Search</button>
                </form>
            </header>
        );
    }
}