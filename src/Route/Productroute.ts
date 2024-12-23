import express, { Request, Response } from 'express';
import multer from 'multer';
import ProductController from '../Auth/Productlist';
import Productdata from '../Models/Product';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });
router.use('/view', express.static(path.join(__dirname, 'uploads')));


router.get('/find', ProductController.getdata);


router.post('/create', upload.single('image'), async (req: Request, res: Response) => {
  const file = req.file as File | undefined;

  if (file) {
    console.log(file);
    await ProductController.createdata(req, res);
  } else {
    res.status(400).send('No file uploaded');
  }
});


router.get('/find/:_id', ProductController.indexdata);

router.delete('/remove/:id', ProductController.deletedata);

router.get('/search', ProductController.searchdata);

router.put('/update/:id', upload.single('image'), async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { Name, Price, Dates, Stock } = req.body;
  const image = req.file;

  if (!id || !Name || !Price || !Stock) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  try {

    const product = await Productdata.findById(id);
    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    product.Name = Name;
    product.Price = Price;
    product.Dates = Dates;
    product.Stock = Stock;

    if (image) {
      product.File_name = image.filename;
    }

    await product.save();
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
