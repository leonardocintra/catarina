import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

type PageSubtitleProps = {
  title: string;
  buttonShow: boolean;
  buttonUrl: string;
  buttonText: string;
  buttonVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
};

export default function PageSubtitle({
  title,
  buttonShow,
  buttonText,
  buttonUrl,
  buttonVariant,
}: PageSubtitleProps) {
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-3xl pl-3">{title}</h2>
        {buttonShow && (
          <Link href={buttonUrl}>
            <Button variant={buttonVariant ? buttonVariant : "default"}>
              {buttonText}
            </Button>
          </Link>
        )}
      </div>
      <Separator className="mb-3 mt-2" />
    </div>
  );
}
