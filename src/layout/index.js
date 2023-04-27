import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ContactUs from '../screens/ContactUs';
import Home from '../screens/Home';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import News from '../screens/News';
import Donate from '../screens/Donate';
import Protected from '../screens/Protected';
import Faq from '../screens/Faq';
import OurTeam from '../screens/OurTeam';
import Volunteer from '../screens/Volunteer';
import Checkout from '../screens/Checkout';
import NonProfits from '../screens/NonProfits';

export default function MainLayout() {
  const { screen, id } = useParams();
  console.log("id:" + id);
  const renderTitle = () => {
    switch (screen) {
      case 'contact-us':
        return 'Contact Us';
      case 'donate':
        return 'Our Organisations';

      case 'login':
      case 'signup':
        return null;

      case 'news':
        return id ? null : 'Recent News';

      case 'faqs':
        return 'Frequently Asked Questions';

      case 'team':
        return 'Our Team';

      case 'volunteer':
        return 'Volunteer Today!';

      case 'checkout':
        return 'Checkout & Donate!';

      default:
        return "THE GOD'S HAND";
    }
  };

  const renderSubTitle = () => {
    switch (screen) {
      case 'volunteer':
        return 'Discover new ways to make an impact in your community';

      default:
        return null;
    }
  };

  // Header for landing page will have different layout
  const isLandingPage = () => {
    switch (screen) {
      case undefined:
      case '':
      case '/':
        return true;

      default:
        return false;
    }
  };

  // Header's background image
  const bgImage = useMemo(() => {
    switch (screen) {
      case 'team':
        return '/storage/image/bg-team.jpg';

      case 'volunteer':
        return '/storage/image/bg-volunteer.jpg';

      default:
        return null;
    }
  }, [screen]);

  const isCleanLayout = useMemo(() => {
    // pages that will not include Header and Footer
    const cleanLayouts = ['login', 'signup']
    return cleanLayouts.includes(screen)
  }, [screen])

  const Page = () => {
    switch (screen) {
      case 'contact-us':
        return <ContactUs />;
      case 'login':
        return <Login />;
      case 'signup':
        return <SignUp />;
      case 'news':
        return <News />;
      case 'donate':
        return <Donate />;
      case 'non-profits':
        return <NonProfits />;
      case 'protected':
        return <Protected />;
      case 'faqs':
        return <Faq />;
      case 'team':
        return <OurTeam />;
      case 'volunteer':
        return <Volunteer />;
      case 'checkout':
        return <Checkout />;
      case '/':
      case '':
      case undefined:
        return <Home />;
      // By default, screen will only show the app shell
      // that contains the header and footer.
      // This is so that the Home page will be unique and classified
      // under the `isLandingPage` condition that is used to render
      // specific header layout (with different navbar and additional contact information).
      // TODO: Optionally redirect unavailable screen paths to '/'
      default:
        return null;
    }
  };

  const pageTitle = renderTitle();
  const subTitle = renderSubTitle();

  return isCleanLayout
    ? <Page />
    : (
      <>
        <Header
          title={pageTitle}
          subtitle={subTitle}
          isLandingPage={isLandingPage()}
          bgImage={bgImage}
        />
        <Page />
        <Footer />
      </>
    );
}
