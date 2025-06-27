// app/api/uploadthing/core.ts
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { z } from "zod";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { getApps, initializeApp, cert } from "firebase-admin/app";

const f = createUploadthing();

// Validate required environment variables
if (!process.env.FIREBASE_PROJECT_ID || 
  !process.env.FIREBASE_CLIENT_EMAIL || 
  !process.env.FIREBASE_PRIVATE_KEY) {
throw new Error('Missing Firebase environment variables');
}

// Fix the private key formatting
const privateKey = process.env.FIREBASE_PRIVATE_KEY
  .replace(/\\n/g, '\n')  // Replace escaped newlines
  .replace(/"/g, '');     // Remove any quotes

const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: privateKey
  }),
  databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
};

// Initialize only if not already initialized
if (!getApps().length) {
  initializeApp(firebaseAdminConfig);
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