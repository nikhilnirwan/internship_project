import * as React from 'react';

interface Props {
  children: any;
  controls?: Array<any>;
  isSmall?: boolean;
}

class ViewHeading extends React.Component<Props> {
  render() {
    return (
      <div className="level view-heading">
        <div className="level-left">
          <div className="level-item">
            {this.props.isSmall !== undefined ? (
              <h3 className="is-marginless">{this.props.children}</h3>
            ) : (
              <h1 className="is-marginless">{this.props.children}</h1>
            )}
          </div>
        </div>
        {this.props.controls && (
          <div className="level-right">
            {this.props.controls.map((control, index) => (
              <div className="level-item" key={index}>
                {control}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default ViewHeading;
