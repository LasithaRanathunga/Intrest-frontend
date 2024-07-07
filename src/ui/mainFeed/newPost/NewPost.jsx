import SectionContainer from "../../sectionContainder/SectionContainer";
import { Avatar, Button, Image } from "@nextui-org/react";
import { FaImages } from "react-icons/fa6";
import { BsSendFill } from "react-icons/bs";
import { useRef, useState } from "react";

export default function NewPost({ profile }) {
  const textareaRef = useRef(null);

  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  function handleImage(event) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  function submit() {
    const formData = new FormData();
    formData.append("content", content);
    formData.append("image", image);

    const token = localStorage.getItem("token");

    fetch("http://localhost:3000/createPost", {
      headers: {
        Authorization: "Bearer " + token,
      },
      method: "POST",
      body: formData,
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // },
    })
      .then((res) => {
        setImage(null);
        setContent("");
        console.log(res);
      })
      .catch((err) => console.log("Error occured", err));
  }

  return (
    <SectionContainer>
      <div className="p-4 flex items-center w-full">
        <Avatar
          className="shrink-0 self-start"
          src={`data:image/jpeg;base64,${profile}`}
          size="lg"
        />
        <form className="flex items-center justify-between  grow">
          <div className="grow">
            <textarea
              // className="text-xl ml-4 outline-none grow resize"
              // placeholder="What's New?"
              // wrap="soft"
              ref={textareaRef}
              className="text-xl ml-4 outline-none  resize-none overflow-hidden p-2"
              placeholder="What's New?"
              rows="1"
              onInput={handleInput}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            {image ? (
              <Image
                alt="post image"
                className="object-cover rounded-xl w-full ml-4"
                src={image}
                // width={270}
              />
            ) : null}
          </div>
          <Button
            variant="light"
            isIconOnly
            className="cursor-pointer p-6 shrink-0 self-start"
          >
            <label htmlFor="image">
              <FaImages className="text-3xl" />
            </label>
            <input
              type="file"
              hidden
              name="image"
              id="image"
              onChange={handleImage}
            />
          </Button>
          <Button
            variant="light"
            isIconOnly
            className="cursor-pointer p-6 shrink-0 ml-4 self-start"
          >
            <label htmlFor="submit">
              <BsSendFill className="text-3xl" />
            </label>
            <input
              type="button"
              hidden
              name="submit"
              id="submit"
              onClick={submit}
            />
          </Button>
        </form>
      </div>
    </SectionContainer>
  );
}
