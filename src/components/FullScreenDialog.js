import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {
  handleClose = () => {
    // 由外部控制元件開關
    this.props.onClose();
  }
  
  render() {
    const { open = false } = this.props;
    return (
      <Dialog
        fullWidth={true}
        maxWidth="xl"
        open={open}
        onClose={this.handleClose}
        TransitionComponent={Transition}
      >
        <div>
          {this.props.children}
        </div>
      </Dialog>
    );
  }
}

export default FullScreenDialog;
