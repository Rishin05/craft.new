import ChatView from "@/components/custom/Chat";
import CodeView from "@/components/custom/CodeView";
import React from "react";

function page() {
  return (
    <div className="p-3 pr-5 mt-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
        <ChatView/>
        <div className="col-span-2">
          <CodeView />
        </div>
      </div>
    </div>
  );
}

export default page;
