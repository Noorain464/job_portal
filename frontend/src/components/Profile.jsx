import React from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";
import ApplicationTable from "./ApplicationTable";
import { Pen } from "lucide-react";
import { Mail } from "lucide-react";
import { Contact } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "@radix-ui/react-label";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";

const isPresent = true;

function Profile() {
    const [open, setOpen] = React.useState(false);
    const {user}= useSelector(store=>store.auth);
    return (
        <div>
            <Navbar />
            <div className="max-w-4xl mx-auto bg-white border-gray-200 rounded-2xl my-5 p-8">
                <div className="flex justify-between">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src="" />
                        </Avatar>
                        <div>
                            <h1 className="font-medium text-xl">{user?.fullname}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                        <Button onClick={() => setOpen(true)} className="text-right">
                            <Pen />
                        </Button>
                    </div>
                </div>
                <div className="my-5">
                    <div className="flex items-center gap-3 my-2">
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-3 my-2">
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className="my-5">
                    <h1>Skills</h1>
                    <div className="flex items-center gap-1">

                        {
                            user?.profile?.skills.length === 0 ? <span>No Skills Found</span> : (

                                user?.profile?.skills.map((item, index) => (
                                    <Badge key={index} className="bg-black text-white hover:bg-black text-white">{item}</Badge>
                                ))
                            )
                        }
                    </div>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label className="text-medium font-bold">Resume</Label>
                    {
                        isPresent ? (
                            <a target="blank" href={user?.profile?.resume} className="text-blue-500 w-full hover:underline">{user?.profile?.resumeOriginalName}</a>
                        ) : <span>No Resume</span>
                    }
                </div>
            </div>
            <div className="max-w-4xl mx-auto bg-white rounded-2xl">
                <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
                <ApplicationTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    );
}

export default Profile;
