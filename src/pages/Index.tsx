import Header from '@/components/Header';
import ClaimsDashboard from '@/components/ClaimsDashboard';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="gradient-bg min-h-screen">
        <ClaimsDashboard />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Index;
