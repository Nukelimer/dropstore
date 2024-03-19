"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { db, storage } from "@/firebase";
import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";

import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import toast from "react-hot-toast";

export function DeleteModal() {
  const { user } = useUser();
  const [isDeleteModalOpen, setIsDeleteModalOpen, fileId, setFilename] =
    useAppStore((state) => [
      state.isDeleteModalOpen,
      state.setIsDeleteModalOpen,
      state.fileId,
      state.setFileName,
    ]);

  const deleteFile = async () => {
    if (!user || !fileId) {
      return;
    }

    const fileRef = ref(storage, `users/${user.id}/files/${fileId}`);

    // NOTE IF THERE IS AN UNEXPECTED BEHAVIOUR ADD ANOTHER THEN LCK BEFORE THE .FINALLY.
    try {
      deleteObject(fileRef)
        .then(async () => {
          deleteDoc(doc(db, "users", user.id, "files", fileId)).finally(() => {
            setIsDeleteModalOpen(false);
          });
        })
        .then();
    } catch (error) {
      toast.error("deletin failed.");
      setIsDeleteModalOpen(false);
    }
  };
  return (
    <Dialog
      open={isDeleteModalOpen}
      onOpenChange={(isOpen) => {
        setIsDeleteModalOpen(isOpen);
      }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Waiit! are you sure you want to delete this file?
          </DialogTitle>
          <DialogDescription>
            You will lose your file forever!!
          </DialogDescription>
        </DialogHeader>

        <div className="flex space-x-2 py-3">
          <Button
            size="sm"
            className="px-3 flex-1"
            variant={"ghost"}
            onClick={() => {
              setIsDeleteModalOpen(false);
            }}>
            <span className="sr-only">Cancel</span>
            <span>Cancel</span>
          </Button>

          <Button
            size="sm"
            className="px-3 flex-1"
            variant={"destructive"}
            onClick={() => {
              deleteFile();
              toast.success("Deleted successfully!");
            }}>
            <span className="sr-only">Delete</span>
            <span>Delete</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
