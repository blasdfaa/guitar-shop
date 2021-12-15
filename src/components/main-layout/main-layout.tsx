import React from 'react';

import AppHeader from '../app-header/app-header';
import AppFooter from '../app-footer/app-footer';

type MainLayoutProps = {
  children: React.ReactNode;
};

function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <AppHeader />
      {children}
      <AppFooter />
    </>
  );
}

export default MainLayout;
