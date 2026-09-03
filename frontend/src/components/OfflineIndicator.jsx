import React from 'react';
import { useOffline } from '../context/OfflineContext';
import { Wifi, WifiOff } from 'lucide-react';
import { cn } from '../utils/cn';

export default function OfflineIndicator({ className }) {
  const { isOffline, lastSynced } = useOffline();

  return (
    <div className={cn(
      "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
      isOffline ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800",
      className
    )}>
      {isOffline ? (
        <>
          <WifiOff size={16} />
          <span>Offline Mode (Activities saved locally)</span>
        </>
      ) : (
        <>
          <Wifi size={16} />
          <span>Online - Synced {lastSynced}</span>
        </>
      )}
    </div>
  );
}
