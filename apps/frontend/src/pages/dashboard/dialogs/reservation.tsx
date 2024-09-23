// @ts-nocheck
import React, { useEffect, useState } from 'react';
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
  Tooltip,
  FormDescription,
  FormMessage,
  Form,
} from '@ketero/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn, kebabCase } from '@ketero/utils';
import { Plus, MagicWand, FileSearch, Funnel } from '@phosphor-icons/react';
import { useForm } from 'react-hook-form';
import { useCreateReservation } from '@/client/services/reservation';
import { useCheckUserByPhoneNumber } from '@/client/services/user';
import {
  CreateBusinessUserDto,
  createUserReservationSchema,
  idSchema,
} from '@ketero/dto';

const formSchema = createUserReservationSchema.extend({
  id: idSchema.optional(),
  //   // description: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const ReservationDialog = (props) => {
  const { isOpen, mode, payload, close } =
    useDialog<CreateBusinessUserDto>('reservation');

  const { createReservation, loading: createLoading } = useCreateReservation();
  const { checkUserByPhoneNumber, loading: pnCheckLoading } =
    useCheckUserByPhoneNumber();

  const [isChecked, setIsChecked] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const isCreate = mode === 'create';
  const loading = createLoading;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessId: '',
      name: '',
      username: '',
      email: '',
      phoneNumber: '',
      date: new Date(),
      service: '',
    },
  });

  useEffect(() => {
    if (isOpen) onReset();
  }, [isOpen, payload]);

  const onSubmit = async () => {
    // await createReservation({
    //   businessId: 'clyxi0qga000d54ewj345472r',
    //   clientId: 'clyxhvv4k000654ewuy2cqo9u',
    //   service: 'Hair Salone',
    //   date: new Date('2024-08-22T21:28:16.606Z'),
    // });
  };
  const onError = (error: any) => {
    console.error('Form submission error:', error);
  };
  const onReset = () => {
    form.reset({
      businessId: '',
      name: '',
      username: '',
      email: '',
      phoneNumber: '',
      date: new Date(),
      service: '',
    });
    setIsChecked(false);
    setIsRegistered(false);
  };

  const searchUserInfo = async () => {
    const phoneNumber = form.getValues('phoneNumber');
    const user = await checkUserByPhoneNumber(phoneNumber);

    if (user) {
      form.setValue('name', user.name);
      form.setValue('username', user.username);
      form.setValue('email', user.email);
      form.setValue('service', user.phoneNumber);
      setIsRegistered(true);
    } else {
      setIsRegistered(false);
    }

    setIsChecked(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center space-x-2.5">
              <Plus />
              <h2>Create a reservation for Baba Beauty Salon</h2>
            </div>
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="grid gap-6 sm:grid-cols-2">
            <FormField
              name="phoneNumber"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-full sm:col-span-2">
                  <FormLabel>Enter Client phone number</FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-between gap-x-2">
                      <Input {...field} className="flex-1" />

                      <Tooltip content="Search of the Client in the DB">
                        <Button
                          size="icon"
                          type="button"
                          variant="outline"
                          onClick={searchUserInfo}
                        >
                          <MagicWand />
                        </Button>
                      </Tooltip>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Tip: You can name the resume referring to the position you
                    are applying for.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Name</FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-between gap-x-2">
                      <Input
                        {...field}
                        className="flex-1"
                        disabled={isChecked && isRegistered}
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <div className=" flex items-center justify-between gap-x-2">
                      <Input
                        {...field}
                        className="flex-1"
                        disabled={isChecked && isRegistered}
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="">
                      <Input
                        type="email"
                        {...field}
                        disabled={isChecked && isRegistered}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />

                  <FormDescription className="flex items-center gap-x-1.5 font-medium opacity-100"></FormDescription>
                </FormItem>
              )}
            />

            <FormField
              name="service"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service</FormLabel>
                  <FormControl>
                    <div className="">
                      <Input
                        type="text"
                        {...field}
                        disabled={isChecked && isRegistered}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <Alert variant="info">
          <div className="prose prose-neutral max-w-full text-sm leading-relaxed text-black dark:prose-invert">
            <span className="font-medium">Note: </span>
            Owner password is <span className="font-medium">abcd@1234</span>'.
            Please change and edit the business details on the dashboard.
          </div>
        </Alert>

        <DialogFooter>
          <div className="flex items-center">
            <Button
              type="submit"
              onClick={() => {
                form.handleSubmit(onSubmit, onError)();
              }}
              disabled={!isChecked || loading}
              className={cn(isCreate && 'rounded-r-none')}
            >
              Create
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReservationDialog;
