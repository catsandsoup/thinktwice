
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { validateAuthInput } from "@/utils/authValidation";
import { AuthForm } from "@/components/auth/AuthForm";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    const validation = validateAuthInput(email, password);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }
    
    setLoading(true);
    console.log("Attempting authentication...");

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
      setError(error.message);
      toast.error(error.message);
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
