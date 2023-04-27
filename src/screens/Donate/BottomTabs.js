import { useState } from 'react';
import { Tabs, Tab, Typography, Box, Divider } from '@mui/material';
import { Info, FindInPage, Comment } from '@mui/icons-material';
import PropTypes from 'prop-types';
import Comments from './Comments';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({org}) {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
        >
          <Tab
            label='About'
            {...a11yProps(0)}
            icon={<Info />}
            iconPosition='start'
          />
          <Tab
            label='More Info'
            {...a11yProps(1)}
            icon={<FindInPage />}
            iconPosition='start'
          />
          <Tab
            label='Comments'
            {...a11yProps(2)}
            icon={<Comment />}
            iconPosition='start'
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Typography
          variant='h5'
          component={'h5'}
          align='center'
          marginBottom={3}
          color={'text.secondary'}
        >
          About the Organisation
        </Typography>
        <Typography component={'span'}>
          {org.about}
        </Typography>
        <Divider sx={{ mt: 3 }} />
        <Typography
          variant='h5'
          component={'h5'}
          align='center'
          marginTop={3}
          marginBottom={3}
          color={'text.secondary'}
        >
          Organisation's Mission
        </Typography>
        <Typography component={'span'}>
          {org.mission}
        </Typography>
        <Divider sx={{ mt: 3 }} />
        <Typography
          variant='h5'
          component={'h5'}
          align='center'
          marginTop={3}
          marginBottom={3}
          color={'text.secondary'}
        >
          How we plan to use our funds
        </Typography>
        <Typography component={'span'}>
          {org.plans}
        </Typography>
        <Divider sx={{ mt: 3 }} />
        <Typography
          variant='h5'
          component={'h5'}
          align='center'
          marginTop={3}
          marginBottom={3}
          color={'text.secondary'}
        >
          Organisation's History
        </Typography>
        <Typography component={'span'}>
          {org.history}
        </Typography>
        <Divider sx={{ mt: 3 }} />
        <Typography
          variant='h5'
          component={'h5'}
          align='center'
          marginTop={3}
          marginBottom={3}
          color={'text.secondary'}
        >
          Organisation's Goals for the Future
        </Typography>
        <Typography component={'span'}>
          {org.goals}
        </Typography>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography
          variant='h5'
          component={'h5'}
          align='center'
          marginBottom={3}
          color={'text.secondary'}
        >
          More Info
        </Typography>
        <Typography component={'span'}>
          {org.information}
        </Typography>
        <Divider sx={{ mt: 3 }} />
        <Typography
          variant='h5'
          component={'h5'}
          align='center'
          marginTop={3}
          marginBottom={3}
          color={'text.secondary'}
        >
          Details on the Organisation's Founder
        </Typography>
        <Typography component={'span'}>
          {org.founder_details}
        </Typography>
        <Divider sx={{ my: 3 }} />
        <Typography variant='h6'>Location: India</Typography>
        <Divider sx={{ mt: 3 }} />
        <Typography
          variant='h5'
          component={'h5'}
          align='center'
          marginTop={3}
          marginBottom={3}
          color={'text.secondary'}
        >
          Organisation's photo
        </Typography>
        <Typography component={'span'}>No photos uploaded yet...</Typography>
        <Divider sx={{ mt: 3 }} />
        <Typography
          variant='h5'
          component={'h5'}
          align='center'
          marginTop={3}
          marginBottom={3}
          color={'text.secondary'}
        >
          Registration certificate of the Organisation
        </Typography>
        <Typography component={'span'}>No registration certificate uploaded yet...</Typography>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Comments />
      </TabPanel>
    </Box>
  );
}
