import * as React from 'react';
import * as shortid from 'shortid';

interface Props {
  className?: string;
  isSticky?: boolean;
  children: any;
}

interface State {
  isActive: boolean;
}

class Notification extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isActive: true,
    };
  }

  componentWillReceiveProps() {
    this.setState({ isActive: true });
  }

  render() {
    if (!this.state.isActive) {
      return null;
    }
    return (
      <div
        key={!this.props.isSticky ? shortid.generate() : undefined}
        className={`notification ${
          this.props.className ? this.props.className : ''
        }`}
      >
        {!this.props.isSticky && (
          <button
            className="delete"
            onClick={() => {
              this.setState({ isActive: false });
            }}
          />
        )}
        {this.props.children}
      </div>
    );
  }
}

export default Notification;
