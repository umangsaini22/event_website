import { generateReactHelpers } from "@uploadthing/react/hooks";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

// Generate hooks for file upload operations
export const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>();

// import { generateReactHelpers } from "@uploadthing/react";
// import type { OurFileRouter } from "@/app/api/uploadthing/core";

// // Generate hooks for file upload operations
// const { useUploadThing } = generateReactHelpers<OurFileRouter>();

// export { useUploadThing };