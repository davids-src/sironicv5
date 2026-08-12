import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  author: string;
  readTime: string;
  category: string;
  content: string;
  locale: string;
}

const contentDirectory = path.join(process.cwd(), "content", "blog");

export function getPostSlugs(locale: string = "hu"): string[] {
  const dirPath = path.join(contentDirectory, locale);
  if (!fs.existsSync(dirPath)) {
    return [];
  }
  return fs
    .readdirSync(dirPath)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getPostBySlug(slug: string, locale: string = "hu"): BlogPost | null {
  try {
    const fullPath = path.join(contentDirectory, locale, `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || "",
      excerpt: data.excerpt || "",
      publishedAt: data.publishedAt || "",
      author: data.author || "SIRONIC Team",
      readTime: data.readTime || "5 min read",
      category: data.category || "IT",
      content,
      locale,
    };
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
}

export function getAllPosts(locale: string = "hu", includeFuture: boolean = false): BlogPost[] {
  const slugs = getPostSlugs(locale);
  const now = new Date().toISOString().split("T")[0];

  const posts = slugs
    .map((slug) => getPostBySlug(slug, locale))
    .filter((post): post is BlogPost => post !== null)
    .filter((post) => {
      if (includeFuture) return true;
      return post.publishedAt <= now;
    })
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

  return posts;
}
