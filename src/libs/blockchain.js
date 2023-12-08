import { Big } from "bigdecimal.js";

export const parsePrice = (amount) => {
	return Big(amount).divide(1e18).toString();
};

export const parseAmount = (price) => {
	return Big(price).multiply(1e18).toBigInt().toString();
};

export const parseAddress = (address) => {
	return address.slice(0, 8) + " ... " + address.slice(-6);
};
