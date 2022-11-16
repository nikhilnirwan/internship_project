import * as React from 'react';
import * as queryString from 'query-string';
import Helmet from 'react-helmet';

interface State {
  content?: string;
}

class View extends React.Component<{}, State> {
  constructor(props) {
    super(props);
    const query = queryString.parse(location.search);
    let content;
    if (query && query.content) {
      content = decodeURIComponent(String(query.content));
    }
    this.state = { content };
  }

  componentDidMount() {
    require('../scss/ViewPDF.scss');
  }

  render() {
    if (!this.state.content) {
      return null;
    }
    return (
      <>
        <Helmet>
          <title>View PDF</title>
        </Helmet>
        <object
          style={{ width: '100%', height: '100vh' }}
          data={`data:application/pdf;base64,${this.state.content}`}
        >
          <embed
            width='100%'
            height='100%'
            type='application/pdf'
            src={`data:application/pdf;base64,${this.state.content}`}
          />
        </object>
      </>
    );
  }
}

export default View;
