import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  //!1st step: Call a fetch request for to get data into items state
  useEffect(()=>{
    fetch("http://localhost:4000/items")
    .then(resp=>resp.json())
    .then(data=>{
      setItems(data)
    })
  }, []);
  //!End of 1st step
  //*Adding a new Item to the list
  //create a callback function to get data from itemForm
  function handleAddItem(newItem) {
    console.log(newItem)
    setItems([...items,newItem]);
  }
  //*End of Adding new Item to the list
  //!Create a callback function to take new item from item remve from cart btn in Item.js
  function handleUpdateItem(updatedItem){
    const updatedItems = items.map((item)=>{
      if(item.id===updatedItem.id){
        return updatedItem;
      }else{
        return item;
      }
    })
    setItems(updatedItems)
  }
  //!end of this one
  //* Create a Callback function for the Delete request button
  function handleDeleteItem(deletedItem){
    const updatedItems = items.filter((item)=>item.id !== deletedItem.id);
    setItems(updatedItems)
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onUpdateItem={handleUpdateItem} onDeleteItem={handleDeleteItem}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
