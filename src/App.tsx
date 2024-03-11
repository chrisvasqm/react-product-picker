import './App.css'
import { useState } from 'react';
import Product from './models/Product';
import ProductPicker from './components/ProductPicker';

function App() {
    const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined)
    const [addedProducts, setAddedProducts] = useState<Product[]>([])
    const products = [
        { id: 1, name: "Product 1", toBuy: 0, quantity: 10 },
        { id: 2, name: "Product 2", toBuy: 0, quantity: 3 }
    ]

    const handleMenuItemClick = (product: Product) => {
        setSelectedProduct(product)
    }

    const handleAddProduct = (newProduct: Product) => {
        if (addedProducts.some(product => product.id === newProduct.id)) return;

        setAddedProducts([...addedProducts, newProduct])
    }

    const handleDelete = (id: number) => {
        const reducedProducts = addedProducts.filter(product => product.id !== id)
        setAddedProducts([...reducedProducts])
    }

    const handleOnInputChange = (id: number, toBuy: number) => {
        if (isNaN(toBuy)) return;

        setAddedProducts(addedProducts.map(product => product.id === id ? { ...product, toBuy: toBuy } : product))
    }

    return <ProductPicker
        products={products}
        addedProducts={addedProducts}
        selectedProduct={selectedProduct}
        onMenuItemClicked={handleMenuItemClick}
        onAddProduct={handleAddProduct}
        onDeleteProduct={handleDelete}
        onInputChange={handleOnInputChange}
    />
}

export default App
