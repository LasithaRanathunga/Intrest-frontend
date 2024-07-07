import { Link } from "react-router-dom";

export default function SidebarLink({ Icon, title, to }) {
  return (
    <Link
      className="flex text-2xl hover:bg-gray-100 p-2 rounded-xl items-center cursor-pointer"
      to={to}
    >
      {<Icon />}
      <span className="ml-4">{title}</span>
    </Link>
  );
}
