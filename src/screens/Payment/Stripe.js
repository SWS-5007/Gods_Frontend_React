import React from 'react';
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import countries from '../../data/countries.json';
import { Typography } from '@mui/material';

const CardElementInput = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.border.main}`,
  borderRadius: 6,
  padding: `14px 12px`,
  marginBottom: 12,
  marginTop: 6,
}))
const cardInputStyle = { 
  base: { 
    fontFamily: "'Montserrat',sans-serif",
  }
}
export default function PaymentStripe({ amount, formData }) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    const { error, payment_method } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardNumberElement),
      billing_details: {
        name: `${formData?.firstName} ${formData?.lastName}`,
        email: formData?.email,
        address: {
          city: formData?.city,
          country: countries.find(c => c.id === formData?.country)?.code || 'US',
          line1: formData?.address,
          state: formData?.state,
        },
      },
    });
    // TODO: confirm payment with API
    console.log(payment_method, error)
  };

  return (
    <Grid container sx={{ py: 2 }}>
      <Grid item xs={12} md={5}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ display: { xs: 'block', md: 'flex' }}}>
            <Grid item xs={12} md={12}>
              <Typography variant="body2">Card Number</Typography>
              <CardElementInput>
                <CardNumberElement options={{ style: cardInputStyle }} />
              </CardElementInput>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ pt: { xs: 0, md: 2 }, display: { xs: 'block', md: 'flex' } }}>
            <Grid item xs={12} md={7}>
              <Typography variant="body2">Expire Date</Typography>
              <CardElementInput>
                <CardExpiryElement options={{ style: cardInputStyle }} />
              </CardElementInput>
            </Grid>
            <Grid item xs={12} md={5}>
              <Typography variant="body2">Security Code (CVC)</Typography>
              <CardElementInput>
                <CardCvcElement options={{ style: cardInputStyle }} />
              </CardElementInput>
            </Grid>
          </Grid>
          <Button size="large" type="submit" disabled={!stripe || !elements} variant="contained" sx={{ my: 2 }}>
            Donate Now
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};