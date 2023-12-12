import { mysteryBox } from ".";

export const publicMint = async (amount) => {
	const contract = await mysteryBox();
	const res = await contract
		.publicMint(amount)
		.then((tx) => tx.wait());

	return res;
};

export const privateMint = async (amount, proof) => {
	const contract = await mysteryBox();
	const res = await contract
		.privateMint(amount, proof)
		.then((tx) => tx.wait());

	return res;
};