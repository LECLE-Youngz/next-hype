import { useState } from "react";
import { forwardAddressRegister, turnOnCreatorMode } from "../helpers/user";
import { parseAddress, parseAmount } from "../libs/blockchain";

function EnableCreatorMode({ setEnableCreatorModePopup }) {
	const [onSummitFirst, setOnSummitFirst] = useState(false);
	const [onSuccessFirst, setOnSuccessFirst] = useState(null);
	const [onSummitSecond, setOnSummitSecond] = useState(false);
	const [onSuccessSecond, setOnSuccessSecond] = useState(null);
	const [address, setAddress] = useState("");
	const [automaticAddress, setAutomaticAddress] = useState("");
	const [copy, setCopy] = useState("click to copy");

	const summitFirst = async () => {
		setOnSummitFirst(true);

		const res = await turnOnCreatorMode([
			parseAmount(plans.weekly),
			parseAmount(plans.monthly),
			parseAmount(plans.halfYearly),
		]);

		setOnSuccessFirst(res[0]);
		setAddress(res[1]);
		setOnSummitFirst(false);
	};

	const summitSecond = async () => {
		setOnSummitSecond(true);

		const res = await forwardAddressRegister(automaticAddress, address);

		setOnSuccessSecond(res);
		setOnSummitSecond(false);
	};

	const [plans, setPlans] = useState({
		weekly: 0,
		monthly: 0,
		halfYearly: 0,
	});

	const inputClass = {
		false: "bg-white border-gray-900 text-gray-900",
		true: "bg-gray-200 text-gray-900 border-gray-200",
	};

	const resetTooltip = () => {
		setTimeout(() => {
			setCopy("click to copy");
		}, 50);
		document.removeEventListener("mouseout", resetTooltip);
	};
	const copyText = (text) => {
		navigator.clipboard.writeText(text);
		setCopy("Copied to clipboard!");
		document.addEventListener("mouseout", resetTooltip);
	};

	const validFirst = () =>
		plans.weekly !== 0 && plans.monthly !== 0 && plans.halfYearly !== 0;

	const validSecond = () => automaticAddress !== "";

	return (
		<div className="fixed top-0 right-0 z-30 h-screen w-screen flex items-center justify-center bg-gray-900 bg-opacity-50 select-none">
			<div className="flex items-center justify-center text-gray-500 md:w-11/12 lg:w-8/12 xl:w-2/3 w-full">
				<div className="bg-white shadow-xl w-full px-16 py-5">
					<h3 className="self-center text-4xl mt-4 mb-5 text-gray-900">
						# Enable creator mode
					</h3>
					<div className="flex justify-between gap-1 mx-10 mt-10 mb-8">
						<p className="border-b truncate w-1/2 border-gray-900 text-2xl font-extralight">
							## set-up your plans to subscribers
						</p>
						<p className="w-min border-gray-900 text-2xl font-extralight">/</p>
						<p className="border-b truncate w-1/2 border-gray-900 text-2xl font-extralight text-right">
							## set-up your exclusive collection
						</p>
					</div>
					<div class="container mx-auto">
						<div className="grid grid-cols-2 gap-4">
							<div className="grid space-y-5 mx-10">
								<div className="flex items-center justify-center">
									<input
										type="text"
										placeholder="### weekly"
										className={`${
											inputClass[plans.weekly === ""]
										}  w-full h-12 p-3 border cursor-text focus:outline-black flex items-center justify-center`}
										onChange={(e) =>
											setPlans({
												...plans,
												weekly: e.target.value,
											})
										}
									/>
									<p className="text-lg mx-6">AVAX</p>
								</div>
								<div className="flex items-center justify-center">
									<input
										type="text"
										placeholder="### monthly"
										className={`${
											inputClass[plans.monthly === ""]
										}  w-full h-12 p-3 border cursor-text focus:outline-black flex items-center justify-center`}
										onChange={(e) =>
											setPlans({
												...plans,
												monthly: e.target.value,
											})
										}
									/>
									<p className="text-lg mx-6">AVAX</p>
								</div>
								<div className="flex items-center justify-center">
									<input
										type="text"
										placeholder="### half-yearly"
										className={`${
											inputClass[plans.halfYearly === ""]
										}  w-full h-12 p-3 border cursor-text focus:outline-black flex items-center justify-center`}
										onChange={(e) =>
											setPlans({
												...plans,
												halfYearly: e.target.value,
											})
										}
									/>
									<p className="text-lg mx-6">AVAX</p>
								</div>
								<div className="flex">
									<button
										className={`${
											onSummitFirst || onSuccessFirst
												? "border-gray-500 cursor-default"
												: "hover:border-gray-500"
										} group h-12 w-40 mt-5 mx-auto border border-gray-900 hover:bg-gray-900 transition duration-300 disabled:cursor-default disabled:pointer-events-none`}
										onClick={() => summitFirst()}
										disabled={!validFirst() || onSuccessFirst || onSummitFirst}
									>
										<div className="relative flex items-center space-x-4 justify-center">
											<span className="block text-gray-900 text-sm transition duration-300 group-hover:text-gray-200 sm:text-base">
												{!onSummitFirst && !onSuccessFirst ? (
													<p>
														{onSuccessFirst === null ? "Deploy" : "Failed!"}
													</p>
												) : !onSuccessFirst ? (
													<div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-500"></div>
												) : (
													<svg
														className="h-6 w-6 fill-gray-500"
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 50 50"
													>
														<path d="M 41.957031 8.9765625 A 2.0002 2.0002 0 0 0 40.333984 9.8945312 L 21.503906 38.279297 L 9.3261719 27.501953 A 2.0007191 2.0007191 0 1 0 6.6738281 30.498047 L 20.574219 42.796875 A 2.0002 2.0002 0 0 0 23.566406 42.40625 L 43.666016 12.105469 A 2.0002 2.0002 0 0 0 41.957031 8.9765625 z"></path>
													</svg>
												)}
											</span>
										</div>
									</button>
								</div>
							</div>
							<div className="flex flex-col space-y-5 mx-10">
								{onSuccessFirst === true ? (
									<>
										<div
											className="group relative border border-gray-200 hover:border-gray-300 col-span-3 hover:bg-gray-200 hover:cursor-pointer py-2 pr-4 hover:text-gray-800 w-full h-min flex justify-between"
											onClick={() => copyText(address)}
										>
											<p className="text-lg mx-4">{parseAddress(address)}</p>
											<span className="self-center pointer-events-none opacity-0 font-semibold transition-opacity group-hover:opacity-100">
												{copy}
											</span>
										</div>
										<div className="grid h-12">
											<div className="text-xs self-center">
												{"<!-- "}Copy the{" "}
												<span className="font-semibold">above address</span> and
												paste it to{" "}
												<a
													href="https://automation.chain.link/new-custom-logic"
													target="_blank"
													rel="noreferrer"
													className="text-blue-700 hover:text-blue-800 hover:underline"
												>
													Chainlink Automation
												</a>
												, then follow the instructions to obtain the{" "}
												<span className="font-semibold">forwarder address</span>
												.{" -->"}
											</div>
										</div>

										<div className="flex items-center justify-center">
											<input
												type="text"
												placeholder="### forwarder address"
												className={`${
													inputClass[automaticAddress === ""]
												}  w-full h-12 p-3 border cursor-text focus:outline-black flex items-center justify-center`}
												onChange={(e) => setAutomaticAddress(e.target.value)}
											/>
										</div>
										<div className="flex">
											<button
												className={`${
													onSummitSecond || onSuccessSecond
														? "border-gray-500 cursor-default"
														: "hover:border-gray-500"
												} group h-12 w-40 mt-5 mx-auto border border-gray-900 hover:bg-gray-900 transition duration-300 disabled:cursor-default disabled:pointer-events-none`}
												onClick={() => summitSecond()}
												disabled={
													!validSecond() || onSuccessSecond || onSummitSecond
												}
											>
												<div className="relative flex items-center space-x-4 justify-center">
													<span className="block text-gray-900 text-sm transition duration-300 group-hover:text-gray-200 sm:text-base">
														{!onSummitSecond && !onSuccessSecond ? (
															<p>
																{onSuccessSecond === null
																	? "Complete"
																	: "Failed!"}
															</p>
														) : !onSuccessSecond ? (
															<div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-500"></div>
														) : (
															<svg
																className="h-6 w-6 fill-gray-500"
																xmlns="http://www.w3.org/2000/svg"
																viewBox="0 0 50 50"
															>
																<path d="M 41.957031 8.9765625 A 2.0002 2.0002 0 0 0 40.333984 9.8945312 L 21.503906 38.279297 L 9.3261719 27.501953 A 2.0007191 2.0007191 0 1 0 6.6738281 30.498047 L 20.574219 42.796875 A 2.0002 2.0002 0 0 0 23.566406 42.40625 L 43.666016 12.105469 A 2.0002 2.0002 0 0 0 41.957031 8.9765625 z"></path>
															</svg>
														)}
													</span>
												</div>
											</button>
										</div>
									</>
								) : (
									<div className="text-center my-auto">
										<p className="text-lg mx-4">
											Waiting for the deployment process...
										</p>
									</div>
								)}
							</div>
						</div>
					</div>
					<div className="py-10 space-y-2 text-gray-600 sm:-mb-8">
						<p className="text-xs">
							{"<!-- "}Your charge is only for gas fee calculated by the{" "}
							<span className="font-semibold">LINK</span> network{" -->"}
						</p>
						<p className="text-xs">
							{"<!-- "}We do not take any fees from your minting process
							{" -->"}
						</p>
					</div>
				</div>
			</div>
			<div
				className="h-screen w-screen absolute -z-10"
				onClick={() =>
					!onSummitFirst && !onSummitSecond && setEnableCreatorModePopup(false)
				}
			></div>
		</div>
	);
}

export default EnableCreatorMode;
