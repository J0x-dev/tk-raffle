
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || 'Customer';
  const amount = searchParams.get('amount') || '0';
  const entries = searchParams.get('entries') || '0';

  return (
    <Card className="w-full max-w-md text-center shadow-lg">
      <CardHeader className="p-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        <div className="mt-4">
          <CardTitle className="text-2xl font-bold text-[#8a2a2b]">Submission Successful!</CardTitle>
          <CardDescription className="mt-2 text-muted-foreground">
            Hi {name}, Congratulations! Thank you for joining the Tapa King Royal Escape 38th Anniversary Vacation Raffle! Based on your recent purchase of ₱{amount}, you have earned {entries} raffle entries!
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <p className="text-sm text-gray-600 mb-6">
          Winners will be announced after the raffle draw. Good luck!
        </p>
        <Button asChild className="w-full">
          <Link href="/">Back to Form</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

export default function SuccessPage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <SuccessContent />
      </Suspense>
    </main>
  );
}
