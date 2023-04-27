import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  NoSsr,
} from '@mui/material';
import { AuthProvider, useIsAuthenticated } from 'react-auth-kit';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import MainLayout from './layout';
import theme from './theme';
import store from './redux/store';
import DashboardLayout from './admin';
import StripeWrapper from './screens/Payment/StripeWrapper';
import Notification from './components/Notification';
import Result from './screens/Results';

const PrivateRoute = ({ Component }) => {
  const isAuthenticated = useIsAuthenticated();
  const auth = isAuthenticated();
  return auth ? <Component /> : <Navigate to='/login' />;
};
function App() {
  return (
    <NoSsr>
      <Provider store={store}>
        <CssVarsProvider theme={theme}>
          <AuthProvider authType={'localstorage'} authName={'_auth'}>
            <StripeWrapper>
              <Router basename='/'>
                <>
                  <Toaster />
                  <Notification />
                  <Routes>
                    <Route exact path={'/'}>
                      <Route exact path={''} element={<MainLayout />} />
                      <Route
                        exact
                        path={':screen/:id?'}
                        element={<MainLayout />}
                      />
                      <Route exact path={'/donate/payment/success/:id'} element={<Result result={true}/>} />
                      <Route exact path={'/donate/payment/cancelled/:id'} element={<Result result={false}/>} />
                    </Route>
                    <Route exact path={'/admin'}>
                      <Route
                        exact
                        path={''}
                        element={<PrivateRoute Component={DashboardLayout} />}
                      />
                      <Route
                        exact
                        path={':screen/:id?'}
                        element={<PrivateRoute Component={DashboardLayout} />}
                      />
                    </Route>
                  </Routes>
                </>
              </Router>
            </StripeWrapper>
          </AuthProvider>
        </CssVarsProvider>
      </Provider>
    </NoSsr>
  );
}

export default App;
