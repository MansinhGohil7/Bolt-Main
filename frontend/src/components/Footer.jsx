import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="glass-nav w-full py-16 mt-auto">
      <div className="max-w-container-max mx-auto px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-4">
          <img alt="Bolt Tools Logo" className="h-8 w-8 grayscale brightness-200 opacity-80" src="/logo.png" />
          <span className="font-headline-md text-headline-md text-on-background opacity-80 tracking-tight">Bolt Tools</span>
        </div>
        <div className="flex gap-8">
          <Link className="font-caption text-caption text-on-surface-variant hover:text-primary transition-colors transition-opacity opacity-80 hover:opacity-100" to="/privacy-policy">Privacy Policy</Link>
          <Link className="font-caption text-caption text-on-surface-variant hover:text-primary transition-colors transition-opacity opacity-80 hover:opacity-100" to="/terms-of-service">Terms of Service</Link>
        </div>
        <div className="font-caption text-caption text-on-surface-variant opacity-60">
          © 2026 Bolt Tools. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
