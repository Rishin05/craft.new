import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Button } from "../ui/button";
import { MessageCircleCode } from "lucide-react";
import WorkspaceHistory from "./WorkspaceHistory";
import FooterSidebar from "./FooterSidebar";


function AppSideBar() {
  return (
    <div>
      <Sidebar className="w-64 min-h-screen">
        <SidebarHeader className="p-5">
            <Image src={'/logo.png'} alt='logo' width={30} height={30}/>
            <Button className="mt-5"><MessageCircleCode/>Start A New Chat</Button>
            </SidebarHeader>
        <SidebarContent className="p-5">
          <SidebarGroup />
          <h2 className='font-medium text-lg'>Your Chats</h2>
          <WorkspaceHistory/>
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter>
            <FooterSidebar/>
            </SidebarFooter>
      </Sidebar>
    </div>
  );
}

export default AppSideBar;
