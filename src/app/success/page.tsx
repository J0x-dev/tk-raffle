import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardHeader className="p-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <div className="mt-4">
                <CardTitle className="text-2xl font-bold text-[#8a2a2b]">Submission Successful!</CardTitle>
                <CardDescription className="mt-2 text-muted-foreground">
                    Thank you for your entry. We have received your information.
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
    </main>
  );
}
