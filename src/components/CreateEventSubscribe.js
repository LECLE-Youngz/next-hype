import React from "react";
import { useNavigate } from "react-router-dom";

const CreateEventSubscribe = () => {
	const navigate = useNavigate();

	return (
		<div className="flex justify-between">
			<h1 className="text-4xl text-gray-900">
				# Ongoing <span className="twinkle-text">events</span>{" "}
			</h1>
			<button
				className="bg-white border border-gray-900 hover:bg-gray-900 inline-block text-gray-900 hover:text-gray-100 px-5 py-3 h-min self-center text-2xl"
				onClick={() => navigate("/event")}
			>
				Summit
			</button>
		</div>
	);
};

export default CreateEventSubscribe;
