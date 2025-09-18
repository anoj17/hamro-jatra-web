"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  Check,
  ChevronsUpDown,
  Loader,
  Loader2,
} from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CustomMultiFileUploaderInputField } from "../fileuploader/multi-file-upload";
import JoditEditorComponent from "../jodit-editor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categoryItem, districts } from "@/constant/data";
import { formSchema, FormValues } from "@/lib/form-schema";
import "../../style/nepali-date-picker.css";
import NepaliDate from "nepali-date-converter";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import { useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { cn } from "@/lib/utils";
import { toast } from "react-toastify";
import { JatraProps } from "@/types";
import { Heading } from "../heading";

interface UpcommingJatrasFormProps {
  data: JatraProps | null;
}

export default function UpcommingJatrasForm({
  data,
}: UpcommingJatrasFormProps) {
  const [districtOpen, setDistrictOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = data ? "Edit Jatra" : "Create Jatra";
  const description = data
    ? "Here you can edit  Jatra"
    : "Here you can add  Jatra";

  const action = data ? "Save changes" : "Create Jatra";

  const defaultValues = data
    ? {
        title: data.title,
        description: data.description,
        englishDate: new Date(data.englishDate),
        location: data.location,
        category: data.category,
        image: data.image,
        latitude: data.latitude,
        altitude: data.altitude,
        district: data.district,
        nepaliDate: data.nepaliDate,
        month: data.month,
        shortTitle: data.shortTitle ?? undefined, // map null → undefined
      }
    : {
        title: "",
        description: "",
        englishDate: undefined,
        location: "",
        category: "",
        image: [],
        latitude: 0,
        altitude: 0,
        district: "",
        nepaliDate: "",
        month: "",
        shortTitle: "",
      };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const englishDate = form.watch("englishDate");
  const nepaliDate = form.watch("nepaliDate");

  // Sync English to Nepali Date
  useEffect(() => {
    const bsDate = englishDate
      ? new NepaliDate(new Date(englishDate))
      : new NepaliDate(new Date());
    form.setValue("nepaliDate", bsDate.format("YYYY-MM-DD"));
  }, [englishDate]);

  // Sync Nepali to English Date
  useEffect(() => {
    if (nepaliDate) {
      const adDate = new NepaliDate(nepaliDate).toJsDate();
      form.setValue("englishDate", adDate);
    }
  }, [nepaliDate]);

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    setLoading(true);
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("englishDate", values.englishDate.toString());
    formData.append("location", values.location);
    formData.append("category", values.category);
    formData.append("latitude", values.latitude.toString());
    formData.append("altitude", values.altitude.toString());
    formData.append("district", values.district);
    formData.append("nepaliDate", values.nepaliDate);
    formData.append("month", values.month);
    values.shortTitle && formData.append("shortTitle", values.shortTitle);
    data?.id && formData.append("id", data.id);

    for (const image of values.image) {
      formData.append("image", image);
    }

    let response;

    try {
      response = await fetch("/api/jatras", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setLoading(false);
        toast.success("Jatra created successfully!");
      } else {
        setLoading(false);
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto p-6 bg-white shadow rounded-2xl">
      <Heading title={title} description={description} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Jatra Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Jatra Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* English Date */}
            <FormField
              control={form.control}
              name="englishDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel required>English Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={`pl-3 text-left font-normal ${
                            !field.value && "text-muted-foreground"
                          }`}
                        >
                          {field.value
                            ? format(field.value, "PPP")
                            : "Pick a date"}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Nepali Date */}
            <FormField
              control={form.control}
              name="nepaliDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Nepali Date</FormLabel>
                  <FormControl>
                    <div className="relative w-full">
                      <NepaliDatePicker
                        inputClassName="cursor-pointer flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        value={field.value}
                        onChange={field.onChange}
                        options={{ calenderLocale: "en", valueLocale: "en" }}
                      />
                      <CalendarIcon className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 opacity-50" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Latitude */}
            <FormField
              control={form.control}
              name="latitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Latitude</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="203.65"
                      type="number"
                      step="any"
                      {...field}
                      onFocus={(e) => {
                        if (e.target.value === "0") {
                          field.onChange(""); // Clear the value if it is 0
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Altitude */}
            <FormField
              control={form.control}
              name="altitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Altitude</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="203.65"
                      type="number"
                      step="any"
                      {...field}
                      onFocus={(e) => {
                        if (e.target.value === "0") {
                          field.onChange(""); // Clear the value if it is 0
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Month */}
            <FormField
              control={form.control}
              name="month"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Month</FormLabel>
                  <FormControl>
                    <Input placeholder="January" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* District */}
            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start space-y-2">
                  <FormLabel required>District</FormLabel>
                  <Popover open={districtOpen} onOpenChange={setDistrictOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between"
                      >
                        {field.value || "Select district"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="min-w-[350px] lg:min-w-[290px] p-0 h-[300px] overflow-y-auto">
                      <Command>
                        <CommandInput placeholder="Search district..." />
                        <CommandList>
                          <CommandEmpty>No district found.</CommandEmpty>
                          <CommandGroup>
                            {districts.map((district) => (
                              <CommandItem
                                key={district.id}
                                value={district.name}
                                onSelect={(value) => {
                                  field.onChange(value);
                                  setDistrictOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    field.value === district.name
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {district.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Location */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>Category</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        {categoryItem.map((item) => (
                          <SelectItem key={item.key} value={item.key}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Short Title */}
          <FormField
            control={form.control}
            name="shortTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short Title</FormLabel>
                <FormControl>
                  <Textarea placeholder="Short title about jatra" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Description</FormLabel>
                <FormControl>
                  <JoditEditorComponent
                    value={field.value || ""}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Images */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Image</FormLabel>
                <FormControl>
                  <CustomMultiFileUploaderInputField
                    value={field.value}
                    onFilesChange={field.onChange}
                    imageToPreview={data?.image}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-10">
            {loading ? (
              <Button
                disabled={loading}
                className="opacity-50 w-full cursor-pointer"
                type="submit"
              >
                <Loader className="mr-2 h-4 w-4 animate-spin inline-block" />
                ...loading
              </Button>
            ) : (
              <Button
                disabled={loading}
                className="w-full cursor-pointer"
                type="submit"
              >
                {action}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
