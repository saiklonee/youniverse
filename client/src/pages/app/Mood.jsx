import React, { useEffect, useMemo, useState } from "react";
import { demoApi } from "../../data/demoApi";
import { MOOD_SCALE } from "../../data/demoData";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Mood = () => {
    const [monthKey, setMonthKey] = useState("2026-02"); // YYYY-MM
    const [data, setData] = useState(null);

    useEffect(() => {
        demoApi.moodMonth().then((res) => {
            setData(res);
            setMonthKey(res.monthKey);
        });
    }, []);

    const monthLabel = useMemo(() => {
        if (!monthKey) return "";
        const [y, m] = monthKey.split("-").map(Number);
        return new Date(y, m - 1).toLocaleString("en-US", { month: "long", year: "numeric" });
    }, [monthKey]);

    const daysInMonth = useMemo(() => {
        const [y, m] = monthKey.split("-").map(Number);
        return new Date(y, m, 0).getDate();
    }, [monthKey]);

    const dayToScore = useMemo(() => {
        const map = new Map();
        (data?.entries || []).forEach((e) => map.set(e.day, e.score));
        return map;
    }, [data]);

    const points = useMemo(() => {
        // Build points only for existing entries (like the notebook tracking)
        const pts = [];
        for (let d = 1; d <= daysInMonth; d++) {
            const score = dayToScore.get(d);
            if (score == null) continue;
            pts.push({ day: d, score });
        }
        return pts;
    }, [daysInMonth, dayToScore]);

    const notes = useMemo(() => {
        return (data?.entries || [])
            .filter((e) => e.note && e.note.trim().length)
            .slice(0, 6);
    }, [data]);

    const goMonth = (dir) => {
        const [y, m] = monthKey.split("-").map(Number);
        const next = new Date(y, m - 1 + dir, 1);
        const yy = next.getFullYear();
        const mm = String(next.getMonth() + 1).padStart(2, "0");
        setMonthKey(`${yy}-${mm}`);

        // Demo stays same month data, but UI supports changing.
        // Later: fetch data for that month from backend.
    };

    return (
        <div className="space-y-6">
            <header className="flex items-end justify-between">
                <div>
                    <h2 className="text-2xl font-semibold text-slate-900">Mood Tracker</h2>
                    <p className="text-sm text-slate-600 mt-1">
                        A simple monthly graph, like a notebook tracker.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => goMonth(-1)}
                        className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition"
                        title="Previous month"
                    >
                        <FiChevronLeft />
                    </button>
                    <div className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-800">
                        {monthLabel}
                    </div>
                    <button
                        onClick={() => goMonth(1)}
                        className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition"
                        title="Next month"
                    >
                        <FiChevronRight />
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Graph paper card */}
                <div className="lg:col-span-9 bg-white border border-slate-200 rounded-3xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                        <div>
                            <p className="text-xs text-slate-500">The monthly tracker</p>
                            <p className="text-sm font-semibold text-slate-900">
                                Mood scale 1–5, one point per day
                            </p>
                        </div>

                        <button className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition">
                            + Add today
                        </button>
                    </div>

                    <GraphPaperLineChart
                        days={daysInMonth}
                        points={points}
                    />
                </div>

                {/* Legend + notes (like the side handwriting in the reference) */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="bg-white border border-slate-200 rounded-3xl p-5">
                        <p className="text-xs text-slate-500">Mood key</p>
                        <h3 className="mt-1 text-lg font-semibold text-slate-900">Scale</h3>

                        <div className="mt-4 space-y-2">
                            {MOOD_SCALE.slice().reverse().map((m) => (
                                <div
                                    key={m.value}
                                    className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2"
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">{m.emoji}</span>
                                        <span className="text-sm font-semibold text-slate-800">{m.label}</span>
                                    </div>
                                    <span className="text-xs font-semibold text-slate-600">{m.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-3xl p-5">
                        <p className="text-xs text-slate-500">Notes</p>
                        <h3 className="mt-1 text-lg font-semibold text-slate-900">Highlights</h3>

                        <div className="mt-3 space-y-3">
                            {notes.length ? (
                                notes.map((n) => (
                                    <div key={n.day} className="rounded-2xl border border-slate-200 p-3">
                                        <p className="text-xs text-slate-500">Day {n.day}</p>
                                        <p className="text-sm text-slate-700 mt-1">{n.note}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-slate-600">
                                    Add a note on tough days or best days, it becomes useful later.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Graph paper + SVG line (matches notebook vibe)
const GraphPaperLineChart = ({ days, points }) => {
    const width = 1000;
    const height = 420;

    const paddingLeft = 52;
    const paddingRight = 18;
    const paddingTop = 18;
    const paddingBottom = 44;

    const plotW = width - paddingLeft - paddingRight;
    const plotH = height - paddingTop - paddingBottom;

    const xForDay = (day) =>
        paddingLeft + ((day - 1) / Math.max(1, days - 1)) * plotW;

    // score 1..5, top is 5
    const yForScore = (score) =>
        paddingTop + ((5 - score) / 4) * plotH;

    const pathD = (() => {
        if (!points?.length) return "";
        const sorted = [...points].sort((a, b) => a.day - b.day);
        return sorted
            .map((p, i) => `${i === 0 ? "M" : "L"} ${xForDay(p.day)} ${yForScore(p.score)}`)
            .join(" ");
    })();

    return (
        <div className="p-6">
            <div className="w-full overflow-x-auto">
                <div className="min-w-[920px]">
                    <div className="rounded-3xl border border-slate-200 bg-white">
                        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
                            {/* Graph paper grid */}
                            <defs>
                                <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(15, 23, 42, 0.08)" strokeWidth="1" />
                                </pattern>
                                <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                                    <rect width="100" height="100" fill="url(#smallGrid)" />
                                    <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(15, 23, 42, 0.10)" strokeWidth="1.2" />
                                </pattern>
                            </defs>

                            <rect x="0" y="0" width={width} height={height} fill="url(#grid)" />

                            {/* Axis labels: days */}
                            <g>
                                {Array.from({ length: days }, (_, i) => i + 1)
                                    .filter((d) => d === 1 || d % 2 === 0 || d === days)
                                    .map((d) => (
                                        <text
                                            key={d}
                                            x={xForDay(d)}
                                            y={height - 18}
                                            textAnchor="middle"
                                            fontSize="12"
                                            fill="rgba(15, 23, 42, 0.55)"
                                            style={{ fontFamily: "ui-sans-serif, system-ui" }}
                                        >
                                            {d}
                                        </text>
                                    ))}
                            </g>

                            {/* Axis labels: mood score */}
                            <g>
                                {[5, 4, 3, 2, 1].map((s) => (
                                    <text
                                        key={s}
                                        x={18}
                                        y={yForScore(s) + 4}
                                        textAnchor="start"
                                        fontSize="12"
                                        fill="rgba(15, 23, 42, 0.55)"
                                        style={{ fontFamily: "ui-sans-serif, system-ui" }}
                                    >
                                        {s}
                                    </text>
                                ))}
                            </g>

                            {/* Line */}
                            {pathD ? (
                                <>
                                    <path
                                        d={pathD}
                                        fill="none"
                                        stroke="rgba(15, 23, 42, 0.92)"
                                        strokeWidth="3"
                                        strokeLinejoin="round"
                                        strokeLinecap="round"
                                    />
                                    {/* Points */}
                                    {points.map((p) => (
                                        <circle
                                            key={`${p.day}-${p.score}`}
                                            cx={xForDay(p.day)}
                                            cy={yForScore(p.score)}
                                            r="4.2"
                                            fill="rgba(15, 23, 42, 0.92)"
                                        />
                                    ))}
                                </>
                            ) : (
                                <text
                                    x={width / 2}
                                    y={height / 2}
                                    textAnchor="middle"
                                    fontSize="14"
                                    fill="rgba(15, 23, 42, 0.55)"
                                    style={{ fontFamily: "ui-sans-serif, system-ui" }}
                                >
                                    No mood entries yet. Add your first one.
                                </text>
                            )}
                        </svg>
                    </div>

                    <p className="mt-3 text-xs text-slate-500">
                        Tip: later we can support multiple lines like “anxiety”, “energy”, “focus”, just like the notebook.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Mood;
