import { Avatar, Divider, Button } from "@nextui-org/react";
import SidebarSectionContainer from "../../sectionContainder/SectionContainer";
import { Link } from "react-router-dom";

export default function HomeInfo({ profile, cover, name, discription }) {
  const bgCss = {
    backgroundImage: `url(${cover})`,
  };

  return (
    <SidebarSectionContainer>
      <div className="bg-cover bg-center w-full h-24" style={bgCss}></div>

      <div className="flex flex-col justify-center">
        <Avatar
          src={profile}
          className="w-24 h-24 text-large m-auto -translate-y-2/4"
        />
        <h2 className="text-center -mt-7 mb-12 font-bold text-3xl">{name}</h2>
        <p className="mx-auto text-center text-gray-500 text-md -mt-4">
          {discription}
        </p>
        <Divider className="my-4" />
        <Link to="/profile" className=" m-auto mb-4">
          <Button color="primary" variant="light" size="lg" className="text-xl">
            My Profile
          </Button>
        </Link>
      </div>
    </SidebarSectionContainer>
  );
}
