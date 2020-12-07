import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

/**
 * @see https://material-ui.com/system/flexbox/
 * @description
 *   This component can be used as a flexbox container and pass the flexbox items as a children of this component
 */
function FlexBox(props) {
  const { justify, align, direction, children, ...restProps } = props;
  return (
    <Box
      display="flex"
      justifyContent={justify ?? 'center'}
      alignItems={align ?? 'center'}
      direction={direction ?? 'row'}
      {...restProps}
    >
      {children}
    </Box>
  );
}
/**
 * PropTypes for the flexbox
 * @type {Object}
 */
FlexBox.propTypes = {
  /** @type {string} justify-content for the flexbox items*/
  justify: PropTypes.string,
  /** @type {string} align-items for the flexbox items */
  align: PropTypes.string,
  /** @type {string} flex-direction for the items */
  direction: PropTypes.string,
  /** @type {node} childrens passed to flexbox */
  children: PropTypes.node,
};

export default FlexBox;
