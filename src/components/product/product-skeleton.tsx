import { Card, CardContent } from "@/components/ui/card";

export default function ProductSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-square bg-brand-light animate-pulse" />
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="h-5 bg-brand-light rounded animate-pulse" />
          <div className="h-4 bg-brand-light rounded w-3/4 animate-pulse" />
          <div className="h-4 bg-brand-light rounded w-1/2 animate-pulse" />
          <div className="flex items-center justify-between mt-4">
            <div className="h-6 bg-brand-light rounded w-16 animate-pulse" />
            <div className="h-8 bg-brand-light rounded w-20 animate-pulse" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
