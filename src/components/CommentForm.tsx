'use client'

import { useState } from 'react';

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CirclePlus } from 'lucide-react';

export default function CommentForm() {
  const [comment, setComment] = useState('');

  const handleSubmit = ( event: React.FormEvent ) => {
    event.preventDefault()
    // Here you would typically send the comment to your backend
    console.log('Submitting comment:', comment)
    setComment('')
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-500 p-4">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="flex items-center space-x-4">
          <CirclePlus /> 
          <Textarea 
            placeholder="コメントを入力"
            className="flex-grow"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
          <Button type="submit">Post</Button>
        </form>
      </div>
    </div>
  );
};