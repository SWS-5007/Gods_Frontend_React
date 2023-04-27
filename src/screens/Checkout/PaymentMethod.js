import {
  Box,
  Typography,
  Alert,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';

export default function PaymentMethod({ data, setData }) {
  const { payment_method } = data;
  return (
    <Box>
      <Typography variant='h5' sx={{ mb: 5 }}>
        Payment Information
      </Typography>
      <Alert severity='info' sx={{ mb: 3 }}>
        Please choose payment method
      </Alert>
      <FormControl sx={{ mb: 2 }}>
        <FormLabel>Available Payment Methods:</FormLabel>
        <RadioGroup
          defaultValue={payment_method}
          name='payment_method'
          onChange={setData}
        >
          <FormControlLabel
            value='stripe'
            control={<Radio checked={payment_method === 'stripe'} />}
            label='Credit/Debit Card'
          />
          <FormControlLabel value='paypal' control={<Radio />} label='PayPal' />
          <FormControlLabel
            value='payoneer'
            control={<Radio />}
            label='Payoneer'
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}
