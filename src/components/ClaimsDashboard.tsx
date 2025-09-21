import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { ContractInteraction } from './ContractInteraction';
import { Eye, EyeOff, Wallet, Database, FileText, DollarSign, Loader2, CheckCircle2, Key } from 'lucide-react';

const ClaimsDashboard = () => {
  const [showSensitive, setShowSensitive] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    claimantName: 'John Smith',
    policyNumber: 'POL-789456123',
    ssn: '***-**-1234',
    claimType: '',
    incidentDate: '',
    claimAmount: '',
    description: ''
  });
  const { toast } = useToast();

  const toggleSensitiveData = () => setShowSensitive(!showSensitive);

  const handleWalletConnect = () => {
    setWalletConnected(!walletConnected);
    if (!walletConnected) {
      toast({
        title: "Wallet Connected Successfully",
        description: "Your secure wallet has been connected. You can now submit encrypted claims.",
        className: "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200"
      });
    } else {
      toast({
        title: "Wallet Disconnected",
        description: "Your wallet has been safely disconnected.",
      });
    }
  };

  const validateForm = () => {
    const errors = [];
    if (!formData.claimantName.trim()) errors.push("Claimant name is required");
    if (!formData.policyNumber.trim()) errors.push("Policy number is required");
    if (!formData.claimType) errors.push("Claim type is required");
    if (!formData.incidentDate) errors.push("Incident date is required");
    if (!formData.claimAmount.trim()) errors.push("Claim amount is required");
    if (!formData.description.trim()) errors.push("Incident description is required");
    return errors;
  };

  const handleSubmitClaim = async () => {
    const errors = validateForm();
    if (errors.length > 0) {
      toast({
        title: "Form Validation Error",
        description: errors[0],
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate encryption and submission process
    toast({
      title: "Encrypting Claim Data",
      description: "Your sensitive information is being encrypted...",
      className: "bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200"
    });

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Claim Submitted Successfully",
      description: "Your encrypted claim has been securely submitted and assigned ID: CLM-004",
      className: "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200"
    });

    // Reset form
    setFormData({
      ...formData,
      claimType: '',
      incidentDate: '',
      claimAmount: '',
      description: ''
    });
    
    setIsSubmitting(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
      {/* Main Dashboard */}
      <Tabs defaultValue="payouts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="payouts" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            FHE Payouts
          </TabsTrigger>
          <TabsTrigger value="claims" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Claims
          </TabsTrigger>
          <TabsTrigger value="contract" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            Contract
          </TabsTrigger>
        </TabsList>

        <TabsContent value="payouts" className="space-y-6">
          <Card className="gradient-card shadow-card border-accent/20">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Database className="w-6 h-6 text-accent" />
                <CardTitle className="text-primary">FHE-Encrypted Payout Management</CardTitle>
              </div>
              <CardDescription>
                Manage payouts with fully homomorphic encryption for maximum privacy
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-white/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">$2.4M</div>
                  <div className="text-sm text-muted-foreground">Total Processed</div>
                </div>
                <div className="p-4 bg-white/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">1,247</div>
                  <div className="text-sm text-muted-foreground">Payouts</div>
                </div>
                <div className="p-4 bg-white/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">99.9%</div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="claims" className="space-y-6">
          {/* Wallet Connection */}
          <Card className="gradient-card shadow-card border-accent/20">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Wallet className="w-6 h-6 text-accent" />
                <CardTitle className="text-primary">Wallet Connection Required</CardTitle>
              </div>
              <CardDescription>
                Connect your secure wallet to submit and manage insurance claims
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                onClick={handleWalletConnect}
                variant={walletConnected ? "secondary" : "default"}
                className="w-full max-w-sm"
              >
                {walletConnected ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Wallet Connected
                  </>
                ) : (
                  <>
                    <Wallet className="w-4 h-4 mr-2" />
                    Connect Secure Wallet
                  </>
                )}
              </Button>
              {walletConnected && (
                <p className="text-sm text-muted-foreground mt-2">
                  Wallet: 0x1234...5678 <Badge variant="outline" className="ml-2">Verified</Badge>
                </p>
              )}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Claims Form */}
            <Card className="gradient-card shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-primary" />
                    <CardTitle className="text-primary">Submit New Claim</CardTitle>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleSensitiveData}
                    className="flex items-center space-x-1"
                  >
                    {showSensitive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    <span>{showSensitive ? "Hide" : "Show"} Sensitive</span>
                  </Button>
                </div>
                <CardDescription>
                  All data is encrypted and visible only to authorized adjusters
                </CardDescription>
              </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="claimant-name">Claimant Name</Label>
              <Input 
                id="claimant-name" 
                className={!showSensitive ? "blur-sensitive" : ""}
                value={formData.claimantName}
                onChange={(e) => handleInputChange('claimantName', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="policy-number">Policy Number</Label>
              <Input 
                id="policy-number" 
                className={!showSensitive ? "blur-sensitive" : ""}
                value={formData.policyNumber}
                onChange={(e) => handleInputChange('policyNumber', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ssn">Social Security Number</Label>
              <Input 
                id="ssn" 
                className={!showSensitive ? "blur-sensitive" : ""}
                value={formData.ssn}
                onChange={(e) => handleInputChange('ssn', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="claim-type">Claim Type</Label>
              <Select value={formData.claimType} onValueChange={(value) => handleInputChange('claimType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select claim type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto Insurance</SelectItem>
                  <SelectItem value="home">Home Insurance</SelectItem>
                  <SelectItem value="health">Health Insurance</SelectItem>
                  <SelectItem value="life">Life Insurance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="incident-date">Incident Date</Label>
              <Input 
                type="date" 
                id="incident-date" 
                value={formData.incidentDate}
                onChange={(e) => handleInputChange('incidentDate', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="claim-amount">Claim Amount</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input 
                  id="claim-amount" 
                  className="pl-10"
                  placeholder="0.00"
                  value={formData.claimAmount}
                  onChange={(e) => handleInputChange('claimAmount', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Incident Description</Label>
              <Textarea 
                id="description" 
                placeholder="Provide detailed description of the incident..."
                className="h-24"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </div>

            <Button 
              className="w-full gradient-secure shadow-glow"
              disabled={!walletConnected || isSubmitting}
              onClick={handleSubmitClaim}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Encrypting & Submitting...
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4 mr-2" />
                  Submit Encrypted Claim
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Recent Claims */}
        <Card className="gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="text-primary">Recent Claims</CardTitle>
            <CardDescription>
              Your submitted claims and their status
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { id: "CLM-001", type: "Auto", amount: "$2,500", status: "Processing", date: "2024-01-15" },
              { id: "CLM-002", type: "Home", amount: "$8,900", status: "Approved", date: "2024-01-10" },
              { id: "CLM-003", type: "Health", amount: "$1,200", status: "Under Review", date: "2024-01-05" },
            ].map((claim) => (
              <div key={claim.id} className="flex items-center justify-between p-4 bg-white/50 rounded-lg border border-border/50">
                <div className="space-y-1">
                  <p className="font-medium text-sm">{claim.id}</p>
                  <p className="text-sm text-muted-foreground">{claim.type} • {claim.date}</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="font-medium text-sm">{claim.amount}</p>
                  <Badge 
                    variant={claim.status === "Approved" ? "default" : claim.status === "Processing" ? "secondary" : "outline"}
                    className="text-xs"
                  >
                    {claim.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
        </TabsContent>

        <TabsContent value="contract" className="space-y-6">
          <ContractInteraction />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClaimsDashboard;