import React, { useState } from "react";
import ApiService from "../../service/ApiService";
import { useNavigate } from "react-router-dom";
import styles from './styles/AddCategoryPage.module.css';

const AddCategory = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ApiService.createCategory({ name });
      if (response.status === 200) {
        setMessage(response.message);
        setTimeout(() => {
          setMessage("");
          navigate("/admin/categories");
        }, 3000);
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          error.message ||
          "Failed to save a category"
      );
    }
  };

  return (
    <div className={styles.addCategoryPage}>
      {message && (
        <p className={styles.message}>
          {message}
        </p>
      )}
  
      <form onSubmit={handleSubmit} className={styles.categoryForm}>
        <h2 className={styles.formHeading}>Add Category</h2>
  
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
        />
  
        <button type="submit" className={styles.submitButton}>
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
