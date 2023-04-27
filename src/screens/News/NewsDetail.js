import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'mui-image';
import InnerPage from '../../components/InnerPage';
import SubHeader from '../../components/SubHeader';
import { styled } from '@mui/system';
import { useParams } from 'react-router-dom';
import useToast from '../../hooks/useToast';
import axios from '../../api/axios';
import { getNewsDetail } from '../../api/endpoints/news';
import DisplayDate from '../../components/DisplayDate';

const BlogContent = styled(Box)(({ theme }) => ({
  'ul, ol': {
    margin: 0,
    marginLeft: '8px',
    padding: 0,

    'li + li': {
      marginTop: '4px',
    },
  },
  h3: {
    fontWeight: 900,
  },
  a: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
  },
}));

export default function NewsDetail() {
  const [news, setNews] = useState(null);
  const { id } = useParams();
  const { toast } = useToast({
    config: {
      loading: 'Fetching news detail...',
      error: 'Failed on fetching news detail',
      success: 'News loaded',
    },
    options: { id: 'news-detail' },
  });
  useEffect(() => {
    let loaded = false;
    const getDetail = async () => {
      const promise = axios(
        getNewsDetail({
          id,
        })
      );
      toast(promise);
      const res = await promise;
      const { data } = res;
      if (res.status === 200 || res.status === 201) {
        try {
          setNews(data?.data || {});
        } catch {}
      } else {
        // TODO: Handle news detail error
      }
    };

    if (!news && !loaded) {
      getDetail();
    }
    return () => {
      loaded = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {news ? (
        <>
          <SubHeader path={`/news`}>&lsaquo; See all articles</SubHeader>
          <InnerPage>
            <Typography
              color='body.main'
              variant='h3'
              component='h2'
              sx={{ textAlign: 'center', mb: 8 }}
            >
              {news?.title}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>
                <DisplayDate date={news?.created_at} />
              </Typography>
              <Typography>{news?.author}</Typography>
            </Box>
            <Image
              sx={{ my: 2 }}
              src={`${process.env.REACT_APP_BASE_API_URL}/${news?.cover}`}
              alt={news?.title}
              duration={0}
              width={'50%'}
            />
            <BlogContent>
              <Typography component='div' color='body.main' variant='body1'>
                <div
                  dangerouslySetInnerHTML={{
                    __html: news?.content,
                  }}
                />
              </Typography>
            </BlogContent>
          </InnerPage>
        </>
      ) : null}
    </>
  );
}
