"use client";
import { useHideStore } from "../_store/useHideStore";

interface INavbar {}

const Navbar = (props: INavbar) => {
	const { hide } = useHideStore();
	return (
		<div
			className={[
				"fixed z-50 top-5 left-5 right-5 shadow-lg h-10 rounded-lg transition-opacity duration-700 bg-background-2",
				hide ? "opacity-0" : "opacity-100",
			].join(" ")}></div>
	);
};
export default Navbar;
