import * as React from 'react';
import FlexBox from './FlexBox';
import DialogWrapper from './DialogWrapper';

function FormWrapper(props) {
  const { open, onClose, children } = props;
  const fullWidth = {
    width: '100%',
  };
  return (
    <DialogWrapper open={open} onClose={onClose}>
      <FlexBox style={fullWidth} padding={1} direction="row">
        {children}
      </FlexBox>
    </DialogWrapper>
  );
}

export default React.memo(FormWrapper);
