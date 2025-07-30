// TermsAndConditions.tsx
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
import { ScrollArea } from './ui/scroll-area';
import { X } from 'lucide-react';

export function TermsAndConditions() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="h-auto p-0 text-[#8a2a2b] underline">
          Terms and Conditions
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-full max-h-[80vh] max-w-4xl flex-col border-none p-5 sm:p-8">
        <DialogHeader>
          <DialogTitle>Tapa King's Discover Philippines Travel Raffle Promo</DialogTitle>
          <DialogDescription>
            Terms of Use for E-Raffle System Participation
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="-mx-6 h-full pr-4 sm:-mx-8">
          <div className="space-y-4 px-6 pb-6 text-left text-sm sm:px-8">
            <p>
              <strong>Promo Period:</strong> August 18, 2025 to October 31, 2025
              <br />
              <strong>DTI Fair Trade Permit No.</strong> XXXX XXXX XXXX
            </p>

            <p>
              These Terms of Use (&quot;Terms&quot;) govern your access and
              participation in Tapa King&apos;s Royal Escape Raffle Promo
              (&quot;Promo&quot;) through the official E-Raffle Management
              System (&quot;System&quot;). By joining the promo and submitting
              an entry via the System, you agree to abide by these Terms.
            </p>

            <h3 className="mb-2 font-bold">1. Eligibility</h3>
            <p>
              1.1 The Promo is open to all customers of Tapa King nationwide who
              meet the minimum purchase requirement as stated in the official
              mechanics.
            </p>
            <p>
              1.2 Employees of Tapa King, its affiliates, advertising and promo
              agencies, and their relatives up to the second degree of
              consanguinity or affinity are not eligible to join.
            </p>
            <p>
              1.3 Participants must be at least 18 years old and residents of
              the Philippines.
            </p>

            <h3 className="mb-2 font-bold">2. Promo Mechanics</h3>
            <p>
              2.1 For every P750 dine-in purchase on a single receipt from any
              participating Tapa King branch, the customer is entitled to one
              (1) raffle entry.
            </p>
            <p>
              2.2 Entries must be submitted via the official E-Raffle System at
              tkdiscoverphraffle.com.
            </p>
            <p>
              2.3 All entries must be submitted on or before October 31, 2025.
              Late or incomplete entries will not be accepted.
            </p>

            <h3 className="mb-2 font-bold">3. Prizes</h3>
            <ul className="list-disc space-y-1 pl-6">
              <li>
                <strong>Major Prizes - Eight (8) Winners:</strong>
                <ul className="list-circle pl-6">
                  <li>Discovery Samal Package for two (2)</li>
                  <li>Discovery Coron Package for two (2)</li>
                  <li>Discovery Boracay Package for two (2)</li>
                  <li>Discovery Suites Package for one (1)</li>
                  <li>Discovery Primea Package for one (1)</li>
                </ul>
              </li>
              <li>
                <strong>Consolation Prizes - Thirty-Eight (38) Winners:</strong>
                <ul className="list-circle pl-6">
                  <li>10 winners of Gift Box #9</li>
                  <li>10 winners of ₱1,000 Gift Certificates</li>
                  <li>10 winners of ₱1,500 Gift Certificates</li>
                  <li>8 winners of ₱2,000 Gift Certificates</li>
                </ul>
              </li>
            </ul>

            <h3 className="mb-2 font-bold">4. Winner Selection</h3>
            <p>
              4.1 Winners will be drawn electronically via the System on
              November 7, 2025 under the supervision of a DTI representative.
            </p>
            <p>
              4.2 All winners will be notified via registered email, phone call,
              and/or official social media pages.
            </p>
            <p>4.3 A valid ID must be presented when claiming prizes.</p>
            <p>
              4.4 The list of winners will be posted on the official Tapa King
              social media pages.
            </p>

            <h3 className="mb-2 font-bold">5. Claiming of Prizes</h3>
            <p>
              <strong>Requirements:</strong>
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Letter of notification from Tapa King</li>
              <li>
                Two (2) valid government-issued IDs with a photo (e.g.,
                Passport, Driver’s License, SSS or GSIS ID, Postal ID, Voter’s
                ID, NBI Clearance, or Company ID)
              </li>
              <li>
                Original receipt and the registered mobile number used during
                entry registration (Note: Duplicated receipts will not be
                accepted)
              </li>
              <li>
                Winners below 18 years old must be accompanied by a parent or
                guardian with valid IDs
              </li>
            </ul>
            <p>
              <strong>Claim Locations:</strong>
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>
                Tapa King Head Office: 16 Armal Compound, Francisco Legaspi St.,
                Maybunga, Pasig City
              </li>
              <li>
                Provincial winners may claim their prize at a Tapa King branch
                within their area
              </li>
            </ul>

            <h3 className="mb-2 font-bold">6. Data Privacy & Consent</h3>
            <p>
              6.1 By entering the Promo, participants consent to the collection
              and processing of personal information including name, mobile
              number, email, and purchase details.
            </p>
            <p>
              6.2 All data collected will be used solely for raffle
              administration, winner verification, and DTI audit purposes.
            </p>
            <p>
              6.3 Tapa King adheres to the Data Privacy Act of 2012 and ensures
              the protection of personal data.
            </p>

            <h3 className="mb-2 font-bold">7. System Usage & Limitations</h3>
            <p>
              7.1 The E-Raffle System is the only official channel for entry
              submissions.
            </p>
            <p>
              7.2 Participants agree not to tamper, hack, or abuse the system.
            </p>
            <p>
              7.3 Tapa King is not liable for system outages, entry errors, or
              internet connectivity issues that may affect submission.
            </p>

            <h3 className="mb-2 font-bold">8. Disqualification & Forfeiture</h3>
            <p>
              8.1 Tapa King reserves the right to disqualify entries that are
              fraudulent, incomplete, duplicated, or violate any promo rules.
            </p>
            <p>
              8.2 Prizes unclaimed after 60 days from receipt of notification
              will be forfeited in favor of Tapa King with prior DTI approval.
            </p>

            <h3 className="mb-2 font-bold">9. Liability Limitation</h3>
            <p>
              Tapa King and its partners will not be held liable for any
              damages, loss, or injury incurred during participation in the
              promo or the use of prizes awarded.
            </p>

            <h3 className="mb-2 font-bold">10. Governing Law</h3>
            <p>
              These Terms are governed by the laws of the Republic of the
              Philippines, and disputes arising in connection with the promo
              shall be resolved under Philippine jurisdiction.
            </p>
          </div>
        </ScrollArea>
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
