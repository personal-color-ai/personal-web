import {Outlet} from 'react-router-dom';

const RootLayout = () => {
  return (
    <div className="max-w-md mx-auto min-h-screen">
      <div className="w-110 h-screen bg-white">
        <Outlet/>
      </div>
    </div>
  );
};

export default RootLayout;