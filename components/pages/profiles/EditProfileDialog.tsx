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
import UsersAPI from "@/api/UsersAPI";

// Constants for image upload restrictions
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png"];

const profileEditSchema = z.object({
  name: z.string().min(1, "Name is required"),
  profilePicture: z
    .any()
    .nullable()
    .refine((file) => !file || file instanceof File, {
      message: "Please upload a valid file.",
    })
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: `File size must be less than ${
        MAX_FILE_SIZE / (1024 * 1024)
      } MB`,
    })
    .refine((file) => !file || ACCEPTED_FILE_TYPES.includes(file.type), {
      message: `Invalid file type. Accepted types: ${ACCEPTED_FILE_TYPES.join(
        ", "
      )}`,
    }),
});

type ProfileEditFormValues = z.infer<typeof profileEditSchema>;

export default function EditProfileDialog({
  initialData,
}: {
  initialData: {
    name: string;
    profilePicture: string | null;
  };
}) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const editForm = useForm<ProfileEditFormValues>({
    resolver: zodResolver(profileEditSchema),
    mode: "onSubmit",
    defaultValues: {
      name: initialData.name,
      profilePicture: null,
    },
  });

  // Function to handle profile update submission
  const handleEditSubmit = async (data: ProfileEditFormValues) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);

      if (data.profilePicture) {
        formData.append("profile_picture", data.profilePicture);
      }

      await UsersAPI.updateProfile(formData);

      setIsEditOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setIsEditOpen(true)}
        className="hover:bg-secondary"
      >
        Edit Profile
      </Button>
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Update your profile information below.
            </DialogDescription>
          </DialogHeader>
          <Form {...editForm}>
            <form
              onSubmit={editForm.handleSubmit(handleEditSubmit)}
              className="space-y-4"
            >
              <FormField
                control={editForm.control}
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
                control={editForm.control}
                name="profilePicture"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Picture</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          field.onChange(
                            e.target.files ? e.target.files[0] : null
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Save Changes
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
