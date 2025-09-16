"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  MapPin,
  Calendar,
  Users,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    title: "Total Destinations",
    value: "24",
    change: "+12%",
    icon: MapPin,
    color: "text-primary",
  },
  {
    title: "Active Tours",
    value: "18",
    change: "+8%",
    icon: Calendar,
    color: "text-secondary",
  },
  {
    title: "Total Customers",
    value: "1,247",
    change: "+23%",
    icon: Users,
    color: "text-accent",
  },
  {
    title: "Monthly Revenue",
    value: "₹2,45,000",
    change: "+15%",
    icon: TrendingUp,
    color: "text-primary",
  },
];

const recentDestinations = [
  {
    id: 1,
    name: "Everest Base Camp",
    location: "Solukhumbu, Nepal",
    status: "Active",
    tours: 5,
    image: "/everest-mountain.png",
  },
  {
    id: 2,
    name: "Annapurna Circuit",
    location: "Gandaki, Nepal",
    status: "Active",
    tours: 3,
    image: "/annapurna-mountain.png",
  },
  {
    id: 3,
    name: "Chitwan National Park",
    location: "Chitwan, Nepal",
    status: "Draft",
    tours: 2,
    image: "/chitwan-jungle.png",
  },
  {
    id: 4,
    name: "Pokhara Valley",
    location: "Gandaki, Nepal",
    status: "Active",
    tours: 7,
    image: "/pokhara-lake.png",
  },
];

export function AdminContent() {
  return (
    <main className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage your Hamro Jatra content and analytics
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground transition-colors duration-200">
          <Plus className="w-4 h-4 mr-2" />
          Add New Content
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="bg-card border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-card-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-card-foreground">
                  {stat.value}
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-primary font-medium">
                    {stat.change}
                  </span>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Destinations */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-card-foreground">
                Recent Destinations
              </CardTitle>
              <CardDescription>
                Manage your travel destinations and tours
              </CardDescription>
            </div>
            <Button
              variant="outline"
              className="border-border hover:bg-accent hover:text-accent-foreground transition-colors duration-200 bg-transparent"
            >
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="text-muted-foreground">
                  Destination
                </TableHead>
                <TableHead className="text-muted-foreground">
                  Location
                </TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground">Tours</TableHead>
                <TableHead className="text-muted-foreground text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentDestinations.map((destination) => (
                <TableRow
                  key={destination.id}
                  className="border-border hover:bg-muted/50 transition-colors duration-200"
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      <img
                        src={destination.image || "/placeholder.svg"}
                        alt={destination.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <span className="text-foreground">
                        {destination.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {destination.location}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        destination.status === "Active"
                          ? "default"
                          : "secondary"
                      }
                      className={
                        destination.status === "Active"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }
                    >
                      {destination.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {destination.tours} tours
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-destructive hover:text-destructive-foreground transition-colors duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
