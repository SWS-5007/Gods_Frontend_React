import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Divider,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import {
  createOrganization,
  getOrganizations,
} from '../../../redux/actions/organization';

export default function CreateOrganisation({ dispatch }) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const initState = {
    name: '',
  };

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initState);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setFormData(initState);
    setOpen(false);
  };

  const handleSubmit = () => {
    dispatch(createOrganization(formData));
    dispatch(getOrganizations());
    setOpen(false);
  };

  const { name } = formData;

  return (
    <>
      <Box sx={{ mb: 5 }}>
        <Button
          variant='contained'
          size='large'
          sx={{ mt: 5 }}
          onClick={() => setOpen(true)}
        >
          Create organisation
        </Button>
      </Box>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Typography variant='h6' component='h2'>
            Create New Organisation
          </Typography>
          <Alert severity='info' sx={{ my: 2 }}>
            Additional organistaion data can be added once the organisation is
            created
          </Alert>
          <Divider />
          <Typography fontWeight={700} sx={{ my: 2 }}>
            Name of Organisation
          </Typography>
          <TextField
            label='name'
            name='name'
            value={name}
            fullWidth
            onChange={handleChange}
          />
          <Box sx={{ textAlign: 'right', mt: 3 }}>
            <Button variant='outlined' onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              variant='contained'
              sx={{ ml: 2 }}
              size='large'
              onClick={handleSubmit}
            >
              Create
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
