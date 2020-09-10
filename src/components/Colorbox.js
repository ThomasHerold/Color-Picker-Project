import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import "../styles/colorBox.css";

class Colorbox extends Component {
    render() {
    const { background, name } = this.props;

    return (
    <CopyToClipboard text={background}>
        <div style={{ background: background }} className="ColorBox">
            <div className="copy-container">
            <div className="box-content">
                <span>{name}</span>              
            </div>
            <button className="copy-button">Copy</button>
            </div>
            <span className="see-more">More</span>
        </div>
    </CopyToClipboard>
    );
    }
}

export default Colorbox;