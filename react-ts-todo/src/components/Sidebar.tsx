import React from "react";
import { PageSidebar } from "@patternfly/react-core";

import SidebarNav from "./SidebarNav";

interface Props {
  isNavOpen: boolean;
}

const Sidebar = ({ isNavOpen }: Props) => {
  return <PageSidebar nav={<SidebarNav />} isNavOpen={isNavOpen} />;
};

export default Sidebar;
