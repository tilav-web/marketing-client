import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { userService } from "@/services/user.service";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/features/user.slice";
import { RootState } from "@/app/store";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const data = await userService.login({
        email,
        password,
      });
      dispatch(setUser(data));
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-amber-50 to-orange-100 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md bg-gradient-to-br from-amber-50 to-orange-100 hover:shadow-lg transition-shadow">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-orange-800">
            Sign in to your account
          </CardTitle>
          <CardDescription className="text-center text-gray-700">
            Enter your email below to sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-orange-800">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 text-gray-700 placeholder-gray-400"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-orange-800">
                  Password
                </Label>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="********"
                className="border-gray-300 focus:border-orange-500 focus:ring-orange-500 text-gray-700 placeholder-gray-400"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-400 text-white shadow-md"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full bg-orange-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-amber-50 px-2 text-gray-700">
                Or continue with
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            type="button"
            className="w-full cursor-pointer border-orange-300 bg-white text-orange-600 hover:bg-orange-50 hover:text-orange-700"
            disabled={loading}
          >
            <Link
              to={"https://api.marketinghub.uz/auth/google/callback"}
              className="flex items-center justify-center gap-2 w-full h-full"
            >
              <svg
                className="mr-2 h-4 w-4 text-orange-500"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              Sign in with Google
            </Link>
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-700">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-orange-600 hover:text-orange-500 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
