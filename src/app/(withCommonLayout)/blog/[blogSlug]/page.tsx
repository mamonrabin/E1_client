
import BlogDetails from "@/src/components/blog/BlogDetails";
import { apiBaseUrl } from "@/src/config/config";
import { getBlogBySlug } from "@/src/services/blogs";
// import PageSection from "@/src/utilits/PageSection";
import { notFound } from "next/navigation";

interface SlugProps {
  params: Promise<{
    blogSlug: string;
  }>;
}

const BlogPage = async ({ params }: SlugProps) => {
  const { blogSlug } = await params;
  const { data: blog } = await getBlogBySlug(blogSlug);

  if (!blog) {
    notFound();
  }

  const imageUrl = blog.image?.startsWith("http")
    ? blog.image
    : `${apiBaseUrl}${blog.image}`;

  return (
    <main className="min-h-screen bg-white">
      {/* <PageSection second="Blog Details" /> */}
      <BlogDetails blog={blog} imageUrl={imageUrl} />
    </main>
  );
};

export default BlogPage;
