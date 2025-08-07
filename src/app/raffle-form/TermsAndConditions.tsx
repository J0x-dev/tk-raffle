import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
        <Button variant="link" className="h-auto p-0 text-maroon underline">
          Terms and Conditions
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-full max-h-[80vh] max-w-4xl flex-col border-none p-5 text-[#111] sm:p-8">
        <DialogHeader>
          <DialogTitle className="text-warm-red">
            Tapa King Nationwide E-Raffle Promo
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="-mx-6 h-full pr-4 sm:-mx-8">
          <div className="px-6 text-left text-sm text-maroon sm:px-8">
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
