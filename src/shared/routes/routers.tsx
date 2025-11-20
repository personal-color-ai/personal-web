import {createBrowserRouter} from 'react-router-dom';

import RootLayout from '@layouts/root-layout';
import MainPage from '@pages/main/main-page';
import MainDetailPage from '@pages/main/main-detail-page';

export const router = createBrowserRouter([
  {
    element: <RootLayout/>,
    children: [
      {index: true, element: <MainPage/>},
      {path: "/product/:id", element: <MainDetailPage/> }
    ]
  }
])