import Header from "@/components/small/Header";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SignupForm from "@/components/combined/auth/SignupForm";
import Subheader from "@/components/small/Subheader";
import { roleMappings } from "@/data/SignupData.js";

export default function SignUp() {
  const router = useRouter();
  const [roleSelected, setRoleSelected] = useState(undefined);
  const [signUpState, setSignUpState] = useState("");
  const [signUpStateImage, setSignUpStateImage] = useState("");

  const goBack = () => {
    router.back();
  };

  useEffect(() => {
    const role = router.query.role;
    if (role && roleMappings[role]) {
      const { signUpState, signUpStateImage } = roleMappings[role];
      setRoleSelected(role);
      setSignUpState(signUpState);
      setSignUpStateImage(signUpStateImage);
    } else {
      const timer = setTimeout(() => {
        setRoleSelected(null);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [router.query.role]);

  if (roleSelected === undefined) {
    return null;
  }

  const Card = ({ id, header, description, src, alt = "", signUpState }) => (
    <div
      onClick={() => {
        setRoleSelected(id), setSignUpState(signUpState), setSignUpStateImage(src);
        router.push({
          pathname: "/sign-up",
          query: { role: id },
        });
      }}
      className="rounded-lg bg-white shadow w-[380px] cursor-pointer hover:shadow-xl"
    >
      <div className="w-[380px] h-[450px] relative rounded-lg">
        <Image className="rounded-t-lg" src={src} alt={alt} layout="fill" objectFit="cover" />
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
          <div className="my-2 pb-2 flex flex-wrap justify-center gap-4 sm:gap-16 md:grid-cols-2 lg:grid-cols-3 text-center">
            {Object.values(roleMappings).map((role) => (
              <Card key={role.id} id={role.id} header={role.header} description={role.description} src={role.src} signUpState={role.signUpState} />
            ))}
          </div>
        </div>
      )}
      {roleSelected && (
        <div className="h-[720px]">
          <SignupForm header={signUpState} srcImg={signUpStateImage} roleSelectedID={roleSelected} goBack={goBack} />
        </div>
      )}
    </>
  );
}
