import React from 'react'
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap'

const Header = () => (
  <Navbar color="light" light expand="xs">
    {/* We assume that we're using HashRouter from react-router-dom */}
    <NavbarBrand href={document.location.pathname}>
      Estimate It!
    </NavbarBrand>
    <Nav className="ml-auto" navbar>
      <NavItem>
        <NavLink href="https://github.com/tatomyr/estimate-it">
          GitHub
        </NavLink>
      </NavItem>
    </Nav>
  </Navbar>
)

export default Header
