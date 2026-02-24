"use client";

import Regalos from "@/_cards/regalos";
import TCard from "@/_components/card";
import { useHideStore } from "@/_store/useHideStore";
import { useEffect } from "react";

export default function Home() {
	const { setHide } = useHideStore();

	useEffect(() => {
		setHide(false);
	}, []);

	return (
		<div className="z-10 relative py-20 flex justify-center">
			<TCard noImage>
				<Regalos />
			</TCard>
		</div>
	);
}
