import SectionContainer from "../../sectionContainder/SectionContainer";

import SidebarGroup from "../sidebarGroup/SidebarGroup";
import SidebarLink from "../sidebarLink/SidebarLink";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

export default function SidebarGroupList() {
  return (
    <SectionContainer>
      <section className="p-4 ">
        <h3 className="text-xl font-semibold mb-6">Groups</h3>
        <SidebarLink Icon={AiOutlineUsergroupAdd} title="Create Group" />
        <div className="mt-6">
          <SidebarGroup />
          <SidebarGroup />
          <SidebarGroup />
          <SidebarGroup />
        </div>
      </section>
    </SectionContainer>
  );
}
