import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  primary: {
    backgroundColor: theme.palette.success.main,
    color: 'white',
    fontSize: '1.1rem',
    fontWeight: 'normal',
    textTransform: 'capitalize',
    margin: '0.5rem 0.3rem',
    padding: '0.4rem 1.1rem',
    letterSpacing: 5,
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
      color: 'white',
    },
  },
  secondary: {
    letterSpacing: 5,
    fontSize: '1.1rem',
    fontWeight: 'normal',
    textTransform: 'capitalize',
    margin: '0.5rem 0.3rem',
    padding: '0.4rem 0.7rem',
    color: theme.palette.text.secondary,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  progressBar: {
    color: theme.palette.success.main,
  },
}));

function FormButton(props) {
  const { clickHandler, type, isLoading, disabled, children } = props;
  const classes = useStyles();
  const buttonVariant = type === 'submit' ? 'contained' : 'outlined';
  const buttonClass = type === 'submit' ? classes.primary : classes.secondary;
  return (
    <Button
      type={type}
      variant={buttonVariant}
      className={buttonClass}
      onClick={clickHandler}
      disabled={isLoading || disabled}
      disableElevation
      spacing={4}
    >
      {isLoading ? (
        <CircularProgress className={classes.progressBar} size={33} />
      ) : (
        children
      )}
    </Button>
  );
}

export default React.memo(FormButton);
