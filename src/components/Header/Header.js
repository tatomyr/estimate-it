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
    <NavbarBrand href="/">
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
