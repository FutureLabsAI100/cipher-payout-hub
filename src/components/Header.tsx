import { Shield, Lock, FileText } from 'lucide-react';
import logo from '@/assets/insurance-logo.png';

const Header = () => {
  return (
    <header className="w-full gradient-header text-primary-foreground shadow-secure">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="SecureGuard Insurance" className="w-10 h-10" />
              <div>
                <h1 className="text-xl font-bold">SecureGuard</h1>
                <p className="text-sm opacity-90">Confidential Insurance Payouts</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 bg-white/10 px-3 py-2 rounded-lg">
              <Shield className="w-4 h-4 animate-shield" />
              <span className="text-sm font-medium">Secure Portal</span>
            </div>
            
            <div className="flex items-center space-x-2 bg-white/10 px-3 py-2 rounded-lg">
              <Lock className="w-4 h-4" />
              <span className="text-sm font-medium">Encrypted</span>
            </div>
            
            <div className="flex items-center space-x-2 bg-accent/20 px-3 py-2 rounded-lg">
              <FileText className="w-4 h-4" />
              <span className="text-sm font-medium">Claims Portal</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;