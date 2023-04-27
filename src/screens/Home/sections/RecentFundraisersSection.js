import { Box, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import DonateMain from '../../Donate/DonateMain';

export default function RecentFundraisersSection() {
  return (
    <Container>
      <Typography variant='h4' textAlign={'center'} sx={{ mb: 2 }}>
        Nonprofit organisations for whom we are raising funds
      </Typography>
      <Typography variant='h6' textAlign={'center'}>
        Donating even a small amount of money to a charitable cause can have a
        significant impact on the lives of those in need and bring hope and
        happiness to their day
      </Typography>
      <DonateMain />
      <Box sx={{ textAlign: 'center', mb: 5 }}>
        <Button
          variant='outlined'
          size='large'
          component={Link}
          to='/non-profits'
        >
          View All Nonprofits
        </Button>
      </Box>
    </Container>
  );
}
