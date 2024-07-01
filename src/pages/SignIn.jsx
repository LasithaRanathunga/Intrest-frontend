import { Input, Button, Link as UiLink } from "@nextui-org/react";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SignIn() {
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");

  const [isFnameValid, setIsFnameValid] = useState(false);
  const [isLnameValid, setIsLnameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isConPasswordValid, setIsConPasswordValid] = useState(false);
  const [passErr, setPassErr] = useState("Please enter a valid input");

  const createAccount = () => {
    if (!fname) {
      setIsFnameValid(true);
      return;
    } else {
      setIsFnameValid(false);
    }

    if (!lname) {
      setIsLnameValid(true);
      return;
    } else {
      setIsLnameValid(false);
    }

    const emailRegex = /\S+@\S+\.\S+/; // Simple email validation regex
    if (!emailRegex.test(email)) {
      setIsEmailValid(true);
      return;
    } else {
      setIsEmailValid(false);
    }

    if (password !== conPassword) {
      setIsConPasswordValid(true);
      setIsPasswordValid(true);
      setPassErr("passwords does not match");
      return;
    } else {
      setIsConPasswordValid(false);
      setIsPasswordValid(false);
    }

    if (password.length < 6) {
      setIsConPasswordValid(true);
      setIsPasswordValid(true);
      setPassErr("password should have more than 6 charactors");
      return;
    } else {
      setIsConPasswordValid(false);
      setIsPasswordValid(false);
    }

    const data = {
      fname: fname,
      lname: lname,
      email: email,
      password: password,
      conPassword: conPassword,
    };
    console.log(data);

    //const token = localStorage.getItem("token");

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        //Authentication: "Bearer " + token,
      },
      body: JSON.stringify(data),
    };

    fetch("http://localhost:3000/signin", options)
      .then((response) => response.json())
      .then((data) => {
        if (data.token && data.status == "success") {
          localStorage.setItem("token", data.token);
        }
        navigate("/welcome", { state: { ...data } });
      });
  };

  return (
    <div className="bg-white h-dvh flex flex-col items-center justify-center">
      <h3 className="text-5xl font-bold mb-8">Sign In</h3>
      <form className="flex flex-col w-96 flex-wrap md:flex-nowrap gap-4">
        <Input
          type="text"
          size="lg"
          variant="bordered"
          label="First Name"
          isInvalid={isFnameValid}
          errorMessage="Please enter a valid input"
          value={fname}
          onChange={(e) => {
            setFname(e.target.value);
          }}
        />
        <Input
          type="text"
          size="lg"
          variant="bordered"
          label="Last Name"
          isInvalid={isLnameValid}
          errorMessage="Please enter a valid input"
          value={lname}
          onChange={(e) => {
            setLname(e.target.value);
          }}
        />
        <Input
          type="email"
          size="lg"
          variant="bordered"
          label="Email"
          isInvalid={isEmailValid}
          errorMessage="Please enter a valid input"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Input
          label="Password"
          variant="bordered"
          size="lg"
          isInvalid={isPasswordValid}
          errorMessage={passErr}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <FaRegEye className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <FaRegEyeSlash className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
        />
        <Input
          label="Confirm Password"
          variant="bordered"
          size="lg"
          value={conPassword}
          isInvalid={isConPasswordValid}
          errorMessage={passErr}
          onChange={(e) => {
            setConPassword(e.target.value);
          }}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <FaRegEye className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <FaRegEyeSlash className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
        />
        <Button
          onClick={createAccount}
          color="primary"
          size="lg"
          className="text-bold text-white text-2xl mt-4"
        >
          Create Account
        </Button>
        <p className="text-gray-500 m-auto mt-4 text-xl">
          Already have an account?{" "}
          <Link to="/login">
            <UiLink size="lg" className="text-xl">
              {" "}
              LogIn
            </UiLink>
          </Link>
        </p>
      </form>
    </div>
  );
}
