import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type ButtonProps = {
  text: string;
};

export function ButtonLoading({ text }: ButtonProps) {
  return (
    <Button disabled>
      <Loader2 className="animate-spin" />
      {text}
    </Button>
  );
}
