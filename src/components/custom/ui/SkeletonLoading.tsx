import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

interface SkeletonLoadingProps {
  mensagem?: string;
}

export function SkeletonLoading({
  mensagem = "Carregando...",
}: SkeletonLoadingProps) {
  return (
    <div className="flex items-center justify-center min-h-75 w-full px-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <div className="flex flex-col items-center space-y-4">
            <p className="text-muted-foreground text-sm font-medium">
              {mensagem}
            </p>
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-62.5" />
                <Skeleton className="h-4 w-50" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
