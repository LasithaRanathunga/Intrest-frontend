import { Avatar } from "@nextui-org/react";

export default function SidebarGroup() {
  return (
    <div className="hover:bg-gray-100 rounded-lg flex items-center px-4 py-2">
      <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" size="lg" />
      <div className="flex flex-col ml-4">
        <span className="font-bold text-xl">Json Stathom</span>
        <span className="text-gray-500">2.4k followers</span>
      </div>
    </div>
  );
}
