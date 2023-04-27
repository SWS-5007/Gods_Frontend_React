import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { NavItem } from './NavItem';
import PropTypes from 'prop-types';
import {
  Dashboard,
  DocumentScanner,
  Email,
  Newspaper,
  AccountBalance,
  VolunteerActivism,
  PointOfSale,
  Quiz,
  Tune,
  ArrowCircleLeft,
} from '@mui/icons-material';

const items = [
  {
    href: '/',
    icon: <Dashboard fontSize='small' />,
    title: 'Dashboard',
  },
  {
    href: '/manage-donations',
    icon: <PointOfSale fontSize='small' />,
    title: 'Manage Donations',
  },
  {
    href: '/organisations',
    icon: <AccountBalance fontSize='small' />,
    title: 'Organisations',
  },
  {
    href: '/fundraisers',
    icon: <VolunteerActivism fontSize='small' />,
    title: 'Fundraisers',
  },
  {
    href: '/news',
    icon: <Newspaper fontSize='small' />,
    title: 'News',
  },
  {
    href: '/manage-pages',
    icon: <DocumentScanner fontSize='small' />,
    title: 'Manage Pages',
  },
  {
    href: '/messages',
    icon: <Email fontSize='small' />,
    title: 'Messages',
  },
  {
    href: '/faqs',
    icon: <Quiz />,
    title: 'FAQs',
  },
  {
    href: '/settings',
    icon: <Tune fontSize='small' />,
    title: 'Settings',
  },
];

export const DashboardSidebar = props => {
  const { open, onClose } = props;

  const navigate = useNavigate('/');

  const lgUp = useMediaQuery(theme => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false,
  });

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
              px: 3,
              py: '11px',
              borderRadius: 1,
            }}
          >
            <Box sx={{ fontWeight: 900 }} >
              <IconButton variant='outlined' onClick={() => navigate('/')}>
                <ArrowCircleLeft sx={{ fontSize: '2em' }} />
                <Typography color={'white'}>&nbsp;Go Back </Typography>
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Divider
          sx={{
            borderColor: '#2D3748',
            my: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map(item => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={`/admin${item.href}`}
              title={item.title}
            />
          ))}
          <Divider
            sx={{
              borderColor: '#2D3748',
              my: 3,
            }}
          />
        </Box>
        <Divider sx={{ borderColor: '#2D3748' }} />
        <Box
          sx={{
            px: 2,
            py: 3,
          }}
        >
          <Typography color='neutral.100' variant='subtitle2'>
            Having trouble with the app?
          </Typography>
          <Typography color='neutral.500' variant='body2'>
            Contact admin@thegodshandonation.org
          </Typography>
        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor='left'
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            color: '#FFFFFF',
            width: 280,
          },
        }}
        variant='permanent'
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor='left'
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280,
        },
      }}
      sx={{ zIndex: theme => theme.zIndex.appBar + 100 }}
      variant='temporary'
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
