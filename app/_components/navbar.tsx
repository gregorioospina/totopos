"use client";
import Image from "next/image";
import Link from "next/link";
import { useHideStore } from "../_store/useHideStore";

interface INavbar {}

const Navbar = (props: INavbar) => {
	const { hide } = useHideStore();
	return (
		<div
			className={[
				"fixed z-50 top-5 left-5 right-5 md:left-[10%] md:right-[10%] shadow-lg p-1 h-10 rounded-lg transition-opacity duration-700 bg-background-2",
				hide ? "opacity-0" : "opacity-100",
			].join(" ")}>
			<Link href={"/"} className="h-8 absolute left-0 bg-transparent no-underline top-1 bottom-1 w-20">
				<Image src={"/assets/DTORTUGAM.png"} fill alt="tortuguíta" className="object-contain relative max-h-8" />
			</Link>
			<div className="ml-22 flex gap-x-4 pr-3 h-8 items-center justify-start overflow-auto">
				<Link href={"/"} className="text-foreground bg-transparent no-underline text-sm whitespace-nowrap">
					Diego & Maca
				</Link>
				<Link href={"/rsvp"} className="text-foreground bg-transparent no-underline text-sm whitespace-nowrap">
					RSVP
				</Link>
				<Link href={"/regalos"} className="text-foreground bg-transparent no-underline text-sm whitespace-nowrap">
					Regalos
				</Link>
			</div>
		</div>
	);
};
export default Navbar;
