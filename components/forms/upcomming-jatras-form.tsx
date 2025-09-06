"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

// ✅ Validation Schema
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  date: z.date("Date is required"),
  location: z.string().min(1, "Location is required"),
  image: z
    .any()
    .refine(
      (value) =>
        value instanceof File ||
        value === undefined ||
        value === null ||
        value === "string",
      { message: "Screenshot is required and must be a valid file" }
    ),
});

type FormValues = z.infer<typeof formSchema>;

export default function UpcommingJatrasForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      date: undefined,
      location: "",
      image: [],
    },
  });

  // const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  //   "pashupati temple"
  // )}&output=embed`;

  function onSubmit(values: FormValues) {
    console.log(values);
    // 👉 Here send values to backend API using fetch or axios
    // fetch("/api/events", { method: "POST", body: JSON.stringify(values) })
  }

  return (
    <div className="w-full mx-auto p-6 bg-white shadow rounded-2xl">
      <h2 className="text-xl font-semibold mb-4">Create Event</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter event title" {...field} />
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

          {/* Date */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel required>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={`pl-3 text-left font-normal ${
                          !field.value && "text-muted-foreground"
                        }`}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
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

          {/* Location */}
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Location</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter location (e.g. Kathmandu)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel required> Screenshot </FormLabel>
                <FormControl>
                  <CustomMultiFileUploaderInputField
                    onFilesChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Save Event
          </Button>
        </form>
      </Form>
      {/* <div className="w-full h-64 rounded-lg overflow-hidden shadow">
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div> */}
    </div>
  );
}
