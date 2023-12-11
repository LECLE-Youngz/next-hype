import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createSubscribingEvent } from "../helpers/social";
import { set } from "lodash";

const CreateEventSubscribe = () => {
	const navigate = useNavigate();
	const [params, setParams] = useState({
		unrevealUri: "",
		subscriptionId: "",
	});
	const [creating, setCreating] = useState(false);
	const [success, setSuccess] = useState(false);

	const submit = async () => {
		setCreating(true);
		let res = await createSubscribingEvent({
			subscriptionId: params.subscriptionId,
		});
		setSuccess(res);
		console.log(res)
		setCreating(false);
	};

	const submitTreasury = async () => {
		setCreating(true);
		let res = await createSubscribingEvent({
			subscriptionId: params.subscriptionId,
		});
		setSuccess(res);
		setCreating(false);
		navigate("/event");
	};

	const inputClass = {
		false: "bg-white border-gray-900 text-gray-900",
		true: "bg-gray-200 text-gray-900 border-gray-200",
	};

	useEffect(() => {
		if (params.subscriptionId === 0) {
			setParams({ ...params, subscriptionId: "" });
		}
	}, [params]);



	return (

		<div className="flex flex-col justify-between">
			{creating
				? <div className="fixed top-0 right-0 z-30 h-screen w-screen flex items-center justify-center bg-gray-900 bg-opacity-50 select-none">
					<div className="h-full w-full flex items-center justify-center">
						<div className="animate-spin rounded-full self-center h-16 w-16 border-t-2 border-b-2 border-gray-300"></div>
					</div>
				</div> : null
			}
			<div className="flex justify-between">
				<h1 className="text-4xl text-gray-900">
					# Ongoing <span className="twinkle-text">events</span>{" "}
				</h1>
				<button
					className="bg-white border border-gray-900 hover:bg-gray-900 inline-block text-gray-900 hover:text-gray-100 px-5 py-3 h-min self-center text-2xl"
					onClick={submit}
				>
					Submit
				</button>
			</div>
			<div className="flex justify-between gap-1 mx-10 mt-10 mb-8">
				<p className="border-b truncate w-full border-gray-900 text-2xl font-extralight">
					## create a lucky event (subscribe task)
				</p>
			</div>

			<div className="grid place-items-center mt-10">
				<div className="grid gap-5 w-1/3 my-auto self-center">
					<div className="">
						<div className="text-xs self-center mb-2">
							{"<!-- "}navigate to{" "}
							<a
								href="https://vrf.chain.link/fuji/new"
								target="_blank"
								rel="noreferrer"
								className="text-blue-700 hover:text-blue-800 hover:underline"
							>
								Chainlink VRF
							</a>
							, then follow the instructions to obtain the{" "}
							<span className="font-semibold">subscription id</span>
							{" -->"}
						</div>

						<input
							onChange={(e) =>
								setParams({ ...params, subscriptionId: e.target.value })
							}
							className={`${inputClass[params.subscriptionId === ""]
								} w-full h-12 p-3 border cursor-text focus:outline-black flex items-center justify-center `}
							type="number"
							placeholder="### subscription id"
							defaultValue={params.description}
						/>
					</div>
				</div>

				<h2 class="text-4xl font-bold mt-10 text-black-700 mb-2">Set up Lucky Treasury</h2>


				{/* New Form */}
				<div className="grid gap-5 w-1/3 my-auto self-center mt-4">
					<div className="">
						<div className="text-xs self-center mb-2">
							{"<!-- "}Address of the {" "}
							<span className="font-semibold">LuckyNFT </span>
							you just created
							{" -->"}
						</div>
						<input
							onChange={(e) => console.log(e.target.value)}
							className="w-full h-12 p-3 border cursor-text focus:outline-black flex items-center justify-center"
							type="text"
							placeholder="### LuckyNFT Address"
						/>
					</div>
					<div className="">
						<div className="text-xs self-center mb-2">
							{"<!-- "}How many {" "}
							<span className="font-semibold">Lucky Point </span>
							for subscriber in order to receive the NEXTHYPE token
							{" -->"}
						</div>
						<input
							onChange={(e) => console.log(e.target.value)}
							className="w-full h-12 p-3 border cursor-text focus:outline-black flex items-center justify-center"
							type="number"
							placeholder="Lucky point"
						/>
					</div>
					<div className="">
						<div className="text-xs self-center mb-2">
							{"<!-- "}The amount reward for each {" "}
							<span className="font-semibold"> winning user </span>
							{" -->"}
						</div>
						<input
							onChange={(e) => console.log(e.target.value)}
							className="w-full h-12 p-3 border cursor-text focus:outline-black flex items-center justify-center"
							type="number"
							placeholder="NEXTHYPE Token reward amount"
						/>
					</div>

					<button
						className="bg-white border border-gray-900 hover:bg-gray-900 inline-block text-gray-900 hover:text-gray-100 px-5 py-3 h-min self-center text-2xl"
						onClick={submitTreasury}
					>
						Create Treasury
					</button>
				</div>
			</div>
			{success ?
				<div id="toast-success" class="fixed top-20 right-10">
					<div class="flex items-center w-auto p-4 mb-4 text-gray-500 bg-gray-800 rounded-lg shadow dark:text-gray-400 dark:bg-white" role="alert">
						<div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
							<svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
								<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
							</svg>
							<span class="sr-only">Check icon</span>
						</div>
						<div class="ms-3 text-sm font-normal text-gray-900">{success ? success : "Success"}</div>
						<button type="button"
							onClick={() => setSuccess(false)}
							class="ms-auto -mx-1.5 -my-1.5 bg-gray-800 text-gray-500 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-white dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
							<span class="sr-only">Close</span>
							<svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
								<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
							</svg>
						</button>
					</div>
				</div>
				: null
			}
		</div>

	);
};

export default CreateEventSubscribe;

