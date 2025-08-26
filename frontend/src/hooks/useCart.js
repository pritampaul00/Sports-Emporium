import { useContext } from "react";
import { CartContext } from "../context/CartContext"; // adjust path as needed

export const useCart = () => {
  return useContext(CartContext);
};
