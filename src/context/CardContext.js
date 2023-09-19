import { createContext, useContext, useReducer, useEffect } from "react";
import products from "../data/products";
import cartReducer from "../reducer/cartReducer";
const CardContext = createContext(); // การสร้าง
const initState = {
  // state เริ่มต้น
  products: products, // data
  total: 0,
  amount: 0,
};
export const CartProvider = ({ children }) => {
  // Provider
  const [state, dispatch] = useReducer(cartReducer, initState);
  function formatMoney(money) {
    // 5000 -> 5,000
    return money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  function removeItem(id) {
    dispatch({ type: "REMOVE", payload: id });
  }
  function addQuantity(id) {
    dispatch({ type: "ADD", payload: id });
  }
  function subtractQuantity(id) {
    dispatch({ type: "SUBTRACT", payload: id });
  }
  useEffect(() => {
    console.log("คำนวณหาผลรวม");
    dispatch({ type: "CALCULATE_TOTAL" });
  }, [state.products]);
  return (
    <CardContext.Provider
      value={{ ...state, formatMoney, removeItem, addQuantity,subtractQuantity }}
    >
      {children}
    </CardContext.Provider>
  );
};

export const useCart = () => {
  // การนำเอาไปใช้งานด้านนอก
  return useContext(CardContext);
};
