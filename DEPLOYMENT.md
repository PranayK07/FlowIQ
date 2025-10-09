# FlowIQ Deployment Guide

## GitHub Pages Deployment

FlowIQ is configured to automatically deploy to GitHub Pages when code is pushed to the `main` branch.

### Setup Instructions

1. **Enable GitHub Pages** in your repository settings:
   - Go to Settings → Pages
   - Source: Deploy from a branch or GitHub Actions
   - If using GitHub Actions: Select "GitHub Actions" as the source
   
2. **GitHub Actions Workflow**:
   - The workflow is defined in `.github/workflows/deploy.yml`
   - It automatically builds and deploys on push to `main`
   - No manual intervention required

3. **Access Your Site**:
   - Once deployed, your site will be available at: `https://pranayk07.github.io/FlowIQ/`

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Configuration

The application is configured for GitHub Pages deployment:
- Base path is set to `/FlowIQ/` in production (see `vite.config.ts`)
- Static assets are served from the `dist` directory
- `.nojekyll` file prevents Jekyll processing

### Troubleshooting

**Issue**: Assets not loading after deployment
- **Solution**: Ensure `base` is correctly set in `vite.config.ts`

**Issue**: 404 errors on routes
- **Solution**: GitHub Pages doesn't support client-side routing by default. The app uses hash-based routing handled by React Router.

**Issue**: Build fails in GitHub Actions
- **Solution**: Check the Actions tab for error logs. Common issues include:
  - Missing dependencies
  - TypeScript errors
  - Build configuration issues

### Manual Deployment

If you need to deploy manually:

```bash
# Build the application
npm run build

# The dist folder contains the production build
# Upload the contents to your hosting service
```

## Environment Variables

Currently, the application doesn't require any environment variables for basic functionality. All algorithms run client-side.

## Performance Optimization

The application includes:
- Code splitting for optimal loading
- Lazy loading of components
- Optimized bundle size
- Static asset optimization

## Security

- No sensitive data is transmitted
- All calculations happen client-side
- CSV files are processed locally in the browser
- No backend API required
