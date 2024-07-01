// import Home, { homeLoader } from "./pages/Home.jsx";
// import Login from "./pages/Login.jsx";
// import SignIn from "./pages/SignIn.jsx";
// import Welcome from "./pages/Welcome.jsx";
import Home, { homeLoader } from "./pages/Home";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
import Welcome from "./pages/Welcome";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    loader: homeLoader,
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/welcome",
    element: <Welcome />,
  },
]);

function App() {
  return (
    <div className="font-Noto">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
