import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Brain, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignIn) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        navigate("/");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: email.split("@")[0], // Using email username as initial name
            },
          },
        });
        if (error) throw error;
        toast.success("Registration successful! Please check your email to confirm your account.");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Begin Your Thinking Journey
          </h1>
          <p className="text-xl text-gray-600">
            Join our community of critical thinkers
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-3 rounded-xl">
              <Brain className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">
                {isSignIn ? "Welcome Back" : "Your First Mission"}
              </h2>
              <p className="text-gray-600">
                {isSignIn ? "Sign in to continue" : "Create your detective profile"}
              </p>
            </div>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-2">
              <label className="text-gray-700 font-medium">
                {isSignIn ? "Email" : "Detective Name"}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-gray-700 font-medium">
                {isSignIn ? "Password" : "Secret Code"}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder={isSignIn ? "Enter your password" : "Create a password"}
                  className="pl-10 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6"
              disabled={loading}
            >
              {loading
                ? "Loading..."
                : isSignIn
                ? "Sign In"
                : "Begin Your Journey"}
            </Button>
          </form>

          <button
            onClick={() => setIsSignIn(!isSignIn)}
            className="w-full text-center text-teal-700 hover:text-teal-800 py-2"
          >
            {isSignIn ? "New here? Create an account" : "Already a Detective? Sign In"}
          </button>

          {!isSignIn && (
            <div className="mt-6 bg-orange-50 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-orange-800">
                <Eye className="w-5 h-5" />
                <h3 className="font-semibold">Preview Your First Quest</h3>
              </div>
              <p className="text-orange-700">
                Learn to spot the difference between facts and opinions in social media posts
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;