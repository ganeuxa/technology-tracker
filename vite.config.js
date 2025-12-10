// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/technology-tracker/' // ← Убедитесь, что это имя вашего репозитория!
})