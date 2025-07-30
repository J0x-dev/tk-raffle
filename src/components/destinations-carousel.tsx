"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const destinations = [
  {
    name: "Discovery Samal",
    location: "Davao del Norte, Philippines",
    description: "Island garden city with untouched beaches and lush tropical landscapes",
    category: "Island Getaway",
    image: "/imgs/destinations/samal-island-beach.png",
  },
  {
    name: "Discovery Coron",
    location: "Palawan, Philippines",
    description: "Breathtaking limestone karsts, hidden lagoons, and pristine diving spots",
    category: "Natural Wonder",
    image: "/imgs/destinations/coron-palawan-islands.png",
  },
  {
    name: "Discovery Boracay",
    location: "Aklan, Philippines",
    description: "World-famous white sand beach with crystal clear waters and vibrant nightlife",
    category: "Beach Paradise",
    image: "/imgs/destinations/boracay-beach.png",
  },
  {
    name: "Discovery Primea",
    location: "Makati, Manila",
    description: "Premium boutique hotel in the heart of the business district",
    category: "Business Hotel",
    image: "/imgs/destinations/discovery-primea-landmark.png",
  },
  {
    name: "Discovery Suites",
    location: "Ortigas, Manila",
    description: "Luxury urban retreat with world-class amenities and city skyline views",
    category: "Luxury Hotel",
    image: "/imgs/destinations/discovery-suites-view.png",
  },
]

export function DestinationsCarousel() {
  const [api, setApi] = useState<CarouselApi>()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showTermsAlert, setShowTermsAlert] = useState(false)
  const raffleButtonRef = useRef<HTMLButtonElement>(null)

  const router = useRouter()

  useEffect(() => {
    if (!api) {
      return
    }

    api.on("select", () => {
      setCurrentSlide(api.selectedScrollSnap())
    })

    setCurrentSlide(api.selectedScrollSnap())
  }, [api])

  const handleJoinRaffleClick = () => {
    router.push('/raffle-form')
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 pb-10 sm:px-6 md:px-8 bg-[#ece5d2] min-h-screen">
      <div className="text-center">
        <CardHeader className="px-0">
          <CardTitle className="text-center font-headline text-[22px] font-bold leading-[30px] text-[#8a2a2b] tracking-wide">
            Discover the Philippines
          </CardTitle>
          <CardDescription className="text-center text-base text-[#8a2b2b]">
            Explore breathtaking destinations and create unforgettable memories in the Philippines
          </CardDescription>
        </CardHeader>
         <Badge variant="secondary" className="mb-3 px-3 py-1 text-xs sm:text-sm font-medium rounded-full">
          ✈️ Travel Destinations
        </Badge>
      </div>

      <Carousel className="w-full" setApi={setApi}>
        <CarouselContent className="-ml-2 sm:-ml-4">
          {destinations.map((destination, index) => (
            <CarouselItem key={index} className="pl-2 sm:pl-4">
              <Card className="border-0 overflow-hidden rounded-2xl">
                <CardContent className="p-0">
                  <div className="relative">
                    <Image
                      src={destination.image || "/placeholder.svg"}
                      alt={`${destination.name} - ${destination.description}`}
                      width={800}
                      height={500}
                      className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover rounded-2xl"
                      priority={true}
                    />
                    {/* Overlay for title and description */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 rounded-b-2xl sm:p-6">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">{destination.name}</h3>
                      <p className="text-sm sm:text-base md:text-lg text-gray-200">{destination.description}</p>
                      {/* Location and Category */}
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="text-xs sm:text-sm text-gray-300 bg-white/20 px-2 py-1 rounded-full">
                          {destination.location}
                        </span>
                        <span className="text-xs sm:text-sm text-gray-300 bg-white/20 px-2 py-1 rounded-full">
                          {destination.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 sm:left-4 md:left-8 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 hover:bg-white border-0 shadow-lg rounded-full" />
        <CarouselNext className="right-2 sm:right-4 md:right-8 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 hover:bg-white border-0 shadow-lg rounded-full" />
      </Carousel>

      {/* Thumbnail Preview Indicators */}
      <div className="flex justify-center mt-6 sm:mt-8 gap-x-3 gap-y-4">
        {destinations.map((destination, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className="flex flex-col items-center group cursor-pointer focus:outline-none"
          >
            <div
              className={`relative overflow-hidden rounded-xl transition-all duration-300 w-[60px] h-[45px] sm:w-[80px] sm:h-[60px] ${
                index === currentSlide
                  ? "ring-2 ring-[#cc9900] scale-110 shadow-lg"
                  : "ring-1 ring-gray-200 hover:ring-gray-300 hover:scale-105"
              }`}
            >
              <Image
                src={destination.image || "/placeholder.svg"}
                alt={`${destination.name} thumbnail`}
                fill
                className="object-cover rounded-xl"
                sizes="(min-width: 640px) 80px, 60px"
                priority
              />

              {/* Active overlay */}
              {index === currentSlide && (
                <div className="absolute inset-0 bg-[#cc9900]/20 rounded-xl" />
              )}
            </div>
            <span
              className={`text-xs mt-2 transition-all duration-300 text-center max-w-[60px] sm:max-w-20 ${
                index === currentSlide ? "text-[#cc9900] font-semibold" : "text-gray-500"
              }`}
            >
              {destination.name}
            </span>
          </button>
        ))}
      </div>

      {/* Join Raffle Button */}
      <div className="text-center mt-8">
        {/* <Button
          ref={raffleButtonRef}
          onClick={handleJoinRaffleClick}
          className="px-8 py-3 text-lg font-semibold bg-[#892a2b] hover:bg-[#a03a3b] text-white rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          Join Raffle Now! 🎉
        </Button> */}
        <Button
          ref={raffleButtonRef}
          onClick={handleJoinRaffleClick}
          className="animate-bounce px-8 py-3 text-lg font-semibold bg-[#892a2b] hover:bg-[#a03a3b] text-white rounded-full shadow-lg transition-all duration-800 transform hover:scale-105"
        >
          Join Raffle Now! 🎉
        </Button>
      </div>

      {/* Terms and Conditions Section */}
      <div id="terms-and-conditions" className="mt-12 sm:mt-16 max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
            Terms of Use for E-Raffle System Participation
          </h3>
          <h3 className="text-center"></h3>
          <div className="space-y-4 text-left text-sm sm:px-4">
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
          {/* Terms and Conditions Checkbox - Moved to the end of the section */}
          {/* <div className="flex items-center justify-center mt-8 sm:mt-10 space-x-2">
            <Checkbox
              id="terms"
              checked={agreedToTerms}
              onCheckedChange={handleCheckboxChange}
              className="w-5 h-5 border-[#892a2b] data-[state=checked]:bg-[#892a2b] data-[state=checked]:text-white"
            />
            <Label htmlFor="terms" className="text-sm sm:text-base text-gray-700 cursor-pointer">
              I agree to the Terms and Conditions
            </Label>
          </div> */}
        </div>
      </div>

      {/* Custom Alert Dialog for Terms and Conditions */}
      <AlertDialog open={showTermsAlert} onOpenChange={setShowTermsAlert}>
        <AlertDialogContent className="rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center text-xl font-bold text-[#892a2b]">
              Terms and Conditions Required
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-gray-700">
              Read and accept the Terms and Conditions to join the raffle.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="justify-center">
            <AlertDialogAction
              onClick={() => setShowTermsAlert(false)}
              className="bg-[#892a2b] hover:bg-[#a03a3b] text-white rounded-full px-6 py-2"
            >
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
