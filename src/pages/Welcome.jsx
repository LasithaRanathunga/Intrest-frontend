import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar, Button } from "@nextui-org/react";
import { Textarea } from "@nextui-org/input";

export default function Welcome() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );
  const [cover, setCover] = useState(
    "https://static.vecteezy.com/system/resources/previews/003/475/139/non_2x/grey-abstract-background-wallpaper-design-free-vector.jpg"
  );
  const [discription, setDiscription] = useState("");

  // const [profileFile, setProfileFile] = useState();
  // const [coverFile, setCoverFile] = useState();

  const data = useLocation().state;

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  useEffect(() => {
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    console.log(data);
    if (data) {
      data.fname = capitalizeFirstLetter(data.fname);
      setFname(data.fname);
      data.lname = capitalizeFirstLetter(data.lname);
      setLname(data.lname);
    } else {
      navigate("/", { replace: true });
    }
  }, [data, navigate]);

  function submit() {
    const formData = new FormData();
    formData.append("discription", discription);
    formData.append("id", data.id);

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
        console.log(res);
        console.log("calld");
        return navigate("/");
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

  const bgCss = {
    backgroundImage: `url(${cover})`,
  };

  return (
    <div className="bg-white h-dvh flex flex-col items-center">
      <p className="text-4xl font-bold mt-8">
        Hello, {fname} {lname}
      </p>
      <h4 className="text-6xl mt-4">
        Welcome to <span className="font-Pacifico text-7xl">interest</span>
      </h4>
      <div className="w-3/5 mt-16">
        <div className="bg-cover bg-center w-full h-52" style={bgCss}></div>
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
                  // setCoverFile(e.target.files?.[0]);
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
          <div className="flex justify-end mt-4">
            <Button className=" text-xl" color="primary" onClick={submit}>
              Update
            </Button>
            <Button className=" text-xl ml-4">Not now</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
