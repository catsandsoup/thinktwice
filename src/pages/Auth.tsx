import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Brain } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true); // Default to sign in view
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
              full_name: email.split("@")[0],
            },
          },
        });
        if (error) throw error;
        toast.success(
          "Registration successful! Please check your email to confirm your account."
        );
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Title */}
        <div className="text-center space-y-3">
          <div className="mx-auto w-16 h-16 bg-black rounded-full flex items-center justify-center">
            <Brain className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Welcome to Critical Quest!
          </h1>
          <p className="text-gray-500 text-sm">
            {isSignIn ? "Sign in to continue your journey" : "Join our community of critical thinkers"}
          </p>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleAuth} className="space-y-6">
          <div className="space-y-4">
            <div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="email"
                  placeholder="Email"
                  className="pl-10 h-12 bg-gray-50 border-gray-200"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="pl-10 pr-10 h-12 bg-gray-50 border-gray-200"
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
          </div>

          <div className="space-y-4">
            <Button
              type="submit"
              className="w-full h-12 bg-accent hover:bg-accent/90 text-white font-semibold rounded-full"
              disabled={loading}
            >
              {loading ? "Loading..." : isSignIn ? "Login" : "Create Account"}
            </Button>

            {isSignIn && (
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="w-full text-sm text-accent hover:text-accent/80"
              >
                Forgot password?
              </button>
            )}
          </div>
        </form>

        <div className="text-center text-sm">
          <p className="text-gray-600">
            {isSignIn ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsSignIn(!isSignIn)}
              className="text-accent hover:text-accent/80 font-medium"
            >
              {isSignIn ? "Register" : "Sign in"}
            </button>
          </p>
        </div>

        {!isSignIn && (
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Need help? Contact us at{" "}
              <a href="mailto:support@criticalquest.com" className="text-accent hover:text-accent/80">
                support@criticalquest.com
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;