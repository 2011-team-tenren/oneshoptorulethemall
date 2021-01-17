import React from 'react'

export default function AdminForm(props) {
  return (
    <div>
      <form onSubmit={props.handleEdit}>
        <label htmlFor="editQty">Edit Quantity:</label>
        <input
          type="number"
          id="editQty"
          name="editQty"
          value={props.editQty}
          onChange={props.handleChange}
        />
        <label htmlFor="editPrice">Edit Price:</label>
        <input
          type="number"
          id="editPrice"
          name="editPrice"
          value={props.editPrice}
          onChange={props.handleChange}
        />
        <button type="submit">Submit</button>
      </form>
      <button type="submit" onClick={props.removeSoup}>
        Remove Soup From Store
      </button>
    </div>
  )
}
