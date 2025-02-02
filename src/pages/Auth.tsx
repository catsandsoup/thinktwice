import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Apple, ArrowRight, Mail, Globe } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const authSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
});

const testAccounts = [
  { email: "work@montyg.me", label: "Admin Account" },
  { email: "houseofmanuela@gmail.com", label: "Test Account" },
];

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignIn = async (values: z.infer<typeof authSchema>) => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    toast({
      title: "Success",
      description: "You have been signed in successfully.",
    });
    navigate("/");
  };

  const handleSignUp = async (values: z.infer<typeof authSchema>) => {
    setIsLoading(true);
    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    toast({
      title: "Success",
      description: "Please check your email to verify your account.",
    });
    setIsLoading(false);
  };

  const handleSocialSignIn = async (provider: "google" | "apple") => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const setTestAccount = (email: string) => {
    form.setValue("email", email);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md overflow-hidden bg-[#E5DEFF] bg-opacity-50 backdrop-blur-sm">
        <CardHeader className="space-y-3 pb-8">
          <CardTitle className="text-center font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-center text-base text-muted-foreground">
            Sign in to your account to continue
          </CardDescription>
          <div className="flex flex-col gap-2">
            {testAccounts.map((account) => (
              <Button
                key={account.email}
                variant="outline"
                className="w-full text-sm"
                onClick={() => setTestAccount(account.email)}
              >
                {account.label} ({account.email})
              </Button>
            ))}
          </div>
        </CardHeader>
        <Tabs defaultValue="email" className="w-full">
          <TabsList className="grid w-full grid-cols-3 p-1">
            <TabsTrigger 
              value="email" 
              className="flex items-center gap-2 data-[state=active]:bg-primary/90 data-[state=active]:text-primary-foreground"
              aria-label="Email sign in"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Email</span>
            </TabsTrigger>
            <TabsTrigger 
              value="google" 
              className="flex items-center gap-2 data-[state=active]:bg-primary/90 data-[state=active]:text-primary-foreground"
              aria-label="Google sign in"
            >
              <Globe className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Google</span>
            </TabsTrigger>
            <TabsTrigger 
              value="apple" 
              className="flex items-center gap-2 data-[state=active]:bg-primary/90 data-[state=active]:text-primary-foreground"
              aria-label="Apple sign in"
            >
              <Apple className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Apple</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="email">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSignIn)}
                className="space-y-4"
              >
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your email"
                            type="email"
                            className="h-11 bg-background/50 backdrop-blur-sm"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your password"
                            type="password"
                            className="h-11 bg-background/50 backdrop-blur-sm"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button
                    type="submit"
                    className="h-11 w-full bg-primary font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      "Signing in..."
                    ) : (
                      <span className="flex items-center gap-2">
                        Sign In
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-11 w-full border-primary/20 bg-background/50 font-medium backdrop-blur-sm hover:bg-primary/10"
                    onClick={() => form.handleSubmit(handleSignUp)()}
                    disabled={isLoading}
                  >
                    Create Account
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </TabsContent>
          <TabsContent value="google">
            <CardContent>
              <Button
                className="h-11 w-full border-primary/20 bg-background/50 font-medium text-foreground backdrop-blur-sm hover:bg-primary/10"
                variant="outline"
                onClick={() => handleSocialSignIn("google")}
                disabled={isLoading}
              >
                <Globe className="mr-2 h-4 w-4" aria-hidden="true" />
                Continue with Google
              </Button>
            </CardContent>
          </TabsContent>
          <TabsContent value="apple">
            <CardContent>
              <Button
                className="h-11 w-full border-primary/20 bg-background/50 font-medium text-foreground backdrop-blur-sm hover:bg-primary/10"
                variant="outline"
                onClick={() => handleSocialSignIn("apple")}
                disabled={isLoading}
              >
                <Apple className="mr-2 h-4 w-4" aria-hidden="true" />
                Continue with Apple
              </Button>
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}