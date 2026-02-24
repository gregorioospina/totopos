"use client";

import Regalos from "@/_cards/regalos";
import { useHideStore } from "@/_store/useHideStore";
import { useEffect } from "react";

export default function Home() {
	const { setHide } = useHideStore();

	useEffect(() => {
		setHide(false);
	}, []);

	return <Regalos />;
}
