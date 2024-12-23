import mongoose, { Document, Schema } from 'mongoose';

// Define the TypeScript interface for the Product
interface IProduct extends Document {
    Name: string;
    Price: string;
    File_name: string;
    Dates: Date;
    Stock: string;
}

// Define the Mongoose Schema for Product
const productSchema: Schema<IProduct> = new Schema({
    Name: { type: String, required: true },
    Price: { type: String, required: true },
    File_name: { type: String, required: true },
    Dates: { type: Date, required: true },
    Stock: { type: String, required: true }
});

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;
