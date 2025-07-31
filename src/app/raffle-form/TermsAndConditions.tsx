import React from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '../../components/ui/scroll-area';
import TermsContent from './TermsContent';
import { X } from 'lucide-react';

export function TermsAndConditions() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="h-auto p-0 text-[#8a2a2b] underline">
          Terms and Conditions
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-full max-h-[80vh] max-w-4xl flex-col border-none p-5 sm:p-8 text-[#111]">
        <DialogHeader>
          <DialogTitle>Tapa King's Discover the Philippines Travel Raffle Promo</DialogTitle>
          <DialogDescription>
            Terms of Use for E-Raffle System Participation
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="-mx-6 h-full pr-4 sm:-mx-8">
          <div className="px-6 text-left text-sm sm:px-8 font-inter">
            <TermsContent />
          </div>
        </ScrollArea>
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
