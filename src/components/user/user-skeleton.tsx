import { Card, CardContent } from "@/components/ui/card";

export default function UserSkeleton() {
  return (
    <Card className=" group border-brand-light-400 rounded-lg py-3 bg-brand-primary-100">
      <CardContent className="w-full max-h-fit px-3">
        <div className="space-y-2 w-full">
          <div className="h-5 bg-brand-primary-200 rounded animate-pulse" />
          <div className="flex gap-4 items-center">
            <div className="h-4 w-1/3 bg-brand-primary-200 rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-brand-primary-200 rounded animate-pulse" />
          </div>
          <div className="flex gap-4 items-center">
            <div className="h-4 w-1/3 bg-brand-primary-200 rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-brand-primary-200 rounded animate-pulse" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
