import path from 'path';
import multer from 'multer';
import express from 'express'
import { NextApiRequest, NextApiResponse } from 'next';

const app = express();

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads/', 
    filename: (req, file, cb) => {
      cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
  })
});

app.post('/upload', upload.single('image'), (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      res.status(400).send('No file uploaded.');
      return;
    }
    res.status(200).json({
      fileName: file.filename,
      filePath: `/uploads/${file.filename}`
    });
  } catch (error) {
    console.error('Error uploading file:', error);
  }
});

export default (req: NextApiRequest, res: NextApiResponse) => app(req, res);