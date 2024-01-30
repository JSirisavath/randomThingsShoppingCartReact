import React, { useContext, useReducer } from "react";
// This is our context API that file that will handle state changes and setting states for data changes dynamically. This is necessary for larger applications because without the context api, when users update a certain component, the data will need to prop drill through maybe over thousands of files.

import { createContext } from "react"; // Creating context API

import { faker } from "@faker-js/faker"; // faker library

// IMPORT CART REDUCER FOR MANAGING ACTIONS OF THE STATE
import { cartReducer, productReducer } from "./Reducers";

// create a new cart context api object state to use
const Cart = createContext();

faker.seed(99);
const Context = ({ children }) => {
	// We are using fake but realistic data from a library called, 'faker'.
	// Array of 20 products
	const products = [...Array(50)].map(() => ({
		id: faker.datatype.uuid(),
		productName: faker.commerce.productName(),
		price: faker.commerce.price(),
		image: faker.image.image(), // => "https://loremflickr.com/640/480/fashion"
		inStock: faker.helpers.arrayElement([0, 3, 5, 6, 7]), // Fake random in stocks from respective values of array, it will choose that index from the array box.
		fastDelivery: faker.datatype.boolean(), // Fast delivery, true or false
		ratings: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
	})); // an array with 20 undefined elements

	// console.log(products); confirming products has an array of things

	const [state, dispatch] = useReducer(cartReducer, {
		products: products,
		cart: [],
	});

	const [productState, productDispatch] = useReducer(productReducer, {
		byStock: false,
		byFastDelivery: false,
		byRating: 0,
		searchQuery: "",
	});

	// This cart.Provider will wrap our whole react app
	// send both our state and dispatch to our context api to handle data/state changes of the app
	return (
		<Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
			{/* Out children will come from index.js because when our app fires up to start, it will start at index file */}
			{children}
		</Cart.Provider>
	);
};

export default Context;

export const CartState = () => {
	return useContext(Cart); // using the context we created in useContext method
};
