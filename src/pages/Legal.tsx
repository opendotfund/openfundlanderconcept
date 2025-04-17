import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

const Legal = () => {
  const [activeTab, setActiveTab] = useState<string>("privacy");
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Legal Information</h1>
          
          <Tabs defaultValue="privacy" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
              <TabsTrigger value="terms">Terms of Service</TabsTrigger>
            </TabsList>
            
            <TabsContent value="privacy">
              <Card className="border-border">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
                  <p className="text-muted-foreground mb-4">Last Updated: April 11, 2025</p>
                  
                  <div className="space-y-6 text-foreground">
                    <section>
                      <h3 className="text-xl font-semibold mb-2">1. Introduction</h3>
                      <p>
                        OpenFund ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, 
                        use, disclose, and safeguard your information when you visit our website and use our services.
                      </p>
                    </section>
                    
                    <section>
                      <h3 className="text-xl font-semibold mb-2">2. Information We Collect</h3>
                      <p className="mb-2">We may collect the following types of information:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>
                          <strong>Personal Information:</strong> Name, email address, phone number, address, and financial information 
                          necessary for transactions and KYC/AML compliance.
                        </li>
                        <li>
                          <strong>Wallet Information:</strong> Cryptocurrency wallet addresses connected to our platform.
                        </li>
                        <li>
                          <strong>Transaction Data:</strong> Records of trades, fund investments, and other financial activities 
                          on our platform.
                        </li>
                        <li>
                          <strong>Technical Data:</strong> IP address, browser type, device information, cookies, and usage patterns.
                        </li>
                      </ul>
                    </section>
                    
                    <section>
                      <h3 className="text-xl font-semibold mb-2">3. How We Use Your Information</h3>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>To provide, maintain, and improve our services</li>
                        <li>To process and complete transactions</li>
                        <li>To comply with legal and regulatory requirements</li>
                        <li>To communicate with you about updates, security alerts, and support</li>
                        <li>To analyze usage patterns and optimize user experience</li>
                        <li>To prevent fraud, money laundering, and other prohibited activities</li>
                      </ul>
                    </section>
                    
                    <section>
                      <h3 className="text-xl font-semibold mb-2">4. Data Sharing and Disclosure</h3>
                      <p className="mb-2">We may share your information with:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Third-party service providers who assist in operating our platform</li>
                        <li>Financial institutions and payment processors to facilitate transactions</li>
                        <li>Legal, regulatory, and government entities when required by law</li>
                        <li>Business partners with your consent</li>
                      </ul>
                      <p className="mt-2">
                        We will never sell your personal information to third parties for marketing purposes.
                      </p>
                    </section>
                    
                    <section>
                      <h3 className="text-xl font-semibold mb-2">5. AML/CFT Compliance and Data Collection</h3>
                      <p className="mb-2">
                        As a regulated Virtual Asset Service Provider (VASP) under Gibraltar's DLT framework, OpenFund is committed to 
                        maintaining the highest standards of Anti-Money Laundering (AML) and Counter-Terrorist Financing (CFT) compliance. 
                        We collect and process the following information as part of our regulatory obligations:
                      </p>
                      <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>
                          <strong>Identity Verification Data:</strong> As part of our Know Your Customer (KYC) process, we collect 
                          and verify government-issued identification documents, proof of address, and Taxpayer Identification Numbers 
                          (TINs) or equivalents.
                        </li>
                        <li>
                          <strong>Transaction Monitoring Information:</strong> We collect and analyze transaction patterns, source 
                          of funds information, and other relevant data to fulfill our suspicious transaction reporting obligations 
                          under the Proceeds of Crime Act 2015 (POCA).
                        </li>
                        <li>
                          <strong>Travel Rule Data:</strong> For transactions valued at €1,000 or more, we collect and share required 
                          personally identifiable information (PII) with other VASPs, including names, wallet addresses, and transaction 
                          references.
                        </li>
                      </ul>
                      <p>
                        All data collected for AML/CFT purposes is processed in accordance with applicable data protection laws and 
                        our regulatory obligations under GFSC supervision.
                      </p>
                    </section>
                    
                    <section>
                      <h3 className="text-xl font-semibold mb-2">6. Security</h3>
                      <p>
                        We implement appropriate security measures to protect your personal information against unauthorized 
                        access, alteration, disclosure, or destruction. However, no method of transmission over the Internet 
                        or electronic storage is 100% secure, and we cannot guarantee absolute security.
                      </p>
                    </section>
                    
                    <section>
                      <h3 className="text-xl font-semibold mb-2">7. Your Rights</h3>
                      <p className="mb-2">Depending on your location, you may have the right to:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Access your personal information</li>
                        <li>Correct inaccurate information</li>
                        <li>Delete your personal information</li>
                        <li>Object to or restrict certain processing activities</li>
                        <li>Data portability</li>
                        <li>Withdraw consent</li>
                      </ul>
                    </section>
                    
                    <section>
                      <h3 className="text-xl font-semibold mb-2">8. International Transfers</h3>
                      <p>
                        Your information may be transferred and processed in countries outside of your home country. 
                        We ensure adequate safeguards are in place to protect your information when transferred internationally.
                      </p>
                    </section>
                    
                    <section>
                      <h3 className="text-xl font-semibold mb-2">9. Changes to this Privacy Policy</h3>
                      <p>
                        We may update this Privacy Policy from time to time. The updated version will be indicated by an 
                        updated "Last Updated" date. We encourage you to review this Privacy Policy periodically.
                      </p>
                    </section>
                    
                    <section>
                      <h3 className="text-xl font-semibold mb-2">10. Contact Us</h3>
                      <p>
                        If you have any questions about this Privacy Policy, please contact us at:
                      </p>
                      <p className="mt-2">
                        <strong>Email:</strong> privacy@openfund.online
                      </p>
                    </section>
                    
                    <Separator className="my-6" />
                    
                    <section className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">Legal Counsel:</p>
                        <p>Hassans International Law Firm</p>
                        <p>Madison Building, Midtown, Queensway</p>
                        <p>Gibraltar GX11 1AA</p>
                      </div>
                      <a 
                        href="https://www.gibraltarlaw.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-primary hover:underline"
                      >
                        Visit Website <ExternalLink size={14} className="ml-1" />
                      </a>
                    </section>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="terms">
              <Card className="border-border">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">Terms of Service</h2>
                  <p className="text-muted-foreground mb-4">Last Updated: April 11, 2025</p>
                  
                  <div className="space-y-6 text-foreground">
                    <section>
                      <h3 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h3>
                      <p>
                        By accessing or using the OpenFund platform and services, you agree to be bound by these Terms of Service. 
                        If you do not agree to all the terms and conditions, you may not access or use our services.
                      </p>
                    </section>
                    
                    <section>
                      <h3 className="text-xl font-semibold mb-2">2. Services Description</h3>
                      <p>
                        OpenFund provides a platform for trading cryptocurrencies, stocks, and commodities, as well as 
                        creating and investing in decentralized funds. Our services are subject to change and may be modified 
                        at our discretion without prior notice.
                      </p>
                    </section>
                    
                    <section>
                      <h3 className="text-xl font-semibold mb-2">3. Regulatory Compliance</h3>
                      <p className="mb-2">
                        OpenFund operates under a Distributed Ledger Technology (DLT) License issued by the Gibraltar Financial Services Commission (GFSC) 
                        in accordance with the Financial Services (Distributed Ledger Technology Providers) Regulations 2020.
                      </p>
                      <p className="mb-2">
                        Our DLT license authorizes OpenFund to use distributed ledger technology for storing or transmitting value belonging to others 
                        and operate as a regulated provider of digital asset services. The license ensures we comply with nine regulatory principles 
                        including honesty and integrity, customer care, financial resources, risk management, protection of client assets, corporate 
                        governance, cyber security, financial crime prevention, and resilience.
                      </p>
                      <p>
                        As a DLT license holder, OpenFund is subject to ongoing supervision by the GFSC, providing additional protection for our users 
                        through regular audits, compliance checks, robust security measures, and strict AML/KYC procedures.
                      </p>
                    </section>
                    
                    <section>
                      <h3 className="text-xl font-semibold mb-2">4. User Accounts</h3>
                      <p className="mb-2">
                        To access certain features of our platform, you must create an account and connect a digital wallet. You are responsible for:
                      </p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Maintaining the confidentiality of your account credentials</li>
                        <li>All activities that occur under your account</li>
                        <li>Providing accurate and complete information during registration</li>
                        <li>Promptly updating any changes to your information</li>
                      </ul>
                    </section>
                    
                    <section>
                      <h3 className="text-xl font-semibold mb-2">5. Eligibility</h3>
                      <p>
                        You must be at least 18 years old and have the legal capacity to enter into these Terms. 
                        By using our services, you represent and warrant that you meet all eligibility requirements. 
                        Our services are not available in jurisdictions where they would be prohibited by law.
                      </p>
                    </section>
                    
                    <section>
                      <h3 className="text-xl font-semibold mb-2">6. Fees and Payments</h3>
                      <p>
                        OpenFund charges a one-time fee of $750 to create a fund, which gives users access to trade 
                        Crypto, Stocks, and Commodities all from one platform. Additional trading fees may apply as 
                        detailed on our fees page. All fees are non-refundable unless required by applicable law.
                      </p>
                    </section>
                    
                    <section>
                      <h3 className="text-xl font-semibold mb-2">7. Risk Disclosure</h3>
                      <p className="mb-2">
                        Trading and investing in digital assets, stocks, and commodities involves significant risks:
                      </p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Market volatility and potential for substantial losses</li>
                        <li>Liquidity risks and potential trading delays</li>
                        <li>Regulatory uncertainty and compliance challenges</li>
                        <li>Technical and operational risks</li>
                      </ul>
                      <p className="mt-2">
                        You should carefully consider your financial situation and risk tolerance before using our services.
                      </p>
                    </section>
                    
                    <section>
                      <h3 className="text-xl font-semibold mb-2">8. Intellectual Property</h3>
                      <p>
                        All content and materials available on the OpenFund platform, including but not limited to text, 
                        graphics, logos, button icons, images, audio clips, data compilations, and software, are the 
                        property of OpenFund or its content suppliers and are protected by copyright, trademark, and 
                        other intellectual property laws.
                      </p>
                    </section>
                    
                    <section>
                      <h3 className="text-xl font-semibold mb-2">9. DLT License Verification</h3>
                      <p className="mb-2">
                        OpenFund Limited holds a Distributed Ledger Technology (DLT) Provider License issued by the 
                        Gibraltar Financial Services Commission (GFSC), License Number DLT0023/2024.
                      </p>
                      <p>
                        Our DLT license status can be verified on the Gibraltar Financial Services Commission's public register.
                      </p>
                      <div className="mt-4">
                        <a 
                          href="https://www.fsc.gi/regulated-entity/search" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center text-primary hover:underline"
                        >
                          Verify our license on GFSC website <ExternalLink size={14} className="ml-1" />
                        </a>
                      </div>
                    </section>
                    
                    <section>
                      <h3 className="text-xl font-semibold mb-2">10. Prohibited Activities</h3>
                      <p className="mb-2">You agree not to:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Use our services for illegal purposes</li>
                        <li>Attempt to manipulate markets or engage in fraudulent activities</li>
                        <li>Interfere with or disrupt the platform or servers</li>
                        <li>Circumvent or attempt to override security features</li>
                        <li>Use automated systems or software to extract data from our platform</li>
                      </ul>
                    </section>
                    
                    <section>
                      <h3 className="text-xl font-semibold mb-2">11. Regulatory Compliance and Reporting Requirements</h3>
                      <p className="mb-4">
                        OpenFund operates under a DLT Provider License issued by the Gibraltar Financial Services Commission (GFSC) 
                        and maintains strict compliance with all applicable regulations, including:
                      </p>

                      <h4 className="text-lg font-semibold mb-2">1. Customer Due Diligence (CDD)</h4>
                      <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Users must complete our comprehensive KYC process before accessing trading services.</li>
                        <li>Required documentation includes government-issued ID, proof of address, and TIN/SSN/EIN.</li>
                        <li>Enhanced due diligence may be required for high-risk customers or transactions.</li>
                      </ul>

                      <h4 className="text-lg font-semibold mb-2">2. Transaction Monitoring and Reporting</h4>
                      <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>All transactions are monitored for suspicious activity.</li>
                        <li>Suspicious Transaction Reports (STRs) are filed with the Gibraltar Financial Intelligence Unit (GFIU) 
                          when required under POCA.</li>
                        <li>Users agree to cooperate with any investigations or information requests related to AML/CFT compliance.</li>
                      </ul>

                      <h4 className="text-lg font-semibold mb-2">3. Travel Rule Compliance</h4>
                      <p className="mb-2">For transactions valued at €1,000 or more, we are required to:</p>
                      <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Collect and transmit originator and beneficiary information.</li>
                        <li>Verify wallet ownership and transaction details.</li>
                        <li>For transactions involving non-custodial wallets, collect additional PII including date and place of birth.</li>
                      </ul>

                      <h4 className="text-lg font-semibold mb-2">4. Compliance Structure</h4>
                      <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Our dedicated Money Laundering Reporting Officer (MLRO) oversees all AML/CFT compliance activities.</li>
                        <li>Regular reports are submitted to the GFSC as required by our DLT license.</li>
                        <li>Our AML/CFT policies and procedures are regularly reviewed and updated to maintain compliance with 
                          evolving regulations.</li>
                      </ul>

                      <p className="mb-4">
                        Users acknowledge that failure to comply with our AML/CFT requirements may result in account restrictions, 
                        suspension, or termination. OpenFund reserves the right to refuse service to any user who does not meet 
                        our compliance standards or poses a risk to our regulatory obligations.
                      </p>
                    </section>
                    
                    <section>
                      <h3 className="text-xl font-semibold mb-2">12. Limitation of Liability</h3>
                      <p>
                        To the maximum extent permitted by law, OpenFund, its affiliates, officers, directors, employees, 
                        and agents shall not be liable for any indirect, incidental, special, consequential, or punitive 
                        damages, including loss of profits, data, or goodwill, arising from or in connection with your use 
                        of or inability to use our services.
                      </p>
                    </section>
                    
                    <section>
                      <h3 className="text-xl font-semibold mb-2">13. Termination</h3>
                      <p>
                        We may terminate or suspend your account and access to our services immediately, without prior notice 
                        or liability, for any reason, including breach of these Terms. Upon termination, your right to use 
                        our services will cease immediately.
                      </p>
                    </section>
                    
                    <section>
                      <h3 className="text-xl font-semibold mb-2">14. Governing Law and Jurisdiction</h3>
                      <p>
                        These Terms shall be governed by and construed in accordance with the laws of Gibraltar, without 
                        regard to its conflict of law provisions. Any dispute arising from these Terms shall be resolved 
                        exclusively in the courts of Gibraltar.
                      </p>
                    </section>
                    
                    <section>
                      <h3 className="text-xl font-semibold mb-2">15. Changes to Terms</h3>
                      <p>
                        We reserve the right to modify or replace these Terms at any time. If a revision is material, 
                        we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes 
                        a material change will be determined at our sole discretion.
                      </p>
                    </section>
                    
                    <section>
                      <h3 className="text-xl font-semibold mb-2">16. Contact Us</h3>
                      <p>
                        If you have any questions about these Terms, please contact us at:
                      </p>
                      <p className="mt-2">
                        <strong>Email:</strong> legal@openfund.online
                      </p>
                    </section>
                    
                    <Separator className="my-6" />
                    
                    <section className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">Legal Counsel:</p>
                        <p>Hassans International Law Firm</p>
                        <p>Madison Building, Midtown, Queensway</p>
                        <p>Gibraltar GX11 1AA</p>
                      </div>
                      <div>
                        <p className="font-semibold mb-2">Regulatory Contact:</p>
                        <p>Gibraltar Financial Services Commission</p>
                        <p>PO Box 940, Suite 3, Ground Floor</p>
                        <p>Atlantic Suites, Europort Avenue</p>
                        <p>Gibraltar</p>
                      </div>
                    </section>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Legal;
