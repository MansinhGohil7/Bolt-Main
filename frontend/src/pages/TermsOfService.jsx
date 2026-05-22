import React from 'react';
import Footer from '../components/Footer';

const TermsOfService = () => {
  return (
    <>
      <main className="flex-grow pt-32 pb-32 min-h-screen">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <h1 className="font-display-lg text-display-lg text-on-surface mb-8">Terms of Service</h1>
          <div className="bg-surface-container/40 backdrop-blur-xl border border-outline-variant p-8 md:p-12 flex flex-col gap-6 text-on-surface-variant font-body-md">
            <p>Last updated: May 19, 2026</p>
            <h2 className="font-headline-md text-on-surface">1. Acceptance of Terms</h2>
            <p>By accessing and using Bolt Tools, you accept and agree to be bound by the terms and provision of this agreement.</p>
            
            <h2 className="font-headline-md text-on-surface">2. Use License</h2>
            <p>Permission is granted to temporarily download one copy of the materials (information or software) on Bolt Tools' website for personal, non-commercial transitory viewing only.</p>
            
            <h2 className="font-headline-md text-on-surface">3. Disclaimer</h2>
            <p>The materials on Bolt Tools' website are provided on an 'as is' basis. Bolt Tools makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
            
            <h2 className="font-headline-md text-on-surface">4. Limitations</h2>
            <p>In no event shall Bolt Tools or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Bolt Tools' website.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default TermsOfService;
