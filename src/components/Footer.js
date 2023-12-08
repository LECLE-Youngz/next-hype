import React from "react";
import { avalancheLogo, chainlinkLogo, theGraphLogo } from "../data";

export default function Footer() {
	return (
		<footer className="relative bg-gray-900 pt-8 z-0">
			<div
				className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
				style={{ height: "80px" }}
			>
				<svg
					className="absolute bottom-0 overflow-hidden"
					xmlns="http://www.w3.org/2000/svg"
					preserveAspectRatio="none"
					version="1.1"
					viewBox="0 0 2560 100"
					x="0"
					y="0"
				>
					<polygon
						className="text-gray-900 fill-current"
						points="2560 0 2560 100 0 100"
					></polygon>
				</svg>
			</div>
			<section className="bg-gray-900 pb-8 text-center text-gray-400 sm:px-4">
				<div className="container mx-auto px-4 relative flex justify-between">
					<div className="mx-auto w-2/3">
						<h2 className="capitalize mb-4 text-3xl text-white">
							Explore / Create / Trade / Walletless
						</h2>
						<p className="font-light fw-light mb-6">
							Liberate your creativity with NFTs powered by AI. Create, collect,
							and trade digital items secured by blockchain technology. Fully
							decentralized marketplace, no wallet required.
						</p>
					</div>
					<div className="flex flex-col justify-between -mt-16 w-1/3 items-end pr-5">
						<p className="text-white text-lg font-light mb-2">Powered by</p>
						<img src={chainlinkLogo} alt="Chainlink" className="w-3/12" />
						<img src={avalancheLogo} alt="Avalanche" className="w-2/5" />
						<img src={theGraphLogo} alt="The Graph" className="w-1/5" />
					</div>
				</div>
			</section>
		</footer>
	);
}
