
import { toast } from "sonner";

/**
 * Standard error handler for API operations
 * @param error Error object
 * @param fallbackMessage Message to show if error doesn't have a message
 * @returns The error for further handling if needed
 */
export const handleApiError = (error: any, fallbackMessage = "An unexpected error occurred") => {
  console.error("API Error:", error);
  
  // Try to extract a meaningful message
  const errorMessage = error?.message || 
                      error?.error?.message || 
                      error?.error || 
                      fallbackMessage;
  
  toast.error(errorMessage);
  return error;
};

/**
 * Handles Supabase specific errors
 * @param error Supabase error object
 * @param fallbackMessage Message to show if error doesn't have a message
 * @returns The error for further handling if needed
 */
export const handleSupabaseError = (error: any, fallbackMessage = "Database operation failed") => {
  console.error("Supabase Error:", error);
  
  // Map common Supabase error codes to user-friendly messages
  if (error?.code === "23505") {
    toast.error("This record already exists");
    return error;
  }
  
  if (error?.code === "PGRST116") {
    // No results found - this is often not actually an error
    return error;
  }
  
  // Handle authentication errors
  if (error?.code === "PGRST301") {
    toast.error("You need to be logged in to perform this action");
    return error;
  }
  
  const errorMessage = error?.message || 
                      error?.error?.message || 
                      error?.details || 
                      fallbackMessage;
  
  toast.error(errorMessage);
  return error;
};

/**
 * Wraps an async function with error handling
 * @param fn Async function to wrap
 * @param errorMessage Message to show on error
 * @returns Result of the function or null if error
 */
export async function withErrorHandling<T>(
  fn: () => Promise<T>,
  errorMessage = "An error occurred"
): Promise<T | null> {
  try {
    return await fn();
  } catch (error) {
    handleApiError(error, errorMessage);
    return null;
  }
}
