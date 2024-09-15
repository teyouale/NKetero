// @ts-nocheck
import { toast } from '@/client/hooks/use-toast';
import { queryClient } from '@/client/libs/query-client';
import {
  fetchAllCategories,
  fetchMyService,
  useService,
} from '@/client/services/service';
import {
  AutoComplete,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Option,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@ketero/ui';
import { useEffect, useState } from 'react';
import { useLoaderData, redirect } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { MY_CATEGORIES_KEY } from '@/client/constants/query-keys';
import { useUpdateBusinessSubcategories } from '@/client/services/service/update';
import { useQuery } from '@tanstack/react-query';

export const ServicePage = () => {
  const categories = useLoaderData();
  const { services = [], loading } = useService();
  const { control, handleSubmit, reset, setValue, getValues } = useForm();

  const [selectedItems, setSelectedItems] = useState<Option[]>([]);
  const { updateBusinessSubcategories } = useUpdateBusinessSubcategories();
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<string>('');

  const { data, isLoading } = useQuery({
    queryKey: ['data', searchValue],
    queryFn: () => useLoaderData(),
  });

  const { data: pokemon, isLoading: isLoadingPokemon } = useQuery({
    queryKey: ['NO', selectedValue],
    queryFn: () => useLoaderData(),
    enabled: !!selectedValue,
  });

  const handleValueChange = (selectedValue: Option | null) => {
    if (
      selectedValue &&
      !selectedItems.some((item) => item.value === selectedValue.value)
    ) {
      setSelectedItems([...selectedItems, selectedValue]);
      setValue(`price-${selectedValue.value}`, selectedValue.price || 0); // Initialize price value
    }
    setValueAutoComplete(null); // Reset AutoComplete input after selection
  };

  // Handle removal of selected item
  const handleRemoveItem = (valueToRemove: string | number) => {
    const updatedItems = selectedItems.filter(
      (item) => item.value !== valueToRemove
    );
    setSelectedItems(updatedItems);
    setValue(`price-${valueToRemove}`, undefined); // Clear price value
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="not-prose mt-8 flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>My Business Service</CardTitle>
          <CardDescription>
            Lipsum dolor sit amet, consectetur adipiscing elit
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="name">Add My Services</Label>
              <AutoComplete
                selectedValue={selectedValue}
                onSelectedValueChange={setSelectedValue}
                searchValue={searchValue}
                onSearchValueChange={setSearchValue}
                items={data ?? []}
                isLoading={isLoading}
                emptyMessage="No Service found."
              />
              {/* <AutoComplete
                options={options}
                emptyMessage="No results."
                placeholder="Find something"
                onValueChange={handleValueChange}
                value={value} */}
              {/* /> */}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <form>
                {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Service Name</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  {selectedItems.length > 0 && (
                    <TableBody>
                      {selectedItems.map((item) => (
                        <TableRow key={item.value}>
                          <TableCell className="font-semibold">
                            {item.value}
                          </TableCell>
                          <TableCell>{item.label}</TableCell>
                          <TableCell>
                            <Label
                              htmlFor={`price-${item.value}`}
                              className="sr-only"
                            >
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
                            <Button
                              type="button"
                              onClick={() => handleRemoveItem(item.value)}
                            >
                              Remove
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  )}
                </Table>
                <CardFooter className="justify-center border-t p-4">
                  <Button type="submit" size="default" className="gap-1">
                    Update My Service
                  </Button>
                </CardFooter>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const categoryLoader = async () => {
  try {
    const categories = await fetchAllCategories();
    console.log(categories);
    return categories;
  } catch (e) {
    toast({
      title: 'No Categories Found',
      description:
        'It seems that you have no categories. Please check back later.',
    });
    return redirect('/dashboard'); // Adjust the redirect logic if needed
  }
};
