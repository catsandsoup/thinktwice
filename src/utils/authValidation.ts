
export const validateAuthInput = (email: string, password: string): { valid: boolean; error: string | null } => {
  if (!email || !password) {
    return { 
      valid: false, 
      error: "Email and password are required" 
    };
  }
  
  // Enhanced email validation with regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { 
      valid: false, 
      error: "Please enter a valid email address" 
    };
  }
  
  // Enhanced password validation
  if (password.length < 6) {
    return { 
      valid: false, 
      error: "Password must be at least 6 characters" 
    };
  }
  
  // Add password strength check
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  
  if (!(hasUpperCase && (hasNumber || hasSpecialChar))) {
    return {
      valid: false,
      error: "Password must contain at least one uppercase letter and one number or special character"
    };
  }
  
  return { valid: true, error: null };
};
