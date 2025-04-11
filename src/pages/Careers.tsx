
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Briefcase, Users, Zap, DollarSign } from 'lucide-react';

type JobPosition = {
  id: string;
  title: string;
  salary: string;
  department: string;
  location: string;
  description: string;
}

const Careers = () => {
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [resume, setResume] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState('');

  const jobs: JobPosition[] = [
    {
      id: 'smart-contract-engineer',
      title: 'Senior Smart Contract Engineer',
      salary: '$250,000 USD',
      department: 'Engineering',
      location: 'Remote',
      description: 'We are looking for an experienced Smart Contract Engineer to join our team. The ideal candidate will have extensive experience with Solidity, EVM, and security best practices. You will be responsible for designing, implementing, and auditing smart contracts for our decentralized finance platform.'
    },
    {
      id: 'twitter-manager',
      title: 'Lead Twitter Account Manager',
      salary: '$80,000 USD',
      department: 'Marketing',
      location: 'Remote',
      description: 'We are seeking a creative and strategic Twitter Account Manager to lead our social media presence. The ideal candidate will have experience in crypto/finance content creation, community management, and growth strategies. You will be responsible for growing our Twitter following and engagement through innovative content strategies.'
    }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList && fileList.length > 0) {
      setResume(fileList[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !resume || !coverLetter) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    toast.success('Application submitted successfully!');
    setName('');
    setEmail('');
    setResume(null);
    setCoverLetter('');
    setSelectedJob(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {selectedJob ? (
            <>
              <div className="mb-6">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedJob(null)}
                  className="mb-4"
                >
                  Back to All Positions
                </Button>
                <h1 className="text-3xl font-bold mb-2">{selectedJob.title}</h1>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center text-primary">
                    <DollarSign size={16} className="mr-1" />
                    {selectedJob.salary}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Briefcase size={16} className="mr-1" />
                    {selectedJob.department}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Users size={16} className="mr-1" />
                    {selectedJob.location}
                  </div>
                </div>
                <div className="bg-muted p-6 rounded-lg mb-8">
                  <h2 className="text-xl font-bold mb-4">Job Description</h2>
                  <p className="text-muted-foreground">{selectedJob.description}</p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Apply for {selectedJob.title}</CardTitle>
                    <CardDescription>Fill out the form below to apply</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input 
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="john@example.com"
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="resume">Resume</Label>
                          <Input 
                            id="resume"
                            type="file"
                            onChange={handleFileChange}
                            accept=".pdf,.doc,.docx"
                            required
                          />
                          <p className="text-xs text-muted-foreground">Accepted formats: PDF, DOC, DOCX</p>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="cover">Why are you the right fit for this role?</Label>
                          <Textarea 
                            id="cover"
                            value={coverLetter}
                            onChange={(e) => setCoverLetter(e.target.value)}
                            className="min-h-[150px]" 
                            placeholder="Tell us why you're excited about this position and what makes you the perfect candidate..."
                            required
                          />
                        </div>
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full"
                      >
                        Submit Application
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </>
          ) : (
            <>
              <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  Join the <span className="text-primary">OpenFund</span> Team
                </h1>
                <p className="text-xl text-muted-foreground">
                  Build the future of decentralized finance with us
                </p>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 border-b border-border pb-2">
                  Open Positions
                </h2>
                <div className="space-y-4">
                  {jobs.map(job => (
                    <Card 
                      key={job.id}
                      className="hover:border-primary/50 transition-colors cursor-pointer"
                      onClick={() => setSelectedJob(job)}
                    >
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-bold mb-1">{job.title}</h3>
                            <div className="flex flex-wrap gap-4">
                              <div className="flex items-center text-primary">
                                <DollarSign size={16} className="mr-1" />
                                {job.salary}
                              </div>
                              <div className="flex items-center text-muted-foreground">
                                <Briefcase size={16} className="mr-1" />
                                {job.department}
                              </div>
                              <div className="flex items-center text-muted-foreground">
                                <Users size={16} className="mr-1" />
                                {job.location}
                              </div>
                            </div>
                          </div>
                          <Button variant="outline">
                            View & Apply
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="bg-muted rounded-lg p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Don't see a position that fits your skills?</h2>
                <p className="text-muted-foreground mb-6">
                  We're always looking for talented individuals to join our team. Send your resume to 
                  <a href="mailto:careers@openfund.online" className="text-primary hover:underline ml-1">
                    careers@openfund.online
                  </a>
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <div className="flex flex-col items-center p-4 bg-background rounded-lg">
                    <Zap className="text-primary mb-2" size={32} />
                    <h3 className="font-bold mb-1">Fast-Paced Environment</h3>
                    <p className="text-muted-foreground text-sm">Work on cutting-edge DeFi technology</p>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-background rounded-lg">
                    <Users className="text-primary mb-2" size={32} />
                    <h3 className="font-bold mb-1">Remote First</h3>
                    <p className="text-muted-foreground text-sm">Work from anywhere in the world</p>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-background rounded-lg">
                    <Briefcase className="text-primary mb-2" size={32} />
                    <h3 className="font-bold mb-1">Competitive Benefits</h3>
                    <p className="text-muted-foreground text-sm">Salary, tokens, and healthcare</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Careers;
