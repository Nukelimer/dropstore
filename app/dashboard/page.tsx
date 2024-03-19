import DragandDrop from "@/components/Drag-and-Drop/Drag-and-Drop";
import FileWrapper from "@/components/table-file-wrapper/FileWrapper";
import { db } from "@/firebase";
import { FileType } from "@/typings";
import { auth } from "@clerk/nextjs";
import { collection, getDocs } from "firebase/firestore";

async function Dashboard() {
  const { userId } = auth();

  const documentResults = await getDocs(
    collection(db, "users", userId!, "files")
  );
  const pseudoFiles: FileType[] = documentResults.docs.map((doc) => ({
    id: doc.id,
    filename: doc.data().fileName || doc.id,
    timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
    fullName: doc.data().fullName,
    downloadURL: doc.data().downloadURL,
    type: doc.data().type,
    size: doc.data().size,
  }));
  // console.log(pseudoFiles);

  return (
    <div>
      <DragandDrop />
      

      <section>
        <h2 className="font-extrabold">All My Files.</h2>
        <div className="">
          <FileWrapper pseudoFiles={ pseudoFiles } />
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
