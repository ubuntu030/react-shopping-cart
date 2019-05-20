import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  image: {
    width: '100%'
  }
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}
// TODO: 設計成 Render Props 使用在"查看全圖"、"購物車清單"
class FullScreenDialog extends React.Component {
  render() {
    const { classes, currentItem, open = false, onCloseEvent } = this.props;
    const { alt_description, img } = currentItem;
    return (
      <Dialog
        fullScreen
        open={open}
        onClose={this.handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton color="inherit" onClick={onCloseEvent} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              Dialog
              </Typography>
          </Toolbar>
        </AppBar>
        <div>
          <img alt={alt_description} src={img} className={classes.image}></img>
        </div>
      </Dialog>
    );
  }
}

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullScreenDialog);
