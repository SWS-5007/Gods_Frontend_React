import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InnerPage from '../components/InnerPage';
import { getFaqs } from '../redux/actions/faq';
import { CircularProgress } from '@mui/material';

export default function Faq() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFaqs());
  }, [dispatch]);

  const { loading, faqs } = useSelector(state => state.faq);

  return (
    <InnerPage>
      <Typography
        component='div'
        color='body.main'
        variant='subtitle1'
        sx={{ fontWeight: 'bold' }}
      >
        We are non-profit charity & NGO organization Provide help to people in
        need.
      </Typography>
      <Typography component='div' color='body.main' variant='body2'>
        We connect nonprofits, donors, and companies in nearly every country in
        the world. We help fellow nonprofits access the funding, tools,
        training, and support they need to serve their communities.
      </Typography>
      <Box sx={{ my: 4 }}>
        {loading ? (
          <CircularProgress />
        ) : faqs?.length !== 0 ? (
          faqs?.map((faq, i) => (
            <Accordion key={i}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${i}a-content`}
                id={`panel${i}a-header`}
              >
                <Typography>{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <Typography>No FAQs created yet</Typography>
        )}
      </Box>
    </InnerPage>
  );
}
