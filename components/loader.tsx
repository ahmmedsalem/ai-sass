import Image from "next/image";
import React from "react";

type Props = {};

export const Loader = (props: Props) => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
      <div className="w-10 h-10 relative animate-spin">
        <Image alt="logo" fill src="/empty.png" />
      </div>
      <p className="text-sm text-muted-foreground">Scorpio is thinking...</p>
    </div>
  );
};
