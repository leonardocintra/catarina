import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { InfoIcon } from "lucide-react";
import Link from "next/link";

type ButtonConfig = {
  buttonUrl: string;
  buttonText: string;
  buttonVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  buttonShow?: boolean;
};

type PageSubtitleProps = {
  title: string;
  subTitle?: string;
  observation?: string;
  buttons?: ButtonConfig[];
};

export default function PageSubtitle({
  title,
  subTitle,
  observation,
  buttons = [],
}: PageSubtitleProps) {
  const visibleButtons = buttons.filter(
    (button) => button.buttonShow === undefined || button.buttonShow,
  );

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex-col items-center space-y-2">
          <h2 className="text-3xl">{title}</h2>
          <h4 className="text-slate-700 text-xl font-extralight pl-2">
            {subTitle}
          </h4>
          {observation && (
            <div className="flex text-slate-500 text-md font-light space-x-2.5">
              <InfoIcon />
              <div>{observation}</div>
            </div>
          )}
        </div>
        {visibleButtons.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {visibleButtons.map(
              ({ buttonUrl, buttonText, buttonVariant }, index) => (
                <Link key={`${buttonText}-${index}`} href={buttonUrl}>
                  <Button variant={buttonVariant ? buttonVariant : "default"}>
                    {buttonText}
                  </Button>
                </Link>
              ),
            )}
          </div>
        )}
      </div>
      <Separator className="mb-3 mt-2" />
    </div>
  );
}
