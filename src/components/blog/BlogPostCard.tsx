
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { BlogPost } from '@/data/blogPosts';

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow duration-200">
      <Link to={`/blog?post=${post.id}`} className="flex flex-col h-full">
        <div className="relative w-full pt-[56.25%] overflow-hidden">
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        
        <CardHeader>
          <h2 className="text-xl font-bold leading-tight hover:text-primary transition-colors duration-200">
            {post.title}
          </h2>
        </CardHeader>
        
        <CardContent className="flex-grow">
          <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
        </CardContent>
        
        <CardFooter className="border-t pt-4 text-sm text-muted-foreground flex items-center">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{post.date}</span>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default BlogPostCard;
