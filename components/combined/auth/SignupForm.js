import Icon from "@/components/Icon";
import Input from "@/components/Input";
import Link from "next/link";
import { useState } from "react";
import { createAccount } from '@/endpoints/post'
import { useRouter } from 'next/router'

export default function SignupForm({ srcImg, header, roleSelectedID, goBack }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleCreateAccount = async (e) => {
    setErrorMessage("");
    try {
      e.preventDefault();
      const result = await createAccount({
        email,
        phoneNumber,
        password,
        roles: [roleSelectedID],
      });
      if (result.success) {
        router.push("/login");
        return;
      }
      setErrorMessage(result.message);
    } catch (err) {
      console.log(err);
      setErrorMessage(err);
    }
  };

  return (
    <div className="flex min-h-full flex-1">
      <div className="flex flex-1 flex-col w-[40%] justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full">
          <button onClick={goBack}>
            <Icon name="left-arrow" />
          </button>
          <div>
            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign up as a {header}
            </h2>
            <p className="text-sm mb-2">
              Great! Create an account to access these features and more from
              your account.
            </p>
          </div>

          <div className="mt-10">
            <form
              className="space-y-6"
              onSubmit={(e) => handleCreateAccount(e)}
            >
              <Input
                type="text"
                id="email"
                onChange={(e) => setEmail(e.target?.value)}
                value={email}
                placeholder="Email Address*"
                isRequired={true}
              />
              <Input
                type="number"
                id="phoneNumber"
                onChange={(e) => setPhoneNumber(e.target?.value)}
                value={phoneNumber}
                placeholder="Phone Number"
                isRequired={true}
              />
              <Input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target?.value)}
                value={password}
                placeholder="Password"
                isRequired={true}
              />
              <p className="text-xs">
                *You&apos;ll receive an email to confirm and activate your
                account.{" "}
                <Link
                  className="underline text-blue-500"
                  href="/legal/privacy-policy"
                  target="_blank"
                >
                  Privacy Policy
                </Link>
              </p>
              <Input type="submit" value="Create Account" />
              {errorMessage && (
                <p className="text-sm text-red-500">{errorMessage}</p>
              )}
            </form>
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src={srcImg}
          alt="Bored & Yachting"
        />
      </div>
    </div>
  );
}
