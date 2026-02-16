import React, { useEffect, useMemo, useState } from "react";
import { demoApi } from "../../data/demoApi";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Study = () => {
    const [monthKey, setMonthKey] = useState("2026-02");
    const [data, setData] = useState(null);

    useEffect(() => {
        demoApi.studyMonth().then((res) => {
            setData(res);
            setMonthKey(res.monthKey);
        });
    }, []);

    const monthLabel = useMemo(() => {
        const [y, m] = monthKey.split("-").map(Number);
        return new Date(y, m - 1).toLocaleString("en-US", { month: "long", year: "numeric" });
    }, [monthKey]);

    const daysInMonth = useMemo(() => {
        const [y, m] = monthKey.split("-").map(Number);
        return new Date(y, m, 0).getDate();
    }, [monthKey]);

    const hoursByDay = useMemo(() => {
        const map = new Map();
        (data?.entries || []).forEach((e) => map.set(e.day, e.hours));
        return map;
    }, [data]);

    const total = useMemo(() => {
        const list = data?.entries || [];
        return list.reduce((sum, e) => sum + (e.hours || 0), 0).toFixed(1);
    }, [data]);

    const avg = useMemo(() => {
        const list = data?.entries || [];
        if (!list.length) return "0.0";
        return (list.reduce((s, e) => s + (e.hours || 0), 0) / list.length).toFixed(1);
    }, [data]);

    const goMonth = (dir) => {
        const [y, m] = monthKey.split("-").map(Number);
        const next = new Date(y, m - 1 + dir, 1);
        const yy = next.getFullYear();
        const mm = String(next.getMonth() + 1).padStart(2, "0");
        setMonthKey(`${yy}-${mm}`);
    };

    return (
        <div className="space-y-6">
            <header className="flex items-end justify-between">
                <div>
                    <h2 className="text-2xl font-semibold text-slate-900">Study Tracker</h2>
                    <p className="text-sm text-slate-600 mt-1">Daily study hours, monthly view.</p>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => goMonth(-1)}
                        className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition"
                    >
                        <FiChevronLeft />
                    </button>
                    <div className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-800">
                        {monthLabel}
                    </div>
                    <button
                        onClick={() => goMonth(1)}
                        className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition"
                    >
                        <FiChevronRight />
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-9 bg-white border border-slate-200 rounded-3xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                        <div>
                            <p className="text-xs text-slate-500">Monthly study log</p>
                            <p className="text-sm font-semibold text-slate-900">
                                Total: {total} hrs, Avg: {avg} hrs/day
                            </p>
                        </div>

                        <button className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition">
                            + Add today
                        </button>
                    </div>

                    <StudyLogChart days={daysInMonth} hoursByDay={hoursByDay} />
                </div>

                <div className="lg:col-span-3 space-y-6">
                    <div className="bg-white border border-slate-200 rounded-3xl p-5">
                        <p className="text-xs text-slate-500">Goal</p>
                        <h3 className="mt-1 text-lg font-semibold text-slate-900">Target hours</h3>
                        <p className="mt-3 text-sm text-slate-700">
                            Set a daily target later, then we can show progress markers on the chart.
                        </p>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-3xl p-5">
                        <p className="text-xs text-slate-500">Tip</p>
                        <h3 className="mt-1 text-lg font-semibold text-slate-900">Consistency</h3>
                        <p className="mt-3 text-sm text-slate-700">
                            Even 30 minutes daily beats random 6-hour bursts.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StudyLogChart = ({ days, hoursByDay }) => {
    const width = 1000;
    const height = 760;

    const padL = 54;
    const padR = 18;
    const padT = 36;
    const padB = 28;

    const plotW = width - padL - padR;
    const plotH = height - padT - padB;

    const rowH = plotH / days;

    const MAX_HOURS = 10; // chart scale 0..10
    const xForHours = (h) => padL + (Math.min(MAX_HOURS, Math.max(0, h)) / MAX_HOURS) * plotW;

    return (
        <div className="p-6">
            <div className="w-full overflow-x-auto">
                <div className="min-w-[980px] rounded-3xl border border-slate-200 overflow-hidden bg-white">
                    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
                        <defs>
                            <pattern id="smallGridS" width="20" height="20" patternUnits="userSpaceOnUse">
                                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(15, 23, 42, 0.08)" strokeWidth="1" />
                            </pattern>
                            <pattern id="gridS" width="100" height="100" patternUnits="userSpaceOnUse">
                                <rect width="100" height="100" fill="url(#smallGridS)" />
                                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(15, 23, 42, 0.10)" strokeWidth="1.2" />
                            </pattern>
                        </defs>

                        <rect x="0" y="0" width={width} height={height} fill="url(#gridS)" />

                        {/* Top scale labels 0..10 */}
                        <g>
                            {Array.from({ length: 11 }, (_, i) => i).map((h) => (
                                <text
                                    key={h}
                                    x={xForHours(h)}
                                    y={22}
                                    textAnchor="middle"
                                    fontSize="12"
                                    fill="rgba(15, 23, 42, 0.55)"
                                    style={{ fontFamily: "ui-sans-serif, system-ui" }}
                                >
                                    {h}
                                </text>
                            ))}
                        </g>

                        {/* Day labels */}
                        <g>
                            {Array.from({ length: days }, (_, i) => i + 1).map((d) => {
                                const y = padT + (d - 1) * rowH + rowH * 0.72;
                                return (
                                    <text
                                        key={d}
                                        x={18}
                                        y={y}
                                        textAnchor="start"
                                        fontSize="12"
                                        fill="rgba(15, 23, 42, 0.55)"
                                        style={{ fontFamily: "ui-sans-serif, system-ui" }}
                                    >
                                        {d}
                                    </text>
                                );
                            })}
                        </g>

                        {/* Bars */}
                        <g>
                            {Array.from({ length: days }, (_, i) => i + 1).map((day) => {
                                const hours = hoursByDay.get(day);
                                if (hours == null) return null;

                                const y = padT + (day - 1) * rowH + rowH * 0.18;
                                const barH = rowH * 0.64;

                                const x0 = padL;
                                const x1 = xForHours(hours);
                                const w = x1 - x0;

                                return (
                                    <rect
                                        key={day}
                                        x={x0}
                                        y={y}
                                        width={Math.max(2, w)}
                                        height={barH}
                                        rx="6"
                                        fill="rgba(59, 130, 246, 0.20)"
                                        stroke="rgba(15, 23, 42, 0.75)"
                                        strokeWidth="2"
                                    />
                                );
                            })}
                        </g>

                        {/* Outer journal border */}
                        <rect
                            x={padL - 8}
                            y={padT - 10}
                            width={plotW + 16}
                            height={plotH + 18}
                            fill="none"
                            stroke="rgba(15, 23, 42, 0.65)"
                            strokeWidth="2.2"
                            rx="10"
                        />
                    </svg>
                </div>
            </div>

            <p className="mt-3 text-xs text-slate-500">
                Later: add subjects, focus score, and pomodoro sessions.
            </p>
        </div>
    );
};

export default Study;
