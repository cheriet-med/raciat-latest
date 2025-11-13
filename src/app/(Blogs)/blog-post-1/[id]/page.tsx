// app/blog/[id]/page.tsx
import Layout from "@/components/layouts/Layout-defaul";
import BlogPostClient from "@/components/blogs/BlogPostClient";
import { allBlogs } from "@/data/blog";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  
  return (
    <Layout>
      <BlogPostClient id={id} />
    </Layout>
  );
}

// Optional: Keep generateStaticParams for pre-rendering popular posts
export async function generateStaticParams() {
  // You can pre-render some popular posts
  // Or return an empty array if you want fully dynamic rendering
  return allBlogs.slice(0, 5).map((property) => ({
    id: String(property.id),
  }));
}

// Optional: Add dynamic metadata
export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  
  return {
    title: `مقال ${id}`,
    description: `تفاصيل المقال رقم ${id}`,
  };
}