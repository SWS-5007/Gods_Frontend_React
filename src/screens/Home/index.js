import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import Carousel from '../../components/Carousel';
import FeaturesSection from './sections/FeaturesSection';
import ReviewsSection from './sections/ReviewsSection';
import NewsSection from './sections/NewsSection';
import ContactSection from './sections/ContactSection';
import FeaturedCauseSection from './sections/FeaturedCauseSection';
import RecentFundraisersSection from './sections/RecentFundraisersSection';
import { Divider } from '@mui/material';

const SlideBackground = styled(Box)(({ theme }) => ({
  width: '100vw',
  height: '50vh',
  position: 'relative',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  [theme.breakpoints.up('md')]: {
    height: '80vh',
  }
}))
const SlideBody = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',

  'a': {
    textDecoration: 'none',
  },

  [theme.breakpoints.down('md')]: {
    '.MuiTypography-h2': {
      fontSize: 36,
    }
  },
}))

export default function Home() {
  return (
    <>
      <Carousel
        items={items}
        renderItem={item => {
          switch (item.align) {
            case 'left':
              return (
                <SlideBackground
                  sx={{ backgroundImage: `url(${item.background})` }}
                >
                  <SlideBody sx={{ p: { xs: 2, md: 12 }, color: 'primary.contrastText', justifyContent: 'center' }}>
                    <Typography
                      variant='h2'
                      component='div'
                      sx={{ fontWeight: 900 }}
                    >
                      <div dangerouslySetInnerHTML={{ __html: item.title }} />
                    </Typography>
                    <Typography variant='h6' component='div' sx={{ my: 3 }}>
                      <div
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      />
                    </Typography>
                    {item.action && item.buttonText ? (
                      <Link to={item.action}>
                        <Button
                          variant='outlined'
                          color='invert'
                          size='large'
                          sx={{
                            borderRadius: 12,
                            borderWidth: 2,
                            ':hover': { borderWidth: 2 },
                          }}
                        >
                          {item.buttonText}
                        </Button>
                      </Link>
                    ) : null}
                  </SlideBody>
                </SlideBackground>
              );
            case 'center':
              return (
                <SlideBackground
                  sx={{ backgroundImage: `url(${item.background})` }}
                >
                  <SlideBody sx={{ p: { xs: 2, md: 12 }, color: 'primary.contrastText', alignItems: 'center', textAlign: 'center', justifyContent: 'center' }}>
                    <Typography
                      variant='h2'
                      component='div'
                      sx={{ fontWeight: 900 }}
                    >
                      <div dangerouslySetInnerHTML={{ __html: item.title }} />
                    </Typography>
                    <Typography variant='h6' component='div' sx={{ my: 3 }}>
                      <div
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      />
                    </Typography>
                    {item.action && item.buttonText ? (
                      <Link to={item.action}>
                        <Button
                          variant='outlined'
                          color='invert'
                          size='large'
                          sx={{
                            borderRadius: 12,
                            borderWidth: 2,
                            ':hover': { borderWidth: 2 },
                          }}
                        >
                          {item.buttonText}
                        </Button>
                      </Link>
                    ) : null}
                  </SlideBody>
                </SlideBackground>
              );
            default:
              return null;
          }
        }}
      />
      <FeaturesSection />
      <FeaturedCauseSection />
      <Divider sx={{ mb: 5 }} />
      <RecentFundraisersSection />
      <ReviewsSection />
      <NewsSection />
      <ContactSection />
    </>
  );
}

const items = [
  {
    title: 'We <br>can spread love <br>by donating',
    description: 'Be part of the world by making a donation',
    background: '/storage/image/slider1.jpg',
    align: 'left',
    action: '/donate',
    buttonText: 'Donate',
  },
  {
    title: 'Ensure children <br> education over the world',
    description: 'Be part of the world by making a donation',
    background: '/storage/image/slider2.jpg',
    align: 'center',
    action: '/donate',
    buttonText: 'Donate',
  },
];
