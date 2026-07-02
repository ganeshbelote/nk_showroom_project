import CarHero from '@/components/car-details/CarHero'
import CarHighlights from '@/components/car-details/CarHighlights'
import VariantPricing from '@/components/car-details/VariantPricing'
import CarReviews from '@/components/car-details/CarReviews'
import CarDetailsNavbar from '@/components/car-details/CarDetailsNavbar'

export default async function CarDetailsPage ({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  // TODO: Replace with DB/API
  const car = {
    slug,
    name: 'Maruti Brezza',
    description:
      'The Maruti Brezza combines comfort, safety and performance with modern styling. Designed for families looking for reliability and affordability.',
    price: '₹8.69 Lakh',
    rating: 4.8,
    reviews: 312,
    image: '/cars/brezza.webp',

    specs: [
      { label: 'Fuel Type', value: 'Petrol' },
      { label: 'Engine', value: '1462 cc' },
      { label: 'Power', value: '103 bhp' },
      { label: 'Torque', value: '137 Nm' },
      { label: 'Transmission', value: 'Automatic' },
      { label: 'Mileage', value: '19.8 kmpl' },
      { label: 'Boot Space', value: '328 L' },
      { label: 'Seats', value: '5' }
    ],

    features: [
      'ABS',
      '6 Airbags',
      'Cruise Control',
      '360 Camera',
      'Push Start',
      'Hill Assist',
      'Auto Climate Control',
      'Rear AC Vents',
      'LED Headlamps',
      'Wireless Android Auto'
    ],

    variants: [
      {
        name: 'LXi',
        fuel: 'Petrol',
        transmission: 'Manual',
        price: '₹8.69 Lakh'
      },
      {
        name: 'VXi',
        fuel: 'Petrol',
        transmission: 'Manual',
        price: '₹9.99 Lakh'
      },
      {
        name: 'ZXi',
        fuel: 'Petrol',
        transmission: 'Automatic',
        price: '₹12.49 Lakh'
      }
    ]
  }

  return (
    <main className='mx-auto max-w-7xl space-y-8 px-4 pb-6 lg:px-8'>
      <CarDetailsNavbar carName={car.name} />

      <CarHero car={car} />

      <CarHighlights
        car={{
          mileage: '19.8 kmpl',
          engine: '1462 cc',
          power: '103 bhp',
          torque: '137 Nm',
          transmission: 'Automatic',
          fuel: 'Petrol',
          seats: '5',
          bodyType: 'SUV',
          bootSpace: '328 L',
          groundClearance: '198 mm',
          features: car.features
        }}
      />

      <VariantPricing variants={car.variants} />

      <CarReviews />
    </main>
  )
}
