import { FC } from "react";
const Placeholder: FC = () => {
  return (
    <div className="w-[313px] bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
      <div className="p-4">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>

        <div className="flex flex-col items-center space-y-4">
          <div className="w-full h-[200px] bg-gray-300 rounded-md"></div>

          <div className="w-full space-y-2">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-4/5"></div>
            <div className="h-4 bg-gray-300 rounded w-3/5"></div>
          </div>
        </div>

        <div className="mt-4">
          <div className="h-10 bg-gray-300 rounded w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Placeholder;
