"use client";

import { useState, MouseEvent, ChangeEvent, useCallback, useEffect } from "react";
import { XIcon, Check, ChevronsUpDown } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { DrawerPortal } from "@/components/DrawerPortal";

import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]

export default function Recaps() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [isLoadingGettingMenus, setIsLoadingGettingMenus] = useState(true)
  const [menus, setMenus] = useState<{ name: string }[] | null>(null)
  const [fields, setFields] = useState([{ id: Date.now(), menu: "", qty: 0 }]);
  const [isNewRecapDetailsDrawerOpen, setIsNewRecapDetailsDrawerOpen] =
    useState(false);
  const [isRecapDetailsDrawerOpen, setIsRecapDetailsDrawerOpen] =
    useState(false);

  const supabase = createClient()

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
    setFields([{ id: Date.now(), menu: "", qty: 0 }])
    setIsNewRecapDetailsDrawerOpen(false);
  };

  const handleAddNewRecapField = () => {
    if (fields[fields.length - 1].menu === "" || fields[fields.length - 1].qty === 0) {
      return
    }

    setFields((prev) => [...prev, { id: Date.now(), menu: "", qty: 0 }]);
  };

  const handleRemoveField = (fieldId: number) => (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    setFields((prev) => prev.filter((field) => field.id !== fieldId))
  }

  const handleFieldChange = (fieldId: number) => (e: ChangeEvent<HTMLInputElement> | string) => {
    let name: string, value: string

    if (typeof e === "string") {
      name = "menu"
      value = e
    } else {
      name = e.target.name
      value = e.target.value
    }

    setFields((prev) => prev.map((field) => {
      if (field.id === fieldId) {
        return { ...field, [name]: value }
      }

      return field
    }))

    setOpen(false)
  }

  const getMenus = useCallback(async () => {
    try {
      setIsLoadingGettingMenus(true)

      const { data: menus, error } = await supabase.from('menus').select('*')

      setMenus(menus)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoadingGettingMenus(false)
    }
  }, [supabase])

  useEffect(() => {
    getMenus()
  }, [getMenus])

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
                    <div key={field.id} className="flex justify-between items-center">
                      <div className="flex justify-between gap-2 p-1 flex-1">
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={open}
                              className="w-full justify-between"
                            >
                              {field.menu
                                ? frameworks.find((framework) => framework.value === field.menu)?.label
                                : "Select menu..."}
                              <ChevronsUpDown className="opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0">
                            <Command className="w-full">
                              <CommandInput placeholder="Search menu..." className="h-9" />
                              <CommandList>
                                <CommandEmpty>No framework found.</CommandEmpty>
                                <CommandGroup>
                                  {frameworks.map((framework) => (
                                    <CommandItem
                                      key={framework.value}
                                      value={framework.value}
                                      onSelect={handleFieldChange(field.id)}
                                    >
                                      {framework.label}
                                      <Check
                                        className={cn(
                                          "ml-auto",
                                          value === framework.value ? "opacity-100" : "opacity-0"
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>

                        {/* <Input type="text" name="menu" placeholder="e.g. Linkin' Pork" onChange={handleFieldChange(field.id)} /> */}
                        <Input type="number" name="qty" placeholder="e.g. 2" className="w-12 md:w-20" onChange={handleFieldChange(field.id)} />
                      </div>

                      {index !== 0 && (
                        <Button variant="ghost" onClick={handleRemoveField(field.id)}>
                          <XIcon size={16} />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="p-1">
                  <Button
                    onClick={handleAddNewRecapField}
                    className="border-dashed w-full"
                    size="sm"
                    variant='outline'
                    type="button"
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
