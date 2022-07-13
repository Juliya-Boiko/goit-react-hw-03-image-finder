import PropTypes from 'prop-types';
import { Header, SearchForm, SearchFormInput, SearchFormButton } from './Searchbar.styled';
import { Formik } from 'formik';
import { HiSearch } from "react-icons/hi";

export const Searchbar = ({ onSubmit }) => {
    return (
        <Header>
            <Formik
                initialValues={{query: ''}}
                onSubmit={(values) => {
                    onSubmit(values.query);
                }}
            >
            {props => (
                <SearchForm>
                    <SearchFormInput
                        name='query'
                        type='text'
                        onChange={props.handleChange}
                        value={props.values.query}
                    />
                    <SearchFormButton type='submit'>
                        <HiSearch size="30px"/>
                    </SearchFormButton>
                </SearchForm>
            )}
            </Formik>
        </Header>
    );
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}













// import { Component } from 'react';
// import PropTypes from 'prop-types';
// import { Header, SearchForm, SearchFormInput, SearchFormButton } from './Searchbar.styled';
// import { HiSearch } from "react-icons/hi";
// import { toast } from 'react-toastify';

// export class Searchbar extends Component {
//     state = {
//         query: '',
//     }

//     static propTypes = {
//         onSubmit: PropTypes.func.isRequired,
//     };

//     handlerChange = (evt) => {
//         this.setState({
//             query: evt.currentTarget.value.toLowerCase(),
//         })
//     }

//     handlerSubmit = (evt) => {
//         evt.preventDefault();
//         if (this.state.query.trim() === '') {
//             toast.warn('Please, enter something!', {
//                 position: "top-center",
//                 autoClose: 3000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//             });
//             return;
//         }
//         this.props.onSubmit(this.state.query);
//         this.setState({query: '',})
//     }

//     render() {
//         return (
//             <Header>
//                 <SearchForm onSubmit={this.handlerSubmit}>
//                     <SearchFormInput
//                         type="text"
//                         name='query'
//                         autoComplete="off"
//                         autoFocus
//                         placeholder="Search images and photos"
//                         onChange={this.handlerChange}
//                         value={this.state.query}
//                     />
//                     <SearchFormButton type='submit'>
//                         <HiSearch size="30px"/>
//                     </SearchFormButton>
//                 </SearchForm>
//             </Header>
//         );
//     }
// }