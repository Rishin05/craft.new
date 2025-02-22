import Image from "next/image";
import React, { useContext, useState } from "react";
import { Button } from "../ui/button";
import Colors from "@/data/Colors";
import { UserDetailContext } from "@/context/UserDetailContext";
import Link from "next/link";
import { useSidebar } from "../ui/sidebar";
import { ActionContext } from "@/context/ActionContext";
import SignInDialog from "./SignInDialog";
import { usePathname } from "next/navigation"; // Import usePathname
import { Download, Rocket } from "lucide-react";

function Header() {
  const { userDetail } = useContext(UserDetailContext);
  const { toggleSidebar } = useSidebar();
  const { action, setAction } = useContext(ActionContext);
  const [openDialog, setOpenDialog] = useState(false);
  const pathname = usePathname(); // Get the current route

  const onActionBtn = (action) => {
    setAction({
      actionType: action,
      timeStamp: Date.now(),
    });
  };

  // Check if the current route is /workspace/
  const isWorkspaceRoute = pathname.startsWith("/workspace/");

  return (
    <div className="p-4 flex justify-between items-center">
      <Link href={'/'}>
        <Image src={"/logo.png"} alt="logo" width={40} height={40} />
      </Link>
      
      {!userDetail?.name ? (
        <div className="flex gap-5">
          <Button variant="ghost" onClick={() => setOpenDialog(true)}>Sign In</Button>
          <Button
            className="text-white"
            style={{
              backgroundColor: Colors.BLUE,
            }}
          >
            Get Started
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          {/* Show Export and Deploy buttons only on /workspace/ route */}
          {isWorkspaceRoute && (
            <>
              <Button variant="outline" onClick={() => onActionBtn('export')}><Download/>Export</Button>
              <Button
                className="text-white"
                style={{
                  backgroundColor: Colors.BLUE,
                }}
                onClick={() => onActionBtn('deploy')}
              >
                <Rocket/>
                Deploy
              </Button>
            </>
          )}
          {/* Always show the user image */}
          <Image
            src={userDetail.picture}
            alt="user"
            width={35}
            height={35}
            className="rounded-full cursor-pointer"
            onClick={toggleSidebar}
          />
        </div>
      )}
      <SignInDialog openDialog={openDialog} closeDialog={(v) => setOpenDialog(v)} />
    </div>
  );
}

export default Header;