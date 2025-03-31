
export const validateAuthInput = (email: string, password: string): { valid: boolean; error: string | null } => {
  if (!email || !password) {
    return { 
      valid: false, 
      error: "Email and password are required" 
    };
  }
  
  if (password.length < 6) {
    return { 
      valid: false, 
      error: "Password must be at least 6 characters" 
    };
  }
  
  if (!email.includes("@")) {
    return { 
      valid: false, 
      error: "Please enter a valid email address" 
    };
  }
  
  return { valid: true, error: null };
};
