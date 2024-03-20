import Image from "next/image";
import Header from "@/components/small/Header";
import Subheader from "@/components/small/Subheader";
import ContentPageLayout from "@/components/layouts/ContentPageLayout";
import { CheckIcon } from "@heroicons/react/20/solid";
import BenefitGrid from "@/components/combined/utility/BenefitGrid";
import { steps } from "@/data/CaptainData";
import { USER_TYPES } from "@/helpers/index";
import { useRouter } from "next/router";
export default function BecomeACaptain() {
  const router = useRouter();
  const handleSignUp = () => {
    router.push({
        pathname: '/sign-up',
        query: { role: USER_TYPES.CAPTAIN },
    });
  };
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <>
      <div className="relative w-full h-[500px] overflow-hidden">
        <Image alt="boat-hero-image" src="/content/bg-captain.jpeg" layout="fill" className="absolute object-cover brightness-50" />

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white z-10">
          <h1 className="text-4xl font-bold mb-4">Become a Captain</h1>
          <p className="text-lg">Do more of what you love as a captain on Bored and Yachting</p>
          <div className="mt-8">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
              onClick={() => handleSignUp()}
            >
              Sign up and earn more
            </button>
          </div>
        </div>
      </div>

      <ContentPageLayout>
        <div className="space-y-10">
          <div className="text-center">
            <Subheader text="Bored and Yachting is looking for great Captains like you!" />
            <p>Earn a boatload while falling back in love with the best job on earth.</p>
          </div>

          <hr />

          <div className="flex justify-center">
            <div>
              <h1 className="font-bold text-[25px] pb-5 flex items-center ">
                How Captaining with us Works
              </h1>
              <nav aria-label="Progress">
                <ol role="list" className="overflow-hidden">
                  {steps.map((step, stepIdx) => (
                    <li key={step.name} className={classNames(stepIdx !== steps.length - 1 ? "pb-10" : "", "relative")}>
                      {step.status === "complete" ? (
                        <>
                          {stepIdx !== steps.length - 1 ? (
                            <div className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-blue-500" aria-hidden="true" />
                          ) : null}
                          <a href="#" className="group relative flex items-start">
                            <span className="flex h-9 items-center">
                              <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
                                <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
                              </span>
                            </span>
                            <span className="ml-4 flex min-w-0 flex-col">
                              <span className="text-[22px] font-medium">{step.name}</span>
                              <span className="text-sm text-gray-500">{step.description}</span>
                            </span>
                          </a>
                        </>
                      ) : null}
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
			<div className="ml-auto relative hidden lg:w-1/2 lg:mt-8 lg:block">
				<Image src="/content/yacht_captain.jpeg" layout="fill" className="object-cover rounded-lg" />
			</div>
          </div>
          <hr />

          <div className="">
            <div className="text-center">
              <Header text="Why Captain with us?" />
              <p>Now accepting Captains with USCG and RYA Certifications!</p>
            </div>
            <div className="my-8">
              <BenefitGrid />
            </div>
          </div>
        </div>
      </ContentPageLayout>
    </>
  );
}
