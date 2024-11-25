import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Button, Form, FormField, FormItem, Input, FormLabel, FormMessage, FormControl } from '@ketero/ui';
import { editBusinessSchema } from '@ketero/dto'; // Assuming a schema exists

import { useBusiness, useEditBusiness } from '@/client/services/business';

type FormValues = z.infer<typeof editBusinessSchema>;

const EditBusiness = ({ businessId }: { businessId: string }) => {
  const { business, loading: businessLoading } = useBusiness(businessId);
  const { editBusiness, loading: editLoading } = useEditBusiness();
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(editBusinessSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  useEffect(() => {
    if (business) {
      form.reset({
        name: business.name,
        description: business.description,
      });
    }
  }, [business]);

  const onSubmit = async (data: FormValues) => {
    await editBusiness(businessId, data);
    navigate('/dashboard/business');
  };

  if (businessLoading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Business Profile</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={editLoading}>
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditBusiness;
