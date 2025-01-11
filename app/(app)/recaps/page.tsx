"use client";

import {
  useState,
  MouseEvent,
  ChangeEvent,
  useCallback,
  useEffect,
} from "react";
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

import { RecapInputs } from "@/components/RecapInputs";
import { DrawerPortal } from "@/components/DrawerPortal";

import { createClient } from "@/utils/supabase/client";
import { Database } from "@/types/supabase";

export default function Recaps() {
  const [isLoadingGettingMenus, setIsLoadingGettingMenus] = useState(true);
  const [menus, setMenus] = useState<
    { value: string; label: string }[] | undefined
  >(undefined);
  const [fields, setFields] = useState<
    { id: number; menu: string; qty: number }[]
  >([{ id: Date.now(), menu: "", qty: 0 }]);
  const [isNewRecapDetailsDrawerOpen, setIsNewRecapDetailsDrawerOpen] =
    useState(false);
  const [isRecapDetailsDrawerOpen, setIsRecapDetailsDrawerOpen] =
    useState(false);

  const supabase = createClient();

  const handleOpenRecapDetailsDrawer = () => {
    setIsRecapDetailsDrawerOpen(true);
  };

  const handleCloseRecapDetailsDrawer = () => {
    setIsRecapDetailsDrawerOpen(false);
  };

  const handleOpenNewRecapDetailsDrawer = () => {
    setIsNewRecapDetailsDrawerOpen(true);
  };

  const handleCloseNewRecapDetailsDrawer = () => {
    setFields([{ id: Date.now(), menu: "", qty: 0 }]);
    setIsNewRecapDetailsDrawerOpen(false);
  };

  const handleAddNewRecapField = () => {
    // if (
    //   fields[fields.length - 1].menu === "" ||
    //   fields[fields.length - 1].qty === 0
    // ) {
    //   return;
    // }

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

  console.log(fields);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <DrawerPortal
        title="New Recap"
        isOpen={isNewRecapDetailsDrawerOpen}
        onClose={handleCloseNewRecapDetailsDrawer}
      >
        <div className="flex flex-col h-[calc(100%-60px)]">
          <p className="mb-4 text-zinc-500">Record today&#39;s order</p>

          <div className="flex flex-col flex-1 min-h-0">
            <div className="flex-1 overflow-y-scroll">
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
            </div>

            <div className="pt-4 border-t">
              <Button type="submit" size="sm" className="w-full">
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DrawerPortal>

      <DrawerPortal
        title="Recap Details"
        isOpen={isRecapDetailsDrawerOpen}
        onClose={handleCloseRecapDetailsDrawer}
      >
        <div>this is where the drawer content will go</div>
      </DrawerPortal>

      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Recaps</h1>
        <Button onClick={handleOpenNewRecapDetailsDrawer}>New Recap</Button>
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
                <Button
                  variant="outline"
                  onClick={handleOpenRecapDetailsDrawer}
                >
                  Detail
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
