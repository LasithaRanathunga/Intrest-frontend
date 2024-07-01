import { Input, Button, Link as UiLink } from "@nextui-org/react";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function submit() {
    console.log("called");
    const data = { email: email, password: password };
    fetch("http://localhost:3000/login", {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token && data.status == "success") {
          localStorage.setItem("token", data.token);
          navigate("/");
        } else {
          console.log(data);
          throw new Error("Signup failed");
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="h-dvh bg-white flex flex-col justify-center items-center">
      <h3 className="text-5xl font-bold mb-8">Welcome Back</h3>
      <div className="flex flex-col w-96 flex-wrap md:flex-nowrap gap-4">
        <Input
          type="email"
          size="lg"
          variant="bordered"
          label="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Input
          label="Password"
          variant="bordered"
          size="lg"
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
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button
          color="primary"
          size="lg"
          className="text-bold text-white text-2xl mt-4"
          onClick={submit}
        >
          Log in
        </Button>
        <p className="text-gray-500 m-auto mt-4 text-xl">
          Don&apost have an account?{" "}
          <Link to="/signin">
            <UiLink size="lg" className="text-xl">
              {" "}
              SignIn
            </UiLink>
          </Link>
        </p>
      </div>
    </div>
  );
}
