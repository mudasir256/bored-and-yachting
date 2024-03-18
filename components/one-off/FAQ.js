import { Disclosure } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'

const faqs = [
  {
    question: "What is BoredAndYachting.com?",
    answer:
      "We are a SaaS platform that connects boat owners and captains to you to provide high-quality luxury yachting and charter experiences.",
  },
  {
    question: "Can I list my boat for rental?",
    answer: "Yes! Just make a boat owner account in order to get started."
  },
  {
    question: "How do I sign up as a captain?",
    answer: 'Just make a captain account in order to get started!'
  },
  {
    question: "How do I pay for my charter?",
    answer: "We use a secure credit card processor to collect details. Payments are made when a charter is confirmed and a captain is assigned to you. For questions on refunds and cancellations, please contact us at info@boredandyachting.com"
  },
  {
    question: "What happens after I book a charter?",
    answer: "You will get a confirmation email. After we confirm a captain has been assigned to you, we will send a detailed iternary and location to meet your captain to begin your luxury yachting experience!"
  }
  // More questions...
]

export default function FAQ() {
  return (
    <div className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-4xl divide-y divide-white/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-white">Frequently asked questions</h2>
          <dl className="mt-10 space-y-6 divide-y divide-white/10">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-white">
                        <span className="text-base font-semibold leading-7">{faq.question}</span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
                          ) : (
                            <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base leading-7 text-gray-300">{faq.answer}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}