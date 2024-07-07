import SidebarLink from "../sidebarLink/SidebarLink";
import { PiStackBold } from "react-icons/pi";
import { PiChatsCircleBold } from "react-icons/pi";
import { GrGroup } from "react-icons/gr";
import { MdOutlineSettings } from "react-icons/md";

export default function SidebarSection() {
  return (
    <section className="p-4 ">
      <h3 className="text-xl font-semibold mb-6">Main Menu</h3>
      <SidebarLink Icon={PiStackBold} title="Feed" to="/" />
      <SidebarLink Icon={PiChatsCircleBold} title="Messages" to="/messages" />
      <SidebarLink Icon={GrGroup} title="Groups" to="/groups" />

      <SidebarLink Icon={MdOutlineSettings} title="Settings" to="/settings" />
    </section>
  );
}
