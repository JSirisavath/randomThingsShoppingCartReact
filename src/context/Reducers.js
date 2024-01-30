export const cartReducer = (state, action) => {
	switch (action.type) {
		// Case is type of action where the switch statement will match both the action type and case.

		case "ADD_TO_CART":
			// Returns the current state of the cart which is an array of products object, and then creates a new copy of the existing array with the spread operator '...state.cart' and then uses ...action.payload to takes and add all the properties of the product inside the payload with initial quantity of 1.
			return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };

		// Removing works like adding case but now, we are creating a new copy of the cart array (array of objects) using ...state.cart to reference, and then taking that copy of cart state and calling the filter() method function to test and compare it's product object's id from the payload's id. When all product ids in the cart doesn't  match the same payload's id, return the updated cart where that payload.id product is removed.
		case "REMOVE_FROM_CART":
			return {
				...state,
				cart: state.cart.filter((c) => c.id !== action.payload.id),
			};

		case "CHANGE_CART_QTY":
			return {
				...state,
				cart: state.cart.filter((c) =>
					c.id === action.payload.id ? (c.qty = action.payload.qty) : c.qty
				),
			};

		// If the type property of the action object doesn't match any of the case statements in the switch statement, the default case will be executed, which simply returns the current state.
		default:
			return state;
	}
};
//whenever reducer is called, it will take the app's current state and the action it will be given as argument, and fire off and change the current state to it's new state based on the action (action.type)

export const productReducer = (state, action) => {
	switch (action.type) {
		// Sorting payload on filter section
		case "SORT_BY_PRICE":
			return { ...state, sort: action.payload };

		// Filter in stock or not payload from filter section
		// Will turn off "false" or "true" as payload based on the state
		case "FILTER_BY_STOCK":
			return { ...state, byStock: !state.byStock };

		case "FILTER_BY_DELIVERY":
			return { ...state, byFastDelivery: !state.byFastDelivery };

		// will change ratings based on the action payload
		case "FILTER_BY_RATING":
			return { ...state, byRating: action.payload };

		case "FILTER_BY_SEARCH":
			return { ...state, searchQuery: action.payload };

		// Return original state
		case "CLEAR_FILTER":
			return {
				byStock: false,
				byFastDelivery: false,
				byRating: 0,
				searchQuery: "",
			};

		default:
			return state;
	}
};
