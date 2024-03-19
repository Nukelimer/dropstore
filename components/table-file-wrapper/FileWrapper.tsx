"use client";

import { FileType } from "@/typings";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { FileTable } from "./File-Table";
import { columns } from "./Table-Columns";
import { useCollection } from "react-firebase-hooks/firestore";
import { useUser } from "@clerk/nextjs";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import { Skeleton } from "../ui/skeleton";

function FileWrapper({ pseudoFiles }: { pseudoFiles: FileType[] }) {
  const { user } = useUser();
  const [initialFiles, setInitialFiles] = useState<FileType[]>([]);
  const [sortFiles, setSortFiles] = useState<"asc" | "desc">("desc");
  const [docs, loading, error] = useCollection(
    user &&
      query(
        collection(db, "users", user.id, "files"),
        orderBy("timestamp", sortFiles)
      )
  );

  useEffect(() => {
    if (!docs) return;

    const files: FileType[] = docs.docs.map((doc) => {
      return {
        id: doc.id,
        filename: doc.data().filename || doc.id,
        timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
        fullName: doc.data().fullName,
        downloadURL: doc.data().downloadURL,
        type: doc.data().type,
        size: doc.data().size,
      };
    });
    setInitialFiles(files);
  }, [docs]);

  if (docs?.docs.length === undefined) {
    return (
      <div className="flex flex-col">
        <Button variant={"outline"} className="ml-auto w-40 h-10 mb-5">
          <Skeleton className="h-5 w-full" />
        </Button>
        <div className="border rounded-lg">
          <div className="border-b h-12" />
          {pseudoFiles.map((file) => {
            return <div className="flex items-center space-x-4 p-5 w-full" key={file.id}>
              <Skeleton className="h-12 w-12"/>
              <Skeleton className="h-12 w-full"/>
            </div>;
          })}
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-end flex-col space-x-4 mr-4">
      <Button
        className="my-4 self-end"
        onClick={() => {
          setSortFiles(sortFiles === "asc" ? "desc" : "asc");
        }}>
        Sort Files ( {sortFiles === "desc" ? "Newly Added" : "Oldest"})
      </Button>

      <FileTable columns={columns} data={initialFiles} />
    </div>
  );
}

export default FileWrapper;
