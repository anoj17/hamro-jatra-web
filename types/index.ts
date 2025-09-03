import { Icons } from "@/components/icons";

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  image: string;
}

export interface NavItem {
  title: string;
  href: string;
  icon: keyof typeof Icons;
  children?: NavItem[];
  label?: string;
}
