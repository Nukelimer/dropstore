"use client";

import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import toast from "react-hot-toast";

function RenameModal() {
  const { user } = useUser();
  const [input, setInput] = useState("");
  const [isRenameModalOpen, setIsRenameModalOpen, fileId, filename] =
    useAppStore(
      ({ filename, isRenameModalOpen, setIsRenameModalOpen, fileId }) => [
        isRenameModalOpen,
        setIsRenameModalOpen,
        fileId,
        filename,
      ]
    );

  async function renameFile() {
    if (!user || !fileId) {
      return;
    }
    const tooastId = toast.loading("Renaming in progress...");
    
    await updateDoc(doc(db, "users", user.id, "files", fileId), {
        filename: input,
    });

    setInput("");
    setIsRenameModalOpen(false);
    toast.success("Renaming completed!", {id:tooastId});
  }

  return (
    <Dialog
      open={isRenameModalOpen}
      onOpenChange={(isOpen) => {
        setIsRenameModalOpen(isOpen);
      }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Waiit! are sure that you want to rename this file?
          </DialogTitle>

          <Input
            id="link"
            defaultValue={filename}
            onChange={(e) => setInput(e.target.value)}
            onKeyDownCapture={(e) => {
              if (e.key === "Enter") {
                renameFile();
              }
            }}
          />
          {/* <DialogDescription>
            You will lose your file forever!!
          </DialogDescription> */}
        </DialogHeader>

        <div className="flex space-x-2 py-3">
          <Button
            size="sm"
            className="px-3 flex-1"
            variant={"ghost"}
            onClick={() => {
              setIsRenameModalOpen(false);
              toast.error("Renaming aborted.");
            }}>
            <span className="sr-only">Cancel</span>
            <span>Cancel</span>
          </Button>

          <Button
            size="sm"
            className="px-3 flex-1 bg-green-600 hover:bg-green-800"
            variant={"destructive"}
            onClick={() => {
              renameFile();
            }}>
            <span className="sr-only">Rename</span>
            <span>Rename</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default RenameModal;
