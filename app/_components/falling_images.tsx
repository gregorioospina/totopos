"use client";

import { motion } from "motion/react";
import Image from "next/image";
import "./falling_images.css";

interface ImageConfig {
	src: string;
	alt: string;
	finalPosition: {
		top: string;
		left: string;
	};
	size: {
		width: number;
		height: number;
	};
	delay: number;
}

const FallingImages = () => {
	const images: ImageConfig[] = [
		{
			src: "/assets/them/aisle.png",
			alt: "Aisle",
			finalPosition: { top: "0%", left: "0%" },
			size: { width: 400, height: 400 },
			delay: 2.0,
		},
		{
			src: "/assets/them/ring.png",
			alt: "Ring",
			finalPosition: { top: "35%", left: "3%" },
			size: { width: 250, height: 250 },
			delay: 2.3,
		},
		{
			src: "/assets/them/aisle.png",
			alt: "Aisle",
			finalPosition: { top: "45%", left: "40%" },
			size: { width: 400, height: 400 },
			delay: 2.0,
		},
		{
			src: "/assets/them/seals.png",
			alt: "Seals",
			finalPosition: { top: "10%", left: "50%" },
			size: { width: 180, height: 180 },
			delay: 2.6,
		},
		{
			src: "/assets/them/ring.png",
			alt: "Ring",
			finalPosition: { top: "45%", left: "60%" },
			size: { width: 250, height: 250 },
			delay: 2.3,
		},
		{
			src: "/assets/them/ring.png",
			alt: "Ring",
			finalPosition: { top: "70%", left: "00%" },
			size: { width: 250, height: 250 },
			delay: 2.3,
		},
		{
			src: "/assets/them/seals.png",
			alt: "Seals",
			finalPosition: { top: "80%", left: "0%" },
			size: { width: 180, height: 180 },
			delay: 2.6,
		},
	];

	return (
		<section className="falling-images-container">
			{images.map((image, index) => (
				<motion.div
					key={index}
					className="falling-image"
					style={{
						position: "absolute",
						top: image.finalPosition.top,
						left: image.finalPosition.left,
					}}
					initial={{ y: -500, opacity: 0 }}
					animate={{
						y: 0,
						opacity: 1,
					}}
					transition={{
						y: {
							duration: 2,
							delay: image.delay,
							ease: [0.34, 1.56, 0.64, 1],
						},
						opacity: {
							duration: 0.3,
							delay: image.delay,
						},
					}}>
					<motion.div
						animate={{
							y: [-10, 0, -10],
						}}
						transition={{
							duration: 2,
							repeat: Infinity,
							ease: "easeInOut",
							delay: 2 + image.delay,
						}}>
						<Image src={image.src} className="rounded-md" alt={image.alt} width={image.size.width} height={image.size.height} priority />
					</motion.div>
				</motion.div>
			))}
		</section>
	);
};

export default FallingImages;
