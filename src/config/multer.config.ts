import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';

export const multerOptions = {
  // Enable file size limits
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB
  },
  // Check the file type
  fileFilter: (req: any, file: any, cb: any) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      // Allow storage of file
      cb(null, true);
    } else {
      // Reject file
      cb(new Error('Unsupported file type'), false);
    }
  },
  // Storage properties
  storage: diskStorage({
    destination: './uploads', // Destination path for uploaded files
    filename: (req: any, file: any, cb: any) => {
      // Generating a 32 random chars long string
      const randomName = uuid();
      // Appending extension to random name
      cb(null, `${randomName}${extname(file.originalname)}`);
    },
  }),
};
