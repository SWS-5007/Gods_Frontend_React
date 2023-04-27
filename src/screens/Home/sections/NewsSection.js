import {
  styled,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import SectionHeading from '../../../components/SectionHeading';

export default function NewsSection() {
  const News = styled(Box)(({ theme }) => ({
    a: {
      textDecoration: 'none',
      color: theme.palette.text.primary,
    },
  }));
  return (
    <News sx={{ px: { xs: 2, md: 12 }, py: { xs: 8, md: 12 } }}>
      <SectionHeading color='primary.main'>Latest News</SectionHeading>
      <Typography>
        Lorem ipsum dolor sit amet, cum at inani interes setnisl omnium
      </Typography>
      <Grid container maxWidth='lg' spacing={8} sx={{ pt: 3 }}>
        <Grid item md={8}>
          <Card sx={{ display: 'flex', alignItems: 'center', py: 4, px: 2 }}>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Link to={`/news/1`}>
                <Typography
                  variant='h4'
                  sx={{ fontWeight: 900, lineHeight: 1.3 }}
                >
                  Children Need to be Educated!!
                </Typography>
              </Link>
              <Typography sx={{ my: 2 }}>
                Looking cautiously round, to ascerta they were not overheard,
                the two hags cowered nearer to the fire, and chuckled
                heartily...
              </Typography>
              <Link to={`/news/1`}>
                <Button variant='contained' size='large'>
                  Read more
                </Button>
              </Link>
            </CardContent>
            <CardMedia
              component='img'
              alt='News'
              image='/storage/image/news.jpg'
            />
          </Card>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
            <Link to={`/news`}>
              <Button variant='outlined' size='large'>
                View more
              </Button>
            </Link>
          </Box>
        </Grid>
        <Grid item md={4}>
          <Box>
            <Link to={`/news/1`}>
              <Typography
                variant='h5'
                sx={{ fontWeight: 900, lineHeight: 1.3 }}
              >
                Children Need to be Educated!!
              </Typography>
            </Link>
            <Typography variant='body2' sx={{ my: 2 }}>
              Looking cautiously round, to ascerta they were not overheard, the
              two hags cowered nearer to the fire, and chuckled heartily...
            </Typography>
            <Link to={`/news/1`}>
              <Typography color='primary.main'>Read more</Typography>
            </Link>
          </Box>
          <Box
            sx={{ borderTop: 1, borderTopColor: 'border.main', mt: 3, pt: 3 }}
          >
            <Link to={`/news/1`}>
              <Typography
                variant='h5'
                sx={{ fontWeight: 900, lineHeight: 1.3 }}
              >
                Children Need to be Educated!!
              </Typography>
            </Link>
            <Typography variant='body2' sx={{ my: 2 }}>
              Looking cautiously round, to ascerta they were not overheard, the
              two hags cowered nearer to the fire, and chuckled heartily...
            </Typography>
            <Link to={`/news/1`}>
              <Typography color='primary.main'>Read more</Typography>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </News>
  );
}
