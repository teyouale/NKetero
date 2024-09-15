// @ts-nocheck
import React, { useEffect } from 'react';
import {
  CreateBusinessUserDto,
  createBusinessUserSchema,
  idSchema,
} from '@ketero/dto';
import { useDialog } from '@/client/stores/dialog';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  Alert,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  FormControl,
  FormField,
  FormItem,
  Input,
  FormLabel,
  FormDescription,
  FormMessage,
  Form,
} from '@ketero/ui';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@ketero/utils';
import { Plus } from '@phosphor-icons/react';
import { useForm } from 'react-hook-form';
import { useCreateBusiness } from '@/client/services/businesses';
import { useUpdateBusiness } from '@/client/services/businesses/update';

const locationSchema = z.object({
  latitude: z
    .string()
    .regex(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/, 'Invalid latitude'),
  longitude: z
    .string()
    .regex(/^[-+]?((1[0-7]\d)|([0-9]){1,2})(\.\d+)?$/, 'Invalid longitude'),
});

const formSchema = createBusinessUserSchema.extend({
  id: idSchema.optional(),
  name: z.string(),
  description: z.string(),
  location: locationSchema,
});

type FormValues = z.infer<typeof formSchema>;

const BusinessDialog = (props) => {
  const { isOpen, mode, payload, close } =
    useDialog<CreateBusinessUserDto>('business');

  const { createBusiness, loading: createLoading } = useCreateBusiness();
  const { updateBusiness, loading: updateLoading } = useUpdateBusiness();

  const isCreate = mode === 'create';
  const isUpdate = mode === 'update';

  const loading = createLoading;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: {
        latitude: '',
        longitude: '',
      },
      name: '',
      description: '',
      user: {
        name: 'eyouale',
        username: 'teyouale101',
        email: 'teyouale123@gmail.com',
        phoneNumber: '123123123',
      },
    },
  });

  useEffect(() => {
    if (isOpen) onReset();
  }, [isOpen, payload]);

  const onError = (error: any) => {
    console.error('Form submission error:', error);
  };

  const onReset = () => {
    if (isCreate)
      form.reset({
        location: {
          latitude: '',
          longitude: '',
        },
        name: '',
        description: '',
        user: {
          name: 'eyouale',
          username: 'teyouale101',
          email: 'teyouale123@gmail.com',
          phoneNumber: '123123123',
        },
      });

    if (isUpdate) {
      form.reset({
        ...payload.item,
      });
    }
  };

  const onSubmit = async (data: FormValues) => {
    if (isCreate) await createBusiness(data);
    if (isUpdate) await updateBusiness(data);

    close();
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center space-x-2.5">
              <Plus />
              <h2>Create a new company</h2>
            </div>
          </DialogTitle>
          <DialogDescription>
            Start building your resume by giving it a name.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="grid gap-6 sm:grid-cols-2">
            <FormField
              name="user.name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Owner Name</FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-between gap-x-2">
                      <Input {...field} className="flex-1" />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="user.username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-between gap-x-2">
                      <Input
                        {...field}
                        className="flex-1"
                        disabled={isUpdate}
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="user.email"
              control={form.control}
              render={({ field }) => (
                <FormItem
                  className={cn(isUpdate && 'col-span-full sm:col-span-2')}
                >
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="">
                      <Input type="email" {...field} disabled={isUpdate} />
                    </div>
                  </FormControl>
                  <FormMessage />

                  <FormDescription className="flex items-center gap-x-1.5 font-medium opacity-100"></FormDescription>
                </FormItem>
              )}
            />
            {isUpdate && (
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Business Name</FormLabel>
                    <FormControl>
                      <div className="">
                        <Input type="text" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />

                    <FormDescription className="flex items-center gap-x-1.5 font-medium opacity-100"></FormDescription>
                  </FormItem>
                )}
              />
            )}
            <FormField
              name="user.phoneNumber"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <div className="">
                      <Input type="text" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="location.latitude"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Latitude</FormLabel>
                  <FormControl>
                    <div className="">
                      <Input type="text" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="location.longitude"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Longitude</FormLabel>
                  <FormControl>
                    <div className="">
                      <Input type="text" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isUpdate && (
              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-full sm:col-span-2">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <div className="">
                        <Input type="text" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                    <FormDescription className="flex items-center gap-x-1.5 font-medium opacity-100"></FormDescription>
                  </FormItem>
                )}
              />
            )}
          </form>
        </Form>
        {isCreate && (
          <Alert variant="info">
            <div className="prose prose-neutral max-w-full text-sm leading-relaxed text-black dark:prose-invert">
              <span className="font-medium">Note: </span>
              Owner password is <span className="font-medium">abcd@1234</span>'.
              Please change and edit the business details on the dashboard.
            </div>
          </Alert>
        )}

        <DialogFooter>
          <div className="flex items-center">
            <Button
              type="submit"
              onClick={() => {
                form.handleSubmit(onSubmit, onError)();
              }}
              disabled={loading}
              // className={cn(isCreate && 'rounded-r-none')}
            >
              {isCreate && `Create`}
              {isUpdate && `Save Changes`}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BusinessDialog;
