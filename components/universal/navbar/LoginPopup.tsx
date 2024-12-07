"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import AuthAPI from "@/api/AuthAPI";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPopup() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Function to handle login form submission
  const handleLogin = async (data: LoginFormValues) => {
    try {
      await AuthAPI.login(data.email, data.password);

      setIsLoginOpen(false);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        onClick={() => {
          setIsLoginOpen(true);
        }}
        className="w-full text-left hover:bg-secondary"
      >
        Log In
      </Button>
      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Log In</DialogTitle>
            <DialogDescription>
              Enter your email and password to log in.
            </DialogDescription>
          </DialogHeader>
          <Form {...loginForm}>
            <form
              onSubmit={loginForm.handleSubmit(handleLogin)}
              className="space-y-4"
            >
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Your email address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Log In
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
