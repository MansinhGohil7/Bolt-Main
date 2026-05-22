import React from 'react';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
  return (
    <>
      <main className="flex-grow pt-32 pb-32 min-h-screen">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <h1 className="font-display-lg text-display-lg text-on-surface mb-8">Privacy Policy</h1>
          <div className="bg-surface-container/40 backdrop-blur-xl border border-outline-variant p-8 md:p-12 flex flex-col gap-6 text-on-surface-variant font-body-md">
            <p>Last updated: May 19, 2026</p>
            <h2 className="font-headline-md text-on-surface">1. Information Collection</h2>
            <p>We collect information you provide directly to us when using Bolt Tools. This may include your name, email address, and any other information you choose to provide.</p>
            
            <h2 className="font-headline-md text-on-surface">2. Use of Information</h2>
            <p>We use the information we collect to provide, maintain, and improve our services, as well as to communicate with you.</p>
            
            <h2 className="font-headline-md text-on-surface">3. Data Security</h2>
            <p>We implement appropriate security measures to protect your personal information against unauthorized access or alteration.</p>
            
            <h2 className="font-headline-md text-on-surface">4. Your Rights</h2>
            <p>You have the right to request access to, correction of, or deletion of your personal data at any time.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
