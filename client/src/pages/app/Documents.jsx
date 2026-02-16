import React, { useEffect, useState } from "react";
import { demoApi } from "../../data/demoApi";

const Documents = () => {
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        demoApi.documents().then(setDocs);
    }, []);

    return (
        <div className="space-y-6">
            <header className="flex items-end justify-between">
                <div>
                    <h2 className="text-2xl font-semibold text-slate-900">Documents</h2>
                    <p className="text-sm text-slate-600 mt-1">
                        Keep important files organized with reminders.
                    </p>
                </div>
                <button className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition">
                    + Upload
                </button>
            </header>

            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                <div className="grid grid-cols-12 px-5 py-3 text-xs font-semibold text-slate-500 border-b border-slate-200">
                    <div className="col-span-5">Title</div>
                    <div className="col-span-3">Type</div>
                    <div className="col-span-4">Expiry</div>
                </div>

                {docs.map((d) => (
                    <div
                        key={d.id}
                        className="grid grid-cols-12 px-5 py-4 text-sm border-b border-slate-100"
                    >
                        <div className="col-span-5 font-medium text-slate-900">{d.title}</div>
                        <div className="col-span-3 text-slate-600">{d.type}</div>
                        <div className="col-span-4 text-slate-600">
                            {d.expiresOn || "No expiry"}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Documents;
