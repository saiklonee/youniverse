import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiSettings, FiUser } from "react-icons/fi";

const ProfileLayout = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-100">
            <div className="max-w-5xl mx-auto px-6 py-8">
                <header className="flex items-center justify-between">
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                    >
                        <FiArrowLeft />
                        Back
                    </button>

                    <nav className="flex items-center gap-2">
                        <ProfileTab to="/profile" icon={<FiUser />} label="Overview" end />
                        <ProfileTab to="/profile/settings" icon={<FiSettings />} label="Settings" />
                    </nav>
                </header>

                <div className="mt-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

const ProfileTab = ({ to, icon, label, end }) => {
    const base =
        "inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold transition";
    const active = "bg-slate-900 text-white";
    const idle = "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50";

    return (
        <NavLink to={to} end={end} className={({ isActive }) => `${base} ${isActive ? active : idle}`}>
            {icon}
            {label}
        </NavLink>
    );
};

export default ProfileLayout;
