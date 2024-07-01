export default function SidebarLink({ Icon, title }) {
  return (
    <div className="flex text-2xl hover:bg-gray-100 p-2 rounded-xl items-center">
      {<Icon />}
      <span className="ml-4">{title}</span>
    </div>
  );
}
