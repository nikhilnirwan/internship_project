import * as React from 'react';

interface Props {
  iconName: string;
  className?: string;
  iconClassName?: string;
}

class Icon extends React.Component<Props> {
  render() {
    return (
      <span
        className={`icon ${this.props.className ? this.props.className : ''}`}

      >
        <i
          className={`fa fa-${this.props.iconName} ${
            this.props.iconClassName ? this.props.iconClassName : ''
            }`}
        />
      </span>
    );
  }
}

export default Icon;
