import {
  Box,
  Grid,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

export default function BillingInformation({ data, setData }) {
  const { firstname, lastname, email, phone, address, country, state, city, isAnonymous } =
    data;

  const handleChange = (event) => {
    const e = {
      target : {
        name : "isAnonymous",
        value: event.target.checked ? "1" : "0"
      }
    }
    setData(e);
  };
  
  return (
    <Box sx={{ mb: 5 }}>
      <Typography variant='h5' sx={{ mb: 5 }}>
        Billing Information
      </Typography>
      <Grid container spacing={3} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label='First Name'
            name='firstname'
            value={firstname}
            fullWidth
            onChange={setData}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label='Last Name'
            name='lastname'
            value={lastname}
            fullWidth
            onChange={setData}
            required
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label='Email'
            name='email'
            type={'email'}
            value={email}
            fullWidth
            onChange={setData}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label='Phone'
            name='phone'
            value={phone}
            fullWidth
            onChange={setData}
            required
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label='Address'
            name='address'
            value={address}
            fullWidth
            onChange={setData}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label='Country'
            name='country'
            value={country}
            fullWidth
            onChange={setData}
            required
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label='State'
            name='state'
            value={state}
            fullWidth
            onChange={setData}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label='City'
            name='city'
            value={city}
            fullWidth
            onChange={setData}
            required
          />
        </Grid>
      </Grid>
      <FormControlLabel
        control={<Checkbox 
          name='isAnonymous'
          onChange={handleChange}
        />}
        label='I would like to donate anonymously'
      />
    </Box>
  );
}
