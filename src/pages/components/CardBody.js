import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import { whiteColor, hexToRgb } from './material-dashboard-pro-react';
// @material-ui/icons

// core components
const styles = {
  cardBody: {
    padding: '0.9375rem 20px',
    flex: '1 1 auto',
    WebkitBoxFlex: '1',
    position: 'relative',
  },
  cardBodyBackground: {
    position: 'relative',
    zIndex: '2',
    minHeight: '280px',
    paddingTop: '40px',
    paddingBottom: '40px',
    maxWidth: '440px',
    margin: '0 auto',
  },
  cardBodyPlain: {
    paddingLeft: '5px',
    paddingRight: '5px',
  },
  cardBodyFormHorizontal: {
    paddingLeft: '15px',
    paddingRight: '15px',
    '& form': {
      margin: '0',
    },
  },
  cardPricing: {
    padding: '15px!important',
    margin: '0px!important',
  },
  cardSignup: {
    padding: '0px 30px 0px 30px',
  },
  cardBodyColor: {
    borderRadius: '6px',
    '& h1,& h2,& h3': {
      '& small': {
        color: 'rgba(' + hexToRgb(whiteColor) + ', 0.8)',
      },
    },
  },
  cardBodyProfile: {
    marginTop: '15px',
  },
  cardBodyCalendar: {
    padding: '0px !important',
  },
};

const useStyles = makeStyles(styles);

export default function CardBody(props) {
  const classes = useStyles();
  const {
    className,
    children,
    background,
    plain,
    formHorizontal,
    pricing,
    signup,
    color,
    profile,
    calendar,
    ...rest
  } = props;
  const cardBodyClasses = classNames({
    [classes.cardBody]: true,
    [classes.cardBodyBackground]: background,
    [classes.cardBodyPlain]: plain,
    [classes.cardBodyFormHorizontal]: formHorizontal,
    [classes.cardPricing]: pricing,
    [classes.cardSignup]: signup,
    [classes.cardBodyColor]: color,
    [classes.cardBodyProfile]: profile,
    [classes.cardBodyCalendar]: calendar,
    [className]: className !== undefined,
  });
  return (
    <div className={cardBodyClasses} {...rest}>
      {children}
    </div>
  );
}

CardBody.propTypes = {
  className: PropTypes.string,
  background: PropTypes.bool,
  plain: PropTypes.bool,
  formHorizontal: PropTypes.bool,
  pricing: PropTypes.bool,
  signup: PropTypes.bool,
  color: PropTypes.bool,
  profile: PropTypes.bool,
  calendar: PropTypes.bool,
  children: PropTypes.node,
};
