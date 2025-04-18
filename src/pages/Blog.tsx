import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { blogPosts, BlogPost } from '@/data/blogPosts';
import BlogPostCard from '@/components/blog/BlogPostCard';
import BlogPostContent from '@/components/blog/BlogPostContent';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { SEO } from '../components/SEO';

type CategoryType = BlogPost['category'];

const categoryDisplayNames: Record<CategoryType, string> = {
  security: 'Security',
  exchanges: 'Exchanges',
  storage: 'Storage',
  mining: 'Mining',
  investments: 'Investments',
  technology: 'Technology'
};

const Blog: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const postId = searchParams.get('post');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<CategoryType[]>([]);
  
  const currentPost = postId ? blogPosts.find(post => post.id === postId) : null;
  
  const handleCategoryToggle = (category: CategoryType) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(cat => cat !== category);
      } else {
        return [...prev, category];
      }
    });
  };
  
  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
  };
  
  const filteredPosts = useMemo(() => {
    let filtered = [...blogPosts];
    
    // Apply search term filter
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(lowercasedSearch) || 
        post.excerpt.toLowerCase().includes(lowercasedSearch)
      );
    }
    
    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(post => selectedCategories.includes(post.category));
    }
    
    return filtered;
  }, [blogPosts, searchTerm, selectedCategories]);
  
  return (
    <>
      <SEO 
        title={currentPost ? `${currentPost.title} | OpenFund Blog` : 'OpenFund Blog: Cryptocurrency Guides & Exchange Tips'}
        description={currentPost ? currentPost.excerpt : "OpenFund's blog with expert guides on cryptocurrency, exchanges, cold storage, and secure investing. Find answers to all your crypto questions."}
        keywords="OpenFund, cryptocurrency blog, crypto guides, bitcoin storage, crypto exchanges, blockchain education"
        canonicalUrl={`https://openfund.io/blog${postId ? `?post=${postId}` : ''}`}
      />

      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8">
            Latest Insights on Decentralized Funding & Web3
          </h1>
          {currentPost ? (
            <BlogPostContent post={currentPost} />
          ) : (
            <div className="space-y-8">
              <div className="text-center mb-6">
                <h1 className="text-4xl font-bold mb-3 text-foreground">OpenFund Blog</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Expert guides and insights about cryptocurrency, exchanges, and secure investing
                </p>
              </div>
              
              <div className="max-w-4xl mx-auto mb-8">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search articles..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-2 whitespace-nowrap">
                        <Filter className="h-4 w-4" />
                        Filter by Category
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      {Object.entries(categoryDisplayNames).map(([key, label]) => (
                        <DropdownMenuCheckboxItem
                          key={key}
                          checked={selectedCategories.includes(key as CategoryType)}
                          onCheckedChange={() => handleCategoryToggle(key as CategoryType)}
                        >
                          {label}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                {(searchTerm || selectedCategories.length > 0) && (
                  <div className="flex flex-wrap items-center gap-2 mt-4">
                    {searchTerm && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        Search: {searchTerm}
                      </Badge>
                    )}
                    
                    {selectedCategories.map(category => (
                      <Badge key={category} variant="secondary" className="flex items-center gap-1">
                        {categoryDisplayNames[category]}
                      </Badge>
                    ))}
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={clearAllFilters}
                      className="text-xs"
                    >
                      Clear All
                    </Button>
                  </div>
                )}
              </div>
              
              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.map(post => (
                    <BlogPostCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <h3 className="text-xl font-medium mb-2">No articles found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
                  <Button 
                    variant="outline" 
                    className="mt-4" 
                    onClick={clearAllFilters}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          )}
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Blog;
