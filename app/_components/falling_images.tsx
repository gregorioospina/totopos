"use client";

import { useBreakpoint } from "@/_hooks/useGPTBreakpoint";
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
	const { isMd } = useBreakpoint();

	// https://fugvavcdkqda2ylw.public.blob.vercel-storage.com/WhatsApp%20Image%202026-02-23%20at%2017.49.30.png
	// https://fugvavcdkqda2ylw.public.blob.vercel-storage.com/WhatsApp%20Image%202026-02-23%20at%2017.51.26.png
	// https://fugvavcdkqda2ylw.public.blob.vercel-storage.com/WhatsApp%20Image%202026-02-23%20at%2017.51.56.png
	// https://fugvavcdkqda2ylw.public.blob.vercel-storage.com/WhatsApp%20Image%202026-02-23%20at%2018.23.36.png
	// https://fugvavcdkqda2ylw.public.blob.vercel-storage.com/WhatsApp%20Image%202026-02-23%20at%2018.26.41.png
	// https://fugvavcdkqda2ylw.public.blob.vercel-storage.com/aisle.png
	// https://fugvavcdkqda2ylw.public.blob.vercel-storage.com/ring.png
	// https://fugvavcdkqda2ylw.public.blob.vercel-storage.com/seals.png
	// https://fugvavcdkqda2ylw.public.blob.vercel-storage.com/sombrero.png
	// https://fugvavcdkqda2ylw.public.blob.vercel-storage.com/trees.png

	const mobileImages: ImageConfig[] = [
		{
			src: "https://fugvavcdkqda2ylw.public.blob.vercel-storage.com/trees.png",
			alt: "Aisle",
			finalPosition: { top: "0%", left: "0%" },
			size: { width: 400, height: 400 },
			delay: 2.0,
		},
		{
			src: "https://fugvavcdkqda2ylw.public.blob.vercel-storage.com/sombrero.png",
			alt: "Ring",
			finalPosition: { top: "35%", left: "3%" },
			size: { width: 250, height: 250 },
			delay: 2.3,
		},
		{
			src: "https://fugvavcdkqda2ylw.public.blob.vercel-storage.com/WhatsApp%20Image%202026-02-23%20at%2017.49.30.png",
			alt: "Aisle",
			finalPosition: { top: "45%", left: "40%" },
			size: { width: 400, height: 400 },
			delay: 2.0,
		},
		{
			src: "https://fugvavcdkqda2ylw.public.blob.vercel-storage.com/WhatsApp%20Image%202026-02-23%20at%2017.51.26.png",
			alt: "Seals",
			finalPosition: { top: "10%", left: "50%" },
			size: { width: 180, height: 180 },
			delay: 2.6,
		},
		{
			src: "https://fugvavcdkqda2ylw.public.blob.vercel-storage.com/WhatsApp%20Image%202026-02-23%20at%2017.51.56.png",
			alt: "Ring",
			finalPosition: { top: "45%", left: "60%" },
			size: { width: 250, height: 250 },
			delay: 2.3,
		},
		{
			src: "https://fugvavcdkqda2ylw.public.blob.vercel-storage.com/ring.png",
			alt: "Ring",
			finalPosition: { top: "70%", left: "00%" },
			size: { width: 250, height: 250 },
			delay: 2.3,
		},
		{
			src: "https://fugvavcdkqda2ylw.public.blob.vercel-storage.com/aisle.png",
			alt: "Seals",
			finalPosition: { top: "80%", left: "0%" },
			size: { width: 180, height: 180 },
			delay: 2.6,
		},
	];

	const desktopImages: ImageConfig[] = [
		{
			src: "https://fugvavcdkqda2ylw.public.blob.vercel-storage.com/WhatsApp%20Image%202026-02-23%20at%2017.49.30.png",
			alt: "Aisle",
			finalPosition: { top: "0%", left: "0%" },
			size: { width: 500, height: 500 },
			delay: 2.0,
		},
		{
			src: "https://fugvavcdkqda2ylw.public.blob.vercel-storage.com/WhatsApp%20Image%202026-02-23%20at%2017.51.26.png",
			alt: "Trees",
			finalPosition: { top: "5%", left: "35%" },
			size: { width: 600, height: 600 },
			delay: 2.2,
		},
		// {
		// 	src: "https://fugvavcdkqda2ylw.public.blob.vercel-storage.com/WhatsApp%20Image%202026-02-23%20at%2017.51.56.png",
		// 	alt: "Ring",
		// 	finalPosition: { top: "10%", left: "95%" },
		// 	size: { width: 500, height: 500 },
		// 	delay: 2.4,
		// },
		{
			src: "https://fugvavcdkqda2ylw.public.blob.vercel-storage.com/WhatsApp%20Image%202026-02-23%20at%2018.23.36.png",
			alt: "Sombrero",
			finalPosition: { top: "35%", left: "3%" },
			size: { width: 600, height: 600 },
			delay: 2.1,
		},
		{
			src: "https://fugvavcdkqda2ylw.public.blob.vercel-storage.com/WhatsApp%20Image%202026-02-23%20at%2018.26.41.png",
			alt: "Seals",
			finalPosition: { top: "40%", left: "85%" },
			size: { width: 600, height: 600 },
			delay: 2.5,
		},
		{
			src: "https://fugvavcdkqda2ylw.public.blob.vercel-storage.com/aisle.png",
			alt: "Aisle",
			finalPosition: { top: "45%", left: "40%" },
			size: { width: 450, height: 450 },
			delay: 2.3,
		},
		{
			src: "https://fugvavcdkqda2ylw.public.blob.vercel-storage.com/ring.png",
			alt: "Ring",
			finalPosition: { top: "55%", left: "65%" },
			size: { width: 500, height: 500 },
			delay: 2.6,
		},
		{
			src: "https://fugvavcdkqda2ylw.public.blob.vercel-storage.com/seals.png",
			alt: "Trees",
			finalPosition: { top: "60%", left: "15%" },
			size: { width: 500, height: 500 },
			delay: 2.7,
		},
		{
			src: "https://fugvavcdkqda2ylw.public.blob.vercel-storage.com/sombrero.png",
			alt: "Sombrero",
			finalPosition: { top: "35%", left: "0%" },
			size: { width: 500, height: 500 },
			delay: 2.2,
		},
		{
			src: "https://fugvavcdkqda2ylw.public.blob.vercel-storage.com/trees.png",
			alt: "Seals",
			finalPosition: { top: "80%", left: "70%" },
			size: { width: 500, height: 500 },
			delay: 2.8,
		},
		{
			src: "https://fugvavcdkqda2ylw.public.blob.vercel-storage.com/sombrero.png",
			alt: "Ring",
			finalPosition: { top: "15%", left: "80%" },
			size: { width: 500, height: 500 },
			delay: 2.4,
		},
	];

	const images = isMd ? desktopImages : mobileImages;

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
