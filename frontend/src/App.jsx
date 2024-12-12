import { createBrowserRouter } from "react-router-dom"
import { RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import Companies from "./components/recruiter/Companies";
import CompanyCreate from "./components/recruiter/CompanyCreate";
import CompanySetup from "./components/recruiter/CompanySetup";
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
  },
  {
    path: "/description/:id",
    element: <JobDescription/>
  },
  {
    path: "/browse",
    element: <Browse/>
  }
  ,
  {
    path: "/profile",
    element: <Profile/>
  },
  // for recruiter
  {
    path: "/admin/companies",
    element: <Companies/>
  },
  {
    path: "/admin/companies/create",
    element: <CompanyCreate/>
  },
  {
    path: "/admin/companies/:id",
    element: <CompanySetup/>
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
