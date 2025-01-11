import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

interface RecapPopover {
  isLoadingGettingMenus: boolean;
  menus: { value: string; label: string }[] | undefined;
  field: { id: number; menu: string; qty: number };
  setFields: Dispatch<
    SetStateAction<{ id: number; menu: string; qty: number }[]>
  >;
}

export const RecapInputs = ({
  isLoadingGettingMenus,
  menus,
  field,
  setFields,
}: RecapPopover) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [value, setValue] = useState("");

  const handleFieldChange =
    (fieldId: number) => (e: ChangeEvent<HTMLInputElement> | string) => {
      let name: string, value: string;

      if (typeof e === "string") {
        name = "menu";
        value = e;
      } else {
        name = e.target.name;
        value = e.target.value;
      }

      setFields((prev: { id: number; menu: string; qty: number }[]) =>
        prev.map((field: RecapPopover["field"]) => {
          if (field.id === fieldId) {
            return { ...field, [name]: value };
          }

          return field;
        }),
      );

      setIsPopoverOpen(false);
    };

  return (
    <>
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger disabled={isLoadingGettingMenus} asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={isPopoverOpen}
            className="w-full justify-between"
          >
            {field.menu
              ? menus?.find((menu) => menu.value === field.menu)?.label
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
                {menus?.map((menu) => (
                  <CommandItem
                    key={menu.value}
                    value={menu.value}
                    onSelect={handleFieldChange(field.id)}
                  >
                    {menu.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === menu.value ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Input
        type="number"
        name="qty"
        placeholder="e.g. 2"
        className="w-12 md:w-20"
        onChange={handleFieldChange(field.id)}
      />
    </>
  );
};
