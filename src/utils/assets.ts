/**
 * Safely resolves asset paths across all deployment environments:
 * 1. GitHub Pages (e.g. https://portfolio-website-ang.github.io/Portfolio-website-/)
 * 2. AI Studio Preview (https://ais-dev-...run.app/)
 * 3. Local Development (http://localhost:3000/)
 */
export const getAssetUrl = (rawPath: string): string => {
  if (!rawPath) return '';
  
  // External or inline data URIs pass through unchanged
  if (
    rawPath.startsWith('http://') ||
    rawPath.startsWith('https://') ||
    rawPath.startsWith('data:')
  ) {
    return rawPath;
  }

  // Strip leading dot and slashes
  const clean = rawPath.replace(/^(\.|\/)+/, '');

  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const pathname = window.location.pathname;

    // Detect GitHub Pages deployment under a subpath
    if (hostname.endsWith('github.io')) {
      const segments = pathname.split('/').filter(Boolean);
      const repoName = segments.length > 0 ? segments[0] : 'Portfolio-website-';
      return `/${repoName}/${clean}`;
    }
  }

  // Vite relative fallback
  const base = import.meta.env?.BASE_URL || './';
  return base.endsWith('/') ? `${base}${clean}` : `${base}/${clean}`;
};

/**
 * Universal image error handler that tries relative/absolute fallback candidates
 * to prevent broken image icons on any device or network environment.
 */
export const handleImageError = (
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackSrc?: string
) => {
  const target = e.currentTarget;
  if (!target) return;

  const currentSrc = target.getAttribute('src') || '';
  
  // If already attempted fallback and failed, stop to avoid infinite loop
  if (target.dataset.fallbackTried === 'true') {
    return;
  }

  target.dataset.fallbackTried = 'true';

  if (fallbackSrc && fallbackSrc !== currentSrc) {
    target.src = getAssetUrl(fallbackSrc);
    return;
  }

  // If failed on GitHub Pages, try switching between /Portfolio-website-/ and relative ./
  if (currentSrc.includes('/Portfolio-website-/')) {
    target.src = currentSrc.replace('/Portfolio-website-/', './');
  } else if (currentSrc.startsWith('./')) {
    target.src = currentSrc.replace('./', '/Portfolio-website-/');
  } else if (currentSrc.startsWith('/')) {
    target.src = '.' + currentSrc;
  }
};
