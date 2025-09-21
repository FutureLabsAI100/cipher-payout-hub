# Vercel Deployment Guide for Cipher Payout Hub

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Ensure your code is pushed to GitHub
3. **Environment Variables**: Prepare the required environment variables

## Step-by-Step Deployment

### Step 1: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click on "New Project"
3. Import your GitHub repository: `FutureLabsAI100/cipher-payout-hub`
4. Click "Import" to proceed

### Step 2: Configure Project Settings

1. **Project Name**: `cipher-payout-hub` (or your preferred name)
2. **Framework Preset**: Select "Vite"
3. **Root Directory**: Leave as default (`.`)
4. **Build Command**: `npm run build`
5. **Output Directory**: `dist`
6. **Install Command**: `npm install`

### Step 3: Configure Environment Variables

In the Vercel dashboard, go to **Settings** → **Environment Variables** and add:

```
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID
NEXT_PUBLIC_INFURA_API_KEY=YOUR_INFURA_API_KEY
```

**Note**: Replace the placeholder values with your actual API keys and project IDs.

**Important**: 
- Set these variables for **Production**, **Preview**, and **Development** environments
- Make sure to click "Save" after adding each variable

### Step 4: Build Configuration

Create a `vercel.json` file in your project root (if not already present):

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "installCommand": "npm install",
  "devCommand": "npm run dev"
}
```

### Step 5: Deploy

1. Click **"Deploy"** in the Vercel dashboard
2. Wait for the build process to complete (usually 2-5 minutes)
3. Your application will be available at the provided Vercel URL

### Step 6: Custom Domain (Optional)

1. Go to **Settings** → **Domains**
2. Add your custom domain
3. Configure DNS settings as instructed by Vercel
4. Wait for SSL certificate to be issued

## Post-Deployment Configuration

### Step 7: Verify Deployment

1. **Test Wallet Connection**: Ensure RainbowKit wallet connection works
2. **Test Environment Variables**: Verify all environment variables are accessible
3. **Test Build**: Ensure the application builds and runs correctly

### Step 8: Monitor and Maintain

1. **Analytics**: Check Vercel Analytics for performance metrics
2. **Logs**: Monitor deployment logs for any issues
3. **Updates**: Push changes to trigger automatic deployments

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check if all dependencies are in `package.json`
   - Verify build command is correct
   - Check for TypeScript errors

2. **Environment Variables Not Working**:
   - Ensure variables are set for all environments
   - Check variable names match exactly (case-sensitive)
   - Redeploy after adding new variables

3. **Wallet Connection Issues**:
   - Verify WalletConnect Project ID is correct
   - Check RPC URL is accessible
   - Ensure chain ID matches your configuration

### Build Optimization

1. **Bundle Size**: Monitor bundle size in Vercel dashboard
2. **Performance**: Use Vercel Analytics to identify performance bottlenecks
3. **Caching**: Configure appropriate caching headers

## Environment-Specific Notes

### Production Environment
- Use production RPC endpoints
- Enable all security features
- Monitor for errors and performance

### Preview Environment
- Use testnet RPC endpoints
- Enable debugging features
- Test new features before production

### Development Environment
- Use local development settings
- Enable hot reloading
- Use development-specific environment variables

## Security Considerations

1. **Environment Variables**: Never commit sensitive keys to repository
2. **HTTPS**: Vercel automatically provides HTTPS
3. **CORS**: Configure CORS settings if needed
4. **Rate Limiting**: Consider implementing rate limiting for API calls

## Support

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **GitHub Issues**: Create issues in your repository for bugs
- **Community**: Join Vercel Discord for community support

## Additional Resources

- **Vercel CLI**: Install for local development and deployment
- **Analytics**: Enable Vercel Analytics for detailed metrics
- **Edge Functions**: Consider using Vercel Edge Functions for serverless logic
- **CDN**: Vercel automatically provides global CDN

---

**Note**: This deployment guide is specifically configured for the Cipher Payout Hub project with FHE encryption and Web3 wallet integration.
