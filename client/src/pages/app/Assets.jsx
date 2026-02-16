import React, { useEffect, useState } from "react";
import { demoApi } from "../../data/demoApi";

const Assets = () => {
    const [assets, setAssets] = useState([]);

    useEffect(() => {
        demoApi.assets().then(setAssets);
    }, []);

    return (
        <div className="space-y-6">
            <header className="flex items-end justify-between">
                <div>
                    <h2 className="text-2xl font-semibold text-slate-900">Assets</h2>
                    <p className="text-sm text-slate-600 mt-1">Track gadgets, warranties, and purchases.</p>
                </div>
                <button className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition">
                    + Add asset
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {assets.map((a) => (
                    <div key={a.id} className="bg-white border border-slate-200 rounded-2xl p-5">
                        <h3 className="font-semibold text-slate-900">{a.title}</h3>
                        <p className="text-sm text-slate-600 mt-1">{a.brand}</p>
                        <p className="text-xs text-slate-500 mt-3">
                            Warranty ends: {a.warrantyEnds}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Assets;
