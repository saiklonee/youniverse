import React, { useEffect, useState } from "react";
import { demoApi } from "../../data/demoApi";

const Habits = () => {
    const [habits, setHabits] = useState([]);

    useEffect(() => {
        demoApi.habits().then(setHabits);
    }, []);

    return (
        <div className="space-y-6">
            <header className="flex items-end justify-between">
                <div>
                    <h2 className="text-2xl font-semibold text-slate-900">Habits</h2>
                    <p className="text-sm text-slate-600 mt-1">Build streaks without pressure.</p>
                </div>
                <button className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition">
                    + New habit
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {habits.map((h) => (
                    <div key={h.id} className="bg-white border border-slate-200 rounded-2xl p-5">
                        <h3 className="font-semibold text-slate-900">{h.title}</h3>
                        <p className="text-sm text-slate-600 mt-2">Streak: {h.streak} days</p>
                        <span
                            className={`inline-flex mt-3 text-xs font-semibold px-3 py-1 rounded-full ${h.doneToday ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-700"
                                }`}
                        >
                            {h.doneToday ? "Done today" : "Not done yet"}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Habits;
