"use client";

import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Article } from "@/types/article";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { createBlog, updateBlog, deleteBlog } from "@/lib/admin-functions";
import { toISOString } from "@/lib/blog-utils";
import { Plus, Edit, Trash2, X, LayoutGrid, List } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ImageUpload } from "@/components/admin/ImageUpload";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate, getTagBgColor } from "@/lib/blog-utils";

// Admin Blog Card Component
function AdminBlogCard({ 
  blog, 
  onEdit, 
  onDelete, 
  getValidImageUrl 
}: { 
  blog: Article; 
  onEdit: () => void; 
  onDelete: () => void;
  getValidImageUrl: (url: string) => string;
}) {
  const [imageLoading, setImageLoading] = useState(true);
  const formattedDate = formatDate(blog);
  
  return (
    <div className="bg-card rounded-2xl overflow-hidden flex flex-col relative group">
      {/* Image */}
      <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden">
        {imageLoading && (
          <Skeleton className="absolute inset-0 w-full h-full rounded-2xl" />
        )}
        <Image
          src={getValidImageUrl(blog.imageURL)}
          alt={blog.title}
          fill
          className="object-cover rounded-2xl"
          onLoad={() => setImageLoading(false)}
          onError={() => setImageLoading(false)}
        />
        {/* Action buttons overlay */}
        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <Button
            variant="secondary"
            size="icon"
            onClick={onEdit}
            className="h-8 w-8 bg-white/90 hover:bg-white"
          >
            <Edit className="h-3 w-3" />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={onDelete}
            className="h-8 w-8 bg-white/90 hover:bg-white"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
        {blog.isPopular && (
          <div className="absolute top-2 left-2">
            <Badge variant="default">Featured</Badge>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="pt-6 pr-6 pb-6 flex-grow flex flex-col">
        <p className="text-sm text-muted-foreground mb-3">{formattedDate}</p>
        <h3 className="text-xl font-display font-bold text-foreground mb-3 line-clamp-2 leading-tight">
          {blog.title}
        </h3>
        <p className="text-base text-muted-foreground mb-4 flex-grow line-clamp-3 leading-relaxed">
          {blog.excerpt}
        </p>
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {blog.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="text-sm px-3 py-1 rounded-md"
                style={{ backgroundColor: getTagBgColor(tag) }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="text-xs text-muted-foreground mt-auto">
          <p>Author: {blog.author.name}</p>
          <p className="mt-1">Slug: {blog.slug}</p>
        </div>
      </div>
    </div>
  );
}

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Article | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    imageURL: "",
    tags: [] as string[],
    authorName: "",
    authorAvatarURL: "",
    isPopular: false,
    slug: "",
  });
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'blogs'));
      const blogsData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          slug: data.slug || '',
          title: data.title || '',
          excerpt: data.excerpt || '',
          imageURL: data.imageURL || '',
          tags: data.tags || [],
          content: data.content || '',
          author: data.author || { name: 'Unknown', avatarURL: '' },
          date: toISOString(data.date) || toISOString(data.createdAt),
          createdAt: toISOString(data.createdAt),
          lastUpdated: toISOString(data.lastUpdated),
          isPopular: data.isPopular || false,
        } as Article;
      });
      blogsData.sort((a, b) => {
        const getDate = (article: Article): number => {
          const dateValue = article.lastUpdated || article.createdAt || article.date;
          if (!dateValue) return 0;
          try {
            if (typeof dateValue === 'string') {
              return new Date(dateValue).getTime();
            }
            return 0;
          } catch {
            return 0;
          }
        };
        return getDate(b) - getDate(a);
      });
      setBlogs(blogsData);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch blogs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingBlog) {
        await updateBlog(editingBlog.id, formData);
        toast({
          title: "Success",
          description: "Blog updated successfully",
        });
      } else {
        await createBlog(formData);
        toast({
          title: "Success",
          description: "Blog created successfully",
        });
      }
      setDialogOpen(false);
      resetForm();
      fetchBlogs();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save blog",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (blog: Article) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      imageURL: blog.imageURL,
      tags: blog.tags,
      authorName: blog.author.name,
      authorAvatarURL: blog.author.avatarURL,
      isPopular: blog.isPopular || false,
      slug: blog.slug,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (blogId: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      await deleteBlog(blogId);
      toast({
        title: "Success",
        description: "Blog deleted successfully",
      });
      fetchBlogs();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete blog",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      imageURL: "",
      tags: [],
      authorName: "",
      authorAvatarURL: "",
      isPopular: false,
      slug: "",
    });
    setEditingBlog(null);
    setTagInput("");
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) });
  };

  const getValidImageUrl = (imageURL: string): string => {
    if (!imageURL || imageURL.trim() === '') {
      return '/blogs/blog1.png';
    }
    try {
      new URL(imageURL);
      return imageURL;
    } catch {
      if (imageURL.startsWith('/')) {
        return imageURL;
      }
      return `/blogs/${imageURL}`;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold">Blog Management</h1>
            <p className="text-muted-foreground">Create and manage blog posts</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 border rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="h-8"
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="h-8"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
            <Dialog open={dialogOpen} onOpenChange={(open) => {
              setDialogOpen(open);
              if (!open) resetForm();
            }}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Blog Post
                </Button>
              </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingBlog ? "Edit Blog Post" : "Create New Blog Post"}</DialogTitle>
                <DialogDescription>
                  Fill in all the required fields to {editingBlog ? "update" : "create"} a blog post
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug (auto-generated if empty)</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="Will be generated from title"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt *</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    rows={3}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Content (Markdown) *</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={15}
                    required
                    className="font-mono text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <ImageUpload
                    value={formData.imageURL}
                    onChange={(url) => setFormData({ ...formData, imageURL: url })}
                    folder="blogs"
                    label="Featured Image"
                  />
                  {formData.imageURL && (
                    <div className="mt-2">
                      <Label htmlFor="imageURL-text">Or enter URL manually:</Label>
                      <Input
                        id="imageURL-text"
                        value={formData.imageURL}
                        onChange={(e) => setFormData({ ...formData, imageURL: e.target.value })}
                        placeholder="/blogs/blog1.png"
                        className="mt-1"
                      />
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <div className="flex gap-2">
                    <Input
                      id="tags"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addTag();
                        }
                      }}
                      placeholder="Press Enter to add tag"
                    />
                    <Button type="button" onClick={addTag}>Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="authorName">Author Name *</Label>
                  <Input
                    id="authorName"
                    value={formData.authorName}
                    onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <ImageUpload
                    value={formData.authorAvatarURL}
                    onChange={(url) => setFormData({ ...formData, authorAvatarURL: url })}
                    folder="avatars"
                    label="Author Avatar"
                  />
                  {formData.authorAvatarURL && (
                    <div className="mt-2">
                      <Label htmlFor="authorAvatarURL-text">Or enter URL manually:</Label>
                      <Input
                        id="authorAvatarURL-text"
                        value={formData.authorAvatarURL}
                        onChange={(e) => setFormData({ ...formData, authorAvatarURL: e.target.value })}
                        placeholder="Author avatar URL"
                        className="mt-1"
                      />
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isPopular"
                    checked={formData.isPopular}
                    onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                    className="rounded"
                  />
                  <Label htmlFor="isPopular">Mark as Popular/Featured</Label>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => {
                    setDialogOpen(false);
                    resetForm();
                  }}>
                    Cancel
                  </Button>
                  <Button type="submit">{editingBlog ? "Update" : "Create"}</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-card rounded-2xl overflow-hidden flex flex-col">
                <Skeleton className="w-full aspect-[16/9] rounded-2xl" />
                <div className="pt-6 pr-6 pb-6 space-y-3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <div className="flex gap-2 mt-4">
                    <Skeleton className="h-6 w-16 rounded-md" />
                    <Skeleton className="h-6 w-20 rounded-md" />
                    <Skeleton className="h-6 w-18 rounded-md" />
                  </div>
                  <div className="space-y-2 mt-4">
                    <Skeleton className="h-3 w-32" />
                    <Skeleton className="h-3 w-40" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No blogs found. Create your first blog post!
            </CardContent>
          </Card>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <AdminBlogCard
                key={blog.id}
                blog={blog}
                onEdit={() => handleEdit(blog)}
                onDelete={() => handleDelete(blog.id)}
                getValidImageUrl={getValidImageUrl}
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-4">
            {blogs.map((blog) => (
              <Card key={blog.id} className="border-0 shadow-none">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle>{blog.title}</CardTitle>
                        {blog.isPopular && (
                          <Badge variant="default">Featured</Badge>
                        )}
                      </div>
                      <CardDescription>{blog.excerpt}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEdit(blog)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(blog.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Author: {blog.author.name}</span>
                    <span>•</span>
                    <span>Tags: {blog.tags.join(", ")}</span>
                    <span>•</span>
                    <span>Slug: {blog.slug}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

