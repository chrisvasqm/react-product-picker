import { Box, Button, HStack, Heading, Input, Menu, MenuButton, MenuItem, MenuList, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import Product from '../models/Product'

interface Props {
    products: Product[],
    addedProducts: Product[],
    selectedProduct: Product | undefined
    onMenuItemClicked: (product: Product) => void;
    onAddProduct: (product: Product) => void;
    onDeleteProduct: (id: number) => void;
    onInputChange: (id: number, value: number) => void;
}

const ProductPicker = ({
    products,
    addedProducts,
    selectedProduct,
    onMenuItemClicked,
    onAddProduct,
    onDeleteProduct,
    onInputChange
}: Props) => {
    return (
        <Box h='100vh' display={'flex'} justifyContent={'center'}>
            <Stack spacing={3} w={['md', 'lg']} >
                <Heading as='h2'>Product Picker</Heading>

                <HStack>
                    <Box flex={2}>
                        <Menu>
                            <MenuButton width='full' as={Button} rightIcon={<ChevronDownIcon />}>{selectedProduct ? <p>{selectedProduct.name}</p> : <p>Pick a product</p>}</MenuButton>
                            <MenuList>
                                {products.map(product => <MenuItem key={product.id} onClick={() => onMenuItemClicked(product)}>Name: {product.name} - Quantity: {product.quantity}</MenuItem>)}
                            </MenuList>
                        </Menu>
                    </Box>
                    <Box flex={1}>
                        <Button width='full' onClick={() => selectedProduct && onAddProduct(selectedProduct)}>Add</Button>
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
                                    onChange={event => onInputChange(product.id, parseInt(event.target.value))}
                                /></Td>
                                <Td><Button onClick={() => onDeleteProduct(product.id)}>Delete</Button></Td>
                            </Tr>)}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Stack>
        </Box >
    )
}

export default ProductPicker;