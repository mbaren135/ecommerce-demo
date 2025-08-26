export default function DetailsSkeleton() {
  return (
    <div className="flex flex-col items-center space-y-12 w-full text-brand-primary p-6">
      <div className="flex flex-col justify-start w-full gap-2">
        <div className="h-9 w-1/2 bg-brand-primary-200 rounded animate-pulse" />
        <div className="h-7 w-3/4 bg-brand-primary-200 rounded animate-pulse" />
        <hr />
      </div>
      <div className="flex flex-col w-2/3 items-start gap-6">
        <div className="flex items-center w-full">
          <div className="h-7 w-1/3 bg-brand-primary-200 rounded animate-pulse mr-auto" />
          <div className="h-10 w-16 bg-brand-primary-200 rounded animate-pulse" />
        </div>
        <FormInputSkeleton />
        <FormInputSkeleton />
        <FormInputSkeleton />
      </div>
    </div>
  );
}

function FormInputSkeleton() {
  return (
    <div className="flex justify-between items-center w-1/2">
      <div className="h-5 w-20 bg-brand-primary-200 rounded animate-pulse" />
      <div className="h-10 flex-1 ml-4 bg-brand-primary-200 rounded-md animate-pulse" />
    </div>
  );
}
