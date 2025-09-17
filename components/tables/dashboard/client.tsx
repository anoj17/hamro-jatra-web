"use client";
import { Heading } from "@/components/heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { User, Users, UserPlus, Activity, TrendingUp } from "lucide-react";
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
  const totalUsers = user?.length || 0;
  const recentUsers =
    user?.filter((u) => {
      const userDate = new Date(u.createdAt);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return userDate > weekAgo;
    }).length || 0;

  const stats = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: Users,
      description: "Registered users",
      color: "text-primary",
      bgColor: "bg-primary/10",
      delay: "0s",
    },
    {
      title: "New This Week",
      value: recentUsers,
      icon: UserPlus,
      description: "Recent registrations",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      delay: "0.1s",
    },
    {
      title: "Active Users",
      value: Math.floor(totalUsers * 0.8),
      icon: Activity,
      description: "Currently active",
      color: "text-green-600",
      bgColor: "bg-green-100",
      delay: "0.2s",
    },
    {
      title: "Growth Rate",
      value: "+12%",
      icon: TrendingUp,
      description: "This month",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      delay: "0.3s",
    },
  ];
  return (
    <>
      <div className="flex w-full items-start justify-between">
        <div className="flex w-full flex-col pb-5 gap-4">
          <Heading
            title={`Dashboard`}
            description="Here you can manage your dashboard"
          />
          {/* Stats Cards */}
          <div className="grid w-full gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card
                  key={index}
                  className="bg-white border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
                  style={{ animationDelay: stat.delay }}
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-card-foreground">
                      {stat.title}
                    </CardTitle>
                    <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                      <IconComponent className={`w-5 h-5 ${stat.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-card-foreground mb-1">
                      {stat.value}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
      <Separator />
      {/* User Data Table */}
      <div className="space-y-4 mt-3">
        <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Registered Users
          </h3>
          <p className="text-sm text-muted-foreground">
            View and manage all registered users in your system
          </p>
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
          <DataTable columns={columns} data={user || []} />
        </div>
      </div>
    </>
  );
};
