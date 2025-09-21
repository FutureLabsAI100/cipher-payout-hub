import { Key, Database, Zap, Wallet } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Header = () => {
  return (
    <header className="w-full gradient-header text-primary-foreground shadow-secure">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
                <Key className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Cipher Payout Hub</h1>
                <p className="text-sm opacity-90">FHE-Encrypted Payout Management</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 bg-white/10 px-3 py-2 rounded-lg">
              <Database className="w-4 h-4" />
              <span className="text-sm font-medium">FHE Encrypted</span>
            </div>
            
            <div className="flex items-center space-x-2 bg-white/10 px-3 py-2 rounded-lg">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium">Fast Processing</span>
            </div>
            
            <div className="flex items-center space-x-2 bg-accent/20 px-3 py-2 rounded-lg">
              <Wallet className="w-4 h-4" />
              <span className="text-sm font-medium">Multi-Wallet</span>
            </div>
            
            <ConnectButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;