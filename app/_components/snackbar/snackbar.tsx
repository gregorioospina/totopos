"use client";

import { useEffect } from "react";

interface ISnackbar {
	open: boolean;
	message: string;
	onClose: () => void;
}

const Snackbar = ({ open, message, onClose }: ISnackbar) => {
	useEffect(() => {
		if (!open) return;
		const timer = setTimeout(onClose, 3000);
		return () => clearTimeout(timer);
	}, [open, onClose]);

	return (
		<div
			className={[
				"fixed bottom-6 left-1/2 -translate-x-1/2 z-[1000]",
				"bg-foreground text-white rounded-lg px-5 py-3 body-small shadow-lg",
				"transition-opacity duration-300 pointer-events-none whitespace-nowrap",
				open ? "opacity-100" : "opacity-0",
			].join(" ")}>
			{message}
		</div>
	);
};

export default Snackbar;
