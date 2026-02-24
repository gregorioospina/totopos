"use client";

import FAQ from "@/_cards/faq";
import { useHideStore } from "@/_store/useHideStore";
import { useEffect } from "react";

export default function FaqHome() {
	const { setHide } = useHideStore();

	useEffect(() => {
		setHide(false);
	}, []);

	return (
		<div className="z-10 relative py-20 flex justify-center">
			<div className="md:max-w-150 md:w-1/2 w-[90svw] relative bg-background-2 h-[80svh] md:aspect-12/16 shadow-[0pt_4pt_10px_-7px_#0000007a] rounded-md max-h-[90%]">
				<FAQ />
			</div>
		</div>
	);
}
