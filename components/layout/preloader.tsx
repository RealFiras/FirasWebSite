"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const startedAt = Date.now();
        const duration = 1150;

        const progressTimer = window.setInterval(() => {
            const elapsed = Date.now() - startedAt;
            setProgress(Math.min(Math.round((elapsed / duration) * 100), 100));
        }, 16);

        const loadingTimer = window.setTimeout(() => {
            setProgress(100);
            setIsLoading(false);
            document.body.style.overflow = "";
        }, 1250);

        document.body.style.overflow = "hidden";

        return () => {
            window.clearInterval(progressTimer);
            window.clearTimeout(loadingTimer);
            document.body.style.overflow = "";
        };
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    key="preloader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] } }}
                    className="fixed inset-0 z-99999 overflow-hidden bg-background px-container pointer-events-auto"
                    role="status"
                    aria-label="Loading FRL portfolio"
                >
                    <motion.div
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        exit={{ scaleY: 0, transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-y-0 left-[12%] w-px origin-top bg-border/50 sm:left-[18%]"
                    />
                    <motion.div
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        exit={{ scaleY: 0, transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } }}
                        transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-y-0 right-[12%] w-px origin-bottom bg-border/50 sm:right-[18%]"
                    />

                    <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col justify-between py-8 sm:py-12 lg:py-16">
                        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground/70 sm:text-xs">
                            <motion.span
                                initial={{ opacity: 0, x: -14 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.25 }}
                            >
                                FRL / 001
                            </motion.span>
                            <motion.span
                                initial={{ opacity: 0, x: 14 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.35 }}
                            >
                                Personal Portfolio
                            </motion.span>
                        </div>

                        <div className="flex flex-col items-center justify-center gap-10 text-center">
                            <div className="relative">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.78, rotate: -8 }}
                                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                    transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                                    className="select-none text-[clamp(5rem,16vw,12rem)] font-black leading-[0.78] tracking-[-0.1em] text-foreground"
                                >
                                    FRL
                                </motion.div>
                                <motion.div
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{ width: "72%", opacity: 1 }}
                                    transition={{ duration: 0.75, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                                    className="absolute -bottom-5 left-1/2 h-1 -translate-x-1/2 bg-primary sm:-bottom-7"
                                />
                            </div>

                            <motion.p
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.62 }}
                                className="font-mono text-[10px] uppercase tracking-[0.32em] text-muted-foreground sm:text-xs"
                            >
                                Firas Mahmoud
                            </motion.p>
                        </div>

                        <div className="flex items-end justify-between gap-8">
                            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground/70 sm:text-xs">
                                <motion.span
                                    animate={{ opacity: [0.35, 1, 0.35] }}
                                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                                    className="h-1.5 w-1.5 rounded-full bg-primary"
                                />
                                Initializing
                            </div>

                            <div className="flex min-w-36 flex-col items-end gap-3 sm:min-w-52">
                                <div className="flex w-full items-center justify-between font-mono text-[10px] tracking-[0.2em] text-muted-foreground sm:text-xs">
                                    <span>Loading</span>
                                    <span className="text-foreground">{String(progress).padStart(3, "0")}%</span>
                                </div>
                                <div className="h-px w-full overflow-hidden bg-border/60">
                                    <motion.div
                                        className="h-full origin-left bg-foreground"
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 0.08, ease: "linear" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
