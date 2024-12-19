import React, { useEffect, useState } from 'react';
import { useDialog } from '../../../../stores/dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@ketero/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@ketero/utils';
import { useForm } from 'react-hook-form';
import { useCreateReservation } from '../../../../services/reservation/createreservation';
import { CreateBusinessUserDto } from '@ketero/dto';
import { format } from 'date-fns';
import { CalendarIcon } from '@radix-ui/react-icons';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Calendar,
  Button,
  FormControl,
  FormField,
  FormItem,
  Input,
  FormLabel,
  Form,
  FormMessage,
  FormDescription,
  AutoComplete,
} from '@ketero/ui';
import { z } from 'nestjs-zod/z';
import { useUser } from '../../../../services/user/user';
import { fetchBusinessSubcategories } from '../../../../services/categories/categories';

interface FormValues {
  date: Date | undefined;
  services: string;
  totalPrice: number;
}
type Option = { label: string; value: string; price: number };

const FormSchema = z.object({
  clientId: z.any(),
  date: z.date({
    required_error: 'A date of schedule is required.',
  }),
  // service: z.string().min(1, 'Service is required'), // Ensures a service is provided
});

const ClientReservationDialog = (props) => {
  const { isOpen, close, payload } = useDialog<CreateBusinessUserDto>('client');
  const companyProfile = payload?.companyProfile;
  const { user } = useUser();
  const { createReservation, loading: createLoading } = useCreateReservation();

  const businessId = payload?.companyProfile?.id;

  const [value, setValueAutoComplete] = useState<Option | null>(null);
  const [options, setOptions] = useState<Option[]>([]);

  const [selectedServices, setSelectedServices] = useState<Option[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const fetchSubcategories = async () => {
      if (businessId) {
        try {
          const data = await fetchBusinessSubcategories(businessId);
          const formattedOptions = data.map((subcategory) => ({
            label: subcategory.label,
            value: subcategory.subcategoryId,
            price: subcategory.price, // Ensure this exists in your data
          }));
          console.log(formattedOptions);
          setOptions(formattedOptions);
        } catch (error) {
          console.error('Failed to fetch subcategories:', error);
        }
      }
    };

    fetchSubcategories();
  }, [businessId]);

  const handleValueChange = (selectedOption: Option) => {
    if (
      !selectedServices.some(
        (service) => service.value === selectedOption.value,
      )
    ) {
      setSelectedServices((prevServices) => [...prevServices, selectedOption]);
      setTotalPrice((prevPrice) => prevPrice + selectedOption.price); // Update total price
    }
  };

  const removeService = (serviceToRemove: Option) => {
    setSelectedServices((prevServices) =>
      prevServices.filter((service) => service.value !== serviceToRemove.value),
    );
    setTotalPrice((prevPrice) => prevPrice - serviceToRemove.price); // Update total price
  };

  const getCombinedServicesText = () => {
    return selectedServices.map((service) => service.label).join(', ');
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      date: undefined,
      service: '',
      price: 0,
    },
  });

  const { control, handleSubmit, reset } = form;

  useEffect(() => {
    if (isOpen) reset();
  }, [isOpen, reset]);

  const onSubmit = async (data: FormValues) => {
    try {
      data.clientId = user.id;
      data.businessId = companyProfile.id;
      data.service = getCombinedServicesText();
      data.price = totalPrice;
      console.log(getCombinedServicesText());
      console.log(data);
      await createReservation(data);
      close(); // Close dialog or show success message
    } catch (error) {
      console.error('Reservation creation error:', error);
    }
  };

  const onError = (error: any) => {
    console.error('Form submission error:', error);
  };

  // Check if the company profile is not available
  if (!companyProfile) {
    return null;
  }

  const { name } = companyProfile;

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center space-x-2.5">
              <h2>Create a reservation for {name}</h2>
            </div>
          </DialogTitle>
          <DialogDescription>Create a new reservation below.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of Schedule</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        captionLayout="dropdown-buttons"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>Your date of schedule.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <AutoComplete
              options={options}
              emptyMessage="No results."
              placeholder="Find a service"
              onValueChange={handleValueChange}
              value={null} // Reset value after selection
            />
            <FormField
              name="services"
              control={control}
              render={({ field }) => (
                <FormItem className="col-span-full sm:col-span-2">
                  <FormLabel>Selected Services</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      disabled={true}
                      value={getCombinedServicesText()}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <p className="mt-2">
            <strong>Total Price:</strong> {totalPrice} Birr
          </p>
          <Button
            type="submit"
            onClick={() => {
              form.handleSubmit(onSubmit, onError)();
            }}
            disabled={createLoading}
          >
            {createLoading ? 'Creating...' : 'Submit'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default ClientReservationDialog;
