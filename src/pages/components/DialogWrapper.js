import * as React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogContent, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

const dialogStyle = {
  minWidth: 400,
};

/**
 * @see https://material-ui.com/components/dialogs/
 * @description
 *   This is component is used as a dialog wrapper
 *   If you want to show a text/form that'll popup conditionally you can use this component
 */
function DialogWrapper(props) {
  const theme = useTheme();
  const { open, onClose, fullscreenOn = 'sm', children } = props;
  const fullScreenBreakpoint = useMediaQuery(
    theme.breakpoints.down(fullscreenOn)
  );
  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      fullScreen={fullScreenBreakpoint}
      open={open}
      onClose={onClose}
    >
      <DialogContent style={dialogStyle}>{children}</DialogContent>
    </Dialog>
  );
}

DialogWrapper.propTypes = {
  /** @type {bool} If `open` is set to true then it'll display the modal */
  open: PropTypes.bool.isRequired,
  /** @type {Function} handle the close functionality of the dialog */
  onClose: PropTypes.func.isRequired,
  /** @type {node} pass everything as a children which will be shown inside the modal*/
  children: PropTypes.node.isRequired,
};

export default DialogWrapper;
