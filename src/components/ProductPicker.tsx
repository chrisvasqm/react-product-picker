import { Box, Button, HStack, Menu, MenuButton, MenuItem, MenuList, Stack } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import Product from '../models/Product'

interface Props {
    products: Product[],
    selectedProduct: Product | undefined
    onMenuItemClicked: (product: Product) => void;
    onAddProduct: (product: Product) => void;
}

const ProductPicker = ({
    products,
    selectedProduct,
    onMenuItemClicked,
    onAddProduct
}: Props) => {
    return (
        <Stack spacing={3} w={['md', 'lg']} >
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
        </Stack>
    )
}

export default ProductPicker;