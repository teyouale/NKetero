// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Input,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  toast,
  Label,
} from '@ketero/ui';
import { Pencil, Save, Plus, Trash2, RefreshCw } from 'lucide-react';
import { redirect, useLoaderData, useParams } from 'react-router-dom';
import { FancyMultiSelect } from './fancy-multi-select';
import { fetchAllCategories } from '@/client/services/service';
import { useBusinessService } from '@/client/services/service/businessServices';
import { useCreateCustomSubcategory } from '@/client/services/service/customservice';
import { useDeleteBusinessSubcategory } from '@/client/services/service/deleteBusinessServices';

interface Service {
  id: number;
  name: string;
  price: number;
  category: string;
}

interface ServiceFormData {
  name: string;
  price: number;
}

const ServicePage = (props) => {
  const categories = useLoaderData();
  const { businessID } = useParams();
  const [services, setServices] = useState<Service[]>([]);
  const { MyServices = [], loading, error } = useBusinessService(businessID);
  const [selectedCategories, setSelectedCategories] = useState<Service[]>([]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ServiceFormData>({
    defaultValues: {
      name: '',
      price: 0,
    },
  });

  useEffect(() => {
    if (categories) {
      const categoryOptions = categories.map((category: any) => ({
        id: category.id,
        name: category.name,
        category: category.category.name,
        price: 0,
      }));
      setServices(categoryOptions);
    }
  }, [categories]);

  useEffect(() => {
    if (!loading && MyServices.length > 0) {
      const myServices = MyServices.map((service: any) => ({
        id: service.id,
        name: service.name,
        category: service.category.name,
        price: service.price,
      }));
      setSelectedCategories(myServices);
    }
  }, [loading, MyServices]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const {
    control: editControl,
    handleSubmit: handleEditSubmit,
    reset: resetEdit,
    formState: { errors: editErrors },
  } = useForm<ServiceFormData>();

  const {
    createSubcategory,
    loading: isCustomCreating,
    error: customCreationError,
    isSuccess,
  } = useCreateCustomSubcategory();

  const { deleteSubcategory, loading: isDeleteCatagory } =
    useDeleteBusinessSubcategory();

  const handleEdit = (id: number) => {
    const serviceToEdit = selectedCategories.find(
      (service) => service.id === id
    );
    if (serviceToEdit) {
      resetEdit({ name: serviceToEdit.name, price: serviceToEdit.price });
      setEditingId(id);
    }
  };

  const handleSave = (id: number, data: ServiceFormData) => {
    setSelectedCategories((prev) =>
      prev.map((service) =>
        service.id === id ? { ...service, ...data } : service
      )
    );
    console.log(setSelectedCategories);
    setEditingId(null);
    toast({
      title: 'Service Updated',
      description: 'Your service has been successfully updated.',
      variant: 'success',
    });
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteSubcategory({ businessID, id });
      setSelectedCategories((prev) =>
        prev.filter((service) => service.id !== id)
      );
    } catch (err) {
      console.error('Failed to delete subcategory:', err);
    }
  };

  const addCustomService = async (data: ServiceFormData) => {
    if (businessID && data.name && data.price) {
      try {
        const newService = await createSubcategory({
          businessId: businessID,
          name: data.name,
          price: +data.price,
        });
        setSelectedCategories((prev) => [
          ...prev,
          {
            id: newService.id,
            name: newService.name,
            category: newService.category.name,
            price: newService.price,
          },
        ]);
        reset();
        toast({
          title: 'Custom Service Added',
          description: 'Your new custom service has been successfully added.',
          variant: 'success',
        });
      } catch (err) {
        console.error('Failed to create subcategory:', err);
        toast({
          title: 'Failed to Create Subcategory',
          description: 'There was an error creating the subcategory.',
          variant: 'error',
        });
      }
    }
  };

  const updateSelectedCategories = async () => {
    setIsUpdating(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsUpdating(false);
    toast({
      title: 'Selected Categories Updated',
      description:
        'All selected categories have been successfully updated on the server.',
      variant: 'success',
    });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Services Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          <Label htmlFor="name">Add My Services</Label>
          <FancyMultiSelect
            CatagoryData={services}
            selected={selectedCategories}
            setSelected={setSelectedCategories}
          />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%]">Service Name</TableHead>
              <TableHead className="w-[20%]">Price</TableHead>
              <TableHead className="w-[40%]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {selectedCategories.map((service) => (
              <TableRow key={service.id}>
                <TableCell>
                  {editingId === service.id ? (
                    <Controller
                      name="name"
                      control={editControl}
                      rules={{ required: 'Name is required' }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          className={editErrors.name ? 'border-primary' : ''}
                        />
                      )}
                    />
                  ) : (
                    <div>
                      {service.name}
                      <Badge variant="secondary" className="ml-2">
                        {service.category}
                      </Badge>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  {editingId === service.id ? (
                    <Controller
                      name="price"
                      control={editControl}
                      rules={{
                        required: 'Price is required',
                        min: { value: 0, message: 'Price must be positive' },
                      }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="number"
                          min="0"
                          step="0.01"
                          className={editErrors.price ? 'border-primary' : ''}
                        />
                      )}
                    />
                  ) : (
                    `${(Number(service.price) || 0).toFixed(2)} Birr`
                  )}
                </TableCell>
                <TableCell>
                  {editingId === service.id ? (
                    <Button
                      onClick={handleEditSubmit((data) =>
                        handleSave(service.id, data)
                      )}
                      size="sm"
                      className="mr-2"
                    >
                      <Save className="w-4 h-4 mr-1" /> Save
                    </Button>
                  ) : (
                    <>
                      <Button
                        onClick={() => handleEdit(service.id)}
                        size="sm"
                        variant="outline"
                        className="mr-2"
                      >
                        <Pencil className="w-4 h-4 mr-1" /> Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(service.id)}
                        size="sm"
                        variant="destructive"
                        className="bg-primary"
                      >
                        <Trash2 className="w-4 h-4 mr-1" /> Delete
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-6 flex justify-end">
          <Button onClick={updateSelectedCategories} disabled={isUpdating}>
            {isUpdating ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> Updating...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" /> Update Selected
                Categories
              </>
            )}
          </Button>
        </div>

        <form
          onSubmit={handleSubmit(addCustomService)}
          className="mt-6 space-y-4"
        >
          <h3 className="text-lg font-semibold">Add New Custom Service</h3>
          <div className="flex space-x-4">
            <div className="flex-1">
              <Controller
                name="name"
                control={control}
                rules={{ required: 'Name is required' }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Service Name"
                    className={errors.name ? 'border-primary' : ''}
                  />
                )}
              />
              {errors.name && (
                <p className="text-primary text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="flex-1">
              <Controller
                name="price"
                control={control}
                rules={{
                  required: 'Price is required',
                  min: { value: 0, message: 'Price must be positive' },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Price"
                    className={errors.price ? 'border-primary' : ''}
                  />
                )}
              />
              {errors.price && (
                <p className="text-primary text-sm mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit">
              <Plus className="w-4 h-4 mr-2" /> Add Custom Service
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ServicePage;

export const categoryLoader = async () => {
  try {
    const categories = await fetchAllCategories();
    return categories;
  } catch (e) {
    toast({
      title: 'No Categories Found',
      variant: 'error',
      description:
        'It seems that you have no categories. Please check back later.',
    });
    return redirect('/dashboard');
  }
};
