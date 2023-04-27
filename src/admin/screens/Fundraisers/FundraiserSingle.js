import { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { ArrowCircleLeft } from '@mui/icons-material';
import Dropzone from '../Components/Dropzone';
import { currencies } from '../../../data/currencies';
import DonorList from '../../../screens/Donate/DonorList';

export default function FundaiserSingle({ data, setData }) {
  const { name } = data;

  const initState = {
    target: '',
    start_date: '',
    end_date: '',
    status: '',
    organization_id: '',
    currency: '',
    isFeaturedCause: false,
  };

  const [formData, setFormData] = useState(initState);
  const [files, setFiles] = useState([]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onDrop = useCallback(
    acceptedFiles => {
      setFiles([...files, ...acceptedFiles]);
    },
    [files]
  );

  const {
    target,
    start_date,
    end_date,
    status,
    currency,
    organization_id,
    isFeaturedCause,
  } = formData;

  return (
    <>
      <IconButton variant='outlined' onClick={() => setData([])}>
        <ArrowCircleLeft sx={{ fontSize: '2em' }} />
      </IconButton>
      <Typography variant='h5' textAlign={'center'}>
        Details of Fundraiser: {name}
      </Typography>
      <Divider sx={{ my: 5 }} />
      <Grid container spacing={3} sx={{ placeItems: 'center' }}>
        <Grid item xs={12} sm={6}>
          <Typography variant='h6' sx={{ mb: 2 }}>
            Status
          </Typography>
          <FormControl fullWidth>
            <InputLabel id='status-select-label'>
              Select Fundraiser Status
            </InputLabel>
            <Select
              labelId='status-select-label'
              id='status-select'
              value={status}
              label='Select Organisation'
              onChange={handleChange}
              sx={{ bgcolor: 'white' }}
            >
              <MenuItem value={1}>Pending</MenuItem>
              <MenuItem value={2}>In Progress</MenuItem>
              <MenuItem value={3}>Done</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='h6' sx={{ mb: 2 }}>
            Add/Remove Feature Cause
          </Typography>
          <FormControlLabel
            control={<Checkbox />}
            label='Featured Cause'
            name='isFeaturedCause'
            value={isFeaturedCause}
          />
        </Grid>
      </Grid>
      <Divider sx={{ my: 3 }} />
      <DonorList />
      <Divider sx={{ my: 3 }} />
      <Paper sx={{ p: 3 }}>
        <Typography variant='h6' sx={{ mb: 2 }}>
          Fundraiser's cover photo
        </Typography>
        <Dropzone
          onDrop={onDrop}
          files={files}
          setFiles={filesValues => setFiles(filesValues)}
        />
        <Button variant='contained'>Upload</Button>
      </Paper>
      <Divider sx={{ my: 3 }} />
      <Typography variant='h6' sx={{ mb: 2 }}>
        Select Fundraiser's organisation
      </Typography>
      <FormControl fullWidth>
        <InputLabel id='organisation-select-label'>
          Select Organisation
        </InputLabel>
        <Select
          labelId='organisation-select-label'
          id='organisation-select'
          value={organization_id}
          label='Select Organisation'
          onChange={handleChange}
          sx={{ bgcolor: 'white' }}
        >
          <MenuItem value={1}>Test Organisation 1</MenuItem>
          <MenuItem value={2}>Test Organisation 2</MenuItem>
          <MenuItem value={3}>Test Organisation 3</MenuItem>
        </Select>
      </FormControl>
      <Divider sx={{ my: 5 }} />
      <Typography variant='h6' sx={{ mb: 3 }}>
        Target for donations
      </Typography>
      <Box sx={{ display: 'flex' }}>
        <TextField
          label='Set Target'
          name='target'
          type='number'
          value={target}
          fullWidth
          sx={{ bgcolor: 'white' }}
        />
        <FormControl fullWidth>
          <InputLabel id='currency-select-label'>Select Currency</InputLabel>
          <Select
            labelId='currency-select-label'
            id='currency-select'
            value={currency}
            label='Select Currency'
            onChange={handleChange}
            sx={{ bgcolor: 'white' }}
          >
            {currencies.map((currency, i) => (
              <MenuItem value={currency.code} key={i}>
                {currency.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Divider sx={{ my: 5 }} />
      <Typography variant='h6' sx={{ mb: 3 }}>
        Fundraiser dates
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h6'>Start Date</Typography>
        <Typography variant='h6'>End Date</Typography>
      </Box>
      <Box sx={{ display: 'flex', mb: 3 }}>
        <TextField
          name='start_date'
          type='date'
          value={start_date}
          fullWidth
          sx={{ bgcolor: 'white' }}
        />
        <TextField
          name='target'
          type='date'
          value={end_date}
          fullWidth
          sx={{ bgcolor: 'white' }}
        />
      </Box>
      <Divider sx={{ my: 3 }} />
      <Box sx={{ textAlign: 'right' }}>
        <Button variant='outlined'>Cancel</Button>
        <Button variant='contained' sx={{ ml: 3 }}>
          Update
        </Button>
      </Box>
    </>
  );
}
