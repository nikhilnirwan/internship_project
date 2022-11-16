import * as React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

const View = () => (
  <>
    <Helmet>
      <title>Error</title>
    </Helmet>
    <section className="section">
      <div className="container content">
        <div className="columns is-centered">
          <div className="column is-two-thirds">
            <h1>Page Not Found</h1>
            <Link to="/">Click here</Link> to return to the homepage.
          </div>
        </div>
      </div>
    </section>
  </>
);

export default View;
