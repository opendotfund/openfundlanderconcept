import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TeamMemberCard from '@/components/TeamMemberCard';
import { Users } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const AboutUs = () => {
  const teamMembers = {
    founders: [
      {
        name: "Misha Stastna",
        role: "Co-Founder & CEO",
        background: "Crypto Native",
      },
      {
        name: "Abdul Fayed",
        role: "Co-Founder",
        background: "TradFi Native",
      },
      {
        name: "@0xSoda",
        role: "Co-Founder & CTO",
        background: "Crypto Native",
      },
    ],
    advisors: [
      {
        name: "Dr. Ahmed Al-Gebali",
        role: "Advisor",
        background: "2011 CFO of the year at Dubai Islamic Bank",
      },
      {
        name: "@Dagger100x",
        role: "Advisor",
        background: "Crypto Native",
      },
    ]
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Helmet>
        <title>About OpenFund | The Global Investment Platform</title>
        <meta name="description" content="Meet the OpenFund team - the visionaries bridging traditional finance with crypto. Learn about our mission to democratize global investments." />
        <link rel="canonical" href="https://openfund.io/about-us" />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="mb-4 inline-flex items-center justify-center">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
              <Users className="text-primary h-6 w-6" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About the OpenFund Team</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Meet the visionaries behind OpenFund, bringing together expertise from both traditional finance and the crypto world.
          </p>
        </div>
        
        <section 
          className="mb-16" 
          itemScope 
          itemType="https://schema.org/Organization"
        >
          <meta itemProp="name" content="OpenFund" />
          <meta itemProp="description" content="The Modern Platform for Global Investments" />
          <h2 className="text-2xl font-bold mb-6 text-center">OpenFund Co-Founders</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.founders.map((member, index) => (
              <TeamMemberCard 
                key={`founder-${index}`} 
                {...member} 
              />
            ))}
          </div>
        </section>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Advisors</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {teamMembers.advisors.map((member, index) => (
              <TeamMemberCard key={`advisor-${index}`} {...member} />
            ))}
          </div>
        </div>
        
        <div className="mt-16 bg-card p-8 rounded-lg border border-border">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">OpenFund's Mission</h2>
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
