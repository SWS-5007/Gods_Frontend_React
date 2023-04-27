import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { aboutUsItems, getInTouchItems } from '../data/footerItems';
import {
  FacebookRounded,
  Twitter,
  Instagram,
  LinkedIn,
} from '@mui/icons-material';

export default function Footer() {
  const style = {
    container: {
      color: 'white',
      bgcolor: 'body.main',
    },
    link: {
      color: 'text.tertiary',
      textDecoration: 'none',
    },
  };

  const navItems = [
    {
      title: 'About Us',
      items: aboutUsItems,
    },
    {
      title: 'Get In Touch',
      items: getInTouchItems,
    },
  ];
  return (
    <Box sx={style.container}>
      <Grid container spacing={5} sx={{ width: '90%', m: 'auto' }}>
        <Grid item md={3} sx={{ textAlign: 'center', px: { xs: '12px!important', md: undefined }}}>
          <img width={100} src='/Logo.png' alt='Logo' />
          <Typography variant='h4' sx={{ pt: 5 }}>
            THE GOD'S HAND
          </Typography>
        </Grid>
        {navItems.map((navItem, index) => (
          <Grid item md={3} key={index} sx={{ px: { xs: '12px!important', md: undefined }}}>
            <Typography variant='h5' sx={{ px: 1 }}>{navItem.title}</Typography>
            {navItem.items.map((item, i) => {
              return (
                <Button
                  key={i}
                  color='tertiary'
                  sx={{ justifyContent: 'flex-start' }}
                  component={Link}
                  to={item.link}
                  fullWidth
                >
                  {item.name}
                </Button>
              );
            })}
          </Grid>
        ))}
        <Grid item md={3} sx={{ px: { xs: '12px!important', md: undefined }}}>
          <Typography variant='h5' sx={{ px: 1 }}>{'Support Us'}</Typography>
          <Typography sx={{ my: 4, px: 1 }}>
            Your donation means more volunteers helping our Bay Area schools,
            parks, and nonprofits
          </Typography>
          <Button component={Link} to='/donate' variant='contained' sx={{ mx: { xs: 1, md: undefined }}}>
            Donate
          </Button>
        </Grid>
      </Grid>
      <Divider sx={{ bgcolor: 'gray', my: 5 }} />
      <Box sx={{ textAlign: 'center', pb: 5 }}>
        <Box sx={{ my: 3 }}>
          <IconButton>
            <FacebookRounded sx={{ color: 'text.tertiary' }} />
          </IconButton>
          <IconButton>
            <Twitter sx={{ color: 'text.tertiary' }} />
          </IconButton>
          <IconButton>
            <Instagram sx={{ color: 'text.tertiary' }} />
          </IconButton>
          <IconButton>
            <LinkedIn sx={{ color: 'text.tertiary' }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
