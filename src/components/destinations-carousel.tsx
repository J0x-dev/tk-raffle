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
import TermsContent from "./TermsContent"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { destinations, sponsorLogos } from "./destinations-data"

export function DestinationsCarousel() {
  const [api, setApi] = useState<CarouselApi>()
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    api.on("select", () => {
      setCurrentSlide(api.selectedScrollSnap())
    })

    setCurrentSlide(api.selectedScrollSnap())
  }, [api])


  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 bg-[#ece5d2] min-h-screen relative">
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
                      loading="eager"
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

      {/* Winners text info as Badge */}
      <div className="mt-4 text-center">
        <Badge variant="secondary" className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-full shadow-lg">
          {destinations[currentSlide].winners}
        </Badge>
      </div>

      {/* Thumbnail Preview Indicators */}
      <div className="flex justify-center mt-6 sm:mt-8 gap-x-3 gap-y-4">
        {destinations.map((destination, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className="flex flex-col items-center group cursor-pointer focus:outline-none"
          >
            <div
              className={`relative overflow-hidden rounded-xl transition-all duration-300 w-[60px] h-[45px] sm:w-[80px] sm:h-[60px] ${index === currentSlide
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
                loading="eager"
                priority={true}
              />

              {/* Active overlay */}
              {index === currentSlide && (
                <div className="absolute inset-0 bg-[#cc9900]/20 rounded-xl" />
              )}
            </div>
            <span
              className={`text-xs mt-2 transition-all duration-300 text-center max-w-[60px] sm:max-w-20 ${index === currentSlide ? "text-[#cc9900] font-semibold" : "text-gray-500"
                }`}
            >
              {destination.name}
            </span>
          </button>
        ))}
      </div>

      {/* Join Raffle Button */}
      <div className="text-center mt-10">
        <Link
          href="/raffle-form"
          className="animate-bounce px-8 py-2 text-lg font-semibold bg-[#892a2b] hover:bg-[#a03a3b] text-white rounded-full shadow-lg transition-all duration-800 transform hover:scale-105 inline-block"
        >
          Join Raffle Now! 🎉
        </Link>
      </div>

      {/* Sponsor Logos Section */}
      <div className="w-full max-w-lg mx-auto mt-12 bg-white rounded-2xl shadow-lg p-6">
        <h4 className="text-center text-base font-semibold text-[#8a2a2b] mb-4">In Partnership with</h4>
        <>
          <div className="grid grid-cols-3 gap-6 mb-4">
            {sponsorLogos.slice(0, 3).map((logo) => (
              <div key={logo.alt} className="flex justify-center items-center relative h-[60px]">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  sizes="(max-width: 768px) 80px, (max-width: 1024px) 100px, 120px"
                  className="object-contain"
                  priority={true}
                />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 px-6">
            {sponsorLogos.slice(3).map((logo) => (
              <div key={logo.alt} className="flex justify-center items-center relative h-[60px]">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  sizes="(max-width: 768px) 80px, (max-width: 1024px) 100px, 120px"
                  className="object-contain"
                  priority={true}
                />
              </div>
            ))}
          </div>
        </>
      </div>

      {/* Consolation Prizes Grid */}
      <div className="max-w-xl mx-auto mt-12">
        <h4 className="text-lg font-bold text-[#8a2a2b] mb-4 text-center">Consolation Prizes <span className="text-xs font-normal">(38 Winners)</span></h4>
        <div className="grid grid-cols-2 gap-4">
          <Badge variant="secondary" className="w-full py-4 text-sm font-semibold rounded-xl shadow flex justify-center items-center text-center">10 winners of <br /> Gift Box #9</Badge>
          <Badge variant="secondary" className="w-full py-4 text-sm font-semibold rounded-xl shadow flex justify-center items-center text-center">10 winners of ₱1,000 <br /> Gift Certificates</Badge>
          <Badge variant="secondary" className="w-full py-4 text-sm font-semibold rounded-xl shadow flex justify-center items-center text-center">10 winners of ₱1,500 <br /> Gift Certificates</Badge>
          <Badge variant="secondary" className="w-full py-4 text-sm font-semibold rounded-xl shadow flex justify-center items-center text-center">8 winners of ₱2,000 <br /> Gift Certificates</Badge>
        </div>
      </div>

      {/* Terms and Conditions Section */}
      <div id="terms-and-conditions" className="mt-12 sm:mt-16 max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
            Terms of Use for E-Raffle System Participation
          </h3>
          <div className="text-left text-sm sm:px-4 font-inter">
            <TermsContent />
          </div>
        </div>
      </div>
    </div>
  )
}
