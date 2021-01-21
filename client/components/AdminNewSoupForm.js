import React from 'react'

export default function AdminNewSoupForm(props) {
  return (
    <div>
      <form onSubmit={props.handleSubmit} className="form-container">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={props.name}
          placeholder="Soup name..."
          onChange={props.handleChange}
        />
        <label htmlFor="flavor">Flavor:</label>
        <input
          type="text"
          id="flavor"
          name="flavor"
          value={props.flavor}
          placeholder="Soup flavor..."
          onChange={props.handleChange}
        />
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={props.quantity}
          onChange={props.handleChange}
        />
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={props.price}
          placeholder="Soup Image URL..."
          onChange={props.handleChange}
        />
        <label htmlFor="imageUrl">ImageUrl:</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={props.imageUrl}
          onChange={props.handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
