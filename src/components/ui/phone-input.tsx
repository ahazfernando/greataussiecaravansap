import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Input, InputProps } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

type PhoneInputProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value"
> &
    Omit<RPNInput.Props<typeof RPNInput.default>, "onChange"> & {
        onChange?: (value: RPNInput.Value) => void;
    };

const PhoneInput = React.forwardRef<
    React.ElementRef<typeof RPNInput.default>,
    PhoneInputProps
>(({ className, onChange, ...props }, ref) => {
    return (
        <RPNInput.default
            ref={ref}
            className={cn("flex", className)}
            flagComponent={FlagComponent}
            countrySelectComponent={CountrySelect}
            inputComponent={InputComponent}
            /**
             * Handles the onChange event.
             *
             * react-phone-number-input might trigger the onChange event as undefined
             * if a valid phone number is not generated.
             *
             * @param value
             */
            onChange={(value) => onChange?.(value || ("" as RPNInput.Value))}
            {...props}
        />
    );
});
PhoneInput.displayName = "PhoneInput";

const InputComponent = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, ...props }, ref) => (
        <Input
            className={cn("rounded-e-lg rounded-s-none bg-gray-900 border-gray-800 text-white", className)}
            {...props}
            ref={ref}
        />
    )
);
InputComponent.displayName = "InputComponent";

type CountrySelectOption = { label: string; value: RPNInput.Country };

type CountrySelectProps = {
    disabled?: boolean;
    value: RPNInput.Country;
    onChange: (value: RPNInput.Country) => void;
    options: CountrySelectOption[];
};

const CountrySelect = ({
    disabled,
    value,
    onChange,
    options,
}: CountrySelectProps) => {
    const handleSelect = React.useCallback(
        (country: RPNInput.Country) => {
            onChange(country);
        },
        [onChange]
    );

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    className={cn(
                        "flex gap-1 rounded-e-none rounded-s-lg px-3 border-r-0 focus:z-10 bg-gray-900 border-gray-800 text-white hover:bg-gray-800 hover:text-white",
                        disabled ? "hidden" : ""
                    )}
                    disabled={disabled}
                >
                    <FlagComponent country={value} countryName={value} />
                    <ChevronsUpDown
                        className={cn(
                            "-mr-2 h-4 w-4 opacity-50",
                            disabled ? "hidden" : "opacity-100"
                        )}
                    />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0 bg-gray-900 border-gray-800 text-white">
                <Command className="bg-gray-900 text-white">
                    <CommandInput placeholder="Search country..." className="text-white placeholder:text-gray-400" />
                    <CommandList className="text-white">
                        <ScrollArea className="h-72">
                            <CommandEmpty>No country found.</CommandEmpty>
                            <CommandGroup>
                                {options.filter((x) => x.value).map((option) => (
                                    <CommandItem
                                        className="gap-2 text-white data-[selected='true']:bg-gray-800 data-[selected=true]:text-white hover:bg-gray-800"
                                        key={option.value}
                                        onSelect={() => handleSelect(option.value)}
                                    >
                                        <FlagComponent
                                            country={option.value}
                                            countryName={option.label}
                                        />
                                        <span className="flex-1 text-sm">{option.label}</span>
                                        {option.value && (
                                            <span className="text-gray-400 text-sm">
                                                +{RPNInput.getCountryCallingCode(option.value)}
                                            </span>
                                        )}
                                        <Check
                                            className={cn(
                                                "ml-auto h-4 w-4",
                                                option.value === value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </ScrollArea>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
    const Flag = flags[country];

    return (
        <span className="bg-foreground/20 flex h-4 w-6 overflow-hidden rounded-sm">
            {Flag && <Flag title={countryName} />}
        </span>
    );
};

export { PhoneInput };
