import React, { useEffect, useState } from 'react';
import { COMPANY_KEY } from '../../../../constants/query-keys';
import { queryClient } from '../../../../libs/query-client';
import { fetchCompany } from '../../../../services/businesses/company';
import { fetchBusinessSubcategories } from '../../../../services/categories/categories';
import { useUser } from '../../../../services/user/user';
import { useDialog } from '../../../../stores/dialog';
import { Button } from '@ketero/ui';
import { EyeSlash, HairDryer, Hand, SmileyXEyes } from '@phosphor-icons/react';
import { LoaderFunction, redirect, useLoaderData } from 'react-router-dom';

interface CompanyProfile {
  id: string;
  name: string;
  user: { phoneNumber: string };
  description: string;
}

const ReserveDialog = ({
  companyProfile,
  onClose,
}: {
  companyProfile: CompanyProfile;
  onClose: () => void;
}) => {
  const handleSubmit = async () => {
    try {
      // Perform reservation logic (e.g., API call)
      alert(`Reservation successfully made for ${companyProfile.name}`);
      onClose();
    } catch (error) {
      console.error('Reservation failed:', error);
      alert('An error occurred while making the reservation.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-lg font-bold">Reserve at {companyProfile.name}</h2>
        <p>Contact: {companyProfile.user.phoneNumber}</p>
        <div className="mt-4 flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Confirm Reservation
          </button>
        </div>
      </div>
    </div>
  );
};

const BusinessPage = () => {
  const { user } = useUser();
  const companyProfile = useLoaderData() as CompanyProfile | null;
  const { open, close, dialog } = useDialog<any>('client');
  const [loading, setLoading] = useState<boolean>(true);
  const [subcategories, setSubcategories] = useState<
    { subcategoryId: number; label: string; price: number }[]
  >([]);

  const businessId = companyProfile?.id;

  useEffect(() => {
    const loadSubcategories = async () => {
      if (businessId) {
        try {
          const data = await fetchBusinessSubcategories(businessId);
          setSubcategories(data);
        } catch (error) {
          console.error('Error fetching subcategories:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    loadSubcategories();
  }, [businessId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const onOpen = () => {
    if (companyProfile) {
      open('reserve', { companyProfile });
    } else {
      console.error('Company profile is not available.');
    }
  };

  return (
    <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <div className="shrink-0 max-w-md lg:max-w-lg w-full mx-auto">
            <iframe
              className="mx-auto w-full"
              width="100%"
              height="100%"
              frameBorder="0"
              title="map"
              scrolling="no"
              src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;q=%C4%B0zmir+(My%20Business%20Name)&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed"
              style={{ border: 0 }}
            />
          </div>

          <div className="mt-6 sm:mt-8 lg:mt-0">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl capitalize">
              {companyProfile?.name || 'Business Name'}
            </h1>
            <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
              <code className="text-2xl font-extrabold text-gray-900 sm:text-3xl ">
                {companyProfile?.user?.phoneNumber || 'Phone Number'}
              </code>
            </div>

            <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
              <Button onClick={onOpen}>
                Make a Reservation with Us
              </Button>
            </div>

            <hr className="my-6 md:my-8 border-primary" />

            <p
              className="mb-6 text-muted-foreground capitalize"
              dangerouslySetInnerHTML={{
                __html: companyProfile?.description || 'Description not available',
              }}
            />
          </div>
        </div>

        <div className="container grid gap-8 px-4 md:px-6 py-12 md:py-16 lg:py-20">
          <div className="grid gap-2">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Explore Our Product Categories
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {subcategories.map((item, index) => (
              <div key={index} className="flex flex-col items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#94131F] text-primary-foreground">
                  {item.label === 'Natural Hair Wash & Style' ? (
                    <HairDryer size={32} />
                  ) : item.label === 'Normal Nail Polish' ? (
                    <SmileyXEyes size={32} />
                  ) : (
                    <Hand size={32} />
                  )}
                </div>
                <h3 className="text-base font-medium">{item.label}</h3>
                <p className="text-sm font-semibold">Price: {item.price} Birr</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {dialog && dialog.type === 'reserve' && (
        <ReserveDialog
          companyProfile={dialog.props.companyProfile}
          onClose={close}
        />
      )}
    </section>
  );
};

export default BusinessPage;

export const CompanydetailLoader: LoaderFunction<any> = async ({ params }) => {
  try {
    const businessID = params.businessID!;
    const company = await queryClient.fetchQuery({
      queryKey: [COMPANY_KEY, businessID],
      queryFn: () => fetchCompany(businessID),
    });

    return company;
  } catch (e) {
    console.error(e);
    return redirect('/dashboard');
  }
};
