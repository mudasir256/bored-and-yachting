import Head from 'next/head'
import { useBoats } from '@/endpoints/get'
import Loading from '@/components/small/Loading'
import BoatGrid from '@/components/combined/utility/BoatGrid'
import Header from '@/components/small/Header'
import Subheader from '@/components/small/Subheader'
import Searchbar from '@/components/combined/utility/Searchbar'
import Input from '@/components/Input'
import Image from 'next/image'
import Button from '@/components/small/Button'

import { useState } from 'react'

export default function Home() {

  const { boats, isLoading } = useBoats()

  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [saved, setSaved] = useState(false)

  const handleNewsletterSignUp = (e) => {
    e.preventDefault()
    //TODO: 
    console.log(newsletterEmail)
    setSaved(true)
  }

  return (
    <>
      <Head>
        <title>Bored and Yachting</title>
        <meta name="description" content="" />
      </Head>
      <main>
          {isLoading 
            ? <div className="flex justify-center mt-12"><Loading /></div> 
            : <div>
                <div>
                  <div className="relative w-full h-[80vh]">
                    <div className="absolute top-1/4 z-10 left-1/2 w-full transform -translate-x-1/2 flex flex-col gap-4 justify-center">
                      <div className="text-center text-white">
                        <Header text="Boat Rentals and Yacht Charters near you" />
                        <p>Find the best charters available near you</p>
                      </div>
                      <div className="mx-auto p-4">
                        <Searchbar />
                      </div>
                    </div>
                    <Image src="/content/boat.jpg" alt="hero-image" className="object-cover brightness-50" layout="fill" />
                  </div>
                </div>

                {/*   Boat Grid   */}
                <div>
                  <div className="mt-4 text-center">
                    <Header text="Explore our most popular yacht's" />  
                  </div>
                  <BoatGrid boats={boats} />
                </div>

                {/*   Content Explainers */}
                <div>
                  <div className=" bg-gray-200 flex flex-col md:flex-row">
                    <div className="relative w-full h-96">
                      <Image src="/content/ocean.jpg" alt="section-1-image" className="object-cover" layout="fill" />
                    </div>
                    <div className="p-8 flex flex-col justify-center bg-blue-200">
                      <Header text="Luxury Yacht Charters made simple" />
                      <p className="max-w-7xl">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search fo will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                    </div>
                  </div>

                  <div className="p-8 bg-gray-200 flex flex-col md:flex-row">
                    <div className="shadow rounded p-6 flex flex-col justify-center bg-blue-200">
                      <Header text="Charter your yacht and earn more" />
                      <p className="max-w-7xl">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search fo will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                    </div>
                    <div className="relative w-full h-96">
                      <Image src="/content/room.jpg" alt="section-2-image" className="object-cover" layout="fill" />
                    </div>
                  </div>

                  {/*   Section 3  */}
                  <div className="p-8 bg-gray-200 flex flex-col md:flex-row">
                    <div className="relative w-full h-96">
                      <Image src="/content/captain.jpg" alt="section-3-image" className="object-cover" layout="fill" />
                    </div>
                    <div className="shadow rounded p-6 flex flex-col justify-center bg-blue-200">
                      <Header text="Captain with Bored and Yachting" />
                      <p className="max-w-7xl">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search fo will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                    </div>
                  </div>

                  <div className="pt-12 pb-16 bg-gray-200 text-center">
                    <Subheader text="Sign up for our newsletter for exclusive deals and coupons" />
                    <form onSubmit={(e) => handleNewsletterSignUp(e)} className="mx-auto space-y-2 p-4 max-w-2xl">
                      <Input 
                        type="email" 
                        id="newsletter"
                        placeholder="Email Address" 
                        onChange={(e) => setNewsletterEmail(e.target?.value)}
                        value={newsletterEmail}
                       />
                      <Input 
                        type="submit"
                        value={saved ? '✓' : "Sign Up"} 
                      />
                     </form>
                  </div>

                </div>
              </div>
          }
      </main>
    </>
  )
}
