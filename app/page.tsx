"use client";
import Image from "next/image";
import { useEffect } from "react";
import Ceremony from "./_cards/ceremony";
import DressCode from "./_cards/dress_code";
import Pereira from "./_cards/pereira";
import RSVP from "./_cards/rsvp";
import SleepingArrangements from "./_cards/sleeping_arrangements";
import TCard from "./_components/card";
import Grid from "./_components/grid";
import Heroe from "./_components/heroe";
import { useHideStore } from "./_store/useHideStore";

interface IHome {}

const Home = (props: IHome) => {
	const { hide, setHide } = useHideStore();

	useEffect(() => {
		const timeout = setTimeout(() => {
			setHide(false);
		}, 2600);
		return () => clearTimeout(timeout);
	}, [setHide]);

	return (
		<div className="z-10 relative">
			<Grid
				hide={hide}
				heroe={<Heroe />}
				cards={[
					<TCard noImage>
						<Image src={"/assets/invitacion.png"} fill alt="foto lago" className="object-contain" />
					</TCard>,
					<TCard>
						<Ceremony />
					</TCard>,
					<TCard>
						<DressCode />
					</TCard>,
					<TCard>
						<SleepingArrangements />
					</TCard>,
					<TCard>
						<RSVP />
					</TCard>,
					<TCard>
						<Pereira />
					</TCard>,
					<TCard />,
					<TCard />,
				]}></Grid>
		</div>
	);
};
export default Home;
