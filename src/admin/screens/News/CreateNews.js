import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { ArrowCircleLeft } from '@mui/icons-material';
import { createOrUpdateNews, getAllNews } from '../../../redux/actions/news';

export default function CreateNews({ news, setNews }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initState = {
    title: '',
    author: '',
    content: '',
  };

  const [formData, setFormData] = useState(initState);
  const [data, setData] = useState('');

  const { title, author, content } = formData;

  const handleChange = e => {
    if (Object.keys(news).length !== 0) {
      setNews({ ...news, [e.target.name]: e.target.value });
      if (e.target.files) {
        const form = new FormData();
        form.append('id', news.id);
        form.append('title', news.title);
        form.append('author', news.author);
        form.append('content', news.content);
        form.append('cover', e.target.files[0]);
        setData(form);
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      if (e.target.files) {
        const form = new FormData();
        form.append('title', title);
        form.append('author', author);
        form.append('content', content);
        form.append('cover', e.target.files[0]);
        setData(form);
      }
    }
  };

  const handleSubmit = () => {
    dispatch(
      createOrUpdateNews(
        data ? data : news,
        Object.keys(news).length !== 0 ? 'UPDATE' : 'ADD'
      )
    );
    dispatch(getAllNews());
    handleCancel();
  };

  const handleCancel = () => {
    setFormData(initState);
    setNews({});
    navigate('/admin/news');
  };

  const handleBack = () => {
    setFormData(initState);
    setNews({});
    navigate('/admin/news');
  };

  return (
    <Container>
      <IconButton variant='outlined' sx={{ mb: 3 }} onClick={handleBack}>
        <ArrowCircleLeft sx={{ fontSize: '2em' }} />
      </IconButton>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography variant='h6' sx={{ mb: 2 }}>
            Enter News Headline Here
          </Typography>
          <TextField
            label='Title'
            name='title'
            value={Object.keys(news).length !== 0 ? news.title : title}
            fullWidth
            sx={{ bgcolor: 'white' }}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='h6' sx={{ mb: 2 }}>
            Name of the author
          </Typography>
          <TextField
            label='Author'
            name='author'
            value={Object.keys(news).length !== 0 ? news.author : author}
            fullWidth
            sx={{ bgcolor: 'white' }}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Divider sx={{ my: 5 }} />
      <Typography variant='h6' sx={{ mb: 2 }}>
        Content for the news goes here:
      </Typography>
      <TextField
        label='Content'
        name='content'
        value={Object.keys(news).length !== 0 ? news.content : content}
        multiline
        rows={10}
        fullWidth
        sx={{ bgcolor: 'white' }}
        onChange={handleChange}
      />
      <Divider sx={{ my: 5 }} />
      <Typography variant='h6' sx={{ my: 2 }}>
        {Object.keys(news).length !== 0 ? 'Update' : 'Upload'} cover photo for
        the news
      </Typography>
      <TextField
        name='cover'
        type='file'
        fullWidth
        sx={{ bgcolor: 'white' }}
        onChange={handleChange}
      />
      <Divider sx={{ my: 3 }} />
      <Box sx={{ textAlign: 'right' }}>
        <Button variant='outlined' onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant='contained' sx={{ ml: 3 }} onClick={handleSubmit}>
          {Object.keys(news).length !== 0 ? 'Update' : 'Create'}
        </Button>
      </Box>
    </Container>
  );
}
