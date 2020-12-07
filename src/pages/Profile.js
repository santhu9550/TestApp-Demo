import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Card from './components/Card.js';
import CardBody from './components/CardBody.js';
import CardAvatar from './components/CardAvatar.js';
import { makeStyles } from '@material-ui/core/styles';
import styles from './components/lockScreenPageStyle';

const useStyles = makeStyles(styles);
const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const classes = useStyles();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <Card profile className={classes.customCardClass}>
          <CardAvatar profile className={classes.cardAvatar}>
            <img src={user.picture} alt={user.name} />
          </CardAvatar>
          <CardBody>
            <h2 className={classes.cardTitle}>{user.name}</h2>
            <h2 className={classes.cardTitle}>{user.email}</h2>
          </CardBody>
        </Card>
      </div>
    )
  );
};

export default Profile;
