import Input from "@/components/Input";
import { useState } from "react";
import { useRouter } from "next/router";
import { saveLoginCredentials } from "@/helpers/index";
import { login } from "@/endpoints/post";
import { USER_TYPES } from "@/helpers/index";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const result = await login({ email, password });
      console.log(result);
      if (result.success) {
        saveLoginCredentials({ ...result.user });
        if (result.user.roles.includes(USER_TYPES.BOAT_OWNER)) {
          router.push("/boat-owner/dashboard");
        } else if (result.user.roles.includes(USER_TYPES.CAPTAIN)) {
          router.push("/captain/dashboard");
        } else if (result.user.roles.includes(USER_TYPES.CUSTOMER)) {
          router.push("/dashboard");
        } else {
          router.reload();
        }
        return;
      }
      setErrorMessage(result?.message);
    } catch (err) {
      console.log(err);
      setErrorMessage(err?.message || err);
    }
  };

  return (
    <div className="flex min-h-full flex-1">
      <div className="flex flex-1 flex-col w-[40%] justify-start md:justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full">
          <div>
            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Login to Bored and Yachting
            </h2>
            <p className="text-sm mb-2">
              Book your next rental, manage your yachts, or view your upcoming charters.
            </p>
          </div>

          <div className="mt-10">
            <form className="space-y-6" onSubmit={handleLogin}>
              <Input
                type="text"
                id="email"
                onChange={(e) => setEmail(e.target?.value)}
                value={email}
                placeholder="Email Address"
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
              {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}
              <Input type="submit" value="Login" />
            </form>
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="/content/boat.jpg"
          alt="Bored & Yachting"
        />
      </div>
    </div>
  );
}
