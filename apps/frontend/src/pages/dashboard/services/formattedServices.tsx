// @ts-nocheck
import {
  Button,
  Input,
  Label,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@ketero/ui';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

const FormattedServices = ({ formattedServices, setFormattedServices }) => {
  const { control, handleSubmit, reset, setValue, getValues } = useForm();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Service Name</TableHead>
          <TableHead className="w-[100px]">Price</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      {formattedServices.length > 0 && (
        <TableBody>
          {formattedServices.map((item) => (
            <TableRow key={item.value}>
              <TableCell>{item.label}</TableCell>
              <TableCell>
                <Label htmlFor={`price-${item.value}`} className="sr-only">
                  {item.label}
                </Label>
                <Controller
                  name={`price-${item.value}`}
                  control={control}
                  defaultValue={item.price}
                  render={({ field }) => (
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  )}
                />
              </TableCell>
              <TableCell>
                <Button type="button" onClick={() => handleUnselect(item)}>
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      )}
    </Table>
  );
};

export default FormattedServices;
