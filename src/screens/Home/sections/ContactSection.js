import {
  Box,
  styled,
  Card,
  CardContent,
  Typography,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';

export default function ContactSection() {
  const Contact = styled(Box)(() => ({
    backgroundImage: `url('/storage/image/contact.jpg')`,
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    boxSizing: 'border-box',
    width: '100vw',
    position: 'relative',
    '&:after': {
      content: '" "',
      display: 'block',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, .25)',
    },
    '> .MuiTypography-root, > .MuiBox-root': {
      position: 'relative',
      zIndex: 1,
    },

    '> .MuiBox-root': {
      justifyContent: 'center',
    },

    a: {
      textDecoration: 'none',
    },
  }));
  return (
    <Contact sx={{ px: { xs: 2, md: 12 }, py: { xs: 8, md: 12 }, color: 'primary.contrastText' }}>
      <Box
        sx={{
          width: 'lg',
          m: '0 auto',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ mt: 4, maxWidth: 400 }}>
          <Card sx={{ display: 'flex', alignItems: 'center', py: 4, px: 2 }}>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              <Typography
                variant='h5'
                sx={{ fontWeight: 900, lineHeight: 1.3 }}
              >
                Get in touch
              </Typography>
              <Typography
                variant='h3'
                sx={{ fontWeight: 900, lineHeight: 1.3 }}
              >
                with us
              </Typography>
              <Typography sx={{ mt: 2, mb: 3 }}>
              Want to learn more about our programs? We can’t 
              wait to hear from you! Feel free to contact us.
              </Typography>
              <Link to={`/contact-us`}>
                <Button
                  variant='outlined'
                  size='large'
                  sx={{ borderRadius: 12 }}
                >
                  Contact Us
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Contact>
  );
}
