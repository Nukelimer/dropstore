"use client";

import { db, storage } from "@/firebase";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import toast from "react-hot-toast";

function DragandDrop() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useUser();

  const onDropFile = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted!");
      reader.onerror = () => console.log("file reading has failed!");
      reader.onload = async () => {
        await uploadPost(file);
      };
      reader.readAsArrayBuffer(file);
    });

    const uploadPost = async (selectedFile: File) => {
      if (isLoading) {
        return;
      }
      if (!user) {
        return;
      }

      const toastId = toast.loading('Uploading...')

      setIsLoading(true);

      const docRef = await addDoc(collection(db, "users", user.id, "files"), {
        userId: user.id,
        filename: selectedFile.name,
        fullName: user.fullName,
        profileImage: user.imageUrl,
        timestamp:  serverTimestamp(),
        type: selectedFile.type,
        size: selectedFile.size,
      });

      const imageRef = ref(storage, `users/${user.id}/files/${docRef.id}`);
      uploadBytes(imageRef, selectedFile).then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, 'users', user.id, 'files', docRef.id), {
          downloadURL
        })
      });
toast.success('Upload completed.',{id:toastId})
      setIsLoading(false)
    };
  };

  const fileSize = 41004542;

  return (
    <Dropzone minSize={0} maxSize={fileSize} maxFiles={7} onDrop={onDropFile}>
      {({
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        fileRejections,
      }) => {
        const isFileTooLarge =
          fileRejections.length > 0 && fileRejections[0].file.size > fileSize;
        return (
          <section className="my-4 mx-2">
            <div
              {...getRootProps()}
              className={cn(
                "w-full h-60 flex justify-center items-center p-5 border-2 border-dotted rounded-md text-center border-cyan-700  !text-slate-900 dark:!text-white",
                isDragActive
                  ? "text-white animate-pulse bg-blue-400"
                  : "text-white ",
                isDragReject ? "bg-yellow-400 animate-pulse" : "",
                isFileTooLarge ? "bg-red-600 animate-pulse" : ""
              )}>
              <input {...getInputProps()} />
              {!isDragActive && "Click me or drag-n-drop a file to upload."}
              {isDragActive &&
                !isDragReject &&
                "Oya drop the file(s) for upload."}

              {/* ADD ERROR MESSAGE */}
              {isDragReject && "Oops, sorry, your file was rejected"}
              {isFileTooLarge && <div>File is too big to be uploaded!!!</div>}
            </div>
          </section>
        );
      }}
    </Dropzone>
  );
}

export default DragandDrop;
