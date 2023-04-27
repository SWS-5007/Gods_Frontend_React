import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {
  Button,
  Container,
  Divider,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import CreateOrganisation from './CreateOrganisation';
import OrganisationSingle from './OrganisationSingle';
import { getOrganizations } from '../../../redux/actions/organization';

export default function Organisations() {
  const [data, setData] = useState([]);

  const dispatch = useDispatch();

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
    },
    {
      field: 'details',
      headerName: 'Details',
      renderCell: params => {
        return (
          <Button variant='contained' onClick={() => setData(params.row)}>
            Edit
          </Button>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(getOrganizations());
  }, [dispatch]);

  const { loading, organizationsList } = useSelector(
    state => state.organizations
  );

  return (
    <Container sx={{ p: 2 }}>
      {data.length !== 0 ? (
        <OrganisationSingle data={data} setData={setData} />
      ) : (
        <Box>
          <CreateOrganisation dispatch={dispatch} />
          <Divider />
          <Box height={800}>
            {loading ? (
              <CircularProgress />
            ) : organizationsList.length !== 0 ? (
              <DataGrid
                rows={organizationsList}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                components={{ Toolbar: GridToolbar }}
              />
            ) : (
              <Typography variant='h3'>No organisations created yet</Typography>
            )}
          </Box>
        </Box>
      )}
    </Container>
  );
}
