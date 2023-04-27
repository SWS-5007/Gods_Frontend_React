export const navItems = [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'View nonprofits',
    link: '/non-profits',
  },
  {
    name: 'About Us',
    link: '/about',
    subMenus: [
      {
        name: "About Us",
        link: "/about-us"
      },
      {
        name: "Our Goals",
        link: "/goals"
      },
      {
        name: "Our Team",
        link: "/team"
      },
      {
        name: "Volunteer with Us",
        link: "/volunteer"
      },
    ]
  },
  {
    name: 'Insight Us',
    link: '/insight',
    subMenus: [
      {
        name: "News",
        link: "/news"
      },
      {
        name: "FAQs",
        link: "/faqs"
      },
    ]
  },
  {
    name: 'Contact Us',
    link: '/contact-us',
  },
  {
    name: 'Login',
    link: '/login',
  },
];
