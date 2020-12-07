import * as React from 'react';
import PropTypes from 'prop-types';
import CreateIcon from '@material-ui/icons/Create';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import FlexBox from './FlexBox';

const useStyles = makeStyles((theme) => ({
  headerIcon: {
    backgroundColor: theme.palette.success.main,
    color: 'white',
    padding: theme.spacing(1),
    marginRight: theme.spacing(1),
    borderRadius: 2,
  },
  header: {
    fontSize: '1.4rem',
    color: theme.palette.text.secondary,
  },
}));

/**
 * FormHeader can be used as a header in the modal form
 * There're two things on the form header
 * 1. Icon
 * 2. Form header text
 */
function FormHeader(props) {
  const { title } = props;
  const classes = useStyles();
  return (
    <FlexBox justify="flex-start" display="flex">
      <IconButton className={classes.headerIcon}>
        <CreateIcon />
      </IconButton>
      <Box spacing={1}>
        <Typography className={classes.header}>{title}</Typography>
      </Box>
    </FlexBox>
  );
}

FormHeader.propTypes = {
  /** @type {node} If there's any icon in the header */
  icon: PropTypes.node,
  /** @type {string} form header text */
  title: PropTypes.string.isRequired,
};

export default FormHeader;
