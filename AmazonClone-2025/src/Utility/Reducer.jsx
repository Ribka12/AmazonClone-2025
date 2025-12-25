import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import App from "../App";

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      return [
        [...state[0], { ...action.data, totalItem: 1, active: true }],
        { ...state[1] },
      ];

    case "REMOVE_FROM_CART":
      return [
        state[0].filter((item) => item.id !== action.data.id),
        { ...state[1] },
      ];

    case "INCREASE_QTY":
      return [
        state[0].map((item) =>
          item.id === action.data.product.id
            ? { ...item, totalItem: item.totalItem + 1 }
            : item
        ),
        { ...state[1] },
      ];

    case "DECREASE_QTY":
      return [
        state[0]
          .map((item) =>
            item.id === action.data.product.id
              ? {
                  ...item,
                  totalItem: item.totalItem > 1 ? item.totalItem - 1 : item,
                }
              : item
          )
          .filter((item) => item.totalItem > 0),

        { ...state[1] },
      ];

    case "ADD_USER":
      return [[...state[0]], { user: action.user, loading: false }];

    case "EMPTY_CART":
      return [[], { ...state[1] }];
    default:
      return state;
  }
}

export const context = createContext();

function Reducer({ children }) {
  const [state, dispatch] = useReducer(reducer, [
    [],
    { user: null, loading: true },
  ]);

  const total = state[0]
    ? state[0].reduce((acc, cur) => {
        return acc + cur.price * cur.totalItem;
      }, 0)
    : 0;

  function addToCart(data) {
    dispatch({ type: "ADD_TO_CART", data });
  }

  function removeFromCart(data) {
    dispatch({ type: "REMOVE_FROM_CART", data });
  }

  function setActive(product) {
    return !product.active;
  }

  return (
    <>
      <context.Provider
        value={{ state, dispatch, addToCart, removeFromCart, total, setActive }}
      >
        {children}
      </context.Provider>
    </>
  );
}

export default Reducer;
