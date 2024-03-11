import { Box, Button, HStack, Heading, Input, Menu, MenuButton, MenuItem, MenuList, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import './App.css'
import { useState } from 'react';
import Product from './models/Product';

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

    const handleOnChange = (id: number, toBuy: number) => {
        if (isNaN(toBuy)) return;

        setAddedProducts(addedProducts.map(product => product.id === id ? { ...product, toBuy: toBuy } : product))
    }

    return (
        <Box h='100vh' display={'flex'} justifyContent={'center'}>
            <Stack spacing={3} w={['md', 'lg']} >
                <Heading as='h2'>Product Picker</Heading>

                <HStack>
                    <Box flex={2}>
                        <Menu>
                            <MenuButton width='full' as={Button} rightIcon={<ChevronDownIcon />}>{selectedProduct ? <p>{selectedProduct.name}</p> : <p>Pick a product</p>}</MenuButton>
                            <MenuList>
                                {products.map(product => <MenuItem key={product.id} onClick={() => handleMenuItemClick(product)}>Name: {product.name} - Quantity: {product.quantity}</MenuItem>)}
                            </MenuList>
                        </Menu>
                    </Box>
                    <Box flex={1}>
                        <Button width='full' onClick={() => selectedProduct && handleAddProduct(selectedProduct)}>Add</Button>
                    </Box>
                </HStack>

                <TableContainer>
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th>Name</Th>
                                <Th isNumeric>Quantitiy</Th>
                                <Th>To Buy</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {addedProducts && addedProducts.map(product => <Tr>
                                <Td>{product.name}</Td>
                                <Td isNumeric>{product.quantity}</Td>
                                <Td><Input
                                    id='toBuy'
                                    type='number'
                                    value={product.toBuy}
                                    onChange={event => handleOnChange(product.id, parseInt(event.target.value))}
                                /></Td>
                                <Td><Button onClick={() => handleDelete(product.id)}>Delete</Button></Td>
                            </Tr>)}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Stack>
        </Box >
    )
}

export default App
