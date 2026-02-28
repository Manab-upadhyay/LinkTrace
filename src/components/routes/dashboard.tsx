import StatsCard from "../dashboard/dashBoardKpi-Card";
import { DashboardChart } from "../dashboard/LinkStatchart";
import LinkTable from "../dashboard/links/link";
import { AddLinkDialog } from "../dashboard/links/adddialog";

import { apiService } from "@/service/apiService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ConfirmDialog } from "../layout/DialogBox";
import { useState } from "react";
import useAuthStore from "@/store/store";

export default function Dashboard() {
  const {user} = useAuthStore()
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [linkToDelete, setLinkToDelete] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => apiService.getDashboard().then((res) => res.data),
  });

  const addLinkMutation = useMutation({
    mutationFn: (formdata: { name: string; url: string }) =>
      apiService.addUrl(formdata.name, formdata.url),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },

    onError: () => {
      alert("Error adding link");
    },
  });
  const deleteLinkMutation = useMutation({
    mutationFn: (id: string) => apiService.deleteLink(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
    onError: () => {
      alert("Error deleting link");
    },
  });

  function showDeleteDialogBox(id: string) {
    setShowDeleteAlert(true);
    setLinkToDelete(id);
  }
  function handleDeleteLink() {
    if (linkToDelete) {
      deleteLinkMutation.mutate(linkToDelete);
      setShowDeleteAlert(false);
      setLinkToDelete(null);
    }
  }
  function handleAddLink(formData: { name: string; url: string }) {
    addLinkMutation.mutate(formData);
  }

  console.log("Dashboard Data:", data);
  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }
  return (
    <div className="p-6 space-y-8 flex flex-col">
      <div className="mb-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Welcome back, {user?.name || "User"}! 👋
        </h1>
        <p className="text-muted-foreground mt-1">
          Here's what's happening with your links today.
        </p>
      </div>
      <StatsCard
        userAnalytics={data?.userAnalytics}
        perHourClicks={data?.perHourClicks}
        apiRequest={data?.apiRequests}
        lastWeekClicks={data?.weeklyTrend}
      />

      <div className="bg-card border rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Clicks (Last 24 Hours)</h2>
        <DashboardChart data={data?.perHourClicks} />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Links</h2>
          <AddLinkDialog handleSubmit={handleAddLink} />
        </div>

        <LinkTable
          data={data?.userLinks}
          handleDeleteLink={showDeleteDialogBox}
        />
        <ConfirmDialog
          open={showDeleteAlert}
          onClose={() => setShowDeleteAlert(false)}
          onConfirm={handleDeleteLink}
          title="Confirm Deletion"
          description="Are you sure you want to delete this link? This action cannot be undone."
        />
      </div>
    </div>
  );
}
