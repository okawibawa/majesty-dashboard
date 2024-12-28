"use client";

import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import { DrawerPortal } from "@/components/DrawerPortal";
import { Input } from "@/components/ui/input";

export default function Recaps() {
  const [fields, setFields] = useState([{ id: Date.now() }]);
  const [isNewRecapDetailsDrawerOpen, setIsNewRecapDetailsDrawerOpen] =
    useState(false);
  const [isRecapDetailsDrawerOpen, setIsRecapDetailsDrawerOpen] =
    useState(false);

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
    setIsNewRecapDetailsDrawerOpen(false);
  };

  const handleAddNewRecapField = () => {
    setFields((prev) => [...prev, { id: Date.now() }]);
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <DrawerPortal
        title="New Recap"
        isOpen={isNewRecapDetailsDrawerOpen}
        onClose={handleCloseNewRecapDetailsDrawer}
      >
        <div className="flex flex-col">
          <p className="mb-4 text-zinc-500">Record today&#39;s order</p>

          <Button
            onClick={handleAddNewRecapField}
            className="mb-2 self-end"
            size="sm"
          >
            Add a New Field
          </Button>

          <form className="flex flex-col justify-between  bg-zinc-500">
            <div className="space-y-2 mb-4 overflow-y-scroll">
              {fields.map((field) => (
                <div key={field.id} className="flex justify-between gap-2">
                  <Input type="text" placeholder="e.g. Linkin' Pork" />
                  <Input type="number" placeholder="e.g. 2" className="w-24" />
                </div>
              ))}
            </div>

            <Button type="submit" size="sm" className="self-end">
              Submit
            </Button>
          </form>
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
            <TableRow>
              <TableCell className="hidden md:table-cell">2023-06-24</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="outline"
                  onClick={handleOpenRecapDetailsDrawer}
                >
                  Detail
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="hidden md:table-cell">2023-06-25</TableCell>
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
