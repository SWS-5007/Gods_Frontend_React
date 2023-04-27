import { styled, Box, darken, Typography } from '@mui/material';
import {
  VolunteerActivism,
  FavoriteBorder,
  Handshake,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function FeaturesSection() {
  const FeatureItem = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    '&:hover': {
      backgroundColor: darken(theme.palette.primary.main, 0.05),
    },
  }));
  const Features = styled(Box)(() => ({
    width: '100%',
    '> a': {
      flexGrow: 1,
      textDecoration: 'none',
    },
  }));
  return (
    <Features sx={{ display: { xs: 'block', md: 'flex' } }}>
      <Link to={'/donate'}>
        <FeatureItem sx={{ py: 6, px: 3 }}>
          <VolunteerActivism sx={{ mb: 3, fontSize: 42 }} />
          <Typography sx={{ textTransform: 'uppercase' }}>
            Help us by donating
          </Typography>
          <Typography variant='h4' sx={{ fontWeight: 900 }}>
            Donate Now
          </Typography>
        </FeatureItem>
      </Link>
      <Link to={'/about'}>
        <FeatureItem sx={{ py: 6, px: 3 }}>
          <FavoriteBorder sx={{ mb: 3, fontSize: 42 }} />
          <Typography sx={{ textTransform: 'uppercase' }}>
            Wanna Know more About Us?
          </Typography>
          <Typography variant='h4' sx={{ fontWeight: 900 }}>
            About Us
          </Typography>
        </FeatureItem>
      </Link>
      <Link to={'/volunteer'}>
        <FeatureItem sx={{ py: 6, px: 3 }}>
          <Handshake sx={{ mb: 3, fontSize: 42 }} />
          <Typography sx={{ textTransform: 'uppercase' }}>
            Join with us
          </Typography>
          <Typography variant='h4' sx={{ fontWeight: 900 }}>
            Be a Volunteer
          </Typography>
        </FeatureItem>
      </Link>
    </Features>
  );
}
