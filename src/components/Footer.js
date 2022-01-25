import React, { useState, useEffect } from "react";

function Footer() {
	const [dateState, setDateState] = useState(new Date());
	useEffect(() => {
		setInterval(() => setDateState(new Date()), 30000);
	}, []);
	return (
		<div
			className="bg-primary py-1 mt-4 text-center text-white position-fixed bottom-0"
			style={{ width: "100%" }}
		>
			<p
				style={{
					fontWeight: "800",
					color: "#ffcd39",
					WebkitTextStroke: "0.5px black",
					margin: "0",
				}}
			>
				{dateState.toLocaleDateString("pl-PL", {
					day: "2-digit",
					month: "2-digit",
					year: "numeric",
				})}{" "}
				{dateState.toLocaleString("pl-PL", {
					hour: "numeric",
					minute: "numeric",
					hour12: false,
				})}
			</p>
		</div>
	);
}

export default Footer;
