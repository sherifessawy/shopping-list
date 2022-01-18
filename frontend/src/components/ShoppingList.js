import React, { useState, useEffect } from "react";
import { Button, ListGroup, ListGroupItem, Container } from "reactstrap";
import axios from "axios";

function ShoppingList() {
  const [shoppingItems, setShoppingItems] = useState([]);

  useEffect(() => {
    axios.get("/api/items").then((res) => {
      setShoppingItems(res.data);
    });
  }, []);

  function addItem() {
    const name = prompt("Enter Item");
    if (name) {
      axios.post("/api/items", { name }).then((res) => {
        setShoppingItems((prev) => [
          { name: res.data.name, _id: res.data._id },
          ...prev,
        ]);
      });
    }
  }

  function deleteItem(id) {
    axios.delete(`/api/items/${id}`).then((res) => {
      setShoppingItems((prev) => prev.filter((item) => item._id !== id));
    });
  }

  return (
    <Container>
      <Button color="dark" className="add-btn" onClick={() => addItem()}>
        Add item
      </Button>
      <ListGroup>
        {shoppingItems.map(({ _id, name }) => (
          <ListGroupItem key={_id}>
            <Button
              color="primary"
              className="list-item-btn"
              color="danger"
              size="sm"
              onClick={() => deleteItem(_id)}
            >
              <p>&times;</p>
            </Button>
            {name}
          </ListGroupItem>
        ))}
      </ListGroup>
    </Container>
  );
}

export default ShoppingList;
