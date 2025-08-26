import { cn } from "@/lib/utils/cn";
import { Star } from "lucide-react";

export default function ProductRating({
  rating,
}: {
  rating: { rate: number; count: number };
}) {
  const { rate, count } = rating;

  const clampedRate = Math.min(Math.max(rate, 0), 5);

  return (
    <div className="flex items-center gap-2 self-end">
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, index) => {
          const starNumber = index + 1;
          const isFilled = starNumber <= Math.floor(clampedRate);
          const isPartial =
            starNumber === Math.ceil(clampedRate) && clampedRate % 1 !== 0;

          return (
            <div key={index} className="relative">
              <Star
                className={cn(
                  "h-5 w-5",
                  isFilled
                    ? "fill-brand-accent text-brand-accent"
                    : "fill-brand-light-200 text-brand-light-200"
                )}
              />
              {isPartial && (
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${(clampedRate % 1) * 100}%` }}
                >
                  <Star className="h-5 w-5 fill-brand-accent text-brand-accent" />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <span className="text-sm text-muted-foreground">
        ({count} {count === 1 ? "rating" : "ratings"})
      </span>
    </div>
  );
}
