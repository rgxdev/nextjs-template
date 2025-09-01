"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Trash2, Edit, Plus } from "lucide-react";
import { z } from "zod";

const postSchema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string(),
  userId: z.number(),
});

const createPostSchema = postSchema.omit({ id: true });

type Post = z.infer<typeof postSchema>;
type CreatePost = z.infer<typeof createPostSchema>;

// Mock API functions
async function fetchPosts(): Promise<Post[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
  if (!response.ok) throw new Error("Failed to fetch posts");
  const data = await response.json();
  return postSchema.array().parse(data);
}

async function fetchPost(id: number): Promise<Post> {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!response.ok) throw new Error("Failed to fetch post");
  const data = await response.json();
  return postSchema.parse(data);
}

async function createPost(post: CreatePost): Promise<Post> {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  if (!response.ok) throw new Error("Failed to create post");
  const data = await response.json();
  return postSchema.parse({ ...data, id: Date.now() }); // Mock ID
}

async function updatePost(id: number, post: Partial<CreatePost>): Promise<Post> {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  if (!response.ok) throw new Error("Failed to update post");
  const data = await response.json();
  return postSchema.parse(data);
}

async function deletePost(id: number): Promise<void> {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete post");
}

function PostsList() {
  const { data: posts, isLoading, error, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData<Post[]>(["posts"], (old) =>
        old?.filter((post) => post.id !== deletedId) ?? []
      );
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Lade Posts...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-red-200">
        <CardContent className="pt-6">
          <p className="text-red-600">Fehler: {(error as Error).message}</p>
          <Button onClick={() => refetch()} className="mt-4">
            Erneut versuchen
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {posts?.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{post.title}</CardTitle>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => deleteMutation.mutate(post.id)}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{post.body}</p>
            <p className="text-sm text-muted-foreground mt-2">User ID: {post.userId}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function CreatePostForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState("1");

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createPost,
    onSuccess: (newPost) => {
      // Optimistic update
      queryClient.setQueryData<Post[]>(["posts"], (old) => [newPost, ...(old ?? [])]);
      
      // Reset form
      setTitle("");
      setBody("");
      setUserId("1");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const postData = createPostSchema.parse({
        title,
        body,
        userId: parseInt(userId),
      });
      
      createMutation.mutate(postData);
    } catch (error) {
      console.error("Validation error:", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Neuen Post erstellen</CardTitle>
        <CardDescription>
          Demonstriert optimistische Updates mit TanStack Query
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Titel
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post-Titel eingeben..."
              required
            />
          </div>
          
          <div>
            <label htmlFor="body" className="block text-sm font-medium mb-2">
              Inhalt
            </label>
            <Textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Post-Inhalt eingeben..."
              required
            />
          </div>
          
          <div>
            <label htmlFor="userId" className="block text-sm font-medium mb-2">
              Benutzer ID
            </label>
            <Input
              id="userId"
              type="number"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              min="1"
              required
            />
          </div>
          
          <Button
            type="submit"
            disabled={createMutation.isPending || !title || !body}
            className="w-full"
          >
            {createMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Erstelle Post...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Post erstellen
              </>
            )}
          </Button>
          
          {createMutation.error && (
            <p className="text-red-600 text-sm">
              Fehler: {(createMutation.error as Error).message}
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}

function SinglePostExample() {
  const [postId, setPostId] = useState<number | null>(null);
  
  const { data: post, isLoading, error } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => fetchPost(postId!),
    enabled: !!postId,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Einzelnen Post laden</CardTitle>
        <CardDescription>
          Demonstriert bedingte Queries (enabled option)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="postId" className="block text-sm font-medium mb-2">
            Post ID eingeben
          </label>
          <Input
            id="postId"
            type="number"
            placeholder="z.B. 1"
            onChange={(e) => {
              const id = parseInt(e.target.value);
              setPostId(isNaN(id) ? null : id);
            }}
          />
        </div>
        
        {isLoading && (
          <div className="flex items-center">
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            Lade Post...
          </div>
        )}
        
        {error && (
          <p className="text-red-600">
            Fehler: {(error as Error).message}
          </p>
        )}
        
        {post && (
          <div className="p-4 border rounded">
            <h3 className="font-semibold">{post.title}</h3>
            <p className="text-muted-foreground mt-2">{post.body}</p>
            <p className="text-sm text-muted-foreground mt-2">
              ID: {post.id} | User: {post.userId}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function QueryExamples() {
  const queryClient = useQueryClient();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Query Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>✓ Automatisches Caching (5 Min staleTime)</li>
              <li>✓ Background Refetching</li>
              <li>✓ Error Handling & Retry Logic</li>
              <li>✓ Loading States</li>
              <li>✓ Optimistische Updates</li>
              <li>✓ Schema Validierung mit Zod</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cache Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              onClick={() => queryClient.invalidateQueries({ queryKey: ["posts"] })}
              variant="outline"
              className="w-full"
            >
              Posts Cache invalidieren
            </Button>
            <Button
              onClick={() => queryClient.clear()}
              variant="outline"
              className="w-full"
            >
              Gesamten Cache leeren
            </Button>
          </CardContent>
        </Card>
      </div>

      <CreatePostForm />
      
      <SinglePostExample />
      
      <div>
        <h2 className="text-2xl font-bold mb-4">Posts Liste</h2>
        <PostsList />
      </div>
    </div>
  );
}
