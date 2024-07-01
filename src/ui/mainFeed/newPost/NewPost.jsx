import SectionContainer from "../../sectionContainder/SectionContainer";
import { Avatar } from "@nextui-org/react";

export default function NewPost() {
  return (
    <SectionContainer>
      <div className="p-4 flex items-center">
        <Avatar
          src="https://i.pravatar.cc/150?u=a04258114e29026302d"
          size="lg"
        />
        <form>
          <input
            className="text-xl ml-4 outline-none"
            type="text-area"
            placeholder="What's New?"
          />
        </form>
      </div>
    </SectionContainer>
  );
}
