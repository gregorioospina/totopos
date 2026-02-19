"use client";
import { motion } from "motion/react";
import { useHideStore } from "../_store/useHideStore";
import FallingImages from "./falling_images";

interface IHeroe {}

const Heroe = (props: IHeroe) => {
	const { hide } = useHideStore();
	return (
		<div className="relative overflow-visible">
			<div className="flex flex-col absolute top-1/2 px-[7%] translate-y-[-50%] z-40">
				<p className="text-white text-8xl md:text-[5rem] leading-16  font-title font-black">Diego</p>
				<motion.p
					className="text-orange-500  leading-32 md:leading-52 font-details text-[10rem] md:text-[15rem]"
					animate={
						hide
							? {
									scale: [1, 1.1, 1],
									textShadow: ["0 0 0px rgba(249, 115, 22, 0)", "0 0 30px rgba(249, 115, 22, 0.8)", "0 0 0px rgba(249, 115, 22, 0)"],
								}
							: { scale: 1, textShadow: "0 0 0px rgba(249, 115, 22, 0)" }
					}
					transition={
						hide
							? {
									duration: 1,
									repeat: 3,
									ease: "easeInOut",
								}
							: {}
					}>
					&
				</motion.p>
				<p className="text-white md:-mt-5 -mt-2  text-8xl md:text-[5rem] leading-16  font-title font-black">Maca</p>
			</div>
			<p className=""></p>
			<FallingImages />
		</div>
	);
};

export default Heroe;
