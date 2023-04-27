import { Box, Button, Chip, Container, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import DonateProgress from '../../Donate/DonateProgress';

export default function FeaturedCauseSection() {
  return (
    <Container sx={{ my: 5 }}>
      <Typography variant='h4' textAlign={'center'} sx={{ mb: 5 }}>
        We are non-profit charity & NGO organization. Provide help to children
      </Typography>
      <Grid container spacing={3} sx={{ placeItems: 'center' }}>
        <Grid item xs={12} sm={8}>
          <ReactPlayer
            width='100%'
            height=''
            playing={true}
            muted={true}
            controls={true}
            url='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Chip label='Featured Cause' />
          <Typography variant='h5' sx={{ my: 3 }}>
            Giving Children Education
          </Typography>
          <DonateProgress donated={50} target={100} />
          <Box sx={{ mt: 5 }}>
            <Button
              variant='contained'
              size='large'
              component={Link}
              to='/checkout'
            >
              Donate Now
            </Button>
            <Button
              variant='outlined'
              size='large'
              sx={{ ml: 3 }}
              component={Link}
              to='/donate/giving-children-education'
            >
              Read More
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
