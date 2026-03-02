import React, { useRef, useState } from "react";
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
import { Camera, Check, Key, Loader2, Mail, Settings, User, X } from "lucide-react";
import useAuthStore from "@/store/store";
import { apiService } from "@/service/apiService";

export default function UserProfile() {
  const { user, updateUser } = useAuthStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
    preferences: {
      email: user?.preferences?.email ?? true,
      notifications: user?.preferences?.notifications ?? false,
    },
  });

  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handlePreferenceChange = (key: "email" | "notifications") => {
    setFormData((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: !prev.preferences[key],
      },
    }));
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      bio: user?.bio || "",
      preferences: {
        email: user?.preferences?.email ?? true,
        notifications: user?.preferences?.notifications ?? false,
      },
    });
    setStatus(null);
  };

  const handleSave = async () => {
    setSaving(true);
    setStatus(null);

    const { error } = await apiService.updateUser(
      formData.name,
      formData.bio,
      formData.preferences
    );

    setSaving(false);

    if (error) {
      setStatus({ type: "error", message: error });
    } else {
      updateUser({
        name: formData.name,
        bio: formData.bio,
        preferences: formData.preferences,
      });
      setStatus({ type: "success", message: "Profile updated successfully!" });
      setTimeout(() => setStatus(null), 3000);
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setStatus(null);
console.log(file)
    const { data, error } = await apiService.uploadUserProfileImage(file);

    setUploadingImage(false);

    if (error) {
      setStatus({ type: "error", message: error });
    } else {
      // Update the store with the new image URL returned from the API
      const newImageUrl = data?.imageUrl || data?.image || data?.url || URL.createObjectURL(file);
      updateUser({ image: newImageUrl });
      setStatus({ type: "success", message: "Profile image updated!" });
      setTimeout(() => setStatus(null), 3000);
    }

    // Reset the file input so the same file can be re-selected
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

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
                  <AvatarImage src={user?.image} alt={user?.name || "User"} />
                  <AvatarFallback className="text-2xl">
                    {user?.name?.slice(0, 2).toUpperCase() || "UN"}
                  </AvatarFallback>
                </Avatar>
                {/* Hidden file input for image selection */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageSelect}
                />
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute bottom-0 right-1/2 translate-x-12 translate-y-2 rounded-full shadow-md"
                  onClick={handleCameraClick}
                  disabled={uploadingImage}
                >
                  {uploadingImage ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Camera className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <CardTitle className="text-xl">{user?.name}</CardTitle>
              <CardDescription>{user?.email}</CardDescription>
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
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    className="pl-9"
                    value={user?.email || ""}
                    readOnly
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Input
                  id="bio"
                  value={formData.bio}
                  onChange={handleChange}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              {status && (
                <div
                  className={`flex items-center gap-1.5 text-sm ${
                    status.type === "success" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {status.type === "success" ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <X className="h-4 w-4" />
                  )}
                  {status.message}
                </div>
              )}
              <div className="flex gap-2 ml-auto">
                <Button variant="outline" onClick={handleCancel} disabled={saving}>
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={saving}>
                  {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
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
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded text-primary focus:ring-primary"
                  checked={formData.preferences.email}
                  onChange={() => handlePreferenceChange("email")}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base font-medium">Marketing Emails</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive emails about new products, features, and more.
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded text-primary focus:ring-primary"
                  checked={formData.preferences.notifications}
                  onChange={() => handlePreferenceChange("notifications")}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
