'use client';

import { FormEvent, useState } from "react";

// npx shadcn@latest init
// npx shadcn@latest add button
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CheckPastPosts() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = ( event: FormEvent ) => {
    event.preventDefault();
    setIsOpen(false);
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button size="sm" className="hidden lg:px-6 lg:flex bg-gray-500 hover:bg-gray-600">
            過去の投稿
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create a New Post</DialogTitle>
            <DialogDescription>
              Share your thoughts with the community. Be respectful and follow our community guidelines.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={ handleSubmit } className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Enter your post title" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea id="content" placeholder="Write your post content here..." required />
            </div>
            <Button type="submit" className="w-full">
              Post
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};