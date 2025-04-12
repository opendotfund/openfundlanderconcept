
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Calendar, Tag } from 'lucide-react';
import { BlogPost } from '@/data/blogPosts';
import { Badge } from '@/components/ui/badge';

interface BlogPostCardProps {
  post: BlogPost;
}

const categoryColors: Record<BlogPost['category'], string> = {
  security: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  exchanges: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  storage: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  mining: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  investments: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  technology: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300'
};

const categoryDisplayNames: Record<BlogPost['category'], string> = {
  security: 'Security',
  exchanges: 'Exchanges',
  storage: 'Storage',
  mining: 'Mining',
  investments: 'Investments',
  technology: 'Technology'
};

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
          <Badge 
            className={`absolute top-2 right-2 ${categoryColors[post.category]}`}
          >
            {categoryDisplayNames[post.category]}
          </Badge>
        </div>
        
        <CardHeader>
          <h2 className="text-xl font-bold leading-tight hover:text-primary transition-colors duration-200">
            {post.title}
          </h2>
        </CardHeader>
        
        <CardContent className="flex-grow">
          <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
        </CardContent>
        
        <CardFooter className="border-t pt-4 text-sm text-muted-foreground flex items-center justify-between">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{post.date}</span>
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default BlogPostCard;
