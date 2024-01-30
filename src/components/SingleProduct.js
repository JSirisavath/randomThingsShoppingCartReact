import React from "react";
import { Button, Card } from "react-bootstrap";
import Rating from "./Rating";
import { CartState } from "../context/Context";

// Will take in prod objects as arguments from context.js
// The state will be the cart whenever a product is added to car. This will handle any removing or adding products from cart
const SingleProduct = ({ prod }) => {
	const {
		state: { cart },
		dispatch,
	} = CartState();

	// testing - Whenever a item is added to the cart, it will update with the cart on new cart array with current items
	console.log(cart);

	return (
		<div className="products">
			<Card>
				{/* The image where it will be placed in the card */}
				<Card.Img variant="top" src={prod.image} alt={prod.productName} />

				<Card.Body>
					<Card.Title>{prod.productName}</Card.Title>
					<Card.Subtitle style={{ paddingBottom: 10 }}>
						<span>$ {prod.price.split(".")[0]}</span>
						{prod.fastDelivery ? (
							<div>Fast Delivery</div>
						) : (
							<div>4 days delivery</div>
						)}
						<Rating rating={prod.ratings} />
					</Card.Subtitle>
					{/* using the cart state variable from above, we use .some() to check if our product is in the cart, and if it is, we render the remove from cart button on the product card.  */}
					{cart.some((p) => p.id === prod.id) ? (
						// Remove button
						<Button
							onClick={() => {
								dispatch({
									type: "REMOVE_FROM_CART",
									payload: prod,
								});
							}}
							variant="danger"
						>
							Remove from cart
						</Button>
					) : (
						//{/* Add button */}
						/* Button will be disabled if product is out of stock */
						<Button
							onClick={() => {
								dispatch({
									type: "ADD_TO_CART",
									payload: prod,
								});
							}}
							disabled={!prod.inStock}
						>
							{/* enhanced if statement where if not in stock, it will say out of stock and if in stock, will show add to cart */}
							{!prod.inStock ? "Out of stock" : "Add to cart"}
						</Button>
					)}
				</Card.Body>
			</Card>
		</div>
	);
};

export default SingleProduct;
