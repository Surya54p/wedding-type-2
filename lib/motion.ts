import { type Transition, type Variants } from "motion/react";

export const luxuryTransition: Transition = {
    duration: 0.75,
    ease: [0.22, 1, 0.36, 1],
};

export const softTransition: Transition = {
    duration: 0.6,
    ease: [0.25, 0.1, 0.25, 1],
};

export const viewportReveal = {
    once: true,
    margin: "0px 0px -25% 0px",
    amount: "some" as const,
};

export const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: luxuryTransition,
    },
};

export const fadeInDown: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: luxuryTransition,
    },
};

export const fadeInScale: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: luxuryTransition,
    },
};

export const staggerContainer = (staggerChildren = 0.15, delayChildren = 0.1): Variants => ({
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren,
            delayChildren,
        },
    },
});

export const cardReveal: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};
