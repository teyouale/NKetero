// @ts-nocheck
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Button,
  Textarea,
  Separator,
} from '@ketero/ui';
import { cn } from '@ketero/utils';
import { UserDto, userSchema } from '@ketero/dto';
import { useBusiness } from '@/client/services/businesses';
import { useEffect } from 'react';
import { z } from 'nestjs-zod/z';

type BusinessProfileFormValues = z.infer<typeof userSchema>;

const BusinessProfile = (props) => {
  const { business, loading } = useBusiness();
  const defaultBusinessProfileValues: Partial<BusinessProfileFormValues> = {
    name: business?.name || '',
    location: business?.location || '',
    description: business?.description || '',
    workingHours: business?.workingHours || [{ value: '' }],
  };

  const form = useForm<BusinessProfileFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: defaultBusinessProfileValues,
  });

  const { fields, append, remove } = useFieldArray({
    name: 'workingHours',
    control: form.control,
  });
  useEffect(() => {
    if (!loading && business) {
      form.reset({
        name: business.name,
        location: business.location,
        description: business.description,
        workingHours: business.workingHours || [{ value: '' }],
      });
    }
  }, [loading, business, form]);
  return (
    <Form {...form}>
      <form className="space-y-8">
        <div>
          <h2 className="text-lg font-medium text-primary">Business Profile</h2>
          <p className="text-sm text-muted-foreground">
            This is how others will see you on the site.
          </p>
        </div>
        <Separator />

        <FormField
          control={form.control}
          name="name" // Changed from 'username' to 'name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Shop Name" {...field} />
              </FormControl>
              <FormDescription>
                This is your public business display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about your business"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Your Location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-2">
              <FormField
                control={form.control}
                name={`workingHours.${index}.value`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={cn(index !== 0 && 'sr-only')}>
                      Business Working Hours
                    </FormLabel>
                    <FormDescription className={cn(index !== 0 && 'sr-only')}>
                      Add your Business working hours
                    </FormDescription>
                    <FormControl>
                      <Input {...field} placeholder="Enter working hours" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => remove(index)}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => append({ value: '' })}
          >
            Add Working Hours
          </Button>
        </div>

        <div className="flex justify-end">
          <Button type="submit">Update Business profile</Button>
        </div>
      </form>
    </Form>
  );
};

export default BusinessProfile;