export default function ProductInfoSkeleton() {
  return (
    <div className="flex flex-col w-full gap-6 text-brand-primary">
      <div className="flex flex-row gap-6 w-full h-full">
        <div className="w-2/5 m-y-6 border-r border-r-brand-accent relative overflow-hidden p-6">
          <div className="w-full h-full bg-brand-light animate-pulse" />
        </div>

        <div className="flex flex-col gap-6 w-3/5">
          <div className="flex flex-row gap-2 items-start justify-between">
            <div className="flex flex-col gap-2 flex-1">
              <div className="h-9 w-3/4 bg-brand-primary-200 rounded animate-pulse" />
              <div className="h-7 w-1/2 bg-brand-primary-200 rounded animate-pulse" />
            </div>
            <div className="h-8 w-20 bg-brand-accent-100 rounded animate-pulse" />
          </div>

          <hr />

          <div className="space-y-2">
            <div className="h-6 w-full bg-brand-primary-200 rounded animate-pulse" />
            <div className="h-6 w-5/6 bg-brand-primary-200 rounded animate-pulse" />
            <div className="h-6 w-4/5 bg-brand-primary-200 rounded animate-pulse" />
          </div>

          <div className="flex items-center gap-2 self-end">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-5 h-5 bg-brand-accent-100 rounded animate-pulse"
                />
              ))}
            </div>
            <div className="h-5 w-16 bg-brand-primary-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
