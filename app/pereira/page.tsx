"use client";

import Contactos from "@/_cards/contactos";
import Pereira from "@/_cards/pereira";
import SleepingArrangements from "@/_cards/sleeping_arrangements";
import Turismo from "@/_cards/turismo";
import TCard from "@/_components/card";
import Grid from "@/_components/grid";
import { useHideStore } from "@/_store/useHideStore";
import { useEffect } from "react";

interface IPereiraHome {}

const PereiraHome = (props: IPereiraHome) => {
	const { setHide } = useHideStore();

	useEffect(() => {
		setHide(false);
	}, []);

	return (
		<div className="z-10 relative">
			<Grid
				hide={false}
				cards={[
					<TCard image="/assets/pereira.webp" imageClassName="object-center object-cover">
						<Pereira />
					</TCard>,
					<TCard>
						<SleepingArrangements />
					</TCard>,
					<TCard>
						<Turismo />
					</TCard>,
					<TCard>
						<Contactos />
					</TCard>,
				]}></Grid>
		</div>
	);
};
export default PereiraHome;
