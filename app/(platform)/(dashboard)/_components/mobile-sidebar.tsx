"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useMobileSidebar } from "@/hooks/use-mobile-sidebar";
import { MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardSidebar from "./dashboard-sidebar";

export default function MobileSidebar() {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const onOpen = useMobileSidebar((state) => state.onOpen);
  const onClose = useMobileSidebar((state) => state.onClose);
  const isOpen = useMobileSidebar((state) => state.isOpen);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!isMounted) return null;

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="block md:hidden mr-2"
        onClick={onOpen}
      >
        <MenuIcon className="w-4 h-4" />
      </Button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="p-2 pt-10">
          <DashboardSidebar storageKey="t-mobile-sidebar-state" />
        </SheetContent>
      </Sheet>
    </>
  );
}
