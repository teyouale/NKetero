import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, FormField, FormItem, Input, FormLabel, FormMessage, FormControl } from '@ketero/ui';
import { serviceSchema } from '@ketero/dto'; // Assuming a schema exists

import { useAddService, useEditService } from '@/client/services/service';

type FormValues = z.infer<typeof serviceSchema>;

const ServiceForm = ({ businessId, serviceId }: { businessId: string; serviceId?: string }) => {
  const isEdit = !!serviceId;
  const { addService, loading: addLoading } = useAddService();
  const { editService, loading: editLoading } = useEditService();
  const form = useForm<FormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: '',
      price: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (isEdit) {
      await editService(serviceId!, data);
    } else {
      await addService(businessId, data);
    }
  };

  return (
    <div>
      <h2>{isEdit ? 'Edit' : 'Add'} Service</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="price"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isEdit ? editLoading : addLoading}>
            {isEdit ? 'Update' : 'Add'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ServiceForm;
