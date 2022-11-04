import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Header, NavItem } from './Layout.styles';

const Layout = () => {
  return (
    <>
      <Header>
        <NavItem to="/" end>
          Home
        </NavItem>
        <NavItem to={'movies'}>Movies</NavItem>
      </Header>
      <Container>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </Container>
    </>
  );
};

export default Layout;
