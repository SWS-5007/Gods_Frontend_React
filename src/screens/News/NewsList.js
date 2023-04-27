import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import InnerPage from '../../components/InnerPage';
import DisplayDate from '../../components/DisplayDate';
import { getNews } from '../../api/endpoints/news';
import useToast from '../../hooks/useToast';
import axios from '../../api/axios';

export default function NewsList() {
  const [news, setNews] = useState([]);
  const [pages, setPages] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast({
    config: {
      loading: 'Fetching news...',
      error: 'Failed on fetching news',
      success: 'News loaded',
    },
    options: { id: 'news' },
  });
  const currentPage = useMemo(() => {
    // set current page from the search param,
    // otherwise fallback to page: 1
    return Number(searchParams.get('page') ?? 1);
  }, [searchParams]);
  useEffect(() => {
    let loaded = false;
    const getNewsList = async () => {
      const promise = axios(
        getNews({
          page: currentPage,
        })
      );
      toast(promise);
      const res = await promise;
      const { data } = res;
      if (res.status === 200 || res.status === 201) {
        try {
          setNews(data?.insight?.data || []);
          setPages(Math.ceil(data?.insight?.total / data?.insight?.per_page));
        } catch {}
      } else {
        // TODO: Handle news loading error
      }
    };

    if (news.length === 0 && !loaded) {
      getNewsList();
    }
    return () => {
      loaded = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <InnerPage>
      {news.map(({ id, cover, title, created_at, content }) => (
        <Card
          sx={{
            display: { xs: 'block', md: 'flex' },
            mb: 8,
            boxShadow: '2px 2px 6px rgba(0, 0, 0, .08)',
          }}
          key={id}
        >
          <CardMedia
            component='img'
            sx={{ width: { xs: '100%', md: 240 }, height: 240 }}
            image={process.env.REACT_APP_BASE_API_URL + '/' + cover}
            alt={title}
          />
          <CardContent sx={{ py: 2, px: 4 }}>
            <Box sx={{ mb: 4 }}>
              <Typography
                sx={{ fontSize: 14 }}
                color='text.secondary'
                gutterBottom
              >
                <DisplayDate date={created_at} />
              </Typography>
              <Typography
                variant='h5'
                color='body.main'
                sx={{ fontWeight: 900, mb: 1 }}
              >
                {title}
              </Typography>
              <Typography component='div' color='body.main' variant='body2'>
                <div dangerouslySetInnerHTML={{ __html: content }} />
              </Typography>
            </Box>
            <Link to={`/news/${id}`} style={{ textDecoration: 'none' }}>
              <Button variant='contained' size='large'>
                Read more
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
      {pages > 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <ButtonGroup variant='outlined' aria-label='outlined button group'>
            {Array.from(Array(pages).keys()).map(page => (
              <Button
                disabled={currentPage === page + 1}
                onClick={() => setSearchParams({ page: page + 1 })}
                key={page}
              >
                {page + 1}
              </Button>
            ))}
          </ButtonGroup>
        </Box>
      ) : null}
    </InnerPage>
  );
}
