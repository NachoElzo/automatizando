"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function TitleUpdater() {
  const pathname = usePathname();

  useEffect(() => {
    let title = "";
    if (pathname === "/" || pathname === "") {
      title = "automatizando";
    } else {
      title = pathname.split("/")[1] || "automatizando";
    }
    console.log("Setting title:", title);
    document.title = title;
  }, [pathname]);

  return null;
}