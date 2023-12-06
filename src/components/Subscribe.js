import React, { useEffect, useState } from "react";

const Subscribe = ({ user, setSubscribePopup }) => {
	const [onSummit, setOnSummit] = useState(false);
	const [onSuccess, setOnSuccess] = useState(null);
	const [choice, setChoice] = useState(0);
	const [subscription, setSubscription] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			setSubscription([1, 3, 30]);
		};

		fetchData();
	}, []);

	const summit = async () => {
		setOnSummit(true);

		const res = true;

		setOnSuccess(res);
		setOnSummit(false);
	};

	const inputClass = {
		false: "bg-gray-200 text-gray-900 border-gray-200",
		true: "bg-white border-gray-900 text-gray-900",
	};

	if (subscription === null) {
		return (
			<div className="fixed top-0 right-0 z-30 h-screen w-screen flex items-center justify-center bg-gray-900 bg-opacity-50 select-none">
				<div className="h-full w-full flex items-center justify-center">
					<div className="animate-spin rounded-full self-center h-16 w-16 border-t-2 border-b-2 border-gray-300"></div>
				</div>
			</div>
		);
	}

	return (
		<div className="fixed top-0 right-0 z-30 h-screen w-screen flex items-center justify-center bg-gray-900 bg-opacity-50 select-none">
			<div className="flex items-center justify-center text-gray-500 md:w-8/12 lg:w-6/12 xl:w-5/12">
				<div className="bg-white shadow-xl w-full px-16 py-5 h-3/4">
					<h3 className="self-center text-4xl mt-4 mb-5 text-gray-900">
						# Subscribe
					</h3>
					<div class="container mx-auto">
						<p className="font-semibold ml-10 text-gray-500">
							you are about to subscribe
							<span className="font-semibold twinkle-text"> {user.name} </span>
						</p>
						<p className="text-center text-gray-500 mt-5 text-2xl">
							you will have{" "}
							<span className="font-semibold twinkle-text">full access</span> to
							<ul className="mt-2 text-base list-inside text-gray-500">
								<li>all exclusive posts</li>
								<li>all exclusive nfts</li>
								<li>all non-public generation data</li>
							</ul>
						</p>
						<div className="grid grid-cols-3 gap-4 mt-10 mx-10">
							<button
								className={`${
									inputClass[choice === 0]
								} border cursor-pointer none flex flex-col items-center justify-evenly p-3 h-56`}
								onClick={() => setChoice(0)}
								defaultValue={choice === 0}
							>
								<div className="grid gap-1">
									<p className="text-2xl text-gray-900 font-semibold">weekly</p>
									<p className="col-span-2 text-lg text-gray-500 font-semibold">
										{subscription[0]} avax
									</p>
									<hr className="w-11/12 border-gray-300 my-4 mx-auto" />
								</div>
								<p className="text-sm text-gray-500 font-light h-14">
									become a member for <b className="font-semibold">7 days</b>,
									good for starters
								</p>
							</button>
							<button
								className={`${
									inputClass[choice === 1]
								} border cursor-pointer none flex flex-col items-center justify-evenly p-3 h-56`}
								onClick={() => setChoice(1)}
								defaultValue={choice === 1}
							>
								<div className="grid gap-1">
									<p className="text-2xl text-gray-900 font-semibold">
										monthly
									</p>
									<p className="col-span-2 text-lg text-gray-500 font-semibold">
										{subscription[1]} avax
									</p>
								</div>
								<hr className="w-11/12 border-gray-300 my-4 mx-auto" />
								<p className="text-sm text-gray-500 font-light h-14">
									become a member for <b className="font-semibold">30 days</b>{" "}
									with a cheaper price
								</p>
							</button>
							<button
								className={`${
									inputClass[choice === 2]
								} border cursor-pointer none flex flex-col items-center justify-evenly p-3 h-56`}
								onClick={() => setChoice(2)}
								defaultValue={choice === 2}
							>
								<div className="grid gap-1">
									<p className="text-2xl text-gray-900 font-semibold">
										half-yearly
									</p>
									<p className="col-span-2 text-lg text-gray-500 font-semibold">
										{subscription[2]} avax
									</p>
								</div>
								<hr className="w-11/12 border-gray-300 my-4 mx-auto" />
								<p className="text-sm text-gray-500 font-light h-14">
									become a member for <b className="font-semibold">180 days</b>{" "}
									with the most favorable price
								</p>
							</button>
						</div>
						<div className="container mx-auto grid gap-2 mt-10 w-1/2">
							<button
								className="border py-4 px-8 border-gray-900 text-gray-900 hover:grad hover:border-transparent hover:text-white duration-300 disabled:pointer-events-none disabled:grad disabled:border-transparent"
								onClick={() => summit()}
								disabled={onSummit || onSuccess}
							>
								<div className="relative flex items-center space-x-4 justify-center text-lg">
									{!onSummit && !onSuccess ? (
										<p className="block w-max">
											{onSuccess === null ? "Purchase" : "Failed!"}
										</p>
									) : !onSuccess ? (
										<div className="animate-spin rounded-full h-7 w-7 border-b-2 border-white"></div>
									) : (
										<svg
											className="h-7 w-7 fill-white"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 50 50"
										>
											<path d="M 41.957031 8.9765625 A 2.0002 2.0002 0 0 0 40.333984 9.8945312 L 21.503906 38.279297 L 9.3261719 27.501953 A 2.0007191 2.0007191 0 1 0 6.6738281 30.498047 L 20.574219 42.796875 A 2.0002 2.0002 0 0 0 23.566406 42.40625 L 43.666016 12.105469 A 2.0002 2.0002 0 0 0 41.957031 8.9765625 z"></path>
										</svg>
									)}
								</div>
							</button>
						</div>
					</div>
					<div className="py-10 space-y-2 text-gray-600 sm:-mb-8">
						<p className="text-xs">
							{"<!-- "}you will receive{" "}
							<span className="underline underline-offset-2">an nft</span> as a
							proof of your subscription, it expires after the chosen period
							{" -->"}
						</p>
						<p className="text-xs">
							{"<!-- "}your charge will be{" "}
							<span className="underline underline-offset-2">higher than</span>{" "}
							the price shown up due to the network fee{" -->"}
						</p>
					</div>
				</div>
			</div>
			<div
				className="h-screen w-screen absolute -z-10"
				onClick={() => !onSummit && setSubscribePopup(false)}
			></div>
		</div>
	);
};

export default Subscribe;
