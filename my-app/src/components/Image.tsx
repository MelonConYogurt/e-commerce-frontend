/* eslint-disable @next/next/no-img-element */
"use client";

import {useState, useEffect} from "react";
import {Dialog, DialogBackdrop, DialogPanel} from "@headlessui/react";
import {X, ZoomIn, ZoomOut} from "lucide-react";

interface ExampleProps {
  src: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function Example({src, isOpen, onClose}: ExampleProps) {
  const [open, setOpen] = useState(isOpen);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center p-4 mt-20">
          <DialogPanel
            className={`transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all ${
              isZoomed ? "w-full h-full" : "w-fit h-fit"
            }`}
          >
            <div className="relative flex justify-center items-center">
              <img
                src={src}
                alt=""
                className={`${
                  isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
                } transition-all duration-300 ${
                  isZoomed ? "w-full h-full object-contain" : "w-2/3 h-2/3"
                }`}
                onClick={toggleZoom}
              />
              <button
                type="button"
                onClick={onClose}
                className="absolute top-2 right-2 inline-flex justify-center rounded-full bg-white/10 p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
              >
                <X className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={toggleZoom}
                className="absolute bottom-2 right-2 inline-flex justify-center rounded-full bg-white/10 p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
              >
                {isZoomed ? (
                  <ZoomOut className="h-6 w-6" />
                ) : (
                  <ZoomIn className="h-6 w-6" />
                )}
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
