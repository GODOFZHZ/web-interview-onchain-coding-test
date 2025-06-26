import React from 'react'
import ReactDOM from 'react-dom/client'
import WalletDashboard from '@/page/WalletDashboard'
import '@/style/index.css'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <WalletDashboard />
    </QueryClientProvider>
  </React.StrictMode>
)