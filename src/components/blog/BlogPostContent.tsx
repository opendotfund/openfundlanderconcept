
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { BlogPost } from '@/data/blogPosts';

interface BlogPostContentProps {
  post: BlogPost;
}

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
      
      <div className="flex items-center text-muted-foreground mb-6 text-sm">
        <User className="h-4 w-4 mr-1" />
        <span className="mr-4">OpenFund Team</span>
        <Calendar className="h-4 w-4 mr-1" />
        <span>{post.date}</span>
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
                {section.items.map((item, itemIndex) => (
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
                  {section.steps.map((step, stepIndex) => (
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
