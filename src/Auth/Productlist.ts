import { Request, Response } from 'express';
import Product from '../Models/Product';


class ProductController {
    async indexdata(req: Request, res: Response): Promise<void> {
        try {
            const product = await Product.findById(req.params._id);

            if (!product) {
                res.status(404).json({ error: 'Product not found.' });
                return;
            }

            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }
    async getdata(req: Request, res: Response): Promise<void> {
        try {
            const products = await Product.find(req.body);
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async createdata(req: Request, res: Response) {
        const files = req.file; 
        try {
            if (!files) {
                res.status(400).json({ error: 'Image file is required.' });
                return;
            }

            const newProduct = await Product.create({
                Name: req.body.Name,
                Price: req.body.Price,
                File_name: files.filename,
                Dates: req.body.Dates,
                Stock: req.body.Stock
            });

            res.status(201).json(newProduct);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async deletedata(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const product = await Product.findByIdAndDelete(id);

            if (!product) {
                res.status(404).json({ error: 'Product not found.' });
                return;
            }

            res.status(200).json({ message: 'Product deleted successfully.' });
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }
    async searchdata(req: Request, res: Response): Promise<void> {
        const { Name, Dates, Stock } = req.query;

        const filter: { [key: string]: unknown } = {};

        if (Name) {
            filter.Name = { $regex: Name, $options: 'i' };
        }

        if (Dates) {
            filter.Dates = new Date(Dates as string);
        }

        if (Stock) {
            filter.Stock = Stock;
        }

        try {
            const stocks = await Product.find(filter);
            res.status(200).json(stocks);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error fetching products');
        }
    }
}

export default new ProductController();
