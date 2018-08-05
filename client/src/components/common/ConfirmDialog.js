import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import withMobileDialog from "@material-ui/core/withMobileDialog";

class ConfirmDialog extends React.Component {
  render() {
    const { fullScreen } = this.props;

    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={this.props.showDialog}
          onClose={this.props.handleNo()}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {this.props.title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>{this.props.text}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleNo()} color="primary">
              Não
            </Button>
            <Button onClick={this.props.handleYes()} color="primary" autoFocus>
              Sim
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ConfirmDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  showDialog: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  handleYes: PropTypes.func.isRequired,
  handleNo: PropTypes.func.isRequired
};

export default withMobileDialog()(ConfirmDialog);
