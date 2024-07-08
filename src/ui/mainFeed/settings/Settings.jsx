import { useNavigate, useOutletContext } from "react-router-dom";

import { Divider } from "@nextui-org/divider";
import { Input, Textarea } from "@nextui-org/input";
import { Avatar, Button } from "@nextui-org/react";
import { useState } from "react";

import SectionContainer from "../../sectionContainder/SectionContainer";

export default function Settings() {
  const [data] = useOutletContext();
  const navigate = useNavigate();

  const [fname, setFname] = useState(data.fname);
  const [lname, setLname] = useState(data.lname);
  const [nameError, setNameError] = useState(null);

  const [profile, setProfile] = useState(data.profile);
  const [cover, setCover] = useState(data.cover);

  const bgCss = {
    backgroundImage: `url(${cover})`,
  };

  const [discription, setDiscription] = useState(data.discription);

  function submit() {
    if (fname.trim().length == 0 || lname.trim().length) {
      setNameError("Both First Name and Last Name should not be empty");
      return;
    }

    const formData = new FormData();
    formData.append("fname", fname);
    formData.append("lname", lname);
    formData.append("discription", discription);

    formData.append("files", profile);
    formData.append("files", cover);

    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/updateUser", {
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
        return navigate("/settings");
      })
      .catch((err) => console.log("Error occured", err));
  }

  const handleImageSelect = (event, setFunc) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFunc(e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <SectionContainer>
        <div className="p-4">
          <h4 className="text-2xl font-bold">Username</h4>
          <Divider className="my-2" />
          <p className="cursor-not-allowed text-xl text-gray-500">
            {data.email}
          </p>
        </div>
      </SectionContainer>
      <SectionContainer>
        <div className="p-4">
          <h4 className="text-2xl font-bold">User Name</h4>
          <Divider className="my-2" />
          <Input
            type="text"
            label="First Name"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            className="max-w-xl"
            isInvalid={fname.length > 0 ? false : true}
            errorMessage="Please enter a valid name"
          />
          <Input
            type="text"
            label="Last Name"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            className="max-w-xl mt-6"
            isInvalid={lname.length > 0 ? false : true}
            errorMessage="Please enter a valid name"
          />
          {nameError ? (
            <p className="text-red-600 mt-4 ml-2">{nameError}</p>
          ) : null}
        </div>
      </SectionContainer>
      <SectionContainer>
        <div className="p-4">
          <h4 className="text-2xl font-bold">User Info</h4>
          <Divider className="my-2" />
          <div className="w-11/12 mx-auto">
            <div
              className="bg-cover bg-center w-full h-52 mt-6"
              style={bgCss}
            ></div>
            <Avatar
              src={profile}
              className="w-36 h-36 text-large ml-20 -translate-y-2/4"
            />
            <form>
              <div className="flex justify-end -mt-32 mb-12">
                <Button color="primary" className="text-xl p-6">
                  <label htmlFor="profile">Upload Profile Picture</label>
                  <input
                    className="hidden"
                    type="file"
                    name="profile"
                    id="profile"
                    onChange={(e) => {
                      handleImageSelect(e, setProfile);
                      // setProfileFile(e.target.files?.[0]);
                    }}
                  />
                </Button>
                <Button color="primary" className="text-xl p-6 ml-6">
                  <label htmlFor="cover">Upload Cover Photo</label>
                  <input
                    className="hidden"
                    type="file"
                    name="cover"
                    id="cover"
                    onChange={(e) => {
                      handleImageSelect(e, setCover);
                      //setCoverFile(e.target.files?.[0]);
                    }}
                  />
                </Button>
              </div>
              <label className="text-2xl ml-1">Description</label>
              <Textarea
                placeholder="Yell us something about you"
                fullWidth
                minRows={24}
                onChange={(e) => setDiscription(e.target.value)}
                value={discription}
              />
            </form>
          </div>
        </div>
      </SectionContainer>
      <div className="flex justify-end px-4 w-11/12 mx-auto mb-6">
        <Button
          className="text-xl"
          color="primary"
          isLoading={false}
          onClick={submit}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
