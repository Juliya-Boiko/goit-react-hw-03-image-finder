import { Component } from "react";

export class ImageGalleryItem extends Component {
    state = {
        isModalOpen: false,
    } 

    openModal = () => {this.setState({ isModalOpen: true, })}

    closeModal = () => {this.setState({ isModalOpen: false, })}

    render() {
        const { item } = this.props;
        const { isModalOpen } = this.state;
        return (
            <div>
                <img src={item.webformatURL} onClick={this.openModal} alt="" width="50px" />
                {isModalOpen && <img src={item.largeImageURL} alt=""/>}
            </div>
        );
    }
}