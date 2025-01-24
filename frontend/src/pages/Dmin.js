import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css"

const Admin = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [adminInput, setAdminInput] = useState({
    name: "",
    location: "",
    cuisine: "",
    img: "",
    menu: [{ name: "", desc: "", price: 0, img: "" }],
  });
  const [editingRestaurant, setEditingRestaurant] = useState(null);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/restaurants`);
      setRestaurants(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching restaurants:", err);
      setError("Failed to load restaurants. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleMenuChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMenu = [...adminInput.menu];
    updatedMenu[index][name] = name === "price" ? parseFloat(value) : value;
    setAdminInput((prev) => ({ ...prev, menu: updatedMenu }));
  };

  const addMenuItem = () => {
    setAdminInput((prev) => ({
      ...prev,
      menu: [...prev.menu, { name: "", desc: "", price: 0, img: "" }],
    }));
  };

  const removeMenuItem = (index) => {
    const updatedMenu = adminInput.menu.filter((_, i) => i !== index);
    setAdminInput((prev) => ({ ...prev, menu: updatedMenu }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!adminInput.name || !adminInput.location || !adminInput.cuisine) {
      setError("Please fill all required fields, including the image.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/restaurants/admin`, adminInput);
      setRestaurants((prev) => [...prev, response.data]);
      setAdminInput({
        name: "",
        location: "",
        cuisine: "",
        img: "",
        menu: [{ name: "", desc: "", price: 0, img: "" }],
      });
      setSuccess("Restaurant added successfully!");
      setError(null);
    } catch (err) {
      console.error("Error adding restaurant:", err);
      setError("Failed to add restaurant. Please check the input and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/restaurants/${id}`);
      setRestaurants((prev) => prev.filter((restaurant) => restaurant._id !== id));
      setSuccess("Restaurant deleted successfully!");
    } catch (err) {
      console.error("Error deleting restaurant:", err);
      setError("Failed to delete restaurant.");
    }
  };

  const handleEdit = (restaurant) => {
    setEditingRestaurant(restaurant);
    setAdminInput({
      name: restaurant.name,
      location: restaurant.location,
      cuisine: restaurant.cuisine,
      img: restaurant.img,
      menu: restaurant.menu,
    });
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/restaurants/${editingRestaurant._id}`, adminInput);
      setRestaurants((prev) =>
        prev.map((restaurant) => (restaurant._id === editingRestaurant._id ? response.data : restaurant))
      );
      setEditingRestaurant(null);
      setAdminInput({
        name: "",
        location: "",
        cuisine: "",
        img: "",
        menu: [{ name: "", desc: "", price: 0, img: "" }],
      });
      setSuccess("Restaurant updated successfully!");
    } catch (err) {
      console.error("Error updating restaurant:", err);
      setError("Failed to update restaurant.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin">
      <h1 className="admin-header">Restaurants</h1>
      {error && <p className="admin-error">{error}</p>}
      {success && <p className="admin-success">{success}</p>}
      {loading && <p className="admin-loading">Loading...</p>}

      <button className="admin-refresh-button" onClick={fetchRestaurants}>
        Refresh Restaurant List
      </button>

      <RestaurantList
        restaurants={restaurants}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

      <h2 className="admin-form-title">{editingRestaurant ? "Edit Restaurant" : "Add a New Restaurant"}</h2>
      <RestaurantForm
        adminInput={adminInput}
        handleInputChange={handleInputChange}
        handleMenuChange={handleMenuChange}
        addMenuItem={addMenuItem}
        removeMenuItem={removeMenuItem}
        handleSubmit={editingRestaurant ? handleUpdate : handleSubmit}
        editingRestaurant={editingRestaurant}
      />
    </div>
  );
};

const RestaurantList = ({ restaurants, handleEdit, handleDelete }) => (
  <ul className="admin-restaurant-list">
    {restaurants.map((restaurant) => (
      <li className="admin-restaurant-item" key={restaurant._id}>
        <h3 className="admin-restaurant-name">{restaurant.name}</h3>
        <img className="admin-restaurant-img" src={restaurant.img} alt={restaurant.name} />
        <p className="admin-restaurant-location">Location: {restaurant.location}</p>
        <p className="admin-restaurant-cuisine">Cuisine: {restaurant.cuisine}</p>
        <button className="admin-edit-button" onClick={() => handleEdit(restaurant)}>
          Edit
        </button>
        <button className="admin-delete-button" onClick={() => handleDelete(restaurant._id)}>
          Delete
        </button>
      </li>
    ))}
  </ul>
);

const RestaurantForm = ({
  adminInput,
  handleInputChange,
  handleMenuChange,
  addMenuItem,
  removeMenuItem,
  handleSubmit,
  editingRestaurant,
}) => (
  <form className="admin-form" onSubmit={handleSubmit}>
    <input
      className="admin-input"
      type="text"
      name="name"
      placeholder="Restaurant Name"
      value={adminInput.name}
      onChange={handleInputChange}
      required
    />
    <input
      className="admin-input"
      type="text"
      name="location"
      placeholder="Location"
      value={adminInput.location}
      onChange={handleInputChange}
      required
    />
    <input
      className="admin-input"
      type="text"
      name="img"
      placeholder="Image URL"
      value={adminInput.img}
      onChange={handleInputChange}
      required
    />
    <select
      className="admin-select"
      name="cuisine"
      value={adminInput.cuisine}
      onChange={handleInputChange}
      required
    >
      <option value="veg">Veg</option>
      <option value="nonveg">Non Veg</option>
      <option value="veg and non veg">Veg and Non Veg</option>
    </select>

    <h3 className="admin-menu-title">Menu</h3>
    {adminInput.menu.map((item, index) => (
      <div className="admin-menu-item" key={index}>
        <input
          className="admin-input"
          type="text"
          name="name"
          placeholder="Dish Name"
          value={item.name}
          onChange={(e) => handleMenuChange(index, e)}
          required
        />
        <input
          className="admin-input"
          type="text"
          name="desc"
          placeholder="Description"
          value={item.desc}
          onChange={(e) => handleMenuChange(index, e)}
        />
        <input
          className="admin-input"
          type="number"
          name="price"
          placeholder="Price"
          value={item.price}
          onChange={(e) => handleMenuChange(index, e)}
          required
        />
        <input
          className="admin-input"
          type="text"
          name="img"
          placeholder="Dish Image URL"
          value={item.img}
          onChange={(e) => handleMenuChange(index, e)}
        />
        <button
          className="admin-remove-button"
          type="button"
          onClick={() => removeMenuItem(index)}
        >
          Remove
        </button>
      </div>
    ))}
    <button className="admin-add-button" type="button" onClick={addMenuItem}>
      Add Menu Item
    </button>
    <button className="admin-submit-button" type="submit">
      {editingRestaurant ? "Update" : "Add"} Restaurant
    </button>

  </form>
);

export default Admin;
