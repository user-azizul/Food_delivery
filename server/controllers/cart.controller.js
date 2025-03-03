import UserModel from "../models/user.model.js";

// Add to Cart
const addToCart = async (req, res) => {
  const { productId } = req.body;
  const { userId } = req.user;

  if (!productId) {
    return res
      .status(400)
      .json({ success: false, message: "Product ID is required" });
  }

  try {
    // Find the user
    let user = await UserModel.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    console.log("Received productId:", productId);
    console.log("Received userId:", userId);

    let userCart = user.cartData || {};

    // If the product is already in the cart, increase the quantity
    if (userCart[productId]) {
      userCart[productId] += 1;
    } else {
      // Otherwise, add the product with quantity 1
      userCart[productId] = 1;
    }

    // Save the updated cart to the database
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { cartData: userCart },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to update the cart" });
    }

    console.log("Updated User:", updatedUser);

    // Respond with success
    return res.status(200).json({
      success: true,
      message: "Item added to cart",
      cart: updatedUser.cartData
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error adding item to cart" });
  }
};

// Remove from Cart
const removeFromCart = async (req, res) => {
  const { productId } = req.body;
  const { userId } = req.user;

  if (!productId) {
    return res
      .status(400)
      .json({ success: false, message: "Product ID is required" });
  }

  try {
    // Find the user from the database
    let user = await UserModel.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    let userCart = user.cartData || {};

    // If the product is not in the cart, return error
    if (!userCart[productId]) {
      return res
        .status(400)
        .json({ success: false, message: "Item not found in cart" });
    }

    // If the product quantity is greater than 1, reduce it
    if (userCart[productId] > 1) {
      userCart[productId] -= 1;
    } else {
      // If the quantity is 1, remove the item from the cart
      delete userCart[productId];
    }

    // Update the user's cart in the database
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { cartData: userCart },
      {
        new: true
      }
    );
    if (!updatedUser) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to update the cart" });
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Item removed from cart",
      cart: updatedUser.cartData
    });
  } catch (error) {
    console.error("Error from remove from cart:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error removing item from cart" });
  }
};
//Remove whole item from cart
const removeItemFromCart = async (req, res) => {
  const { productId } = req.body;
  const { userId } = req.user;

  if (!productId) {
    return res
      .status(400)
      .json({ success: false, message: "Product ID is required" });
  }

  try {
    // Find the user from the database
    let user = await UserModel.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    let userCart = user.cartData || {};

    // If the product is not in the cart, return error
    if (!userCart[productId]) {
      return res
        .status(400)
        .json({ success: false, message: "Item not found in cart" });
    }

    // If the product quantity is greater than 1, reduce it
    if (userCart[productId]) {
      delete userCart[productId];
    }

    // Update the user's cart in the database
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { cartData: userCart },
      { new: true }
    );
    if (!updatedUser) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to update the cart" });
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Item removed from cart",
      cart: updatedUser.cartData
    });
  } catch (error) {
    console.error("Error from remove from cart:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error removing item from cart" });
  }
};

// Get Cart Items
const getCartItem = async (req, res) => {
  const { userId } = req.user;

  try {
    // Find the user from the database
    let user = await UserModel.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Return the user's cart data
    return res.status(200).json({
      success: true,
      cart: user.cartData
    });
  } catch (error) {
    console.error("Error from get item from cart:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error fetching cart items" });
  }
};

export { addToCart, removeFromCart, getCartItem, removeItemFromCart };
