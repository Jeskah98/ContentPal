// app/api/uploadthing/core.ts
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { z } from "zod";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { getApps, initializeApp, cert } from "firebase-admin/app";

const f = createUploadthing();

// Initialize Firebase
const serviceAccount = require('../../../../config/serviceAccountKey.json');

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
    databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
  });
}
const db = getFirestore();

export const ourFileRouter = {
  contentUploader: f({
    image: { maxFileSize: "4MB", maxFileCount: 10 },
    text: { maxFileSize: "1MB" }
  })
    .input(z.object({ requestId: z.string() }))
    .middleware(async ({ input }) => {
      if (!input.requestId) throw new UploadThingError("Missing request ID");
      return input;
    })
    .onUploadComplete(async ({ file, metadata }) => {
      const { requestId } = metadata;
      const requestRef = db.collection("contentRequests").doc(requestId);

      await requestRef.update({
        generatedContent: FieldValue.arrayUnion(file.url),
        status: "Completed",
        updatedAt: FieldValue.serverTimestamp(),
      });

      console.log("Uploaded file URL added to Firestore:", file.ufsUrl);
      return { url: file.ufsUrl };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;