"use client";
import { Heading } from "@/components/heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { User } from "lucide-react";
import { columns } from "./column";

type UserDataProps = {
  user:
    | {
        id: string;
        email: string;
        name: string;
        createdAt: string;
        updatedAt: string;
        image?: string;
      }[]
    | null;
};

export const AdminDashboardClient = ({ user }: UserDataProps) => {
  return (
    <>
      <div className="flex w-full items-start justify-between">
        <div className="flex w-full flex-col pb-5 gap-4">
          <Heading
            title={`Dashboard`}
            description="Here you can manage your dashboard"
          />
          <div className="grid w-full gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <Card
              // key={index}
              className="bg-white border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-md font-medium text-card-foreground">
                  Total Users
                </CardTitle>
                <User className={`w-5 h-5 text-primary`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-card-foreground">
                  {user?.length || 0}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Separator />
      <DataTable columns={columns} data={user || []} />
    </>
  );
};
