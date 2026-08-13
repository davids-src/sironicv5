import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getPostSlugs } from "@/lib/blog";
import SectionReveal from "@/components/ui/SectionReveal";
import CtaBlock from "@/components/ui/CtaBlock";
import { ArrowLeft, Calendar, User, Clock, ShieldCheck } from "lucide-react";
import styles from "./page.module.css";

export const revalidate = 3600;
export const dynamicParams = true;

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const locales = ["hu", "en"];
  const params: Array<{ locale: string; slug: string }> = [];

  for (const locale of locales) {
    const slugs = getPostSlugs(locale);
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);

  if (!post) {
    return { title: "Cikk nem található | SIRONIC" };
  }

  return {
    title: `${post.title} | SIRONIC Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `https://sironic.eu/${locale}/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      url: `https://sironic.eu/${locale}/blog/${slug}`,
    },
  };
}

function parseMarkdownToHtml(markdown: string): string {
  let html = markdown
    // Headings
    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
    // Bold
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    // Italic
    .replace(/\*(.*?)\*/g, "<em>$1</em>");

  // Split into blocks
  const blocks = html.split(/\n\n+/);
  const formattedBlocks = blocks.map((block) => {
    block = block.trim();
    if (block.startsWith("<h1") || block.startsWith("<h2") || block.startsWith("<h3")) {
      return block;
    }
    if (block.startsWith("- ")) {
      const items = block
        .split("\n")
        .map((line) => line.replace(/^- /, "").trim())
        .map((item) => `<li>${item}</li>`)
        .join("");
      return `<ul>${items}</ul>`;
    }
    if (/^\d+\. /.test(block)) {
      const items = block
        .split("\n")
        .map((line) => line.replace(/^\d+\. /, "").trim())
        .map((item) => `<li>${item}</li>`)
        .join("");
      return `<ol>${items}</ol>`;
    }
    return `<p>${block}</p>`;
  });

  return formattedBlocks.join("");
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  const isHu = locale === "hu";
  const contentHtml = parseMarkdownToHtml(post.content);
  const freeAssessmentHref = `/${locale}/${isHu ? "ingyenes-felmeres" : "free-assessment"}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "SIRONIC",
      url: "https://sironic.eu",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className={`${styles.hero} bg-grid`}>
        <div className="container" style={{ maxWidth: 880 }}>
          <SectionReveal>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href={`/${locale}`}>{isHu ? "Főoldal" : "Home"}</Link>
              <span>/</span>
              <Link href={`/${locale}/blog`}>Blog</Link>
              <span>/</span>
              <span>{post.category}</span>
            </nav>

            <span className="badge">
              <ShieldCheck size={13} style={{ marginRight: 6 }} />
              {post.category}
            </span>

            <h1 className={`heading-1 ${styles.title}`}>{post.title}</h1>

            <div className={styles.metaBar}>
              <div className={styles.metaItem}>
                <Calendar size={15} />
                <span>{post.publishedAt}</span>
              </div>
              <div className={styles.metaItem}>
                <User size={15} />
                <span>{post.author}</span>
              </div>
              <div className={styles.metaItem}>
                <Clock size={15} />
                <span>{post.readTime}</span>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      <section className={styles.articleSection}>
        <div className="container">
          <div className={styles.articleContainer}>
            <SectionReveal>
              <div
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />
            </SectionReveal>

            <div className={styles.backRow}>
              <Link href={`/${locale}/blog`} className="btn btn-outline">
                <ArrowLeft size={16} />
                {isHu ? "Vissza a blogbejegyzésekhez" : "Back to Blog Posts"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBlock
        title={isHu ? "Szeretné felmérni rendszere kiberbiztonságát?" : "Want to assess your system cybersecurity?"}
        subtitle={
          isHu
            ? "Kérje ingyenes helyszíni informatikai állapotfelmérésünket, és kapjon részletes képet rendszereiről!"
            : "Request our free on-site IT assessment and get a detailed overview of your systems!"
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
