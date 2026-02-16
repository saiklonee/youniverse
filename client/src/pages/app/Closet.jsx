import React, { useEffect, useState } from "react";
import { demoApi } from "../../data/demoApi";

const Closet = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        demoApi.closet().then(setItems);
    }, []);

    return (
        <div className="space-y-6">
            <header className="flex items-end justify-between">
                <div>
                    <h2 className="text-2xl font-semibold text-slate-900">Closet</h2>
                    <p className="text-sm text-slate-600 mt-1">
                        Track what you own and what you actually wear.
                    </p>
                </div>
                <button className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition">
                    + Add item
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {items.map((it) => (
                    <div key={it.id} className="bg-white border border-slate-200 rounded-2xl p-5">
                        <h3 className="font-semibold text-slate-900">{it.name}</h3>
                        <p className="text-sm text-slate-600 mt-1">{it.category}</p>
                        <div className="mt-4 text-xs text-slate-500 space-y-1">
                            <p>Last worn: {it.lastWorn}</p>
                            <p>Condition: {it.condition}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Closet;
