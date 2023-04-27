import { useMemo, useState } from 'react';
import {
  Container,
  Button,
  TextField,
  Typography,
  styled,
  Grid,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import BillingInformation from './BillingInformation';
import PaymentMethod from './PaymentMethod';
import { currencies } from '../../data/currencies';
import PaymentPaypal from '../Payment/Paypal';
import PaymentStripe from '../Payment/Stripe';
export default function Checkout() {
  const prices = [100, 200, 500, 1000];
  const { id } = useParams();

  const RoundedButton = styled(Button)(() => ({
    width: 50,
    height: 62,
    borderRadius: 60,
  }));

  const initState = {
    currency: 'usd',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    address: '',
    country: '',
    state: '',
    city: '',
    payment_method: 'stripe',
    cardNumber: '',
    cardHolderName: '',
    expiry: '',
    cvc: '',
    isAnonymous: "0"
  };

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [formData, setFormData] = useState(initState);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { currency } = formData;
  const { currencySymbol, currencyRate} = useMemo(() => {
    return  { currencySymbol : currencies.find(({ code }) => code === currency)?.symbol, 
              currencyRate : currencies.find(({ code }) => code === currency)?.rate
            }
  }, [currency])
  // const currencyRate = useMemo(() => {
  //   return currencies.find(({ code }) => code === currency)?.rate
  // }, [currency])
  const renderButton = () => {
    switch(formData?.payment_method) {
      case 'stripe':
        return <PaymentStripe amount={selectedPrice} formData={formData} orgID={id} />
      case 'paypal':
        return <PaymentPaypal amount={selectedPrice} formData={formData} orgID={id} />
      default:
        return (
          <Box sx={{ textAlign: 'center' }}>
            <Button variant='contained' sx={{ mb: 5 }}>
              Donate Now
            </Button>
          </Box>
        )
    }
  }
  return (
    <Container>
      <Grid container sx={{ my: 5 }}>
        <Grid item xs={9}>
          <Typography variant='h5'>
            How much would you like to donate?
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel id='currency-select'>Choose Currency</InputLabel>
            <Select
              labelId='currency-select'
              name='currency'
              value={currency}
              label='Choose Currency'
              onChange={handleChange}
            >
              {currencies.map((currency, i) => (
                <MenuItem value={currency.code} key={i}>
                  {currency.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{ placeItems: 'center', justifyContent: 'space-between', mb: 5 }}
      >
        <Grid
          item
          xs={5}
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          {prices.map((price, i) => (
            <RoundedButton
              key={i}
              id={i}
              variant={selectedIndex === i + 1 ? 'contained' : 'outlined'}
              onClick={e => {setSelectedPrice(prices[parseInt(e.target.id)]); setSelectedIndex(parseInt(e.target.id) + 1)}}
            >
              {currencySymbol}{price * currencyRate}
            </RoundedButton>
          ))}
        </Grid>
        <Grid item xs={5}>
          <TextField
            label='Other Amount'
            name='other'
            type={'number'}
            value={selectedPrice}
            InputProps={{
              inputProps: { min: 0 }
            }}
            onChange={e => { setSelectedPrice(e?.target?.value); setSelectedIndex(0);}}
            fullWidth
          />
        </Grid>
      </Grid>
      <Divider sx={{ mb: 5 }} />
      <BillingInformation data={formData} setData={handleChange} />
      <Divider sx={{ mb: 5 }} />
      <PaymentMethod data={formData} setData={handleChange} />
      {
        renderButton()
      }
    </Container>
  );
}
