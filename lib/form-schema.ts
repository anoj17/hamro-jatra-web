import * as z from "zod";
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

export const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  englishDate: z.date("Date is required"),
  location: z.string().min(1, "Location is required"),
  category: z.string().min(1, "Category is required"),
  image: z
    .array(z.instanceof(File)) // ensure each item is a File
    .nonempty({ message: "At least one image is required" }),
  latitude: z.coerce
    .number()
    .min(1, { message: "Latitude must be a positive number !" }),

  altitude: z.coerce
    .number()
    .min(1, { message: "Altitude must be a positive number !" }),
  district: z.string().min(1, "District is required"),
  nepaliDate: z.string().min(1, "Nepali Date is required"),
  month: z.string().min(1, "Month is required"),
  shortTitle: z.string().optional(),
});

export type FormValues = z.infer<typeof formSchema>;
