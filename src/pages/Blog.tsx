
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import { blogPosts } from '@/data/blogPosts';
import BlogPostCard from '@/components/blog/BlogPostCard';
import BlogPostContent from '@/components/blog/BlogPostContent';

const Blog: React.FC = () => {
  const [searchParams] = useSearchParams();
  const postId = searchParams.get('post');
  
  const currentPost = postId ? blogPosts.find(post => post.id === postId) : null;
  
  return (
    <>
      <Helmet>
        <title>{currentPost ? `${currentPost.title} | OpenFund Blog` : 'OpenFund Blog: Cryptocurrency Guides & Exchange Tips'}</title>
        <meta 
          name="description" 
          content={currentPost ? currentPost.excerpt : "OpenFund's blog with expert guides on cryptocurrency, exchanges, cold storage, and secure investing. Find answers to all your crypto questions."} 
        />
        <meta name="keywords" content="OpenFund, cryptocurrency blog, crypto guides, bitcoin storage, crypto exchanges, blockchain education" />
        <link rel="canonical" href={`https://openfund.io/blog${postId ? `?post=${postId}` : ''}`} />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          {currentPost ? (
            <BlogPostContent post={currentPost} />
          ) : (
            <div className="space-y-8">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-3 text-foreground">OpenFund Blog</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Expert guides and insights about cryptocurrency, exchanges, and secure investing
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map(post => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          )}
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Blog;
