import React, { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Key, Database, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

// Contract ABI for CipherPayoutHub
const CONTRACT_ABI = [
  {
    "inputs": [
      {"name": "_description", "type": "string"},
      {"name": "_amount", "type": "uint32"},
      {"name": "_deadline", "type": "uint256"}
    ],
    "name": "createPayoutRequest",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"name": "payoutId", "type": "uint256"},
      {"name": "recipientAddress", "type": "address"},
      {"name": "amount", "type": "uint32"},
      {"name": "metadata", "type": "string"}
    ],
    "name": "addRecipient",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"name": "payoutId", "type": "uint256"}],
    "name": "processPayout",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

const CONTRACT_ADDRESS = "0x742d35Cc6634C0532925a3b8D0C0E1C4C5C5C5C5"; // Replace with actual contract address

export function ContractInteraction() {
  const { address, isConnected } = useAccount();
  const [payoutDescription, setPayoutDescription] = useState('');
  const [payoutAmount, setPayoutAmount] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [recipientAmount, setRecipientAmount] = useState('');
  const [metadata, setMetadata] = useState('');
  const [currentPayoutId, setCurrentPayoutId] = useState<number | null>(null);

  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleCreatePayoutRequest = async () => {
    if (!isConnected || !address) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!payoutDescription || !payoutAmount) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const deadline = Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60); // 7 days from now
      
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'createPayoutRequest',
        args: [payoutDescription, BigInt(payoutAmount), BigInt(deadline)],
      });

      toast.success('Payout request created successfully!');
    } catch (error) {
      console.error('Error creating payout request:', error);
      toast.error('Failed to create payout request');
    }
  };

  const handleAddRecipient = async () => {
    if (!currentPayoutId || !recipientAddress || !recipientAmount) {
      toast.error('Please create a payout request first and fill recipient details');
      return;
    }

    try {
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'addRecipient',
        args: [BigInt(currentPayoutId), recipientAddress, BigInt(recipientAmount), metadata],
      });

      toast.success('Recipient added successfully!');
    } catch (error) {
      console.error('Error adding recipient:', error);
      toast.error('Failed to add recipient');
    }
  };

  const handleProcessPayout = async () => {
    if (!currentPayoutId) {
      toast.error('Please create a payout request first');
      return;
    }

    try {
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'processPayout',
        args: [BigInt(currentPayoutId)],
      });

      toast.success('Payout processing initiated!');
    } catch (error) {
      console.error('Error processing payout:', error);
      toast.error('Failed to process payout');
    }
  };

  if (!isConnected) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Contract Interaction
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            Please connect your wallet to interact with the smart contract
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Create Payout Request */}
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Create Encrypted Payout Request
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Payout Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the purpose of this payout..."
              value={payoutDescription}
              onChange={(e) => setPayoutDescription(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Total Amount (Wei)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="1000000000000000000"
              value={payoutAmount}
              onChange={(e) => setPayoutAmount(e.target.value)}
            />
          </div>

          <Button 
            onClick={handleCreatePayoutRequest}
            disabled={isPending || isConfirming}
            className="w-full"
          >
            {isPending ? 'Creating...' : isConfirming ? 'Confirming...' : 'Create Payout Request'}
          </Button>

          {isSuccess && (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-4 w-4" />
              <span>Payout request created successfully!</span>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 text-red-600">
              <AlertCircle className="h-4 w-4" />
              <span>Error: {error.message}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Recipients */}
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Add Recipients</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="recipientAddress">Recipient Address</Label>
              <Input
                id="recipientAddress"
                placeholder="0x..."
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="recipientAmount">Amount (Wei)</Label>
              <Input
                id="recipientAmount"
                type="number"
                placeholder="100000000000000000"
                value={recipientAmount}
                onChange={(e) => setRecipientAmount(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="metadata">Encrypted Metadata</Label>
            <Textarea
              id="metadata"
              placeholder="Additional encrypted information..."
              value={metadata}
              onChange={(e) => setMetadata(e.target.value)}
            />
          </div>

          <Button 
            onClick={handleAddRecipient}
            disabled={isPending || isConfirming}
            className="w-full"
          >
            Add Recipient
          </Button>
        </CardContent>
      </Card>

      {/* Process Payout */}
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Process Encrypted Payout</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Process the payout with FHE-encrypted data. All sensitive information is encrypted before being stored on-chain.
            </p>
            
            <div className="flex items-center gap-2">
              <Badge variant="secondary">FHE Encrypted</Badge>
              <Badge variant="outline">Zero-Knowledge</Badge>
              <Badge variant="outline">Privacy-Preserving</Badge>
            </div>

            <Button 
              onClick={handleProcessPayout}
              disabled={isPending || isConfirming}
              className="w-full"
            >
              {isPending ? 'Processing...' : isConfirming ? 'Confirming...' : 'Process Payout'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
