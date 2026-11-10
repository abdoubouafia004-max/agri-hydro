import { Suspense, lazy, useEffect, useState } from 'react';

// three.js n'est téléchargé que sur les appareils avec souris / pavé tactile.
const BlobCursor = lazy(() => import('./BlobCursor.jsx'));

const FINE_POINTER = '(hover: hover) and (pointer: fine)';

const hasWebGL = () => {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
};

function useFinePointer() {
  const [fine, setFine] = useState(() => window.matchMedia?.(FINE_POINTER).matches ?? false);
  useEffect(() => {
    const mq = window.matchMedia?.(FINE_POINTER);
    if (!mq) return undefined;
    const onChange = (e) => setFine(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return fine;
}

// Monté dans le même Suspense que le blob : le curseur système n'est masqué
// qu'une fois le blob réellement chargé.
function HideSystemCursor() {
  useEffect(() => {
    document.documentElement.classList.add('has-blob-cursor');
    return () => document.documentElement.classList.remove('has-blob-cursor');
  }, []);
  return null;
}

/** Curseur « goutte d'eau » sur tout le site, à la taille d'un curseur classique. */
export default function SiteCursor() {
  const fine = useFinePointer();
  const [webgl] = useState(hasWebGL);

  if (!fine || !webgl) return null;
  return (
    <Suspense fallback={null}>
      <HideSystemCursor />
      <div className="site-cursor" aria-hidden="true">
        <BlobCursor material="chrome" color="#0A78C8" size={22} trail={10} hideCursor={false} />
      </div>
    </Suspense>
  );
}
