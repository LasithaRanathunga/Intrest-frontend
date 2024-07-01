import HomeInfo from "../ui/sidebar/homeInfo/HomeInfo";
import SectionContainer from "../ui/sectionContainder/SectionContainer";
import SidebarSection from "../ui/sidebar/sidebarSection/SidebarSection";
import NewPost from "../ui/mainFeed/newPost/NewPost";
import Post from "../ui/mainFeed/post/Post";
import SidebarGroupList from "../ui/sidebar/sidebarGroupList/SidebarGroupList";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useEffect } from "react";
//import { Buffer } from "buffer";

export default function Home() {
  const data = useLoaderData();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("user", data);
    if (data.error) {
      navigate("/login");
    }
  }, [data, navigate]);

  return (
    <div className="grid grid-cols-12 gap-4 bg-transparent p-4">
      <div className="col-start-1 col-end-3 h-dvh overflow-auto">
        <HomeInfo
          profile={data.profile}
          cover={data.cover}
          name={data.fname + " " + data.lname}
          discription={data.discription}
        />
        <SectionContainer>
          <SidebarSection />
        </SectionContainer>
      </div>
      <div className="col-start-3 col-end-11">
        <NewPost />
        <Post />
      </div>
      <div className="col-start-11 col-end-13 h-dvh overflow-auto">
        <SidebarGroupList />
      </div>
    </div>
  );
}

export async function homeLoader() {
  const token = localStorage.getItem("token");
  console.log(token);

  let user;
  try {
    user = await fetch("http://localhost:3000/getOneUser", {
      headers: {
        Authorization: "Bearer " + token,
      },
      method: "GET",
    });
    console.log(user);
  } catch (err) {
    return null;
  }

  // const profileImageBuffer = Buffer.from(user.profile, "binary");
  // const profileImageBase64 = profileImageBuffer.toString("base64");
  // user.profile = profileImageBase64;

  // const coverImageBuffer = Buffer.from(user.cover, "binary");
  // const coverImageBase64 = coverImageBuffer.toString("base64");
  // user.cover = coverImageBase64;

  return user;
}
