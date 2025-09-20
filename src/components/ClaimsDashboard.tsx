import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, Wallet, Shield, FileText, DollarSign } from 'lucide-react';

const ClaimsDashboard = () => {
  const [showSensitive, setShowSensitive] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);

  const toggleSensitiveData = () => setShowSensitive(!showSensitive);

  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
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
            onClick={() => setWalletConnected(!walletConnected)}
            variant={walletConnected ? "secondary" : "default"}
            className="w-full max-w-sm"
          >
            {walletConnected ? "Wallet Connected ✓" : "Connect Wallet"}
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
                defaultValue="John Smith"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="policy-number">Policy Number</Label>
              <Input 
                id="policy-number" 
                className={!showSensitive ? "blur-sensitive" : ""}
                defaultValue="POL-789456123"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ssn">Social Security Number</Label>
              <Input 
                id="ssn" 
                className={!showSensitive ? "blur-sensitive" : ""}
                defaultValue="***-**-1234"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="claim-type">Claim Type</Label>
              <Select>
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
              <Input type="date" id="incident-date" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="claim-amount">Claim Amount</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input 
                  id="claim-amount" 
                  className="pl-10"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Incident Description</Label>
              <Textarea 
                id="description" 
                placeholder="Provide detailed description of the incident..."
                className="h-24"
              />
            </div>

            <Button 
              className="w-full gradient-secure shadow-glow"
              disabled={!walletConnected}
            >
              <Shield className="w-4 h-4 mr-2" />
              Submit Encrypted Claim
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
    </div>
  );
};

export default ClaimsDashboard;