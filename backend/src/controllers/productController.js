const pool = require("../config/database");

// Get all products
const getProducts = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM products ORDER BY id ASC"
    );

    res.status(200).json({
      status: "success",
      count: result.rows.length,
      products: result.rows,
    });
  } catch (error) {
    console.error("Get products error:", error.message);

    res.status(500).json({
      status: "error",
      message: "Failed to fetch products",
    });
  }
};

// Get one product
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM products WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Product not found",
      });
    }

    res.status(200).json({
      status: "success",
      product: result.rows[0],
    });
  } catch (error) {
    console.error("Get product error:", error.message);

    res.status(500).json({
      status: "error",
      message: "Failed to fetch product",
    });
  }
};

// Create product
const createProduct = async (req, res) => {
  try {
    const {
      category_id,
      name,
      description,
      price,
      stock,
      image_url,
    } = req.body;

    if (!category_id || !name || price === undefined || stock === undefined) {
      return res.status(400).json({
        status: "error",
        message: "category_id, name, price and stock are required",
      });
    }

    const result = await pool.query(
      `INSERT INTO products
        (category_id, name, description, price, stock, image_url)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        category_id,
        name,
        description || null,
        price,
        stock,
        image_url || null,
      ]
    );

    res.status(201).json({
      status: "success",
      message: "Product created successfully",
      product: result.rows[0],
    });
  } catch (error) {
    console.error("Create product error:", error.message);

    res.status(500).json({
      status: "error",
      message: "Failed to create product",
    });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      category_id,
      name,
      description,
      price,
      stock,
      image_url,
      is_active,
    } = req.body;

    const result = await pool.query(
      `UPDATE products
       SET
         category_id = COALESCE($1, category_id),
         name = COALESCE($2, name),
         description = COALESCE($3, description),
         price = COALESCE($4, price),
         stock = COALESCE($5, stock),
         image_url = COALESCE($6, image_url),
         is_active = COALESCE($7, is_active)
       WHERE id = $8
       RETURNING *`,
      [
        category_id,
        name,
        description,
        price,
        stock,
        image_url,
        is_active,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Product not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Product updated successfully",
      product: result.rows[0],
    });
  } catch (error) {
    console.error("Update product error:", error.message);

    res.status(500).json({
      status: "error",
      message: "Failed to update product",
    });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM products WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Product not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Product deleted successfully",
      product: result.rows[0],
    });
  } catch (error) {
    console.error("Delete product error:", error.message);

    res.status(500).json({
      status: "error",
      message: "Failed to delete product",
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};