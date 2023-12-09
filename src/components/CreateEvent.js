import React from "react";
import { useNavigate } from "react-router-dom";

const CreateEvent = ({ setCreateEvent }) => {
	const navigate = useNavigate();

	return (
		<div className="fixed top-0 right-0 z-30 h-screen w-screen flex items-center justify-center bg-gray-900 bg-opacity-50 select-none">
			<div className="flex items-center justify-center text-gray-500 md:w-11/12 lg:w-3/4 xl:w-1/2 w-3/4">
				<div className="bg-white shadow-xl w-full px-16 py-5 relative">
					<div className="flex justify-between">
						<h3 className="mt-5 self-center text-4xl text-gray-900">
							# Select task
						</h3>
					</div>
					<div className="mt-10 mx-10 flex justify-between">
						<button
							className="bg-white border border-gray-900 hover:bg-gray-900 inline-block text-gray-900 hover:text-gray-100 px-5 py-3 h-min self-center text-2xl"
							onClick={() => navigate("/event/follow")}
						>
							Follow task
						</button>
						<button
							className="bg-white border border-gray-900 hover:bg-gray-900 inline-block text-gray-900 hover:text-gray-100 px-5 py-3 h-min self-center text-2xl"
							onClick={() => navigate("/event/subscribe")}
						>
							Subscribe task
						</button>
						<button
							className="bg-white border border-gray-900 hover:bg-gray-900 inline-block text-gray-900 hover:text-gray-100 px-5 py-3 h-min self-center text-2xl"
							onClick={() => navigate("/event/purchase")}
						>
							Purchase task
						</button>
					</div>
					<div className="py-10 space-y-2 text-gray-600 sm:-mb-8">
						<p className="text-xs">
							{"<!-- "}Actions to your owned NFTs is accessed from here.{" -->"}
						</p>
						<p className="text-xs">
							{"<!-- "}Any action will all need to send a transaction to the
							blockchain.{" -->"}
						</p>
					</div>
				</div>
			</div>
			<div
				className="h-screen w-screen absolute -z-10"
				onClick={() => setCreateEvent(false)}
			></div>
		</div>
	);
};

export default CreateEvent;
