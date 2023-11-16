"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization } from "@clerk/nextjs";
import { CreditCardIcon } from "lucide-react";
import Image from "next/image";

export default function Info() {
  const { organization, isLoaded } = useOrganization();

  if (!isLoaded) {
    return <Info.Skeleton />;
  }

  return (
    <div className="flex items-center gap-x-4">
      <div className="w-[60px] h-[60px] relative">
        <Image
          fill
          src={organization?.imageUrl!}
          alt="Organization"
          className="rounded-md object-cover"
        />
      </div>
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">{organization?.name}</h1>
        <div className="flex items-center text-xs text-muted-foreground">
          <CreditCardIcon className="w-3 h-3 mr-1" />
          free
        </div>
      </div>
    </div>
  );
}

Info.Skeleton = function InfoSkeleton() {
  return (
    <div className="flex items-center gap-x-4">
      <div className="w-[60px] h-[60px] relative">
        <Skeleton className="w-full h-full absolute" />
      </div>
      <div className="space-y-1">
        <Skeleton className="w-[200px] h-10" />
        <div className="flex items-center">
          <Skeleton className="w-4 h-4 mr-1" />
          <Skeleton className="w-[100px] h-4" />
        </div>
      </div>
    </div>
  );
};
