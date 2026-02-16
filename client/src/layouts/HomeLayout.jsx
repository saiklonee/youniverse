import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
    FiHome,
    FiArchive,
    FiFolder,
    FiMoon,
    FiSmile,
    FiTarget,
    FiBox,
    FiUser,
    FiLogOut,
    FiBookOpen,
} from "react-icons/fi";

const HomeLayout = () => {
    const navigate = useNavigate();

    return (
        <div className="flex h-screen bg-slate-100">
            {/* Sidebar */}
            <aside className="w-72 bg-white border-r border-slate-200 p-6 flex flex-col justify-between">
                <div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-slate-500">Youniverse</p>
                            <h1 className="text-xl font-semibold text-slate-900">Dashboard</h1>
                        </div>
                        <button
                            onClick={() => navigate("/profile")}
                            className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition"
                            title="Profile"
                        >
                            <FiUser />
                        </button>
                    </div>

                    <nav className="mt-8 space-y-2">
                        <SideLink to="/dashboard" icon={<FiHome />} label="Overview" />
                        <SideLink to="/closet" icon={<FiArchive />} label="Closet" />
                        <SideLink to="/documents" icon={<FiFolder />} label="Documents" />
                        <SideLink to="/sleep" icon={<FiMoon />} label="Sleep" />
                        <SideLink to="/study" icon={<FiBookOpen />} label="Study" />
                        <SideLink to="/mood" icon={<FiSmile />} label="Mood" />
                        <SideLink to="/habits" icon={<FiTarget />} label="Habits" />
                        <SideLink to="/assets" icon={<FiBox />} label="Assets" />
                    </nav>
                </div>

                <div className="space-y-3">
                    <button className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition">
                        + Quick Add
                    </button>

                    <button
                        onClick={() => navigate("/login")}
                        className="w-full flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                    >
                        <FiLogOut />
                        Logout
                    </button>

                    <p className="text-xs text-slate-500">
                        Demo mode, using local data until backend is ready.
                    </p>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};

const SideLink = ({ to, icon, label }) => {
    const base =
        "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition";
    const active = "bg-slate-900 text-white";
    const idle = "text-slate-700 hover:bg-slate-200/60";

    return (
        <NavLink to={to} className={({ isActive }) => `${base} ${isActive ? active : idle}`}>
            <span className="text-lg">{icon}</span>
            {label}
        </NavLink>
    );
};

export default HomeLayout;
