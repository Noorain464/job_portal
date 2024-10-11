import { createBrowserRouter } from "react-router-dom"
import { RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Jobs from "./components/Jobs";
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
  {
    path: "/jobs",
    element: <Jobs/>
  }
])
function App() {

  return (
    <>
      <RouterProvider router={approuter}/>
    </>
  )
}

export default App
