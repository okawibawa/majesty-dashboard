"use client";

import { useState, MouseEvent, useCallback, useEffect } from "react";
import { XIcon } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { RecapInputs } from "@/components/RecapInputs";

import { createClient } from "@/utils/supabase/client";

import { Database } from "@/types/supabase";

import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function Recaps() {
  const [isLoadingGettingMenus, setIsLoadingGettingMenus] = useState(true);
  const [menus, setMenus] = useState<
    { value: string; label: string }[] | undefined
  >(undefined);
  const [fields, setFields] = useState<
    { id: number; menu: string; qty: number }[]
  >([{ id: Date.now(), menu: "", qty: 0 }]);

  const isTablet = useMediaQuery("(min-width: 900px)");
  const supabase = createClient();

  const handleAddNewRecapField = () => {
    setFields((prev) => [...prev, { id: Date.now(), menu: "", qty: 0 }]);
  };

  const handleRemoveField =
    (fieldId: number) => (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      setFields((prev) => prev.filter((field) => field.id !== fieldId));
    };

  const getMenus = useCallback(async () => {
    try {
      setIsLoadingGettingMenus(true);

      const { data: menus, error } = (await supabase
        .from("menus")
        .select("*")) as {
        data: Database["public"]["Tables"]["menus"]["Row"][] | null;
        error: Error | null;
      };

      if (menus) {
        setMenus(
          menus.map((menu) => ({
            value: menu.name,
            label: menu.name,
          })),
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingGettingMenus(false);
    }
  }, [supabase]);

  useEffect(() => {
    getMenus();
  }, [getMenus]);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Recaps</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="default">New Recap</Button>
          </SheetTrigger>
          <SheetContent
            className="h-[92dvh] lg:h-full lg:max-w-[512px]"
            side={isTablet ? "right" : "bottom"}
          >
            <SheetHeader className="md:text-left">
              <SheetTitle>New Daily Recap</SheetTitle>
              <SheetDescription>Record today&#39;s order</SheetDescription>
            </SheetHeader>
            <form className="mb-4">
              <div className="overflow-y-scroll">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex justify-between items-center"
                  >
                    <div className="flex justify-between gap-2 p-1 flex-1">
                      <RecapInputs
                        isLoadingGettingMenus={isLoadingGettingMenus}
                        menus={menus}
                        field={field}
                        setFields={setFields}
                      />
                    </div>

                    {index !== 0 && (
                      <Button
                        variant="ghost"
                        onClick={handleRemoveField(field.id)}
                      >
                        <XIcon size={16} />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <div className="p-1">
                <Button
                  type="button"
                  onClick={handleAddNewRecapField}
                  className="border-dashed w-full"
                  size="sm"
                  variant={
                    isLoadingGettingMenus ||
                    fields[fields.length - 1].menu === "" ||
                    fields[fields.length - 1].qty === 0
                      ? "secondary"
                      : "outline"
                  }
                  disabled={
                    isLoadingGettingMenus ||
                    fields[fields.length - 1].menu === "" ||
                    fields[fields.length - 1].qty === 0
                  }
                >
                  Add a New Field
                </Button>
              </div>
            </form>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit" size="sm" className="w-full">
                  Submit
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      <div
        className="flex flex-shrink justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="hidden md:table-cell">2023-06-23</TableCell>
              <TableCell className="text-right">
                <Button variant="outline">Detail</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
