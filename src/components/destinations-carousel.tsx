"use client"

import { Card, CardContent } from "@/components/ui/card"
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
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
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
    name: "Coron Palawan",
    location: "Palawan, Philippines",
    description: "Breathtaking limestone karsts, hidden lagoons, and pristine diving spots",
    category: "Natural Wonder",
    image: "/imgs/destinations/coron-palawan-islands.png",
  },
  {
    name: "Samal Island",
    location: "Davao del Norte, Philippines",
    description: "Island garden city with untouched beaches and lush tropical landscapes",
    category: "Island Getaway",
    image: "/imgs/destinations/samal-island-beach.png",
  },
  {
    name: "Boracay Beach",
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
  const [agreedToTerms, setAgreedToTerms] = useState(false)
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
    if (!agreedToTerms) {
      setShowTermsAlert(true)
    } else {
      router.push('/raffle-form')
    }
  }

  const handleCheckboxChange = (checked: boolean) => {
    setAgreedToTerms(checked)
    if (checked && raffleButtonRef.current) {
      setTimeout(() => {
        if (raffleButtonRef.current) {
          raffleButtonRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
          raffleButtonRef.current.focus()
        }
      }, 1000)
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-4 sm:px-6 md:px-8 bg-[#ece5d2] min-h-screen">
      <div className="text-center mb-8 sm:mb-12">
        <Badge variant="secondary" className="mb-3 px-3 py-1 text-xs sm:text-sm font-medium rounded-full">
          ✈️ Travel Destinations
        </Badge>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#892a2b] mb-2 sm:mb-4">
          Discover the Philippines
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Explore breathtaking destinations and create unforgettable memories in the Philippines
        </p>
      </div>

      <Carousel className="w-full" setApi={setApi}>
        <CarouselContent className="-ml-2 sm:-ml-4">
          {destinations.map((destination, index) => (
            <CarouselItem key={index} className="pl-2 sm:pl-4">
              <Card className="border-0 overflow-hidden rounded-2xl">
                {" "}
                {/* Removed shadow-xl */}
                <CardContent className="p-0">
                  {" "}
                  {/* Removed border border-red */}
                  <div className="relative">
                    <Image
                      src={destination.image || "/placeholder.svg"}
                      alt={`${destination.name} - ${destination.description}`}
                      width={800}
                      height={500}
                      className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover rounded-2xl"
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
              className={`relative overflow-hidden rounded-xl transition-all duration-300 ${
                index === currentSlide
                  ? "ring-2 ring-[#cc9900] scale-110 shadow-lg"
                  : "ring-1 ring-gray-200 hover:ring-gray-300 hover:scale-105"
              }`}
            >
              <Image
                src={destination.image || "/placeholder.svg"}
                alt={`${destination.name} thumbnail`}
                width={60}
                height={45}
                className="w-15 h-12 sm:w-20 sm:h-15 object-cover rounded-xl"
              />
              {/* Active overlay */}
              {index === currentSlide && <div className="absolute inset-0 bg-[#cc9900]/20 rounded-xl" />}
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
      <div className="text-center mt-6 sm:mt-8">
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
            🎉 TAPA KING ROYAL ESCAPE RAFFLE PROMO
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4">
            <span className="font-semibold text-gray-800">Terms of Use for E-Raffle System Participation</span>
            <br />
            <span className="font-semibold text-gray-800">Promo Period:</span> August 1, 2025 to October 31, 2025
            <br />
            <span className="font-semibold text-gray-800">DTI Fair Trade Permit No.:</span> XXXX XXXX XXXX
          </p>
          <p className="text-sm sm:text-base text-gray-700 mb-4">
            These Terms of Use ("Terms") govern your access and participation in Tapa King's Royal Escape Raffle Promo
            ("Promo") through the official E-Raffle Management System ("System"). By joining the promo and submitting an
            entry via the System, you agree to abide by these Terms.
          </p>

          <div className="space-y-3 sm:space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base">
            <div>
              <h4 className="font-semibold text-gray-800 mb-1 sm:mb-2">1. Eligibility</h4>
              <ul className="list-disc list-inside space-y-1 ml-2 sm:ml-4">
                <li>
                  The Promo is open to all customers of Tapa King nationwide who meet the minimum purchase requirement
                  as stated in the official mechanics.
                </li>
                <li>
                  Employees of Tapa King, its affiliates, advertising and promo agencies, and their relatives up to the
                  second degree of consanguinity or affinity are not eligible to join.
                </li>
                <li>Participants must be at least 18 years old and residents of the Philippines.</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-1 sm:mb-2">2. Promo Mechanics</h4>
              <ul className="list-disc list-inside space-y-1 ml-2 sm:ml-4">
                <li>
                  For every P750 dine-in purchase on a single receipt from any participating Tapa King branch, the
                  customer is entitled to one (1) raffle entry.
                </li>
                <li>Entries must be submitted via the official E-Raffle System at tk38royalescaperaffle.com.</li>
                <li>
                  All entries must be submitted on or before October 31, 2025. Late or incomplete entries will not be
                  accepted.
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-1 sm:mb-2">3. Prizes</h4>
              <p className="mb-2">**Major Prizes - Eight (8) Winners:**</p>
              <ul className="list-disc list-inside space-y-1 ml-2 sm:ml-4">
                <li>Discovery Coron Package for two (2)</li>
                <li>Discovery Samal Package for two (2)</li>
                <li>Discovery Boracay Package for two (2)</li>
                <li>Discovery Suites (1)</li>
                <li>Discovery Primea (1)</li>
              </ul>
              <p className="mt-3 mb-2">**Consolation Prizes - Thirty-Eight (38) Winners:**</p>
              <ul className="list-disc list-inside space-y-1 ml-2 sm:ml-4">
                <li>10 winners of Gift Box #9</li>
                <li>10 winners of ₱1,000 Gift Certificates</li>
                <li>10 winners of ₱1,500 Gift Certificates</li>
                <li>8 winners of ₱2,000 Gift Certificates</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-1 sm:mb-2">4. Winner Selection</h4>
              <ul className="list-disc list-inside space-y-1 ml-2 sm:ml-4">
                <li>
                  Winners will be drawn electronically via the System on November 7, 2025 under the supervision of a DTI
                  representative.
                </li>
                <li>
                  All winners will be notified via registered email, phone call, and/or official social media pages.
                </li>
                <li>A valid ID must be presented when claiming prizes.</li>
                <li>The list of winners will be posted on the official Tapa King social media pages.</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-1 sm:mb-2">5. Claiming of Prizes</h4>
              <p className="mb-2">**Requirements:**</p>
              <ul className="list-disc list-inside space-y-1 ml-2 sm:ml-4">
                <li>Letter of notification from Tapa King</li>
                <li>
                  Two (2) valid government-issued IDs with a photo (e.g., Passport, Driver’s License, SSS or GSIS ID,
                  Postal ID, Voter’s ID, NBI Clearance, or Company ID)
                </li>
                <li>
                  Original receipt and the registered mobile number used during entry registration (Note: Duplicated
                  receipts will not be accepted)
                </li>
                <li>Winners below 18 years old must be accompanied by a parent or guardian with valid IDs</li>
              </ul>
              <p className="mt-3 mb-2">**Claim Locations:**</p>
              <ul className="list-disc list-inside space-y-1 ml-2 sm:ml-4">
                <li>Tapa King Head Office: 16 Armal Compound, Francisco Legaspi St., Maybunga, Pasig City</li>
                <li>Provincial winners may claim their prize at a Tapa King branch within their area</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-1 sm:mb-2">6. Data Privacy & Consent</h4>
              <ul className="list-disc list-inside space-y-1 ml-2 sm:ml-4">
                <li>
                  By entering the Promo, participants consent to the collection and processing of personal information
                  including name, mobile number, email, and purchase details.
                </li>
                <li>
                  All data collected will be used solely for raffle administration, winner verification, and DTI audit
                  purposes.
                </li>
                <li>Tapa King adheres to the Data Privacy Act of 2012 and ensures the protection of personal data.</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-1 sm:mb-2">7. System Usage & Limitations</h4>
              <ul className="list-disc list-inside space-y-1 ml-2 sm:ml-4">
                <li>The E-Raffle System is the only official channel for entry submissions.</li>
                <li>Participants agree not to tamper, hack, or abuse the system.</li>
                <li>
                  Tapa King is not liable for system outages, entry errors, or internet connectivity issues that may
                  affect submission.
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-1 sm:mb-2">8. Disqualification & Forfeiture</h4>
              <ul className="list-disc list-inside space-y-1 ml-2 sm:ml-4">
                <li>
                  Tapa King reserves the right to disqualify entries that are fraudulent, incomplete, duplicated, or
                  violate any promo rules.
                </li>
                <li>
                  Prizes unclaimed after 60 days from receipt of notification will be forfeited in favor of Tapa King
                  with prior DTI approval.
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-1 sm:mb-2">9. Liability Limitation</h4>
              <p>
                Tapa King and its partners will not be held liable for any damages, loss, or injury incurred during
                participation in the promo or the use of prizes awarded.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-1 sm:mb-2">10. Governing Law</h4>
              <p>
                These Terms are governed by the laws of the Republic of the Philippines, and disputes arising in
                connection with the promo shall be resolved under Philippine jurisdiction.
              </p>
            </div>
          </div>
          {/* Terms and Conditions Checkbox - Moved to the end of the section */}
          <div className="flex items-center justify-center mt-8 sm:mt-10 space-x-2">
            <Checkbox
              id="terms"
              checked={agreedToTerms}
              onCheckedChange={handleCheckboxChange}
              className="w-5 h-5 border-[#892a2b] data-[state=checked]:bg-[#892a2b] data-[state=checked]:text-white"
            />
            <Label htmlFor="terms" className="text-sm sm:text-base text-gray-700 cursor-pointer">
              I agree to the Terms and Conditions
            </Label>
          </div>
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
