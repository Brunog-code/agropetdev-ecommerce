import { Skeleton } from "@/components/ui/skeleton";

export function BannerSkeleton() {
  return (
    <div className="w-full h-52 sm:h-72 md:h-96 flex gap-[15px]">
      {/* Slide 1 - Sempre visível */}
      <div className="flex-1 h-full">
        <Skeleton className="w-full h-full rounded-xl" />
      </div>

      {/* Slide 2 - Escondido no mobile para simular o slidesPerView={2} */}
      <div className="hidden sm:block flex-1 h-full">
        <Skeleton className="w-full h-full rounded-xl" />
      </div>
    </div>
  );
}
