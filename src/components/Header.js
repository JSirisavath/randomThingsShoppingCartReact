import React from "react";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"; // shopping cart icon
import {
	Badge,
	Button,
	Container,
	Dropdown,
	FormControl,
	Navbar,
} from "react-bootstrap"; // components being imported from react-bootstrap

import { Link } from "react-router-dom"; // Link to other pages we create
import { CartState } from "../context/Context";
import { AiFillDelete } from "react-icons/ai";

// RAFCE

const Header = () => {
	const {
		state: { cart },
		dispatch,
		productDispatch,
	} = CartState();
	return (
		// Dark mode style for header
		<Navbar bg="dark" variant="dark" style={{ height: 80 }}>
			<Container>
				<Navbar.Brand>
					<Link to="/">Fantastical Contours.shop</Link>
				</Navbar.Brand>

				{/* Search bar class*/}
				<Navbar.Text className="search">
					{/* This is for input tag */}
					<FormControl
						style={{ width: 500 }}
						placeholder="Search a product..."
						className="m-auto"
						onChange={(e) => {
							productDispatch({
								type: "FILTER_BY_SEARCH",
								payload: e.target.value,
							});
						}}
					></FormControl>
				</Navbar.Text>

				<Dropdown menuAlign="right">
					<Dropdown.Toggle variant="success">
						<ShoppingCartIcon
							color="white"
							fontSize="25px"
							style={{ marginLeft: "auto", marginRight: "1rem" }}
						/>
						{/* "cart" has access to state attributes. So, when ever a product was removed or added, it will count the length of objects inside the array */}
						<Badge>{cart.length}</Badge>
					</Dropdown.Toggle>

					<Dropdown.Menu style={{ minWidth: 370 }}>
						{cart.length > 0 ? (
							<>
								{cart.map((prod) => (
									<span className="cartItem" key={prod.id}>
										<img
											src={prod.image}
											className="cartItemImg"
											alt={prod.productName}
										/>

										<div className="cartItemDetail">
											<span>{prod.productName}</span>
											<span>$ {prod.price.split(".")[0]}</span>
										</div>
										<AiFillDelete
											fontSize="20px"
											style={{ cursor: "pointer" }}
											onClick={() =>
												dispatch({ type: "REMOVE_FROM_CART", payload: prod })
											}
										/>
									</span>
								))}
								<Link to={"/cart"}>
									<Button style={{ width: "95%", margin: "0 10px" }}>
										Go To Cart
									</Button>
								</Link>
							</>
						) : (
							<span style={{ padding: 10 }}>Cart is Empty!</span>
						)}
					</Dropdown.Menu>
				</Dropdown>
			</Container>
		</Navbar>
	);
};

export default Header;
