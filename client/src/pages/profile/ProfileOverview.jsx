import React, { useEffect, useState } from "react";
import { demoApi } from "../../data/demoApi";
import { useNavigate } from "react-router-dom";

const ProfileOverview = () => {
    const [me, setMe] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        demoApi.me().then(setMe);
    }, []);

    return (
        <div className="space-y-6">
            <header className="flex items-end justify-between">
                <div>
                    <h2 className="text-2xl font-semibold text-slate-900">Profile</h2>
                    <p className="text-sm text-slate-600 mt-1">Account and security.</p>
                </div>
                <button
                    onClick={() => navigate("/profile/settings")}
                    className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition"
                >
                    Settings
                </button>
            </header>

            <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <p className="text-sm text-slate-500">Name</p>
                <p className="text-lg font-semibold text-slate-900 mt-1">{me?.name || "..."}</p>

                <p className="text-sm text-slate-500 mt-4">Email</p>
                <p className="text-slate-700 mt-1">{me?.email || "..."}</p>
            </div>
        </div>
    );
};

export default ProfileOverview;
