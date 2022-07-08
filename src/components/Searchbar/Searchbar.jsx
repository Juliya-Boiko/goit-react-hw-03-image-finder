import { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, SearchForm, SearchFormInput, SearchFormButton } from './Searchbar.styled';
import { HiSearch } from "react-icons/hi";

export class Searchbar extends Component {
    state = {
        query: '',
    }

    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    };

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
            <Header>
                <SearchForm onSubmit={this.handlerSubmit}>
                    <SearchFormInput
                        type="text"
                        name='query'
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={this.handlerChange}
                        value={this.state.query}
                    />
                    <SearchFormButton type='submit'>
                        <HiSearch size="30px"/>
                    </SearchFormButton>
                </SearchForm>
            </Header>
        );
    }
}