
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { BlogPost } from '@/data/blogPosts';
import { Badge } from '@/components/ui/badge';

interface BlogPostContentProps {
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

const BlogPostContent: React.FC<BlogPostContentProps> = ({ post }) => {
  return (
    <article className="max-w-3xl mx-auto">
      <Link to="/blog">
        <Button variant="outline" className="mb-6 flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to all posts
        </Button>
      </Link>
      
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
      
      <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6 text-sm">
        <div className="flex items-center">
          <User className="h-4 w-4 mr-1" />
          <span>OpenFund Team</span>
        </div>
        
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{post.date}</span>
        </div>
        
        <Badge className={`${categoryColors[post.category]}`}>
          <Tag className="h-3 w-3 mr-1" />
          {categoryDisplayNames[post.category]}
        </Badge>
      </div>
      
      <div className="mb-8">
        <img 
          src={post.imageUrl} 
          alt={post.title}
          className="w-full h-auto rounded-lg"
        />
      </div>
      
      <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
        {post.content.map((section, index) => {
          if (section.type === 'paragraph') {
            return <p key={index} className="leading-relaxed">{section.content}</p>;
          } else if (section.type === 'heading') {
            return <h2 key={index} className="text-2xl font-bold mt-8 mb-4">{section.content}</h2>;
          } else if (section.type === 'list') {
            return (
              <ul key={index} className="list-disc pl-5 space-y-2">
                {section.items?.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            );
          } else if (section.type === 'image') {
            return (
              <div key={index} className="my-6">
                <img 
                  src={section.url} 
                  alt={section.caption || ''} 
                  className="w-full h-auto rounded-lg"
                />
                {section.caption && (
                  <p className="text-sm text-center text-muted-foreground mt-2">{section.caption}</p>
                )}
              </div>
            );
          } else if (section.type === 'steps') {
            return (
              <div key={index} className="space-y-4 my-6">
                <h3 className="text-xl font-semibold">{section.title}</h3>
                <ol className="list-decimal pl-5 space-y-4">
                  {section.steps?.map((step, stepIndex) => (
                    <li key={stepIndex} className="pl-2">
                      <div className="font-medium">{step.title}</div>
                      <p className="mt-1">{step.description}</p>
                      {step.imageUrl && (
                        <img 
                          src={step.imageUrl} 
                          alt={step.title}
                          className="mt-3 rounded-lg border border-muted w-full md:w-4/5 mx-auto"
                        />
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </article>
  );
};

export default BlogPostContent;
