import Header from '@/components/Header';
import ClaimsDashboard from '@/components/ClaimsDashboard';
import Footer from '@/components/Footer';
import { WalletConnect } from '@/components/WalletConnect';
import { Toaster } from '@/components/ui/toaster';
import { useAccount } from 'wagmi';

const Index = () => {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="gradient-bg min-h-screen">
        {isConnected ? (
          <ClaimsDashboard />
        ) : (
          <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">Cipher Payout Hub</h1>
              <p className="text-xl text-muted-foreground">
                Secure, encrypted payout management on the blockchain
              </p>
            </div>
            <WalletConnect />
          </div>
        )}
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Index;
