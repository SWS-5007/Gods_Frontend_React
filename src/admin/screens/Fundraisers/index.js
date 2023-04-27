import { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, Container, Divider, Typography, Box } from '@mui/material';
import CreateFundraiser from './CreateFundraiser';
import FundraiserSingle from './FundraiserSingle';

export default function Fundraiseds() {
  const [data, setData] = useState([]);

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
      field: 'amount_raised',
      headerName: 'Amount Raised',
    },
    {
      field: 'target',
      headerName: 'Target',
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

  const rows = [
    {
      id: 0,
      name: 'Eudcation for Children',
      slug: 'education-for-children',
      amount_raised: 5600,
      target: 7000,
    },
    {
      id: 1,
      name: 'Health Care for Children',
      slug: 'health-care-for-children',
      amount_raised: 8500,
      target: 9500,
    },
    {
      id: 2,
      name: 'Life Quality of Children',
      slug: 'life-quality-of-chlidren',
      amount_raised: 6200,
      target: 7500,
    },
  ];

  return (
    <Container sx={{ p: 2 }}>
      {data.slug ? (
        <FundraiserSingle data={data} setData={setData} />
      ) : (
        <Box>
          <CreateFundraiser />
          <Typography variant='h3'>No fundraisers created yet</Typography>
          <Divider />
          <Box height={800}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              components={{ Toolbar: GridToolbar }}
            />
          </Box>
        </Box>
      )}
    </Container>
  );
}
