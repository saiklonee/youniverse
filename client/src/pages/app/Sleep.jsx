import React, { useEffect, useMemo, useState } from "react";
import { demoApi } from "../../data/demoApi";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Sleep = () => {
    const [monthKey, setMonthKey] = useState("2026-02");
    const [data, setData] = useState(null);

    useEffect(() => {
        demoApi.sleepMonth().then((res) => {
            setData(res);
            setMonthKey(res.monthKey);
        });
    }, []);

    const monthLabel = useMemo(() => {
        const [y, m] = monthKey.split("-").map(Number);
        return new Date(y, m - 1).toLocaleString("en-US", {
            month: "long",
            year: "numeric",
        });
    }, [monthKey]);

    const daysInMonth = useMemo(() => {
        const [y, m] = monthKey.split("-").map(Number);
        return new Date(y, m, 0).getDate();
    }, [monthKey]);

    const entriesByDay = useMemo(() => {
        const map = new Map();
        (data?.entries || []).forEach((e) => map.set(e.day, e));
        return map;
    }, [data]);

    const goMonth = (dir) => {
        const [y, m] = monthKey.split("-").map(Number);
        const next = new Date(y, m - 1 + dir, 1);
        const yy = next.getFullYear();
        const mm = String(next.getMonth() + 1).padStart(2, "0");
        setMonthKey(`${yy}-${mm}`);
        // Demo stays same data, later fetch from backend.
    };

    const avgSleep = useMemo(() => {
        const list = data?.entries || [];
        if (!list.length) return "0.0";
        const total = list.reduce((sum, e) => sum + durationHours(e.sleepStart, e.wakeEnd), 0);
        return (total / list.length).toFixed(1);
    }, [data]);

    return (
        <div className="space-y-6">
            <header className="flex items-end justify-between">
                <div>
                    <h2 className="text-2xl font-semibold text-slate-900">Sleep Log</h2>
                    <p className="text-sm text-slate-600 mt-1">
                        Bullet journal style, one bar per day.
                    </p>
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
                            <p className="text-xs text-slate-500">Monthly sleep tracker</p>
                            <p className="text-sm font-semibold text-slate-900">
                                Avg sleep: {avgSleep} hrs
                            </p>
                        </div>

                        <button className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition">
                            + Add today
                        </button>
                    </div>

                    <SleepLogChart days={daysInMonth} entriesByDay={entriesByDay} />
                </div>

                <div className="lg:col-span-3 space-y-6">
                    <div className="bg-white border border-slate-200 rounded-3xl p-5">
                        <p className="text-xs text-slate-500">How to read</p>
                        <h3 className="mt-1 text-lg font-semibold text-slate-900">Legend</h3>

                        <div className="mt-4 space-y-3 text-sm text-slate-700">
                            <div className="flex items-start gap-2">
                                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                                <p>
                                    Green bar shows time asleep, from bedtime to wake-up time.
                                </p>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="mt-1 h-2 w-2 rounded-full bg-slate-400" />
                                <p>
                                    If you sleep past midnight, the bar continues on the left side.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-3xl p-5">
                        <p className="text-xs text-slate-500">Quick stats</p>
                        <h3 className="mt-1 text-lg font-semibold text-slate-900">This month</h3>

                        <div className="mt-4 space-y-2">
                            <StatRow label="Logged days" value={(data?.entries || []).length} />
                            <StatRow
                                label="Best night"
                                value={`${bestNight(data?.entries || []).toFixed(1)} hrs`}
                            />
                            <StatRow
                                label="Worst night"
                                value={`${worstNight(data?.entries || []).toFixed(1)} hrs`}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatRow = ({ label, value }) => (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
        <span className="text-sm text-slate-700">{label}</span>
        <span className="text-sm font-semibold text-slate-900">{value}</span>
    </div>
);

// Chart component (graph paper + monthly bars)
const SleepLogChart = ({ days, entriesByDay }) => {
    const width = 1000;
    const height = 760;

    const padL = 54;
    const padR = 18;
    const padT = 36;
    const padB = 28;

    const plotW = width - padL - padR;
    const plotH = height - padT - padB;

    const rowH = plotH / days; // one row per day
    const xForHour = (h) => padL + (h / 24) * plotW;

    return (
        <div className="p-6">
            <div className="w-full overflow-x-auto">
                <div className="min-w-[980px] rounded-3xl border border-slate-200 overflow-hidden bg-white">
                    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
                        {/* Grid patterns */}
                        <defs>
                            <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                                <path
                                    d="M 20 0 L 0 0 0 20"
                                    fill="none"
                                    stroke="rgba(15, 23, 42, 0.08)"
                                    strokeWidth="1"
                                />
                            </pattern>
                            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                                <rect width="100" height="100" fill="url(#smallGrid)" />
                                <path
                                    d="M 100 0 L 0 0 0 100"
                                    fill="none"
                                    stroke="rgba(15, 23, 42, 0.10)"
                                    strokeWidth="1.2"
                                />
                            </pattern>
                        </defs>

                        <rect x="0" y="0" width={width} height={height} fill="url(#grid)" />

                        {/* Top hour labels 0..23 */}
                        <g>
                            {Array.from({ length: 24 }, (_, i) => i).map((h) => (
                                <text
                                    key={h}
                                    x={xForHour(h)}
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

                        {/* Day labels 1..days */}
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
                                const e = entriesByDay.get(day);
                                if (!e) return null;

                                const y = padT + (day - 1) * rowH + rowH * 0.12;
                                const barH = rowH * 0.76;

                                // If crosses midnight: two segments
                                const segments = sleepSegments(e.sleepStart, e.wakeEnd);
                                return segments.map((seg, idx) => {
                                    const x = xForHour(seg.start);
                                    const w = xForHour(seg.end) - xForHour(seg.start);
                                    return (
                                        <rect
                                            key={`${day}-${idx}`}
                                            x={x}
                                            y={y}
                                            width={Math.max(2, w)}
                                            height={barH}
                                            rx="6"
                                            fill="rgba(16, 185, 129, 0.30)"     // green fill
                                            stroke="rgba(15, 23, 42, 0.75)"    // hand-drawn-ish outline
                                            strokeWidth="2"
                                        />
                                    );
                                });
                            })}
                        </g>

                        {/* Outer border like journal */}
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
                Later we can add: naps, wake-ups, sleep quality, and weekday highlights.
            </p>
        </div>
    );
};

// Helpers
const sleepSegments = (start, end) => {
    // start/end in 0..24, if end < start => crosses midnight
    if (end >= start) return [{ start, end }];
    return [
        { start, end: 24 },
        { start: 0, end },
    ];
};

const durationHours = (start, end) => {
    const segs = sleepSegments(start, end);
    return segs.reduce((sum, s) => sum + (s.end - s.start), 0);
};

const bestNight = (entries) => {
    if (!entries.length) return 0;
    return Math.max(...entries.map((e) => durationHours(e.sleepStart, e.wakeEnd)));
};

const worstNight = (entries) => {
    if (!entries.length) return 0;
    return Math.min(...entries.map((e) => durationHours(e.sleepStart, e.wakeEnd)));
};

export default Sleep;
