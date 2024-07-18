import { useOutletContext } from "react-router-dom";
import { Avatar } from "@nextui-org/react";
import SectionContainer from "../../sectionContainder/SectionContainer";
import Post from "../post/Post";

export default function Profile() {
  const [data] = useOutletContext();

  const bgCss = {
    backgroundImage: `url(${data.cover})`,
  };

  return (
    <>
      <SectionContainer>
        <div className="mx-4">
          <div
            className="bg-cover bg-center w-full h-52 mt-6"
            style={bgCss}
          ></div>
          <Avatar
            src={data.profile}
            className="w-36 h-36 text-large ml-20 -translate-y-2/4"
          />
          <p className="text-4xl font-bold -mt-6">{`${data.fname} ${data.lname}`}</p>
          <p className="py-6">{data.discription}</p>
        </div>
      </SectionContainer>
      {/* <Post /> */}
      {data.posts.map((post) => {
        return (
          <Post
            key={post.id}
            content={post.content}
            image={post.image}
            postedAt={post.postedAt}
          />
        );
      })}
    </>
  );
}
