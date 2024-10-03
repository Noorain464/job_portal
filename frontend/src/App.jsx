import { createBrowserRouter } from "react-router-dom"
import { RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
const approuter = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/signup",
    element: <Signup/>
  },
])
function App() {

  return (
    <>
      <RouterProvider router={approuter}/>
    </>
  )
}

export default App
