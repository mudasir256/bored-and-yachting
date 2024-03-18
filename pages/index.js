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
import FAQ from '@/components/one-off/FAQ'

import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Home() {

  const { boats, isLoading } = useBoats()
  const router = useRouter()

  const timeline = [
    {
      name: 'List your yacht',
      description:
        'Define your pricing, your availability, and settings. Get paid directly and approve of guests for your charters and connect with captains.',
      date: 'BOAT OWNERS',
      dateTime: '2021-08',
    },
    {
      name: 'Charter and get your next gig',
      description:
        'Increase your hourly, get paid on time, and connect with boat owners to deliver a great charter experience for guests.',
      date: 'CAPTAINS',
      dateTime: '2021-12',
    },
    {
      name: 'Enjoy a luxury yacht experience',
      description:
        'Our onboarding process will make it quick and easy to find a yacht and experience you will love.',
      date: 'YOU',
      dateTime: '2022-02',
    },
    {
      name: 'Get prepared for our official launch',
      description:
        'Preview our platform and get started with our onboarding process so you can be prepared.',
      date: 'June 2023',
      dateTime: '2022-12',
    },
  ]


  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [saved, setSaved] = useState(false)

  const handleNewsletterSignUp = (e) => {
    e.preventDefault()
    //TODO: 
    console.log(newsletterEmail)
    setSaved(true)
  }

  const handleSearchClick = (data) => {
    router.push('/charters')
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
                        <Searchbar onSearch={handleSearchClick} />
                      </div>
                    </div>
                    <Image priority src="/content/boat.jpg" alt="hero-image" className="object-cover brightness-50" layout="fill" />
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
                <div class="bg-white py-24 sm:py-32">
                  <div class="mx-auto max-w-7xl px-6 lg:px-8">
                    <div class="mx-auto max-w-2xl sm:text-center">
                      <h2 class="text-base font-semibold leading-7 text-indigo-600">Experience Luxury</h2>
                      <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Luxury Yacht Charters Made Simple</p>
                      <p class="mt-6 text-lg leading-8 text-gray-600">Our platform connects boat owners and captains to you, so you can experience an exclusive private yacht at a fraction of the price of buying one.</p>
                    </div>
                  </div>
                  <div class="relative overflow-hidden pt-16">
                    <div class="mx-auto max-w-5xl px-6 lg:px-8 h-96 rounded-xl">
                      <img src="/content/captain.jpg" alt="App screenshot" class="rounded-xl shadow-2xl ring-1 ring-gray-900/10"  />
                    </div>
                  </div>
                  <div class="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
                    <dl class="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
                      <div class="relative pl-9">
                        <dt class="inline font-semibold text-gray-900">
                          <svg class="absolute left-1 top-1 h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm3.75-2.75a.75.75 0 001.5 0V9.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0l-3.25 3.5a.75.75 0 101.1 1.02l1.95-2.1v4.59z" clip-rule="evenodd" />
                          </svg>
                          1. Sign up.&nbsp;
                        </dt>
                        <dd class="inline"></dd>
                      </div>
                      <div class="relative pl-9">
                        <dt class="inline font-semibold text-gray-900">
                          <svg class="absolute left-1 top-1 h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
                          </svg>
                          2. Confirm your email and personal information
                        </dt>
                        <dd class="inline"></dd>
                      </div>
                      <div class="relative pl-9">
                        <dt class="inline font-semibold text-gray-900">
                          <svg class="absolute left-1 top-1 h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z" clip-rule="evenodd" />
                          </svg>
                          3. Find yachts and charters in Florida
                        </dt>
                        <dd class="inline"></dd>
                      </div>
                     
                    </dl>
                  </div>
                </div>

                <div className="bg-white py-24 sm:py-32">
                     <div className="mx-auto max-w-7xl px-6 lg:px-8">
                       <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4">
                         {timeline.map((item) => (
                           <div key={item.name}>
                             <time
                               dateTime={item.dateTime}
                               className="flex items-center text-sm font-semibold leading-6 text-indigo-600"
                             >
                               <svg viewBox="0 0 4 4" className="mr-4 h-1 w-1 flex-none" aria-hidden="true">
                                 <circle cx={2} cy={2} r={2} fill="currentColor" />
                               </svg>
                               {item.date}
                               <div
                                 className="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0"
                                 aria-hidden="true"
                               />
                             </time>
                             <p className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">{item.name}</p>
                             <p className="mt-1 text-base leading-7 text-gray-600">{item.description}</p>
                           </div>
                         ))}
                       </div>
                     </div>
                   </div>


                <FAQ />


                <div>
                 

    
                  <div className="bg-white py-16 sm:py-24">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                      <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:py-32">
                        <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
                          Sign up for our newsletter 
                        </h2>
                        <p className="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-gray-300">
                          Get exclusive deals and coupons, learn more about our community, and get notified on important news and new features.
                        </p>
                        <form onSubmit={(e) => handleNewsletterSignUp(e)} className="mx-auto mt-10 flex max-w-md gap-x-4">
                          <label htmlFor="email-address" className="sr-only">
                            Email address
                          </label>
                          <input
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
                            placeholder="Enter your email"
                            onChange={(e) => setNewsletterEmail(e.target?.value)}
                            value={newsletterEmail}
                          />
                          <button
                            type="submit"
                            className="flex-none rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                          >
                           Subscribe
                          </button>
                        </form>
                        <svg
                          viewBox="0 0 1024 1024"
                          className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2"
                          aria-hidden="true"
                        >
                          <circle cx={512} cy={512} r={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
                          <defs>
                            <radialGradient
                              id="759c1415-0410-454c-8f7c-9a820de03641"
                              cx={0}
                              cy={0}
                              r={1}
                              gradientUnits="userSpaceOnUse"
                              gradientTransform="translate(512 512) rotate(90) scale(512)"
                            >
                              <stop stopColor="#7775D6" />
                              <stop offset={1} stopColor="#E935C1" stopOpacity={0} />
                            </radialGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>
                  </div>
                


                </div>
              </div>
          }
      </main>
    </>
  )
}
