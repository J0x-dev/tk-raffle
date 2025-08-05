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
    image: '/imgs/destinations/coron-palawan-island.jpg',
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
    image: '/imgs/destinations/discovery-suites.jpg',
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
