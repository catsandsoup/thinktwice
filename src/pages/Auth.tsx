
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { validateAuthInput } from "@/utils/authValidation";
import { AuthForm } from "@/components/auth/AuthForm";
import { handleApiError } from "@/utils/errorHandlers";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signIn, signUp } = useAuth();

  // Get redirect path from location state or default to "/"
  const from = location.state?.from?.pathname || "/";

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    const validation = validateAuthInput(email, password);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }
    
    setLoading(true);
    console.log(`Attempting ${isSignUp ? 'sign up' : 'sign in'}...`);

    try {
      if (isSignUp) {
        const { error: signUpError } = await signUp(email, password);

        if (signUpError) throw signUpError;
        
        toast.success("Check your email for the confirmation link!", {
          duration: 5000,
        });
      } else {
        const { error: signInError } = await signIn(email, password);

        if (signInError) throw signInError;
        
        toast.success("Successfully signed in!", {
          duration: 3000,
        });
        // Navigate happens automatically through auth state change
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      
      // Enhanced error handling based on common auth errors
      const errorCode = error.code || '';
      let errorMessage = error.message;
      
      if (errorCode.includes('auth/user-not-found') || errorCode.includes('auth/invalid-login-credentials')) {
        errorMessage = "Invalid email or password. Please try again.";
      } else if (errorCode.includes('auth/email-already-in-use')) {
        errorMessage = "This email is already registered. Try signing in instead.";
      } else if (errorCode.includes('auth/weak-password')) {
        errorMessage = "Please choose a stronger password.";
      } else if (errorCode.includes('auth/too-many-requests')) {
        errorMessage = "Too many failed login attempts. Please try again later.";
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <AuthForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        error={error}
        setError={setError}
        loading={loading}
        isSignUp={isSignUp}
        setIsSignUp={setIsSignUp}
        onSubmit={handleAuth}
      />
    </div>
  );
}
