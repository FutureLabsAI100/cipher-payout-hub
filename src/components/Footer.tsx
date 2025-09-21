import { Database, Lock, FileText, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const umbrellaPositions = [
    { left: '10%', delay: '0s' },
    { left: '25%', delay: '0.5s' },
    { left: '40%', delay: '1s' },
    { left: '55%', delay: '1.5s' },
    { left: '70%', delay: '2s' },
    { left: '85%', delay: '2.5s' },
  ];

  return (
    <footer className="relative bg-primary text-primary-foreground overflow-hidden">
      {/* Animated Umbrellas */}
      <div className="absolute inset-0 pointer-events-none">
        {umbrellaPositions.map((pos, index) => (
          <div
            key={index}
            className="absolute top-4 animate-umbrella opacity-20"
            style={{ 
              left: pos.left, 
              animationDelay: pos.delay,
              transform: 'translateX(-50%)'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C7.5 2 4 5.5 4 10c0 1 .5 2 1 2.5L12 8l7-4.5c.5-.5 1-1.5 1-2.5 0-4.5-3.5-8-8-8z"/>
              <path d="M12 8v14"/>
              <path d="M10 20h4"/>
            </svg>
          </div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Cipher Payout Hub</h3>
            <p className="text-sm opacity-90">
              Decentralized payout management with FHE encryption for maximum privacy and security.
            </p>
            <div className="flex items-center space-x-2">
              <Database className="w-4 h-4 text-accent" />
              <span className="text-sm">FHE Encrypted</span>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-semibold">Services</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li className="flex items-center space-x-2">
                <FileText className="w-3 h-3" />
                <span>Claims Processing</span>
              </li>
              <li className="flex items-center space-x-2">
                <Lock className="w-3 h-3" />
                <span>Encrypted Storage</span>
              </li>
              <li className="flex items-center space-x-2">
                <Database className="w-3 h-3" />
                <span>FHE Processing</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold">Contact</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li className="flex items-center space-x-2">
                <Phone className="w-3 h-3" />
                <span>1-800-SECURE</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-3 h-3" />
                <span>claims@secureguard.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-3 h-3" />
                <span>New York, NY</span>
              </li>
            </ul>
          </div>

          {/* Security */}
          <div className="space-y-4">
            <h4 className="font-semibold">Security</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span>256-bit Encryption</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span>Zero-Knowledge</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-sm opacity-75">
            © 2024 Cipher Payout Hub. All rights reserved. | Protected by FHE encryption
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;