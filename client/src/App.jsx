import { Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/system/Landing";
import Login from "./pages/auth/Login";

import HomeLayout from "./layouts/HomeLayout";
import ProfileLayout from "./layouts/ProfileLayout";

import Dashboard from "./pages/app/Dashboard";
import Closet from "./pages/app/Closet";
import Documents from "./pages/app/Documents";
import Sleep from "./pages/app/Sleep";
import Mood from "./pages/app/Mood";
import Habits from "./pages/app/Habits";
import Assets from "./pages/app/Assets";
import ProfileOverview from "./pages/profile/ProfileOverview";
import Settings from "./pages/profile/Settings";
import Study from "./pages/app/Study";

const App = () => {
  return (
    <Routes>
      <Route path="/landing" element={<Landing />} />
      <Route path="/login" element={<Login />} />

      {/* Main App */}
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="closet" element={<Closet />} />
        <Route path="documents" element={<Documents />} />
        <Route path="sleep" element={<Sleep />} />
        <Route path="mood" element={<Mood />} />
        <Route path="habits" element={<Habits />} />
        <Route path="assets" element={<Assets />} />
        <Route path="study" element={<Study />} />
      </Route>

      {/* Profile area */}
      <Route path="/profile" element={<ProfileLayout />}>
        <Route index element={<ProfileOverview />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/landing" replace />} />
    </Routes>
  );
};

export default App;
