import { useCategories } from '../../../../services/categories/categories';

const Catagories = (props) => {
  const { catagories } = useCategories();
  return (
    <section className="bg-gray-50 pt-8 antialiased dark:bg-gray-900 md:pt-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mb-4 flex items-center justify-between gap-4 md:mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Reserve by category
          </h2>

          <a className="flex items-center text-base font-medium text-primary-700 hover:underline dark:text-primary-500">
            See more categories
            <svg
              className="ms-1 h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 12H5m14 0-4 4m4-4-4-4"
              />
            </svg>
          </a>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {catagories?.map((catagory, index) => {
            return (
              <a
                key={index}
                className="flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <svg
                  className="me-2 h-4 w-4 shrink-0 text-gray-900 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                  />
                </svg>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {catagory.name}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Catagories;

