import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Input,
  Button,
} from '@ketero/ui';
import { cn } from '@ketero/utils';

const WorkingHours = (props) => {
  const form = useForm({
    defaultValues: {
      workingHours: [{ value: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'workingHours',
  });

  return (
    <Form {...form}>
      <form className="space-y-8">
        <div className="flex-1">
          {fields.map((field, index) => (
            <div key={field.id} className="flex  flex-1 items-center space-x-2">
              <FormField
                control={form.control}
                name={`workingHours.${index}.value`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl className="col-span-full sm:col-span-2">
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
      </form>
    </Form>
  );
};

export default WorkingHours;
