"use client";
import Image from "next/image";
import { useEffect } from "react";
import Ceremony from "./_cards/ceremony";
import Contactos from "./_cards/contactos";
import DressCode from "./_cards/dress_code";
import Panorama from "./_cards/panorama";
import Pereira from "./_cards/pereira";
import SleepingArrangements from "./_cards/sleeping_arrangements";
import Turismo from "./_cards/turismo";
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
					<TCard image="/assets/pereira.webp" imageClassName="object-center object-cover">
						<Pereira />
					</TCard>,
					<TCard>
						<SleepingArrangements />
					</TCard>,
					<TCard>
						<DressCode />
					</TCard>,
					<TCard>
						<Panorama />
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
export default Home;
