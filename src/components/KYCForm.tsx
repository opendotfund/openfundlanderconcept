
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { FileText, Upload, ShieldCheck, CircleDollarSign } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export const KYCForm = () => {
  const { toast } = useToast();
  const [step, setStep] = useState<number>(1);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, documentType: string) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    // Simulate upload process
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Document uploaded",
        description: `${documentType} has been successfully uploaded.`,
      });
    }, 1500);
  };
  
  const nextStep = () => {
    setStep(prev => prev + 1);
  };
  
  const previousStep = () => {
    setStep(prev => prev - 1);
  };
  
  const submitForm = () => {
    toast({
      title: "KYC Submission Successful",
      description: "Your documents have been submitted for verification. This process typically takes 1-2 business days.",
    });
    // In a real application, you would submit the form data to your backend
  };

  return (
    <div className="space-y-6">
      {/* Step indicators */}
      <div className="flex justify-between mb-6">
        {[1, 2, 3].map((stepNumber) => (
          <div 
            key={stepNumber} 
            className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
              stepNumber === step 
                ? 'bg-openfund-green border-openfund-green text-openfund-gray-dark' 
                : stepNumber < step 
                  ? 'bg-openfund-gray-dark border-openfund-green text-openfund-green'
                  : 'bg-openfund-gray-dark border-openfund-gray-light text-gray-400'
            }`}
          >
            {stepNumber}
          </div>
        ))}
      </div>
      
      {/* Step 1: Personal Information */}
      {step === 1 && (
        <div className="space-y-6">
          <h3 className="text-xl font-medium">Personal Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="John" className="bg-openfund-gray-dark" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Doe" className="bg-openfund-gray-dark" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dob">Date of Birth</Label>
            <Input id="dob" type="date" className="bg-openfund-gray-dark" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Residential Address</Label>
            <Input id="address" placeholder="123 Main St" className="bg-openfund-gray-dark" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" placeholder="New York" className="bg-openfund-gray-dark" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select>
                <SelectTrigger className="bg-openfund-gray-dark">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                  <SelectItem value="de">Germany</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="zipCode">Zip Code</Label>
              <Input id="zipCode" placeholder="10001" className="bg-openfund-gray-dark" />
            </div>
          </div>
          
          <Button 
            className="w-full bg-openfund-green hover:bg-openfund-green-dark text-openfund-gray-dark mt-4" 
            onClick={nextStep}
          >
            Continue to Document Upload
          </Button>
        </div>
      )}
      
      {/* Step 2: Document Upload */}
      {step === 2 && (
        <div className="space-y-6">
          <h3 className="text-xl font-medium">Document Upload</h3>
          <p className="text-gray-400 mb-4">Please provide clear photos or scans of the following documents:</p>
          
          <div className="space-y-6">
            <div className="border border-dashed border-openfund-gray-light rounded-lg p-6 text-center">
              <div className="flex flex-col items-center">
                <FileText size={40} className="mb-3 text-gray-400" />
                <h4 className="text-lg font-medium mb-2">Government ID</h4>
                <p className="text-sm text-gray-400 mb-4">Passport, Driver's License, or National ID Card</p>
                <Input 
                  id="idUpload" 
                  type="file" 
                  className="hidden" 
                  onChange={(e) => handleFileUpload(e, 'Government ID')}
                />
                <Label 
                  htmlFor="idUpload" 
                  className="cursor-pointer flex items-center justify-center gap-2 bg-openfund-gray-dark hover:bg-openfund-gray-light px-4 py-2 rounded-md"
                >
                  <Upload size={16} />
                  Upload ID
                </Label>
              </div>
            </div>
            
            <div className="border border-dashed border-openfund-gray-light rounded-lg p-6 text-center">
              <div className="flex flex-col items-center">
                <FileText size={40} className="mb-3 text-gray-400" />
                <h4 className="text-lg font-medium mb-2">Proof of Address</h4>
                <p className="text-sm text-gray-400 mb-4">Utility Bill, Bank Statement (not older than 3 months)</p>
                <Input 
                  id="addressUpload" 
                  type="file" 
                  className="hidden" 
                  onChange={(e) => handleFileUpload(e, 'Proof of Address')}
                />
                <Label 
                  htmlFor="addressUpload"
                  className="cursor-pointer flex items-center justify-center gap-2 bg-openfund-gray-dark hover:bg-openfund-gray-light px-4 py-2 rounded-md"
                >
                  <Upload size={16} />
                  Upload Proof
                </Label>
              </div>
            </div>
            
            <div className="border border-dashed border-openfund-gray-light rounded-lg p-6 text-center">
              <div className="flex flex-col items-center">
                <FileText size={40} className="mb-3 text-gray-400" />
                <h4 className="text-lg font-medium mb-2">Selfie with ID</h4>
                <p className="text-sm text-gray-400 mb-4">A photo of yourself holding your ID document</p>
                <Input 
                  id="selfieUpload" 
                  type="file" 
                  className="hidden" 
                  onChange={(e) => handleFileUpload(e, 'Selfie with ID')}
                />
                <Label 
                  htmlFor="selfieUpload"
                  className="cursor-pointer flex items-center justify-center gap-2 bg-openfund-gray-dark hover:bg-openfund-gray-light px-4 py-2 rounded-md"
                >
                  <Upload size={16} />
                  Upload Selfie
                </Label>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={previousStep}>
              Back
            </Button>
            <Button 
              className="bg-openfund-green hover:bg-openfund-green-dark text-openfund-gray-dark" 
              onClick={nextStep}
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Continue to Tax Information"}
            </Button>
          </div>
        </div>
      )}
      
      {/* Step 3: Tax Information */}
      {step === 3 && (
        <div className="space-y-6">
          <h3 className="text-xl font-medium">Tax Information</h3>
          <p className="text-gray-400 mb-4">
            This information is required for tax reporting purposes as per local regulations.
          </p>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="taxCountry">Tax Residency Country</Label>
              <Select>
                <SelectTrigger className="bg-openfund-gray-dark">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                  <SelectItem value="de">Germany</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="taxId">Tax Identification Number</Label>
              <Input id="taxId" placeholder="SSN, TIN, etc." className="bg-openfund-gray-dark" />
            </div>
            
            <div className="space-y-2">
              <Label>Are you a U.S. citizen or U.S. tax resident?</Label>
              <div className="flex items-center space-x-2 mt-2">
                <Checkbox id="us-citizen" />
                <Label htmlFor="us-citizen">Yes, I am a U.S. citizen or tax resident</Label>
              </div>
            </div>
            
            <div className="border border-openfund-gray-light rounded-lg p-6 mt-4">
              <div className="flex items-start mb-4">
                <ShieldCheck className="text-openfund-green mr-3 mt-1" size={24} />
                <div>
                  <h4 className="font-medium">Data Protection</h4>
                  <p className="text-sm text-gray-400">
                    Your information is securely stored and only shared with relevant tax authorities as required by law.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CircleDollarSign className="text-openfund-green mr-3 mt-1" size={24} />
                <div>
                  <h4 className="font-medium">Tax Reporting</h4>
                  <p className="text-sm text-gray-400">
                    OpenFund is required to report certain investment activities to tax authorities in compliance with international tax agreements.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 mt-4">
              <Checkbox id="tax-declaration" />
              <Label htmlFor="tax-declaration">
                I declare that the information provided is true and accurate. I understand that false declarations may result in penalties.
              </Label>
            </div>
          </div>
          
          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={previousStep}>
              Back
            </Button>
            <Button 
              className="bg-openfund-green hover:bg-openfund-green-dark text-openfund-gray-dark"
              onClick={submitForm}
            >
              Submit KYC Application
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
