import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useBalance } from 'wagmi';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Wallet, LogOut, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({
    address: address,
  });
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isConnected) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Wallet className="h-5 w-5" />
            Connect Wallet
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground mb-4">
            Connect your wallet to access the Cipher Payout Hub
          </p>
          <ConnectButton />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Wallet Connected
          </span>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Connected
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Address
          </label>
          <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
            <code className="text-sm flex-1 truncate">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </code>
            <Button
              variant="ghost"
              size="sm"
              onClick={copyAddress}
              className="h-8 w-8 p-0"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        
        {balance && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Balance
            </label>
            <div className="p-2 bg-muted rounded-md">
              <span className="text-sm font-mono">
                {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
              </span>
            </div>
          </div>
        )}
        
        <div className="pt-4 border-t">
          <ConnectButton.Custom>
            {({ openAccountModal, openConnectModal, mounted }) => {
              const ready = mounted;
              const connected = isConnected;

              return (
                <div
                  {...(!ready && {
                    'aria-hidden': true,
                    style: {
                      opacity: 0,
                      pointerEvents: 'none',
                      userSelect: 'none',
                    },
                  })}
                >
                  {(() => {
                    if (!connected) {
                      return (
                        <Button onClick={openConnectModal} className="w-full">
                          Connect Wallet
                        </Button>
                      );
                    }

                    return (
                      <Button
                        variant="outline"
                        onClick={openAccountModal}
                        className="w-full"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Disconnect
                      </Button>
                    );
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>
        </div>
      </CardContent>
    </Card>
  );
}
