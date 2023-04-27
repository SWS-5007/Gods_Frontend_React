import { useEffect, useState } from 'react';
import { Container, Box, Button, CircularProgress } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFaq, getFaqs } from '../../../redux/actions/faq';
import CreateFAQ from './CreateFAQ';

export default function FAQ() {
  const columns = [
    {
      field: 'id',
      headerName: 'ID',
    },
    {
      field: 'question',
      headerName: 'Question',
      flex: 1,
    },
    {
      field: 'answer',
      headerName: 'Answer',
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

  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFaqs());
  }, [dispatch]);

  const handleUpdate = items => {
    setOpen(true);
    setData(items);
  };

  const handleDelete = id => {
    dispatch(deleteFaq(id));
    dispatch(getFaqs());
  };

  const { loading, faqs } = useSelector(state => state.faq);

  return (
    <Container>
      <CreateFAQ
        dispatch={dispatch}
        open={open}
        setOpen={setOpen}
        data={data}
        setData={setData}
      />
      <Box height={800}>
        {loading ? (
          <CircularProgress />
        ) : (
          <DataGrid
            rows={faqs}
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
