import * as React from 'react';

interface Props {
  className?: string;
  children: any;
}

class Box extends React.Component<Props> {
  render() {
    return (
      <div
        className={`box ${this.props.className ? this.props.className : ''}`}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Box;
