import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonLoadingProps {
  mensagem?: string;
}

export function SkeletonLoading({
  mensagem = "Carregando...",
}: SkeletonLoadingProps) {
  return (
    <div className="flex items-center justify-center min-h-[300px] w-full px-4">
      <div className="flex flex-col items-center space-y-4 bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-600 text-sm font-medium">{mensagem}</p>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
