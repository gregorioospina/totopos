"use client";
import Image from "next/image";
import { useEffect } from "react";
import Ceremony from "./_cards/ceremony";
import DressCode from "./_cards/dress_code";
import SleepingArrangements from "./_cards/sleeping_arrangements";
import BottomMenu from "./_components/bottom-menu";
import TCard from "./_components/card";
import Grid from "./_components/grid";
import Heroe from "./_components/heroe";
import { useHideStore } from "./_store/useHideStore";

interface IHome {}

const Home = (props: IHome) => {
	const { hide, setHide } = useHideStore();

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, []);

	useEffect(() => {
		setHide(true);
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
					<TCard id="dress-code-card">
						<DressCode />
					</TCard>,
					<TCard>
						<SleepingArrangements />
					</TCard>,
					<BottomMenu />,
				]}></Grid>
		</div>
	);
};
export default Home;
