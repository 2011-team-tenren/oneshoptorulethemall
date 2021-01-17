import React from 'react'

export default function AdminNewSoupForm() {
  return (
    <div>
      <form>
        <label htmlFor="newName">Name:</label>
        <input
          type="text"
          id="newName"
          name="newName"
          // value={props.editQty}
          // onChange={props.handleChange}
        />
        <label htmlFor="newFlavor">Flavor:</label>
        <input
          type="text"
          id="newFlavor"
          name="newFlavor"
          // value={props.editPrice}
          // onChange={props.handleChange}
        />
        <label htmlFor="newQty">Quantity:</label>
        <input
          type="number"
          id="newQty"
          name="newQty"
          // value={props.editQty}
          // onChange={props.handleChange}
        />
        <label htmlFor="newPrice">Price:</label>
        <input
          type="number"
          id="newPrice"
          name="newPrice"
          // value={props.editPrice}
          // onChange={props.handleChange}
        />
        <label htmlFor="newImageUrl">ImageUrl:</label>
        <input
          type="text"
          id="newImageUrl"
          name="newImageUrl"
          // value={props.editPrice}
          // onChange={props.handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
