import React from "react";
import { useState } from "react";

const Item = ({ item, onClickHandler, isActive }) => (
  <div>
    <item.Trigger onClick={onClickHandler} />
    {isActive && item.children}
  </div>
);

const ToggleableList = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState();
  console.log(selectedItem);
  return (
    <>
      {items.map((item) => {
        console.log(typeof setSelectedItem);
        return (
          <Item
            key={item.id}
            item={item}
            onClickHandler={setSelectedItem}
            isActive={selectedItem === item.id}
          />
        );
      })}
    </>
  );
};

export default ToggleableList;
