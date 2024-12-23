// src/types/multer.d.ts

// src/types/express.d.ts or src/types/multer.d.ts

import { Request } from 'express';
import { File } from 'multer';

declare global {
  namespace Express {
    interface Request {
      file: File | undefined; // Make 'file' required
      files?: File[]; // Optional: for handling multiple files
    }
  }
}


