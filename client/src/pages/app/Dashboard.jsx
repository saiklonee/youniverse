import React, { useEffect, useState } from "react";
import { demoApi } from "../../data/demoApi";

const Dashboard = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const load = async () => {
            const [closet, docs, sleep, mood, habits, assets] = await Promise.all([
                demoApi.closet(),
                demoApi.documents(),
                demoApi.sleep(),
                demoApi.mood(),
                demoApi.habits(),
                demoApi.assets(),
            ]);

            const avgSleep =
                sleep.reduce((a, b) => a + b.hours, 0) / Math.max(1, sleep.length);

            setStats({
                closetCount: closet.length,
                docCount: docs.length,
                avgSleep: avgSleep.toFixed(1),
                moodCount: mood.length,
                habitsCount: habits.length,
                assetsCount: assets.length,
            });
        };
        load();
    }, []);

    if (!stats) return <Skeleton />;

    return (
        <div className="space-y-8">
            <header>
                <h2 className="text-2xl font-semibold text-slate-900">Overview</h2>
                <p className="text-sm text-slate-600 mt-1">
                    Snapshot of your world, powered by demo data.
                </p>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card title="Closet items" value={stats.closetCount} />
                <Card title="Documents saved" value={stats.docCount} />
                <Card title="Avg sleep (hrs)" value={stats.avgSleep} />
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card title="Mood logs" value={stats.moodCount} />
                <Card title="Habits tracked" value={stats.habitsCount} />
                <Card title="Assets" value={stats.assetsCount} />
            </section>

            <section className="bg-white border border-slate-200 rounded-2xl p-6">
                <h3 className="font-semibold text-slate-900">Next actions</h3>
                <ul className="mt-3 text-sm text-slate-600 space-y-2">
                    <li>• Add 5 more closet items to improve recommendations.</li>
                    <li>• Upload your top 3 documents and set expiry reminders.</li>
                    <li>• Log sleep for 7 days to get meaningful insights.</li>
                </ul>
            </section>
        </div>
    );
};

const Card = ({ title, value }) => (
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <p className="text-sm text-slate-500">{title}</p>
        <h3 className="text-2xl font-semibold text-slate-900 mt-2">{value}</h3>
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

export default Dashboard;
