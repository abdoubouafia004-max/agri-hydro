import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// En dev, les appels /api sont envoyés au serveur PHP local (XAMPP).
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true, // écoute aussi sur le réseau local (accès depuis un téléphone)
    strictPort: true, // échoue plutôt que de basculer silencieusement sur un autre port
    proxy: { '/api': 'http://localhost/agri-hydro/backend/public' },
  },
});
