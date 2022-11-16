import * as React from 'react';

interface Props {
  children: any;
  className?: string;
}

class Hero extends React.Component<Props> {
  static defaultProps = {
    className: '',
  };

  render() {
    return (
      <section className={`hero ${this.props.className}`}>
        <div className="hero-body">
          <div className="container">{this.props.children}</div>
        </div>
      </section>
    );
  }
}

export default Hero;
