import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import { navItems } from '../data/headerItems';
import Navigation from '../components/Navigation';
import MobileNavigation from '../components/MobileNavigation';

const Cover = styled(Box, {
  shouldForwardProp: prop => prop !== 'bgImage',
})(({ title, bgImage }) => ({
  position: 'relative',
  backgroundImage: `url(${bgImage || '/cover.jpeg'})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  height: title ? '500px' : '225px',
  textAlign: 'center',
  '&:after': {
    content: '" "',
    display: 'block',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, .5)',
  },

  '> .MuiTypography-root, > .MuiGrid-root, > .MuiContainer-root': {
    position: 'relative',
    zIndex: 1,

    '&.navigation__container': {
      position: 'static',

      '> .MuiTypography-root, > .MuiGrid-root, > .MuiContainer-root, > .MuiButtonBase-root':
        {
          position: 'relative',
          zIndex: 1,
        },
    },
  },
}));
const style = {
  navContainer: {
    placeItems: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    pt: 5,
    width: '90%',
    m: 'auto',
  },
  overlay: {
    position: 'absolute',
    content: "''",
    left: 0,
    top: 0,
    width: 1,
    height: 1,
    bgcolor: '#00000030',
  },
  button: {
    color: 'white',
    '&:hover': {
      color: 'text.secondary',
    },
  },
};

export default function Header({
  title = "The GOD's HAND",
  subtitle = '',
  isLandingPage,
  bgImage,
}) {
  return isLandingPage ? (
    <Box sx={{ backgroundColor: 'body.main' }}>
      <Grid
        container
        spacing={3}
        sx={{ ...style.navContainer, pt: 0 }}
        className='navigation__container'
      >
        <Grid
          item
          xs={1}
          sx={{
            pl: { xs: '0!important', md: undefined },
            minWidth: { xs: 52, md: undefined },
            maxWidth: { xs: 'none', md: undefined },
          }}
        >
          <Link to='/'>
            <img
              width={100}
              src={'/Logo.png'}
              alt='Logo'
              style={{ maxWidth: '100%' }}
            />
          </Link>
        </Grid>
        <MobileNavigation menus={navItems} />
        <Grid
          sx={{
            display: { xs: 'block', md: 'flex' },
            pl: { xs: '0!important', md: undefined },
            alignItems: 'center',
          }}
          item
        >
          <Box sx={{ display: { xs: 'block', md: 'flex' }, gap: 4 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'primary.contrastText',
              }}
            >
              <PhoneIcon sx={{ mr: 1, fontSize: 30 }} />
              <Typography variant='h6' className='tel'>
                +91 7820990746
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'primary.contrastText',
                ml: {
                  xs: 0,
                  md: 2,
                },
              }}
            >
              <EmailIcon sx={{ mr: 1, fontSize: 30 }} />
              <Typography variant='h6' className='email'>
                info@thegodshandonation.org
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: 3,
              mt: 1,
              ml: { xs: 0, md: 4 },
              mb: { xs: 1, md: 0 },
            }}
          >
            <Link to='https://facebook.com'>
              <FacebookIcon sx={{ color: 'white' }} />
            </Link>
            <Link to='https://facebook.com'>
              <InstagramIcon sx={{ color: 'white' }} />
            </Link>
            <Link to='https://facebook.com'>
              <TwitterIcon sx={{ color: 'white' }} />
            </Link>
            <Link to='https://facebook.com'>
              <LinkedInIcon sx={{ color: 'white' }} />
            </Link>
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={3}
        sx={{ ...style.navContainer, pt: 0, justifyContent: 'flex-start' }}
        className='navigation__container'
      >
        <Navigation menus={navItems} buttonStyle={{ color: 'primary.main' }} />
      </Grid>
    </Box>
  ) : (
    <Cover title={title} bgImage={bgImage}>
      <Grid
        container
        spacing={3}
        sx={style.navContainer}
        className='navigation__container'
      >
        <Grid
          item
          xs={1}
          sx={{
            pl: { xs: '0!important', md: undefined },
            pt: { xs: '0!important', md: undefined },
            minWidth: { xs: 52, md: undefined },
            maxWidth: { xs: 'none', md: undefined },
          }}
        >
          <Link to='/'>
            <img
              width={100}
              src={'/Logo.png'}
              alt='Logo'
              style={{ maxWidth: '100%' }}
            />
          </Link>
        </Grid>
        <Navigation
          menus={navItems}
          buttonStyle={{ color: 'primary.contrastText' }}
        />
        <MobileNavigation menus={navItems} />
      </Grid>
      {title ? (
        <Typography
          variant='h2'
          color={'white'}
          fontWeight={900}
          paddingTop={10}
        >
          {title}
        </Typography>
      ) : null}
      {subtitle ? (
        <Typography
          variant='h5'
          color={'white'}
          fontWeight={900}
          sx={{ mt: 2 }}
        >
          {subtitle}
        </Typography>
      ) : null}
    </Cover>
  );
}
