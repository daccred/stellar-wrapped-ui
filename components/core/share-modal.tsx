'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Check, Download, Link2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { useToPng } from '@hugocxl/react-to-image';
import { usePublicKey } from '@/contexts/PublicKeyContext';

interface ShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  storyId: string;
  isLinkOnly?: boolean;
}

export function ShareModal({
  open,
  onOpenChange,
  storyId,
  isLinkOnly = false,
}: ShareModalProps) {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [shareUrl, setShareUrl] = useState<string>('');
  const { publicKey } = usePublicKey();
  
  const [, convert] = useToPng<HTMLDivElement>({
    selector: `#${storyId}`,
    quality: 0.8,
    onSuccess: (data) => {
      const link = document.createElement('a');
      link.download = 'My Solana Wrapped 2024! 🚀✨';
      link.href = data;
      link.click();
    },
  });

  useEffect(() => {
    // Safely construct URL on client-side only
    if (typeof window !== 'undefined') {
      setShareUrl(`${window.location.origin}/${publicKey}?story=${storyId}`);
    }
  }, [publicKey, storyId]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCopied) {
      timer = setTimeout(() => setIsCopied(false), 3000);
    }
    return () => clearTimeout(timer);
  }, [isCopied]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setIsCopied(true);
    } catch (error) {
      console.error('Copy error:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-[#121212] text-white">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex items-center space-x-2">
            <Input
              value={shareUrl}
              readOnly
              className="flex-grow border-white/10 border outline-none"
            />
            <Button
              onClick={handleCopyLink}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 flex-shrink-0"
            >
              {isCopied ? (
                <Check className="w-4 h-4 mr-2" />
              ) : (
                <Link2 className="w-4 h-4 mr-2" />
              )}
              {isCopied ? 'Copied' : 'Copy link'}
            </Button>
          </div>
          {!isLinkOnly && (
            <Button
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 h-11"
              onClick={convert}
            >
              <Download className="w-4 h-4" />
              Download
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

