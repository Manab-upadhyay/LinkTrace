import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { apiService } from "@/service/apiService";
import { useNavigate } from "react-router-dom";

export default function SetNewPassword (){
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const handleSetNewPassword = async () => {
        if (newPassword !== confirmNewPassword) {
            setError("Passwords do not match");
            return;
        }
        setLoading(true);
        setError("");
        setSuccess("");
        const { error } = await apiService.updateUserPassword(newPassword, email);
        setLoading(false);
       
        if (error) {
            setError(error);
        } else {
            setSuccess("Password updated successfully");
            alert("Password updated successfully");
            navigate("/login")
        }
    }
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    {error && <p className="text-red-500">{error}</p>}
                    {success && <p className="text-green-500">{success}</p>}
                    <h1 className="text-3xl font-bold">Set New Password</h1>
                    <p className="text-muted-foreground">Enter your new password below.</p>
                </div>
                <div className="space-y-4">
                     <Input type="email" placeholder="Enter Registered Email" onChange={(e)=> setEmail(e.target.value)}/>
                    <Input type="password" placeholder="New Password" onChange={(e)=> setNewPassword(e.target.value)}/>
                    <Input type="password" placeholder="Confirm New Password" onChange={(e)=> setConfirmNewPassword(e.target.value)}/>
                    <Button className="w-full" onClick={handleSetNewPassword}> {loading ? "Setting New Password..." : "Set New Password"}</Button>
                </div>
            </div>
        </div>
    )
}