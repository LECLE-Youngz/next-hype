import { exclusive } from ".";

export const setForwarderAddress = async (forwarderAddress, address) => {
	const contract = await exclusive(address);
	const res = await contract
		.setForwarderAddress(forwarderAddress)
		.then((tx) => tx.wait());
	return res;
};

export const s_forwarderAddress = async (address) => {
	const contract = await exclusive(address);
	const res = await contract.s_forwarderAddress();
	return res;
};
