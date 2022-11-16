import * as React from 'react';
import Notification  from '../Notification/Notification';

interface Props {
  errors: string[];
}

class Errors extends React.Component<Props> {
  render() {
    return this.props.errors.map((error, index) => (
      <Notification className="is-danger" key={index}>
        {error}
      </Notification>
    ));
  }
}

export default Errors;
