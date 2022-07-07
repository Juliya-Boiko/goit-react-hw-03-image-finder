import 'modern-normalize';
import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from './ImageGallery/ImageGallery'

export class App extends Component {
  state = {
    query: '',
  }

  handlerSearchbarSubit = (value) => {
    this.setState({
      query: value,
    })
  }

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handlerSearchbarSubit} />
        <ImageGallery query={this.state.query}/>
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
    )
  }
}