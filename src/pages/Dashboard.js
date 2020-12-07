import React from 'react';
import Profile from './Profile';
import { useAuth0 } from '@auth0/auth0-react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// @material-ui/icons
import Assignment from '@material-ui/icons/Assignment';
import DeleteIcon from '@material-ui/icons/Delete';
import Box from '@material-ui/core/Box';
import EditIcon from '@material-ui/icons/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder, deleteOrder, removeAlert } from '../Redux/actions/order';
import SweetAlert from 'react-bootstrap-sweetalert';
import { CircularProgress, LinearProgress } from '@material-ui/core';

// core components
import GridContainer from './components/GridContainer.js';
import GridItem from './components/GridItem.js';
import Button from './components/Button.js';
import Card from './components/Card.js';
import CardBody from './components/CardBody.js';
import CardIcon from './components/CardIcon.js';
import CardHeader from './components/CardHeader.js';
import ReactTable from './components/ReactTable.js';
import Form from './components/Form';

import { cardTitle } from './components/material-dashboard-pro-react.js';

import alertStyles from './components/sweetAlertStyle.js';

const styles = {
  ...alertStyles,
  cardIconTitle: {
    ...cardTitle,
    marginTop: '15px',
    marginBottom: '0px',
  },
};

const useStyles = makeStyles(styles);

const Dashboard = () => {
  const classes = useStyles();
  const { user, isAuthenticated, isLoading, logout } = useAuth0();
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state?.orderReducer);
  const orders = orderState?.orders;
  const loading = orderState?.loading;
  const alerts = orderState?.errors;
  console.log(orders);
  React.useEffect(() => {
    dispatch(getOrder());
  }, []);

  const [alert, setAlert] = React.useState(null);
  const [showForm, setShowForm] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [formData, setFormData] = React.useState({});
  const [targetId, setTargetId] = React.useState('');
  const [product, setProduct] = React.useState('');
  console.log(isAuthenticated);
  console.log(user);
  if (isLoading) {
    return (
      <div>
        <GridContainer justify="center">
          <CircularProgress style={{ marginTop: '10rem' }} color="secondary" />
        </GridContainer>
      </div>
    );
  }
  const openForm = () => setShowForm(true);
  const closeForm = () => {
    setShowForm(false);
    setFormData({});
    setIsEditing(false);
  };
  const data = orders?.map((order, index) => {
    return {
      id: index,
      customer_name: order.customer_name,
      customer_email: order.customer_email,
      product: order.product,
      quantity: order.quantity,
      actions: (
        // we've added some custom button actions
        <div className="actions-right">
          <Button
            justIcon
            round
            simple
            onClick={() => editHandler(order)}
            color="warning"
            className="edit"
          >
            <EditIcon />
          </Button>{' '}
          {/* use this button to remove the data row */}
          <Button
            justIcon
            round
            simple
            onClick={() => warningWithConfirmMessage(order._id)}
            color="danger"
            className="remove"
          >
            <DeleteIcon />
          </Button>{' '}
        </div>
      ),
    };
  });

  const warningWithConfirmMessage = (id) => {
    setAlert(
      <SweetAlert
        warning
        style={{ display: 'block', marginTop: '-100px' }}
        title="Are you sure?"
        onConfirm={() => deleteHandler(id)}
        onCancel={() => hideAlert()}
        confirmBtnCssClass={classes.button + ' ' + classes.success}
        cancelBtnCssClass={classes.button + ' ' + classes.danger}
        confirmBtnText="Yes, delete it!"
        cancelBtnText="Cancel"
        showCancel
      >
        You will not be able to recover this file!
      </SweetAlert>
    );
  };

  const hideAlert = () => {
    setAlert(null);
  };

  const editHandler = async (order) => {
    setIsEditing(true);
    const { _id, customer_name, customer_email, product, quantity } = order;
    setTargetId(_id);
    setFormData({
      _id,
      customer_name,
      customer_email,
      quantity,
    });
    if (product) {
      setProduct(product);
    }
    openForm();
  };

  const deleteHandler = (id) => {
    dispatch(deleteOrder(id));
    hideAlert();
  };

  return (
    <div>
      {isAuthenticated && (
        <div>
          <GridContainer justify="center">
            <h1 style={{ marginLeft: '10rem' }}>dashboard</h1>
            <Box flexGrow={1}>
              <Form
                open={showForm}
                onClose={closeForm}
                state={{
                  formData,
                  setFormData,
                  isEditing,
                  setIsEditing,
                  product,
                  setProduct,
                }}
                onSave={(e) => e.preventDefault()}
                target={{ targetId, setTargetId }}
              />
            </Box>
            <GridItem xs={12}>
              <Card>
                <CardHeader color="primary" icon>
                  <CardIcon color="primary">
                    <Assignment />
                  </CardIcon>
                  <h4 className={classes.cardIconTitle}>React Table</h4>
                </CardHeader>
                <CardBody>
                  {alert}

                  {alerts &&
                    alerts.length > 0 &&
                    alerts.map((alert) => {
                      const { variant, message, id } = alert;
                      return (
                        <SweetAlert
                          key={id}
                          success={variant === 'success' ? true : false}
                          danger={variant === 'danger' ? true : false}
                          title={message}
                          onConfirm={() => dispatch(removeAlert(alert.id))}
                          onCancel={() => dispatch(removeAlert(alert.id))}
                          confirmBtnCssClass={
                            classes.button + ' ' + classes.success
                          }
                        />
                      );
                    })}
                  {loading ? (
                    <LinearProgress color="secondary" />
                  ) : (
                    <GridContainer>
                      <Box flexGrow={1}>
                        <Button
                          color="success"
                          style={{ marginLeft: '20px' }}
                          onClick={openForm}
                          round={true}
                        >
                          Add New
                        </Button>
                        <Button
                          onClick={() =>
                            logout({ returnTo: window.location.origin })
                          }
                          color="danger"
                        >
                          Logout
                        </Button>
                        {'  '} <Profile />
                      </Box>

                      <ReactTable
                        columns={[
                          {
                            Header: 'Customer Name',
                            accessor: 'customer_name',
                          },
                          {
                            Header: 'Customer Email',
                            accessor: 'customer_email',
                          },
                          {
                            Header: 'Product',
                            accessor: 'product',
                          },
                          {
                            Header: 'Quantity',
                            accessor: 'quantity',
                          },
                          {
                            Header: 'Actions',
                            accessor: 'actions',
                          },
                        ]}
                        data={data}
                      />
                    </GridContainer>
                  )}
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
