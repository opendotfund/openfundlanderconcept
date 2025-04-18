export const redirects = [
  {
    from: '/old-blog',
    to: '/blog',
    status: 301
  },
  {
    from: '/funds',
    to: '/explore-funds',
    status: 301
  },
  {
    from: '/my-portfolio',
    to: '/my-assets',
    status: 301
  }
];

export const handleRedirect = (path: string): { to: string; status: number } | null => {
  const redirect = redirects.find(r => r.from === path);
  return redirect || null;
}; 