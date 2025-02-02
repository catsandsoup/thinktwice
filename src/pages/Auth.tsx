import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Apple, ArrowRight, Mail, Shield, Globe } from "lucide-react";
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

  return (
    <div className="container flex min-h-[calc(100vh-3.5rem)] items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <div className="flex justify-center">
            <Shield className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-center text-2xl font-bold">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-center">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <Tabs defaultValue="email" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email
            </TabsTrigger>
            <TabsTrigger value="google" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Google
            </TabsTrigger>
            <TabsTrigger value="apple" className="flex items-center gap-2">
              <Apple className="h-4 w-4" />
              Apple
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your email"
                            type="email"
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
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your password"
                            type="password"
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
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      "Signing in..."
                    ) : (
                      <span className="flex items-center gap-2">
                        Sign In
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
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
                className="w-full"
                variant="outline"
                onClick={() => handleSocialSignIn("google")}
                disabled={isLoading}
              >
                <Globe className="mr-2 h-4 w-4" />
                Continue with Google
              </Button>
            </CardContent>
          </TabsContent>
          <TabsContent value="apple">
            <CardContent>
              <Button
                className="w-full"
                variant="outline"
                onClick={() => handleSocialSignIn("apple")}
                disabled={isLoading}
              >
                <Apple className="mr-2 h-4 w-4" />
                Continue with Apple
              </Button>
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}