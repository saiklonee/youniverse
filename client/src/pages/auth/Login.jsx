import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaGoogle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { BsShieldLockFill } from "react-icons/bs";
import gsap from "gsap";

const Login = () => {
    const [mode, setMode] = useState("signin"); // signin | signup
    const [loading, setLoading] = useState(false);
    const [showPwd, setShowPwd] = useState(false);
    const [showPwd2, setShowPwd2] = useState(false);

    const rootRef = useRef(null);
    const leftRef = useRef(null);
    const cardRef = useRef(null);
    const formRef = useRef(null);
    const modePillRef = useRef(null);

    const title = useMemo(
        () => (mode === "signin" ? "Welcome back" : "Create your account"),
        [mode]
    );
    const subtitle = useMemo(
        () =>
            mode === "signin"
                ? "Sign in to access your personal world."
                : "Set up your space in under a minute.",
        [mode]
    );

    useEffect(() => {
        // Initial entrance
        const ctx = gsap.context(() => {
            gsap.fromTo(
                leftRef.current,
                { opacity: 0, y: 18, scale: 0.99 },
                { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out" }
            );

            gsap.fromTo(
                cardRef.current,
                { opacity: 0, y: 22 },
                { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.1 }
            );

            gsap.fromTo(
                formRef.current,
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.55, ease: "power3.out", delay: 0.2 }
            );
        }, rootRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        // Animate mode switch
        const ctx = gsap.context(() => {
            if (modePillRef.current) {
                gsap.fromTo(
                    modePillRef.current,
                    { scale: 0.98, opacity: 0.8 },
                    { scale: 1, opacity: 1, duration: 0.35, ease: "power2.out" }
                );
            }
            if (formRef.current) {
                gsap.fromTo(
                    formRef.current,
                    { y: 8, opacity: 0.85 },
                    { y: 0, opacity: 1, duration: 0.35, ease: "power2.out" }
                );
            }
        }, rootRef);

        return () => ctx.revert();
    }, [mode]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // TODO: call your API
            await new Promise((r) => setTimeout(r, 700));
        } finally {
            setLoading(false);
        }
    };

    return (
        <main
            ref={rootRef}
            className="h-screen w-full relative flex p-4 gap-4 bg-slate-50"
        >
            {/* Left visual (keep base) */}
            <div
                ref={leftRef}
                className="w-2/3 h-full overflow-hidden rounded-3xl relative border border-slate-200 shadow-sm"
            >
                <img
                    src="/auth/boat.png"
                    alt="Background"
                    className="w-full h-full object-cover"
                />

                {/* Overlay for contrast */}
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/75 via-slate-950/30 to-transparent" />

                {/* Soft blobs */}
                <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />
                <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-rose-400/20 blur-3xl" />

                {/* Tag + text */}
                <div className="absolute left-10 bottom-10 right-10">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-white/90 backdrop-blur">
                        <HiSparkles className="text-white/90" />
                        <span className="text-sm">Private, organized, always yours</span>
                    </div>

                    <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">
                        Your personal world,
                        <br />
                        in one place.
                    </h1>
                    <p className="mt-3 max-w-xl text-white/80">
                        Track your closet, store important documents, and keep everything
                        tidy with a clean dashboard.
                    </p>
                </div>
            </div>

            {/* Right auth card (keep base) */}
            <div className="w-1/3 h-full flex items-center justify-center rounded-3xl overflow-hidden">
                <div
                    ref={cardRef}
                    className="w-full h-full bg-white border border-slate-200 shadow-sm flex items-center justify-center"
                >
                    <div className="w-full max-w-sm py-10">
                        {/* Brand header */}
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-xs font-medium text-slate-500">Youniverse</p>
                                <h2 className="mt-1 text-2xl font-semibold text-slate-900">
                                    {title}
                                </h2>
                                <p className="mt-2 text-sm text-slate-600">{subtitle}</p>
                            </div>

                            <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-700">
                                <BsShieldLockFill className="text-slate-700" />
                                <span className="text-xs font-semibold">Secure</span>
                            </div>
                        </div>

                        {/* Mode toggle */}
                        <div className="mt-6 grid grid-cols-2 rounded-2xl bg-slate-100 p-1">
                            <button
                                type="button"
                                onClick={() => setMode("signin")}
                                className={`rounded-2xl px-4 py-2 text-sm font-medium transition ${mode === "signin"
                                    ? "bg-white text-slate-900 shadow-sm"
                                    : "text-slate-600 hover:text-slate-900"
                                    }`}
                            >
                                Sign in
                            </button>
                            <button
                                type="button"
                                onClick={() => setMode("signup")}
                                className={`rounded-2xl px-4 py-2 text-sm font-medium transition ${mode === "signup"
                                    ? "bg-white text-slate-900 shadow-sm"
                                    : "text-slate-600 hover:text-slate-900"
                                    }`}
                            >
                                Sign up
                            </button>
                        </div>

                        <div ref={modePillRef} />

                        <form
                            ref={formRef}
                            onSubmit={onSubmit}
                            className="mt-6 space-y-4"
                        >
                            {mode === "signup" && (
                                <Field icon={<HiSparkles />} label="Full name">
                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        className={inputCls}
                                    />
                                </Field>
                            )}

                            <Field label="Email">
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    className={inputCls}
                                />
                            </Field>

                            <Field label="Password">
                                <div className="relative">
                                    <input
                                        type={showPwd ? "text" : "password"}
                                        placeholder="••••••••"
                                        autoComplete={
                                            mode === "signin" ? "current-password" : "new-password"
                                        }
                                        className={`${inputCls} pr-12`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPwd((s) => !s)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                                        aria-label={showPwd ? "Hide password" : "Show password"}
                                    >
                                        {showPwd ? <FaRegEyeSlash /> : <FaRegEye />}
                                    </button>
                                </div>
                            </Field>

                            {mode === "signup" && (
                                <Field label="Confirm password">
                                    <div className="relative">
                                        <input
                                            type={showPwd2 ? "text" : "password"}
                                            placeholder="••••••••"
                                            autoComplete="new-password"
                                            className={`${inputCls} pr-12`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPwd2((s) => !s)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                                            aria-label={showPwd2 ? "Hide password" : "Show password"}
                                        >
                                            {showPwd2 ? <FaRegEyeSlash /> : <FaRegEye />}
                                        </button>
                                    </div>
                                </Field>
                            )}

                            {mode === "signin" && (
                                <div className="flex items-center justify-between">
                                    <label className="flex items-center gap-2 text-sm text-slate-600">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                        Remember me
                                    </label>
                                    <button
                                        type="button"
                                        className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                                    >
                                        Forgot password?
                                    </button>
                                </div>
                            )}

                            <button
                                disabled={loading}
                                className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed"
                                type="submit"
                            >
                                {loading
                                    ? "Please wait..."
                                    : mode === "signin"
                                        ? "Sign in"
                                        : "Create account"}
                            </button>

                            <div className="relative py-2">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-200" />
                                </div>
                                <div className="relative flex justify-center">
                                    <span className="bg-white px-3 text-xs text-slate-500">OR</span>
                                </div>
                            </div>

                            <p className="pt-2 text-center text-xs text-slate-500">
                                By continuing, you agree to our{" "}
                                <span className="text-slate-800">Terms</span> and{" "}
                                <span className="text-slate-800">Privacy Policy</span>.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
};

const inputCls =
    "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15";

const Field = ({ label, icon, children }) => {
    return (
        <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                {icon ? <span className="text-slate-500">{icon}</span> : null}
                {label}
            </label>
            {children}
        </div>
    );
};

export default Login;
