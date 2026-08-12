import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import SectionReveal from "@/components/ui/SectionReveal";
import CtaBlock from "@/components/ui/CtaBlock";
import { ArrowRight, Calendar, BookOpen } from "lucide-react";
import styles from "./page.module.css";

export const revalidate = 3600;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isHu = locale === "hu";
  return {
    title: isHu
      ? "Blog & Informatikai Útmutatók | SIRONIC"
      : "Blog & IT Guides | SIRONIC",
    description: isHu
      ? "Szakmai cikkek, kiberbiztonsági útmutatók, NIS2 megfelelőségi tippek és KKV IT tanácsok a SIRONIC szakértőitől."
      : "Professional articles, cybersecurity guides, NIS2 compliance tips, and SME IT advice from SIRONIC experts.",
    alternates: {
      canonical: `https://sironic.eu/${locale}/blog`,
    },
  };
}

export default async function BlogIndexPage({ params }: Props) {
  const { locale } = await params;
  const posts = getAllPosts(locale);
  const isHu = locale === "hu";
  const freeAssessmentHref = `/${locale}/${isHu ? "ingyenes-felmeres" : "free-assessment"}`;

  return (
    <>
      <section className={`${styles.hero} bg-grid`}>
        <div className="container">
          <SectionReveal>
            <nav className="breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: "1rem" }}>
              <Link href={`/${locale}`}>{isHu ? "Főoldal" : "Home"}</Link>
              <span>/</span>
              <span>Blog</span>
            </nav>

            <span className="badge">
              <BookOpen size={13} style={{ marginRight: 6 }} />
              {isHu ? "Tudásbázis & Hírek" : "Knowledge Base & News"}
            </span>

            <h1 className={`display-2 ${styles.heroTitle}`}>
              {isHu ? "SIRONIC Blog & Szakmai Útmutatók" : "SIRONIC Blog & IT Guides"}
            </h1>
            <p className="body-lg" style={{ maxWidth: 680 }}>
              {isHu
                ? "Gyakorlati tanácsok, kiberbiztonsági és NIS2 útmutatók kis- és középvállalkozások döntéshozóinak."
                : "Practical advice, cybersecurity, and NIS2 guides for SME decision-makers."}
            </p>
          </SectionReveal>
        </div>
        <div className={styles.heroGlow} aria-hidden />
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            {posts.map((post, idx) => (
              <SectionReveal key={post.slug} delay={idx * 0.08}>
                <article className={styles.card}>
                  <div className={styles.metaRow}>
                    <span className={styles.categoryBadge}>{post.category}</span>
                    <span className={styles.readTime}>{post.readTime}</span>
                  </div>

                  <h2 className={styles.postTitle}>
                    <Link href={`/${locale}/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  <p className={styles.excerpt}>{post.excerpt}</p>

                  <div className={styles.footerRow}>
                    <span className={styles.date}>
                      <Calendar size={14} />
                      {post.publishedAt}
                    </span>
                    <Link href={`/${locale}/blog/${post.slug}`} className={styles.readMore}>
                      {isHu ? "Cikk olvasása" : "Read Article"} <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBlock
        title={isHu ? "Személyre szabott IT tanácsadásra van szüksége?" : "Need personalized IT advice?"}
        subtitle={
          isHu
            ? "Vegye igénybe ingyenes helyszíni informatikai állapotfelmérésünket, és derítsük fel rendszere kockázatait!"
            : "Take advantage of our free on-site IT assessment and identify risks in your system!"
        }
        cta1={{
          label: isHu ? "Kérem az ingyenes felmérést" : "Request Free Assessment",
          href: freeAssessmentHref,
        }}
        cta2={{
          label: isHu ? "Kapcsolatfelvétel" : "Contact Us",
          href: `/${locale}/kapcsolat`,
        }}
      />
    </>
  );
}
