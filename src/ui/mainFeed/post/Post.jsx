import SectionContainer from "../../sectionContainder/SectionContainer";

import { Card, CardHeader, CardBody, Avatar, Image } from "@nextui-org/react";

export default function Post({ image, content, postedAt }) {
  function timeAgo(createdDate) {
    const now = new Date();
    const seconds = Math.floor((now - new Date(createdDate)) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) return `${interval} year${interval > 1 ? "s" : ""} ago`;

    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return `${interval} month${interval > 1 ? "s" : ""} ago`;

    interval = Math.floor(seconds / 604800);
    if (interval >= 1) return `${interval} week${interval > 1 ? "s" : ""} ago`;

    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return `${interval} day${interval > 1 ? "s" : ""} ago`;

    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return `${interval} hour${interval > 1 ? "s" : ""} ago`;

    interval = Math.floor(seconds / 60);
    if (interval >= 1)
      return `${interval} minute${interval > 1 ? "s" : ""} ago`;

    return "just now";
  }

  return (
    <SectionContainer>
      <div>
        <Card className="w-full rounded-none p-6">
          <CardHeader className="justify-between">
            <div className="flex gap-5">
              <Avatar
                isBordered
                radius="full"
                size="md"
                src="https://nextui.org/avatars/avatar-1.png"
              />
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-small font-semibold leading-none text-default-600">
                  Zoey Lang
                </h4>
                <h5 className="text-small tracking-tight text-default-400">
                  {timeAgo(postedAt)}
                </h5>
              </div>
            </div>
          </CardHeader>
          <CardBody className="flex-col items-center px-20">
            <p className="self-start">
              {/* 🏛️ Architecture: Where Art Meets Engineering 🌟 Ever stood in awe
              of a stunning building and wondered about the story behind it?
              Architecture isn't just about constructing buildings; it's about
              crafting experiences, blending creativity with functionality, and
              shaping our surroundings to reflect our culture and values. From
              the timeless beauty of ancient temples to the sleek lines of
              modern skyscrapers, architecture tells a tale of innovation and
              human ingenuity. Let's celebrate the architects who transform
              dreams into reality and inspire us with their visionary designs!
              🏙️✨ #Architecture #Design #Innovation #ArtInBuilding #Inspiration */}
              {content}
            </p>
            <Image
              alt="Card background"
              className="object-cover rounded-xl w-full mt-6 mx-auto"
              // src="https://nextui.org/images/hero-card-complete.jpeg"
              src={image}
              // width={270}
            />
          </CardBody>
        </Card>
      </div>
    </SectionContainer>
  );
}
