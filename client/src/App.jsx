import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import HomeLayout from "./layouts/HomeLayout";
import ProfileLayout from "./layouts/ProfileLayout";
import Landing from "./pages/system/Landing";

const App = () => {
  return (
    <Routes>

      <Route path="/landing" element={<Landing />} />

      <Route path="/login" element={<Login />} />

      <Route path="/" element={<HomeLayout />}>
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Route>

      <Route path="/profile" element={<ProfileLayout />}>
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Route>
    </Routes>
  )
}

export default App