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
import LocationSearch from "../LocationSearch";
import { City } from "@/types/City";

const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password1: z.string().min(8, "Password must be at least 8 characters"),
  password2: z.string().min(8, "Password must be at least 8 characters"),
  location: z.object({
    location_id: z.number(),
    location_type: z.string(),
  }),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPopup() {
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
      password1: "",
      password2: "",
      location: {
        location_id: undefined,
        location_type: "",
      },
    },
  });

  // Function to handle signup form submission
  const handleSignup = async (data: SignupFormValues) => {
    try {
      await AuthAPI.register(
        data.name,
        data.email,
        data.password1,
        data.password2,
        data.location.location_type,
        data.location.location_id
      );

      setIsSignupOpen(false);
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  // Function to handle location selection
  const handleLocationSelect = (city: City | null, field: any) => {
    if (city) {
      field.onChange({
        location_id: city.city_id,
        location_type: city.type,
      });
    } else {
      field.onChange({
        location_id: "",
        location_type: "",
      });
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        onClick={() => {
          setIsSignupOpen(true);
        }}
        className="w-full text-left hover:bg-secondary"
      >
        Sign Up
      </Button>
      <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Sign Up</DialogTitle>
            <DialogDescription>
              Create a new account by filling out the form below.
            </DialogDescription>
          </DialogHeader>
          <Form {...signupForm}>
            <form
              onSubmit={signupForm.handleSubmit(handleSignup)}
              className="space-y-4"
            >
              <FormField
                control={signupForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signupForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Your email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signupForm.control}
                name="password1"
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
              <FormField
                control={signupForm.control}
                name="password2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signupForm.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <LocationSearch
                        placeholder="Where are you from?"
                        onSelect={(city) => handleLocationSelect(city, field)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
