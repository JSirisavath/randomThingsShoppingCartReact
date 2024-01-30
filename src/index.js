import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

/* The following line can be included in your src/index.js or App.js file */
import "bootstrap/dist/css/bootstrap.min.css";
import Context from "./context/Context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		{/* This is from our context file. We are essentially wrapping our app file inside context when our app first renders. Keep in mind that app is a children prop that is being passed through inside Context.js */}
		<Context>
			<App />
		</Context>
	</React.StrictMode>
);
