"use client";
import { motion } from "motion/react";
import { useHideStore } from "../_store/useHideStore";
import FallingImages from "./falling_images";

interface IHeroe {}

const Heroe = (props: IHeroe) => {
	const { hide } = useHideStore();
	return (
		<div className="relative ">
			<div className="flex flex-col absolute top-1/2 px-[7%] translate-y-[-50%] z-40">
				<p className="text-white text-8xl md:text-[5rem] leading-16  font-title font-black">Diego</p>
				<motion.img
					src="/assets/loading_turtle.png"
					alt="tortuga"
					width={150}
					height={150}
					className="object-contain"
					initial={{ opacity: 0, x: "calc(50vw - 50% - 7vw)" }}
					animate={
						hide
							? {
									opacity: [0.6, 1, 0.6],
									x: "calc(50vw - 50% - 7vw)",
								}
							: { opacity: 1, x: 0 }
					}
					transition={
						hide
							? {
									opacity: {
										duration: 0.7,
										repeat: 2,
										ease: "easeInOut",
									},
									x: {
										delay: 2,
										duration: 0.7,
										ease: "easeOut",
									},
								}
							: {
									x: {
										delay: 0,
										duration: 0.7,
										ease: "easeOut",
									},
								}
					}
				/>
				<p className="text-white md:-mt-5 -mt-2  text-8xl md:text-[5rem] leading-16  font-title font-black">Maca</p>
			</div>
			<p className=""></p>
			<FallingImages />
		</div>
	);
};

export default Heroe;
