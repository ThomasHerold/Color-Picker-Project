import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import "../styles/colorBox.css";

class Colorbox extends Component {
    constructor(props){
        super(props);

        this.state = { copied: false };
        this.changeCopyState = this.changeCopyState.bind(this);
    }

    changeCopyState() {
        this.setState({ copied: true }, () => {
            setTimeout(() => this.setState({ copied: false }), 1500);
        });
    }

    render() {
    const { background, name } = this.props;
    const { copied } = this.state;
    
    return (
    <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div style={{ background }} className="ColorBox">
          {/* the reason we grow on a separate div rather than the top one is because growing a div will also grow the contents within it */}
          <div style={{ background }} className={`copy-overlay ${copied && "show"}` } />
          <div className={`copy-msg ${copied && "show"}` }>
              <h1>Copied!</h1>
              <p>{background}</p>
          </div>
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