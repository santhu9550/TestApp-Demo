import * as React from 'react';
import FormWrapper from './FormWrapper';
import FormHeader from './FormHeader';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import FormButton from './FormButton';
import FlexBox from './FlexBox';
import { useDispatch } from 'react-redux';
import { addOrder, editOrder } from '../../Redux/actions/order';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 400,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function Form(props) {
  const classes = useStyles();
  const {
    formData,
    setFormData,
    isEditing,
    setIsEditing,
    product,
    setProduct,
  } = props.state;
  const { targetId, setTargetId } = props.target;
  const dispatch = useDispatch();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fullWidth = {
    width: '100%',
  };
  const { customer_name, customer_email, quantity } = formData;
  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      customer_name,
      customer_email,
      product,
      quantity,
    };
    console.log(submitData);
    if (isEditing) {
      dispatch(editOrder(submitData, targetId));
    } else {
      dispatch(addOrder(submitData));
    }
    setFormData({});
    setTargetId('');
    setProduct('');
    props.onClose();
  };

  return (
    <FormWrapper open={props.open} onClose={props.onClose}>
      <form style={fullWidth} onSubmit={handleSubmit}>
        <FormHeader title={isEditing ? 'Edit' : 'Create'} />
        <Box>
          <TextField
            aria-required
            required
            name="customer_name"
            id="customer_name"
            label="customer Name"
            value={formData.customer_name}
            style={{
              width: '100%',
            }}
            onChange={handleChange}
          />
        </Box>
        <Box>
          <TextField
            aria-required
            required
            name="customer_email"
            id="customer_email"
            label="customer Email"
            type="email"
            value={formData.customer_email}
            style={{
              width: '100%',
            }}
            onChange={handleChange}
          />
        </Box>
        <Box>
          <FormControl required className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Product</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              required
            >
              <MenuItem value="Product 1">Product 1</MenuItem>
              <MenuItem value="Product 2">Product 2</MenuItem>
              <MenuItem value="Product 3">Product 3</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box>
          <TextField
            aria-required
            required
            name="quantity"
            id="quantity"
            label="Quantity"
            type="number"
            value={formData.quantity}
            InputProps={{ inputProps: { min: 1 } }}
            style={{
              width: '100%',
            }}
            onChange={handleChange}
          />
        </Box>
        <FlexBox marginTop={1} spacing={2} justify="flex-end" align="flex-end">
          <FormButton clickHandler={props.onClose}>Cancel</FormButton>
          <FormButton type="submit">Save</FormButton>
        </FlexBox>
      </form>
    </FormWrapper>
  );
}

export default React.memo(Form);
