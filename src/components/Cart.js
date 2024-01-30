import React, { useEffect, useState } from "react";
import { CartState } from "../context/Context";
import {
	Button,
	Col,
	FormControl,
	ListGroup,
	Row,
	Image,
} from "react-bootstrap";
import Rating from "./Rating";
import { AiFillDelete } from "react-icons/ai";

const Cart = () => {
	const {
		state: { cart },
		dispatch,
	} = CartState();

	const [total, setTotal] = useState();

	useEffect(() => {
		setTotal(
			cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
		);
	}, [cart]);
	return (
		<div className="home">
			{/* Product container when at the checkout cart page */}
			<div className="productContainer">
				{/* List group */}
				<ListGroup>
					{cart.map((prod) => (
						<ListGroup.Item key={prod.id}>
							<Row>
								<Col md={2}>
									<Image
										src={prod.image}
										alt={prod.productName}
										fluid
										rounded
									/>
								</Col>
								<Col md={2}>
									<span>{prod.productName}</span>
								</Col>

								<Col md={2}>
									<span>${prod.price}</span>
								</Col>
								<Col md={2}>
									<Rating rating={prod.ratings} />
								</Col>
								<Col md={2}>
									<FormControl
										as="select"
										value={prod.qty}
										onChange={(e) =>
											dispatch({
												type: "CHANGE_CART_QTY",
												payload: {
													id: prod.id,
													qty: e.target.value,
												},
											})
										}
									>
										{[...Array(prod.inStock).keys()].map((x) => (
											<option key={x + 1}>{x + 1}</option>
										))}
									</FormControl>
								</Col>

								<Col>
									{/* Remove Button  */}
									<AiFillDelete
										fontSize="20px"
										style={{ cursor: "pointer" }}
										onClick={() =>
											dispatch({ type: "REMOVE_FROM_CART", payload: prod })
										}
									/>
								</Col>
							</Row>
						</ListGroup.Item>
					))}
				</ListGroup>
			</div>
			<div className="filtersSummary">
				<span className="title">Subtotal ({cart.length}) items</span>
				<span style={{ fontWeight: 700, fontSize: 20 }}>Total: ${total}</span>
				<Button type="button" disabled={cart.length === 0}>
					Proceed To Checkout
				</Button>
			</div>
		</div>
	);
};

export default Cart;
