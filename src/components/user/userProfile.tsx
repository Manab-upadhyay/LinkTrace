import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Camera, Key, LogOut, Mail, Settings, User } from "lucide-react";

export default function UserProfile() {
  return (
    <div className="container mx-auto max-w-4xl p-4 space-y-6 animate-in fade-in zoom-in duration-500">
      <h1 className="text-3xl font-bold tracking-tight">User Profile</h1>
      <p className="text-muted-foreground">
        Manage your account settings and preferences.
      </p>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4 relative">
                <Avatar className="w-24 h-24 border-4 border-background shadow-lg">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback className="text-2xl">UN</AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute bottom-0 right-1/2 translate-x-12 translate-y-2 rounded-full shadow-md"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              <CardTitle className="text-xl">John Doe</CardTitle>
              <CardDescription>john.doe@example.com</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <User className="mr-2 h-4 w-4" />
                  Personal Info
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Preferences
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Key className="mr-2 h-4 w-4" />
                  Security
                </Button>
              </div>
            </CardContent>
            <Separator className="mb-4" />
            <CardFooter>
              <Button variant="destructive" className="w-full">
                <LogOut className="mr-2 h-4 w-4" />
                Log Out
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your personal details here. Click save when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" defaultValue="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input id="email" className="pl-9" defaultValue="john.doe@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Input id="bio" defaultValue="Software Engineer & open-source enthusiast." />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>
                Manage your notification and display settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base font-medium">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive emails about your account activity.
                  </p>
                </div>
                {/* Switch placeholder, assuming it doesn't exist yet but replacing with a simple checkbox for now */}
                <input type="checkbox" className="w-4 h-4 rounded text-primary focus:ring-primary" defaultChecked />
              </div>
              <Separator />
               <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base font-medium">Marketing Emails</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive emails about new products, features, and more.
                  </p>
                </div>
                <input type="checkbox" className="w-4 h-4 rounded text-primary focus:ring-primary" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
