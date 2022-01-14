import React, {useState} from 'react'
import { Button, ListGroup, ListGroupItem, Container } from 'reactstrap'
import {v1 as uuid} from "uuid"

function ShoppingList() {
    const [shoppingItems, setShoppingItems] = useState([
        {name: 'eggs', id: uuid()},
        {name: 'milk', id: uuid()}
    ])
    
    function addItem(){
        const name = prompt('Enter Item')
        if (name){
            setShoppingItems(prev => [...prev, {name, id: uuid()}])
        }
    }

    return (
        <Container>
            <Button
                color="dark"
                className='add-btn'
                onClick={() => addItem()}
            >
                Add item
            </Button>
            <ListGroup>
                {shoppingItems.map(({id, name}) => (
                    <ListGroupItem key={id}>
                        <Button 
                            color="primary"
                            className='list-item-btn'
                            color='danger'
                            size='sm'
                            onClick={() => setShoppingItems(prev => prev.filter((item) => item.id !== id))}
                        ><p>&times;</p></Button>
                        {name}
                    </ListGroupItem>
                ))}
            </ListGroup>
        </Container>
    )
}

export default ShoppingList
