import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Send, CheckCircle2, MessageSquareQuote } from "lucide-react";
import { apiService } from "@/service/apiService";
import useAuthStore from "@/store/store";
export default function FeedBack() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuthStore();
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    subject: "",
    type: "feature",
    message: "",
    mail:" "
  });
console.log(formData);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    formData.mail = user?.email || "";
    try {
      // Fire both API endpoints concurrently
      await Promise.all([
        apiService.sendFeedBackResponse(formData.mail,formData as any),
        apiService.sendFeedBack(formData as any)
      ]);
       console.log("formdata>>>", formData)
      setIsSuccess(true);
      setFormData({ subject: "", type: "feature", message: "", mail:"" });
      
      // Reset success message after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error("Feedback submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formClasses =
    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <div className="flex-1 flex flex-col p-8 bg-zinc-50/50 dark:bg-background/95 min-h-[calc(100vh-2rem)] rounded-xl border m-2 shadow-sm">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Feedback</h1>
        <p className="text-muted-foreground">
          We'd love to hear your thoughts, bug reports, and feature requests to
          help us improve LinkTrace!
        </p>
      </div>

      <div className="flex justify-center flex-1">
        <Card className="w-full max-w-2xl border-none shadow-lg bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquareQuote className="w-5 h-5 text-primary" />
              Submit Feedback
            </CardTitle>
            <CardDescription>
              Fill out the form below to send us your feedback directly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center p-12 text-center rounded-lg bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-400">
                <CheckCircle2 className="w-12 h-12 mb-4 text-green-500" />
                <h3 className="text-xl font-semibold mb-2">
                  Feedback Submitted!
                </h3>
                <p className="text-sm opacity-90">
                  Thank you for helping us make LinkTrace better. We appreciate
                  your input.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="type">Feedback Type</Label>
                  <select
                    id="type"
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    className={formClasses}
                    required
                  >
                    <option value="feature">Feature Request</option>
                    <option value="bug">Report a Bug</option>
                    <option value="general">General Feedback</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="Brief summary of your feedback..."
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Detailed Message</Label>
                  <textarea
                    id="message"
                    placeholder="Please provide as much detail as possible..."
                    className={"min-h-[150px] resize-y " + formClasses}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm group"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Submitting..."
                  ) : (
                    <>
                      Send Feedback
                      <Send className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
