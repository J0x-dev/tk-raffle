// export const destinations = [
//   {
//     name: 'Discovery Samal',
//     location: 'Davao del Norte, Philippines',
//     description:
//       'Island garden city with untouched beaches and lush tropical landscapes',
//     category: 'Island Getaway',
//     image: '/imgs/destinations/samal-island-beach.jpg',
//     winners: '2 Winners - Discovery Samal Package for two (2)',
//   },
//   {
//     name: 'Discovery Coron',
//     location: 'Palawan, Philippines',
//     description:
//       'Breathtaking limestone karsts, hidden lagoons, and pristine diving spots',
//     category: 'Natural Wonder',
//     image: '/imgs/destinations/coron-palawan-islands.jpg',
//     winners: '2 Winners - Discovery Coron Package for two (2)',
//   },
//   {
//     name: 'Discovery Boracay',
//     location: 'Aklan, Philippines',
//     description:
//       'World-famous white sand beach with crystal clear waters and vibrant nightlife',
//     category: 'Beach Paradise',
//     image: '/imgs/destinations/boracay-beach.jpg',
//     winners: '2 Winners - Discovery Boracay Package for two (2)',
//   },
//   {
//     name: 'Discovery Primea',
//     location: 'Makati, Manila',
//     description: 'Premium boutique hotel in the heart of the business district',
//     category: 'Business Hotel',
//     image: '/imgs/destinations/discovery-primea.jpg',
//     winners: '1 Winner - Discovery Suites Package for two (2)',
//   },
//   {
//     name: 'Discovery Suites',
//     location: 'Ortigas, Manila',
//     description:
//       'Luxury urban retreat with world-class amenities and city skyline views',
//     category: 'Luxury Hotel',
//     image: '/imgs/destinations/discovery-suites-view.jpg',
//     winners: '1 Winner - Discovery Primea Package for two (2)',
//   },
// ];

import {
  blurImgSamal,
  blurImgCoron,
  blurImgBoracay,
  blurImgPrimea,
  blurImgSuites,
} from '@/data/blurData';

export const destinationsData = [
  {
    name: 'Discovery Samal',
    location: 'Samal, Davao del Norte',
    image: '/imgs/destinations/samal-island-beach.jpg',
    blurDataURL: blurImgSamal,
    winners: '2 Winners',
  },
  {
    name: 'Discovery Coron',
    location: 'Coron, Palawan',
    image: '/imgs/destinations/coron-palawan-islands.jpg',
    blurDataURL: blurImgCoron,
    winners: '2 Winners',
  },
  {
    name: 'Discovery Boracay',
    location: 'Boracay Island, Aklan',
    image: '/imgs/destinations/boracay-beach.jpg',
    blurDataURL: blurImgBoracay,
    winners: '2 Winners',
  },
  {
    name: 'Discovery Primea',
    location: 'Ayala, Makati',
    image: '/imgs/destinations/discovery-primea.jpg',
    blurDataURL: blurImgPrimea,
    winners: '1 Winner',
  },
  {
    name: 'Discovery Suites',
    location: 'Ortigas, Pasig',
    image: '/imgs/destinations/discovery-suites-view.jpg',
    blurDataURL: blurImgSuites,
    winners: '1 Winner',
  },
];

export const sponsorLogos = [
  { src: '/imgs/logo/discovery-samal-logo.png', alt: 'Discovery Samal' },
  { src: '/imgs/logo/discovery-coron-logo.png', alt: 'Discovery Coron' },
  { src: '/imgs/logo/discovery-boracay-logo.png', alt: 'Discovery Boracay' },
  { src: '/imgs/logo/discovery-primea-logo.png', alt: 'Discovery Primea' },
  { src: '/imgs/logo/discovery-suites-logo.png', alt: 'Discovery Suites' },
];
