import * as React from 'react';
import { Loader } from '..';

interface Props {
  src: string;
  className?: string;
  alt?: string;
}

interface State {
  isImageLoaded: boolean;
}

class Image extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isImageLoaded: false,
    };
  }

  render() {
    return (
      <div
        key={this.props.src}
        className={`image ${this.props.className ? this.props.className : ''} ${
          !this.state.isImageLoaded ? 'is-loading' : ''
        }`}
      >
        {!this.state.isImageLoaded && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              margin: 'auto',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Loader />
          </div>
        )}
        <img
          src={this.props.src}
          alt={this.props.alt ? this.props.alt : ''}
          onLoad={() => {
            this.setState({ isImageLoaded: true });
          }}
          style={this.state.isImageLoaded ? {} : { display: 'none' }}
        />
      </div>
    );
  }
}

export default Image;
