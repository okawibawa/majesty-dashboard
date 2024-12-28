import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { XIcon } from "lucide-react";

import { Button } from "./ui/button";

export const DrawerPortal = ({
  children,
  isOpen,
  onClose,
  title,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
}) => {
  const bodyRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      bodyRef.current = document.body;
    }
  }, []);

  useEffect(() => {
    if (!bodyRef.current) {
      return;
    }

    if (isOpen) {
      bodyRef.current.style.overflowY = "hidden";
      return;
    }

    return () => {
      if (!bodyRef.current) {
        return;
      }

      bodyRef.current.style.overflowY = "auto";
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50">
      <div className="w-4/5 max-w-2xl bg-white py-5 px-4 relative">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-semibold text-2xl">{title}</h2>

          <Button variant="ghost" onClick={onClose}>
            <XIcon size={16} />
          </Button>
        </div>

        {children}
      </div>
    </div>,
    bodyRef.current as HTMLElement
  );
};
