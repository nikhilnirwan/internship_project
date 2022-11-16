import * as React from 'react';

interface Props {
  page: number;
  maxPage: number;
  handlePagination: Function;
}

class Pagination extends React.Component<Props> {
  render() {
    if (this.props.maxPage < 1) {
      return null;
    }
    return (
      <div className="level is-mobile">
        <div className="level-item">
          <button
            className="button is-outlined"
            disabled={this.props.page <= 1}
            onClick={() => {
              this.props.handlePagination(this.props.page - 1);
            }}
          >
            &laquo; Prev
          </button>
        </div>
        <div className="level-item">
          <small>
            {this.props.page} of {this.props.maxPage}
          </small>
        </div>
        <div className="level-item">
          <button
            className="button is-outlined"
            disabled={this.props.page >= this.props.maxPage}
            onClick={() => {
              this.props.handlePagination(this.props.page + 1);
            }}
          >
            Next &raquo;
          </button>
        </div>
      </div>
    );
  }
}

export default Pagination;
