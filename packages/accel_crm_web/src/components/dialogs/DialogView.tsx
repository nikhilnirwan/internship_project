


import { Dialog, DialogContent, DialogProps, DialogTitle, List, useMediaQuery, useTheme } from '@material-ui/core';
import { MDBDataTableV5 } from 'mdbreact';
import * as React from 'react';

interface Props {
  open: boolean;
  handleClose?: Function;
  data?: any;
  theadColor?: string;
  paging?: boolean;
  searching?: boolean;
  noBottomColumns?: boolean;
  fullWidth?: boolean;
  fullScreen?: string;
  maxWidth?: any;
}

interface State {
}


class DialogView extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <Dialog
        onClose={(e) => this.props.handleClose(e)}
        open={this.props.open}
        fullWidth={this.props.fullWidth}
        maxWidth={this.props.maxWidth}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
        <DialogContent>
          <MDBDataTableV5
            striped
            bordered
            theadTextWhite
            theadColor={this.props.theadColor}
            searching={this.props.searching}
            paging={this.props.paging}
            sortable
            pagingTop
            searchTop
            searchBottom={false}
            noBottomColumns
            data={this.props.data}
          />
        </DialogContent>
      </Dialog>
    );
  }
}

export default DialogView;
