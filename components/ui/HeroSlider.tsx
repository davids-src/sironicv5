"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import styles from "./HeroSlider.module.css";

export interface Slide {
  badge: string;
  title: string;
  subtitle: string;
  cta1: { label: string; href: string };
  cta2?: { label: string; href: string; external?: boolean };
}

interface Props {
  slides: Slide[];
  autoPlayMs?: number;
}

export default function HeroSlider({ slides, autoPlayMs = 6000 }: Props) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const go = useCallback((next: number, dir: number) => {
    setDirection(dir);
    setCurrent(next);
  }, []);

  const prev = () => go((current - 1 + slides.length) % slides.length, -1);
  const next = () => go((current + 1) % slides.length, 1);

  useEffect(() => {
    const t = setInterval(() => go((current + 1) % slides.length, 1), autoPlayMs);
    return () => clearInterval(t);
  }, [current, go, slides.length, autoPlayMs]);

  const slide = slides[current];

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -60 : 60 }),
  };

  return (
    <section className={`${styles.hero} bg-grid`} aria-label="Hero slider">
      {/* Radial glow */}
      <div className={styles.glow} aria-hidden />

      <div className={`container ${styles.inner}`}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            className={styles.slide}
            custom={direction}
            variants={variants}
            initial={false}
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.span
              className="badge"
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              {slide.badge}
            </motion.span>

            <motion.h1
              className={`display-1 ${styles.title}`}
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              {slide.title}
            </motion.h1>

            <motion.p
              className={`body-lg ${styles.subtitle}`}
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              {slide.subtitle}
            </motion.p>

            <motion.div
              className={styles.ctas}
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
            >
              <Link href={slide.cta1.href} className="btn btn-primary btn-lg">
                {slide.cta1.label}
              </Link>
              {slide.cta2 && (
                slide.cta2.external ? (
                  <a
                    href={slide.cta2.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-lg"
                  >
                    {slide.cta2.label}
                  </a>
                ) : (
                  <Link href={slide.cta2.href} className="btn btn-outline btn-lg">
                    {slide.cta2.label}
                  </Link>
                )
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <button onClick={prev} className={styles.arrow} aria-label="Előző slide">
          <ChevronLeft size={20} />
        </button>
        <div className={styles.dots} role="tablist">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === current ? styles.dotActive : ""}`}
              onClick={() => go(i, i > current ? 1 : -1)}
              aria-label={`${i + 1}. slide`}
              role="tab"
              aria-selected={i === current}
            />
          ))}
        </div>
        <button onClick={next} className={styles.arrow} aria-label="Következő slide">
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Scroll indicator */}
      <AnimatePresence>
        {!scrolled && (
          <motion.a
            href="#main-content"
            className={styles.scrollIndicator}
            aria-label="Görgessen le a tartalomhoz"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <ChevronDown size={22} />
          </motion.a>
        )}
      </AnimatePresence>

      {/* Bottom fade */}
      <div className={styles.bottomFade} aria-hidden />
    </section>
  );
}
