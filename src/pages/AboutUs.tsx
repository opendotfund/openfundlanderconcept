
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TeamMember from '@/components/TeamMember';
import TeamMemberCard from '@/components/TeamMemberCard';
import { Hexagon, Users } from 'lucide-react';

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Misha Stastna",
      role: "Co-Founder & CEO",
      background: "Crypto Native",
      imageSrc: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&auto=format&fit=crop",
    },
    {
      name: "Dr. Ahmed Al-Gebali",
      role: "Advisor",
      background: "2011 CFO of the year at Dubai Islamic Bank",
      imageSrc: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop",
    },
    {
      name: "@Dagger100x",
      role: "Advisor",
      background: "Crypto Native",
      imageSrc: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop",
    },
    {
      name: "Abdul Fayed",
      role: "Co-Founder",
      background: "TradFi Native",
      imageSrc: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&auto=format&fit=crop",
    },
    {
      name: "@0xSoda",
      role: "Co-Founder & CTO",
      background: "Crypto Native",
      imageSrc: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="mb-4 inline-flex items-center justify-center">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
              <Users className="text-primary h-6 w-6" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Team</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Meet the visionaries behind OpenFund, bringing together expertise from both traditional finance and the crypto world.
          </p>
        </div>
        
        {/* Team member cards with green border style from image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={index} {...member} />
          ))}
        </div>
        
        <div className="mt-16 bg-card p-8 rounded-lg border border-border">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Our Mission</h2>
            <div className="w-20 h-1 bg-primary mx-auto"></div>
          </div>
          <div className="max-w-3xl mx-auto">
            <p className="text-muted-foreground text-lg mb-4">
              At OpenFund, we are on a mission to democratize finance by creating a bridge between traditional financial markets and blockchain technology.
            </p>
            <p className="text-muted-foreground text-lg mb-4">
              Our team combines decades of experience in traditional finance with deep expertise in blockchain technology and cryptocurrency markets.
            </p>
            <p className="text-muted-foreground text-lg">
              We believe in a future where anyone, anywhere can access and benefit from sophisticated financial instruments previously available only to the privileged few.
            </p>
          </div>
        </div>
        
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Join Our Team</h2>
            <div className="w-20 h-1 bg-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">
              Interested in working with us? Check out our open positions.
            </p>
            <div className="mt-6">
              <a 
                href="/careers" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-md inline-block"
              >
                View Careers
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutUs;
