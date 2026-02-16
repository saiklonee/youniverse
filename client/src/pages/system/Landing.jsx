import React, { useEffect, useRef } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";
import gsap from "gsap";

const Landing = () => {
    const rootRef = useRef(null);
    const navRef = useRef(null);
    const heroRef = useRef(null);
    const leftCopyRef = useRef(null);
    const rightCopyRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                navRef.current,
                { y: -14, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
            );

            gsap.fromTo(
                heroRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.05 }
            );

            gsap.fromTo(
                leftCopyRef.current?.querySelectorAll("[data-anim]"),
                { y: 18, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.75,
                    ease: "power3.out",
                    stagger: 0.08,
                    delay: 0.15,
                }
            );

            gsap.fromTo(
                rightCopyRef.current,
                { y: 14, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.75, ease: "power3.out", delay: 0.25 }
            );
        }, rootRef);

        return () => ctx.revert();
    }, []);

    return (
        <main ref={rootRef} className="relative w-full h-screen overflow-hidden bg-black">
            {/* Background */}
            <section ref={heroRef} className="absolute inset-0">
                <img
                    src="/landing/landingbanner.png"
                    alt="Landing background"
                    className="w-full h-full object-cover"
                />

                {/* Cinematic overlays (matches the reference vibe) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/10" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-black/35" />

                {/* Subtle grain */}
                <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:18px_18px]" />
            </section>

            {/* Top Nav */}
            <header className="absolute top-0 left-0 right-0 z-20">
                <div
                    ref={navRef}
                    className="mx-auto max-w-6xl px-6 lg:px-10 pt-6 flex items-center justify-between"
                >
                    <div className="flex items-center gap-2 text-white/90">
                        <img src="/textlogo.svg" alt="Logo" className="h-20 w-20" />
                    </div>

                    <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
                        <a className="hover:text-white transition" href="#features">
                            Features
                        </a>
                        <a className="hover:text-white transition" href="#modules">
                            Modules
                        </a>
                        <a className="hover:text-white transition" href="#how">
                            How it works
                        </a>
                        <a className="hover:text-white transition" href="#privacy">
                            Privacy
                        </a>
                    </nav>

                    <div className="flex items-center gap-3">
                        <button className="hidden sm:inline-flex rounded-2xl px-4 py-2 text-sm font-semibold text-white/85 border border-white/15 bg-white/10 backdrop-blur hover:bg-white/15 transition">
                            Sign in
                        </button>
                        <button className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold text-slate-900 bg-white hover:bg-slate-100 transition">
                            Get started <FiArrowUpRight />
                        </button>
                    </div>
                </div>
            </header>

            {/* Bottom content layout like the reference */}
            <section className="absolute inset-0 z-10">
                <div className="h-full mx-auto max-w-8xl px-6 lg:px-10 flex items-end pb-10">
                    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
                        {/* Left headline block */}
                        <div ref={leftCopyRef} className="lg:col-span-7">
                            <p
                                data-anim
                                className="text-xs tracking-[0.22em] uppercase text-white/55"
                            >
                                A private system for your life
                            </p>

                            <h1
                                data-anim
                                className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white"
                            >
                                Organize your world.
                                <br />
                                Live lighter.
                            </h1>

                            <p
                                data-anim
                                className="mt-4 text-base sm:text-lg text-white/75 max-w-2xl"
                            >
                                Closet, documents, trackers, and routines, all in one calm place.
                                Built to feel like your personal universe, not another noisy app.
                            </p>

                            <div data-anim className="mt-7 flex flex-col sm:flex-row gap-3">
                                <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100 transition">
                                    Enter Youniverse <FiArrowUpRight />
                                </button>
                                <button className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white/85 backdrop-blur hover:bg-white/15 transition">
                                    Explore modules
                                </button>
                            </div>
                        </div>

                        {/* Right side small copy block */}
                        <div
                            ref={rightCopyRef}
                            className="lg:col-span-5 lg:pl-6 border-t border-white/10 lg:border-t-0 lg:border-l lg:border-white/10 pt-6 lg:pt-0"
                        >
                            <p className="text-sm text-white/70 leading-relaxed">
                                Start with what you own, your clothes, gadgets, essentials. Add your
                                document vault next, then trackers like sleep and mood when you are ready.
                            </p>

                            <div className="mt-5 space-y-2">
                                <div className="flex items-center gap-2 text-white/70 text-sm">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                    Closet inventory and outfits
                                </div>
                                <div className="flex items-center gap-2 text-white/70 text-sm">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                    Document vault with reminders
                                </div>
                                <div className="flex items-center gap-2 text-white/70 text-sm">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                    Simple dashboard, clean analytics
                                </div>
                            </div>

                            <p className="mt-6 text-xs text-white/50">
                                Privacy-first by design. Your data stays yours.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Landing;
