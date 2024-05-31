import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

type PageSubtitleProps = {
  title: string;
  subTitle?: string;
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
  subTitle,
  buttonShow,
  buttonText,
  buttonUrl,
  buttonVariant,
}: PageSubtitleProps) {
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center space-x-2">
          <h2 className="text-3xl pl-3">{title}</h2>
          <div>{" "}</div>
          <h4 className="text-slate-700 text-2xl font-extralight">{subTitle}</h4>
        </div>
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
