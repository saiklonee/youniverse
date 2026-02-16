import React from "react";

const Settings = () => {
    return (
        <div className="space-y-6">
            <header>
                <h2 className="text-2xl font-semibold text-slate-900">Settings</h2>
                <p className="text-sm text-slate-600 mt-1">
                    These are placeholders until backend is ready.
                </p>
            </header>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
                <SettingRow title="Change password" desc="Update your password securely." />
                <SettingRow title="Two-factor auth" desc="Add extra protection to your account." />
                <SettingRow title="Export backup" desc="Download your data in a single file." />
            </div>
        </div>
    );
};

const SettingRow = ({ title, desc }) => (
    <div className="flex items-center justify-between">
        <div>
            <p className="font-semibold text-slate-900">{title}</p>
            <p className="text-sm text-slate-600 mt-1">{desc}</p>
        </div>
        <button className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">
            Open
        </button>
    </div>
);

export default Settings;
