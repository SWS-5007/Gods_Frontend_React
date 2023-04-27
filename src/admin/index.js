import { useEffect, useMemo, useState } from 'react';
import {
  Box,
  CssBaseline,
  Divider,
  ThemeProvider,
  Typography,
  styled,
} from '@mui/material';
import { theme } from './theme';
import { DashboardNavbar } from './partials/DashboardNavbar';
import { DashboardSidebar } from './partials/DashboardSidebar';
import { useParams } from 'react-router-dom';
import Dashboard from './screens/Dashboard';
import Pages from './screens/Pages';
import Messages from './screens/Messages';
import News from './screens/News';
import Organisations from './screens/Organisations';
import Fundraisers from './screens/Fundraisers';
import Donations from './screens/Donations';
import Settings from './screens/Settings';
import FAQ from './screens/FAQ';

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 280,
  },
}));

export const Screens = ({ setTitle }) => {
  const { screen } = useParams();
  // useMemo(() => {

  // })
  // useEffect = () => {
  
  // }
  switch (screen) {
    case 'manage-pages':
      return <Pages />;
    case 'messages':
      return <Messages />;
    case 'news':
      return <News />;
    case 'organisations':
      return <Organisations />;
    case 'fundraisers':
      return <Fundraisers />;
    case 'manage-donations':
      return <Donations />;
    case 'settings':
      return <Settings />;
    case 'faqs':
      return <FAQ />;
    default:
      return <Dashboard />;
  }
};

export default function DashboardLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [title, setTitle] = useState('');
  const { screen } = useParams();

  useEffect(() => {
    switch (screen) {
      case 'manage-pages':
        setTitle('Manage Pages');
        break;
      case 'messages':
        setTitle('Messages');
        break;
      case 'news':
        setTitle('News');
        break;
      case 'organisations':
        setTitle('Organisations');
        break;
      case 'fundraisers':
        setTitle('Fundrasiers');
        break;
      case 'manage-donations':
        setTitle('Manage Donations');
        break;
      case 'settings':
        setTitle('Settings');
        break;
      case 'faqs':
        setTitle('FAQs');
        break;
      default:
        setTitle('Dashboard');
        break;
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <Typography variant='h1' sx={{ p: 1 }}>
            {title}
          </Typography>
          <Divider />
          <Screens/>
        </Box>
      </DashboardLayoutRoot>
      <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} />
      <DashboardSidebar
        onClose={() => setSidebarOpen(false)}
        open={isSidebarOpen}
      />
    </ThemeProvider>
  );
}
