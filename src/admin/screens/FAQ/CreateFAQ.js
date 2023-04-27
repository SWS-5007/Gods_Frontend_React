import { useState } from 'react';
import {
  Box,
  Button,
  Divider,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import { createOrUpdateFaq, getFaqs } from '../../../redux/actions/faq';

export default function CreateFAQ({ dispatch, open, setOpen, data, setData }) {
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
    question: '',
    answer: '',
  };

  const [formData, setFormData] = useState(initState);

  const handleChange = e => {
    if (Object.keys(data)?.length !== 0) {
      setData({ ...data, [e.target.name]: e.target.value });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleCancel = () => {
    setFormData(initState);
    setOpen(false);
  };

  const handleSubmit = () => {
    dispatch(
      createOrUpdateFaq(
        Object.keys(data)?.length !== 0 ? data : formData,
        Object.keys(data)?.length !== 0 ? 'PUT' : 'ADD'
      )
    );
    dispatch(getFaqs());
    setOpen(false);
  };

  const { question, answer } = formData;

  return (
    <>
      <Box sx={{ mb: 5 }}>
        <Button
          variant='contained'
          size='large'
          sx={{ mt: 5 }}
          onClick={() => {
            setOpen(true);
            setData({});
          }}
        >
          Create FAQ
        </Button>
      </Box>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Typography variant='h6' component='h2'>
            {Object.keys(data)?.length !== 0 ? 'Update' : 'Create'} FAQ
          </Typography>
          <Divider />
          <Typography fontWeight={700} sx={{ my: 2 }}>
            Question
          </Typography>
          <TextField
            label='question'
            name='question'
            value={Object.keys(data)?.length !== 0 ? data.question : question}
            fullWidth
            multiline
            rows={5}
            onChange={handleChange}
          />
          <Typography fontWeight={700} sx={{ my: 2 }}>
            Answer
          </Typography>
          <TextField
            label='answer'
            name='answer'
            value={Object.keys(data)?.length !== 0 ? data.answer : answer}
            fullWidth
            multiline
            rows={5}
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
              {Object.keys(data)?.length !== 0 ? 'Update' : 'Create'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
