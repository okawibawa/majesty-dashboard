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

export default function Recaps() {
  const [isRecapDetailsDrawerOpen, setIsRecapDetailsDrawerOpen] = useState(false)

  const handleOpenRecapDetailsDrawer = () => {
    setIsRecapDetailsDrawerOpen(true)
  }

  const handleCloseRecapDetailsDrawer = () => {
    setIsRecapDetailsDrawerOpen(false)
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <DrawerPortal title="Recap Details" isOpen={isRecapDetailsDrawerOpen} onClose={handleCloseRecapDetailsDrawer}>
        <div>
          this is where the drawer content will go
        </div>
      </DrawerPortal>

      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Recaps</h1>
        <Button>New Recap</Button>
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
                <Button variant="outline" onClick={handleOpenRecapDetailsDrawer}>Detail</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="hidden md:table-cell">2023-06-24</TableCell>
              <TableCell className="text-right">
                <Button variant="outline" onClick={handleOpenRecapDetailsDrawer}>Detail</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="hidden md:table-cell">2023-06-25</TableCell>
              <TableCell className="text-right">
                <Button variant="outline" onClick={handleOpenRecapDetailsDrawer}>Detail</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
