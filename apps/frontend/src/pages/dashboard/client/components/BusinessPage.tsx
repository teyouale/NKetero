import { COMPANY_KEY } from '../../../../constants/query-keys';
import { queryClient } from '../../../../libs/query-client';
import { fetchCompany } from '../../../../services/businesses/company';
import { fetchBusinessSubcategories } from '../../../../services/categories/categories';
import { useUser } from '../../../../services/user/user';
import { useDialog } from '../../../../stores/dialog';
import { Button } from '@ketero/ui';
import { EyeSlash, HairDryer, Hand, SmileyXEyes } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { LoaderFunction, redirect, useLoaderData } from 'react-router-dom';

interface CompanyProfile {
  id: any;
  name: string;
  user: {
    phoneNumber: string;
  };
  description: string;
}

const BusinessPage = (props) => {
  const { user } = useUser();
  const companyProfile = useLoaderData() as CompanyProfile | null;
  const { open } = useDialog<any>('client');
  const [loading, setLoading] = useState<boolean>(true);
  const [subcategories, setSubcategories] = useState<
    { subcategoryId: number; label: string; price: number }[]
  >([]);

  const businessId = companyProfile?.id; // Ensure we are using the correct business ID

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
      }
    };

    loadSubcategories();
  }, [businessId]);

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  const onOpen = () => {
    if (companyProfile) {
      open('reserve', {
        companyProfile,
        id: companyProfile.id,
      });
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
              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className="w-4 h-4 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm font-medium leading-none text-gray-500 ">
                  (5.0)
                </p>
                <a className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline ">
                  345 Reviews
                </a>
              </div>
            </div>

            <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
              <Button onClick={onOpen}>
                <svg
                  className="w-5 h-5 -ms-2 me-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                  />
                </svg>
                Make a Reservation with Us
              </Button>
            </div>

            <hr className="my-6 md:my-8 border-primary" />

            <p
              className="mb-6 text-muted-foreground capitalize"
              dangerouslySetInnerHTML={{
                __html:
                  companyProfile?.description || 'Description not available',
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
                  {/* Placeholder for icons */}
                  {item.label === 'Natural Hair Wash & Style' ? (
                    <HairDryer size={32} />
                  ) : item.label === 'Normal Nail Polish' ? (
                    <SmileyXEyes size={32} />
                  ) : item.label === 'Human Hair Extension' ? (
                    <EyeSlash size={32} />
                  ) : item.label === 'Eyelash Removal' ? (
                    <EyeSlash size={32} />
                  ) : item.label === 'Back Abdominal' ? (
                    <Hand size={32} />
                  ) : (
                    <Hand size={32} /> // Default icon
                  )}
                </div>
                <h3 className="text-base font-medium">{item.label}</h3>
                <p className="text-sm font-semibold">
                  Price: {item.price} Birr
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessPage;

// Loader function to fetch company details
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
