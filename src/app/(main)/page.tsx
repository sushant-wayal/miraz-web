"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { AboutContent } from "@/components/about-content";

const arr = ["Events", "Sponsors", "Team", "Keytalks", "Faq"];
const len = arr.length;

export default function Home() {
    const sections = [<HomeSection1 key={1} />, <HomeSection2 key={2} />];

    return (
        <main>
            <div className="lg:h-screen lg:snap-y lg:snap-mandatory lg:overflow-y-scroll">
                {sections.map((section, index) => (
                    <SectionWrapper key={index}>{section}</SectionWrapper>
                ))}
            </div>
        </main>
    );
}

const SectionWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className="grid min-h-screen place-content-center lg:h-screen lg:snap-center">
                {children}
            </div>
        </>
    );
};

const HomeSection1 = () => {
    const router = useRouter();
    const [count, setCount] = useState(0);

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === "ArrowDown") {
                event.preventDefault();
                setCount((prevCount) => (prevCount + 1) % len);
                const sound = new Audio("menuItemChange.wav");
                sound.play();
            } else if (event.key === "ArrowUp") {
                event.preventDefault();
                setCount((prevCount) => (prevCount - 1) % len);
                const sound = new Audio("menuItemChange.wav");
                sound.play();
            } else if (event.key === "Enter") {
                event.preventDefault();
                router.push(`/${arr.at(count)!.toLowerCase()}`);
            }
        },
        [count, router],
    );

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <>
            <h1
                className={
                    " mb-10 text-center text-7xl font-medium md:text-9xl lg:text-[10rem]"
                }
            >
                Miraz
            </h1>

            <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{
                    opacity: [0, 1],
                    scale: [0.7, 1],
                }}
                transition={{ scale: { duration: 0.5 } }}
                className="flex flex-col items-center justify-center space-y-4"
            >
                <div className="text-xl opacity-50  md:text-3xl">
                    {arr.at(count - 1)}
                </div>
                <div className="text-3xl md:text-6xl">{arr.at(count)}</div>
                <div className="text-xl opacity-50 md:text-3xl">
                    {arr.at((count + 1) % len)}
                </div>
            </motion.div>
        </>
    );
};

const HomeSection2 = () => {
    return (
        <>
            <AboutContent />
        </>
    );
};
