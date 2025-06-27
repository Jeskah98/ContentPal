// components/UploadTest.tsx
"use client";

import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";

export default function UploadTest() {
  return (
    <div className="p-10">
      <UploadButton<OurFileRouter, "contentUploader">
        endpoint="contentUploader"
        input={{ requestId: "test-123" }}
        onClientUploadComplete={(res) => alert("Upload complete!")}
        onUploadError={(error) => alert(`ERROR! ${error.message}`)}
      />
    </div>
  );
}