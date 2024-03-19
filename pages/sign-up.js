import Header from "@/components/small/Header";
import Image from "next/image";
import { useState } from "react";
import { USER_TYPES } from "@/helpers/index";
import SignupForm from "@/components/combined/auth/SignupForm";
import Subheader from "@/components/small/Subheader";

export default function SignUp() {
  const [roleSelected, setRoleSelected] = useState(null);
  const [signUpState, setSignUpState] = useState("");
  const [signUpStateImage, setSignUpStateImage] = useState("");

  const goBack = () => {
    setRoleSelected(null);
  };

  const Card = ({ id, header, description, src, alt = "", signUpState }) => (
    <div
      onClick={() => {
        setRoleSelected(id),
          setSignUpState(signUpState),
          setSignUpStateImage(src);
      }}
      className="rounded-lg bg-white shadow w-[380px] cursor-pointer hover:shadow-xl"
    >
      <div className="w-[380px] h-[450px] relative rounded-lg">
        <Image
          className="rounded-t-lg"
          src={src}
          alt={alt}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4">
        <Subheader text={header} />
        <p className="text-base">{description}</p>
      </div>
    </div>
  );

  return (
    <>
      {roleSelected === null && (
        <div className="my-9">
          <div className="text-center my-9">
            <Header text="Sign Up for Bored and Yachting" />
            <p>Tell us a little more about what you&apos;re looking for:</p>
          </div>
          <div className="my-2 pb-2 flex gap-16 text-center justify-center">
            <Card
              id={USER_TYPES.CUSTOMER}
              header="I'm a renter"
              description="I'd like to discover and explore over <amount> boats with ease."
              src="/content/boat.jpg"
              signUpState="Renter"
            />
            <Card
              id={USER_TYPES.CAPTAIN}
              header="I'm a captain"
              description="I'd like to connect with boat owners and renters and make up to $<amount>/hr."
              src="/content/yacht_captain.jpeg"
              signUpState="Captain"
            />
            <Card
              id={USER_TYPES.BOAT_OWNER}
              header="I'm a boat owner"
              description="I'd like to connect with boat renters and captains and earn money renting."
              src="/content/yacht_owner.jpg"
              signUpState="Owner"
            />
          </div>
        </div>
      )}
      {roleSelected && (
        <div className="h-[720px]">
          <SignupForm
            header={signUpState}
            srcImg={signUpStateImage}
            roleSelectedID={roleSelected}
            goBack={goBack}
          />
        </div>
      )}
    </>
  );
}
