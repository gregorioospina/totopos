"use client";

import ArtListing from "@/_cards/art-listing";
import { useHideStore } from "@/_store/useHideStore";
import { useEffect } from "react";

export default function ArtListingPage() {
	const { setHide } = useHideStore();
	useEffect(() => {
		setHide(false);
	}, []);
	return <ArtListing />;
}
