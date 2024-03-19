"use client";

import { COLOR_EXTENSION_MAP } from "@/colors";
import { FileType } from "@/typings";
import {type DefaultExtensionType , FileIcon, defaultStyles } from "react-file-icon";
import { ColumnDef } from "@tanstack/react-table";
import prettyBytes from "pretty-bytes";
import { log } from "console";

export const columns: ColumnDef<FileType>[] = [


    {
        accessorKey: "type",
        header: "File Type",
        cell: ({ renderValue, ...props }) => {
            const type = renderValue() as string;
        
            
          const extension: string = type.split("/")[1];
          return (
            <div className="w-10">
              <FileIcon
                extension={extension}
                      labelColor={COLOR_EXTENSION_MAP[extension]}
                      {...defaultStyles[extension as DefaultExtensionType]}
              />
            </div>
          );
        },
      },
  {
    accessorKey: "filename",
    header: "FileName",
  },
  {
    accessorKey: "timestamp",
    header: "Date Added",
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ renderValue, ...props }) => {
      return <span>{prettyBytes(renderValue() as number)}</span>;
    },
  },
  {
    accessorKey: "downloadURL",
    header: "DownLoad Link",
    cell: ({ renderValue, ...props }) => {
      return (
        <a
          href={renderValue() as string}
          target="_blank"
          className="underline text-green-400 hover:text-green-700">
          Download Now
        </a>
      );
    },
  },
 
];
