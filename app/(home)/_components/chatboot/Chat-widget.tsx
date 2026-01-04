"use client";

import { useState } from "react";

import { ChatButton } from "./chat-button";
import { ChatDialog } from "./chat-dialog";

export function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {!open && <ChatButton onClick={() => setOpen(true)} />}

      <ChatDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
