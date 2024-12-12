import React from 'react';
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@ketero/ui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from '@/client/hooks/use-toast';
import { useUpdateUser } from '@/client/services/user';
import { UpdatePasswordDto } from '@ketero/dto'; // Import DTO
import { UserDto } from '@ketero/dto';

// Schema for form validation
const userProfileSchema = z
  .object({
    name: z.string().min(3, 'Name must be at least 3 characters long'),
    resetPassword: z.string().min(6, 'Password must be at least 6 characters long').optional(),
    confirmResetPassword: z.string().optional(),
  })
  .refine((data) => {
    if (data.resetPassword || data.confirmResetPassword) {
      return data.resetPassword === data.confirmResetPassword;
    }
    return true;
  }, {
    message: "Passwords don't match",
    path: ['confirmResetPassword'],
  });

type UserProfileFormValues = z.infer<typeof userProfileSchema>;

const UserProfile = ({ user }: { user?: Partial<UserDto> }) => {
  const defaultUserProfileValues: Partial<UserProfileFormValues> = {
    name: user?.name || '',
    resetPassword: '',
    confirmResetPassword: '',
  };

  const form = useForm<UserProfileFormValues>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: defaultUserProfileValues,
  });

  const { updateUser } = useUpdateUser();

  const onSubmit = async (data: UserProfileFormValues) => {
    try {
      const payload: Partial<UpdatePasswordDto> = {
        name: data.name,
      };

      // Add password only if it's provided
      if (data.resetPassword) {
        payload.password = data.resetPassword;
      }

      await updateUser(payload);
      toast({
        title: 'Profile Updated Successfully',
        description: 'Your profile and password have been updated.',
      });
    } catch (error) {
      toast.error('Failed to update profile. Please try again.');
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        {/* Username Field */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} disabled />
              </FormControl>
              <FormDescription>
                This is your public display name. You can't change it.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Reset Password Field */}
        <FormField
          control={form.control}
          name="resetPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reset Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter new password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm Reset Password Field */}
        <FormField
          control={form.control}
          name="confirmResetPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Reset Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Confirm new password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button type="submit">Update Profile</Button>
        </div>
      </form>
    </Form>
  );
};

export default UserProfile;
