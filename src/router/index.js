import routes from 'src/configs/router';
import Page404 from 'src/pages/404page';
import Home from 'src/pages/home';
// Public routes
const publicRoutes = [
  {
    path: routes.home,
    component: Home,
  },
  { path: '*', component: Page404 },
];

// Private routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
