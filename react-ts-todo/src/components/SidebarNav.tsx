import React from "react";
import { Nav, NavItem, NavList } from "@patternfly/react-core";
import { Link } from "react-router-dom";

const SidebarNav = () => {
  return (
    <Nav aria-label="Nav">
      <NavList>
        <NavItem itemId={0} to="#">
          <Link to="/">Create ToDo</Link>
        </NavItem>
        <NavItem itemId={1} to="#">
          <Link to="/todos">ToDos</Link>
        </NavItem>
      </NavList>
    </Nav>
  );
};

export default SidebarNav;
