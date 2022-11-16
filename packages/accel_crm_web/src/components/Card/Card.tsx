import * as React from 'react';

interface Props {
  className?: string;
  children: any;
  footer?: any;
  style?: any;
}

class Card extends React.Component<Props> {
  render() {
    return (
      <div
        className={`card ${this.props.className ? this.props.className : ''}`}
        style={this.props.style}
      >
        <div className="card-content">{this.props.children}</div>
        {this.props.footer !== undefined && (
          <footer className="card-footer">{this.props.footer}</footer>
        )}
      </div>
    );
  }
}

export default Card;
