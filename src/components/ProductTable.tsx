import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Input, Button } from "@chakra-ui/react";
import Product from "../models/Product";

interface Props {
    addedProducts: Product[],
    onDeleteProduct: (id: number) => void;
    onInputChange: (id: number, value: number) => void;
}

const ProductTable = ({ addedProducts, onDeleteProduct, onInputChange }: Props) => {
    return <TableContainer>
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
}

export default ProductTable;