import React, { useEffect, useMemo, useState } from "react";
import { demoApi } from "../../data/demoApi";

const Dashboard = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const load = async () => {
            const [closet, docs, sleepMonth, moodMonth, habits, assets, studyMonth] =
                await Promise.all([
                    demoApi.closet(),
                    demoApi.documents(),
                    demoApi.sleepMonth(),
                    demoApi.moodMonth(),
                    demoApi.habits(),
                    demoApi.assets(),
                    demoApi.studyMonth(),
                ]);

            const sleepEntries = sleepMonth?.entries || [];
            const moodEntries = moodMonth?.entries || [];
            const studyEntries = studyMonth?.entries || [];

            const avgSleepHours = calcAvgSleep(sleepEntries); // number
            const totalStudyHours = studyEntries.reduce(
                (sum, e) => sum + (e.hours || 0),
                0
            );
            const avgStudyHours =
                studyEntries.length > 0
                    ? totalStudyHours / studyEntries.length
                    : 0;

            setStats({
                closetCount: closet.length,
                docCount: docs.length,
                avgSleep: avgSleepHours.toFixed(1),
                sleepDays: sleepEntries.length,

                moodCount: moodEntries.length,

                habitsCount: habits.length,
                assetsCount: assets.length,

                totalStudy: totalStudyHours.toFixed(1),
                avgStudy: avgStudyHours.toFixed(1),
            });
        };

        load();
    }, []);

    const nextActions = useMemo(
        () => [
            "Add 5 more closet items to improve recommendations.",
            "Upload your top 3 documents and set expiry reminders.",
            "Log sleep for 7 days to get meaningful insights.",
            "Track study daily to build consistency.",
        ],
        []
    );

    if (!stats) return <Skeleton />;

    return (
        <div className="space-y-8">
            <header>
                <h2 className="text-2xl font-semibold text-slate-900">Overview</h2>
                <p className="text-sm text-slate-600 mt-1">
                    Snapshot of your world, powered by demo data.
                </p>
            </header>

            {/* Row 1 */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card title="Closet items" value={stats.closetCount} />
                <Card title="Documents saved" value={stats.docCount} />
                <Card title="Avg sleep (hrs)" value={stats.avgSleep} sub={`Logged ${stats.sleepDays} days`} />
            </section>

            {/* Row 2 */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card title="Mood logs (month)" value={stats.moodCount} />
                <Card title="Study total (hrs)" value={stats.totalStudy} sub={`Avg ${stats.avgStudy}/day`} />
                <Card title="Assets" value={stats.assetsCount} />
            </section>

            {/* Row 3 */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card title="Habits tracked" value={stats.habitsCount} />
                <Card title="Active modules" value={6} sub="Closet, Docs, Sleep, Mood, Study, Assets" />
                <Card title="System status" value="Demo" sub="Local data until backend" />
            </section>

            {/* Next actions */}
            <section className="bg-white border border-slate-200 rounded-2xl p-6">
                <h3 className="font-semibold text-slate-900">Next actions</h3>
                <ul className="mt-3 text-sm text-slate-600 space-y-2">
                    {nextActions.map((t, idx) => (
                        <li key={idx}>• {t}</li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

const Card = ({ title, value, sub }) => (
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <p className="text-sm text-slate-500">{title}</p>
        <h3 className="text-2xl font-semibold text-slate-900 mt-2">{value}</h3>
        {sub ? <p className="text-xs text-slate-500 mt-2">{sub}</p> : null}
    </div>
);

const Skeleton = () => (
    <div className="space-y-6">
        <div className="h-8 w-44 bg-slate-200 rounded-xl animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-28 bg-slate-200 rounded-2xl animate-pulse" />
            <div className="h-28 bg-slate-200 rounded-2xl animate-pulse" />
            <div className="h-28 bg-slate-200 rounded-2xl animate-pulse" />
        </div>
    </div>
);

// Sleep helpers (start/end in 0..24, end < start => crosses midnight)
const sleepSegments = (start, end) => {
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

const calcAvgSleep = (entries) => {
    if (!entries || entries.length === 0) return 0;
    const total = entries.reduce(
        (sum, e) => sum + durationHours(e.sleepStart, e.wakeEnd),
        0
    );
    return total / entries.length;
};

export default Dashboard;
