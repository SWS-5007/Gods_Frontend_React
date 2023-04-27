import { useEffect, useState } from 'react';
import { Container, Box, Button, CircularProgress } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteNews, getAllNews, getNews } from '../../../redux/actions/news';
import CreateNews from './CreateNews';

export default function News() {
  const columns = [
    {
      field: 'id',
      headerName: 'ID',
    },
    {
      field: 'author',
      headerName: 'Author',
      flex: 1,
    },
    {
      field: 'title',
      headerName: 'Title',
      flex: 1,
    },
    {
      field: 'created_at',
      headerName: 'Created On',
      flex: 1,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,

      renderCell: params => {
        return (
          <Box>
            <Button
              variant='contained'
              sx={{ mr: 2 }}
              onClick={() => handleUpdate(params.row)}
            >
              Update
            </Button>
            <Button
              variant='contained'
              color='error'
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </Button>
          </Box>
        );
      },
    },
  ];

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [newsData, setNewsData] = useState({});

  useEffect(() => {
    dispatch(getAllNews());
  }, [dispatch]);

  const handleUpdate = data => {
    setNewsData(data);
    navigate('/admin/news/udpate');
  };

  const handleDelete = id => {
    dispatch(deleteNews(id));
    dispatch(getAllNews());
  };

  const { loading, newsList } = useSelector(state => state.news);

  return id ? (
    <CreateNews news={newsData} setNews={setNewsData} />
  ) : (
    <Container>
      <Button
        variant='contained'
        sx={{ my: 5 }}
        onClick={() => navigate('/admin/news/create')}
      >
        Create News
      </Button>
      <Box height={800}>
        {loading ? (
          <CircularProgress />
        ) : (
          <DataGrid
            rows={newsList}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            components={{ Toolbar: GridToolbar }}
          />
        )}
      </Box>
    </Container>
  );
}
