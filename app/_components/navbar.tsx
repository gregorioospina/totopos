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
				"fixed z-50 md:top-5 top-3 left-0 right-0 md:left-[10%] md:right-[10%] overflow-x-auto md:overflow-visible transition-opacity duration-700",
				hide ? "opacity-0" : "opacity-100",
			].join(" ")}>
			<div className="shadow-lg mx-5 p-1 h-10 rounded-lg bg-background-2 min-w-max md:min-w-0">
				<div className="flex gap-x-4 h-8 items-center pr-3">
					<Link href={"/"} className="h-8 flex-shrink-0 bg-transparent no-underline w-20 relative">
						<Image src={"/assets/DTORTUGAM.png"} fill alt="tortuguíta" className="object-contain relative max-h-8" />
					</Link>
					<Link href={"/"} className="text-foreground bg-transparent no-underline text-sm whitespace-nowrap">
						Diego & Maca
					</Link>
					<Link href={"/rsvp"} className="text-foreground bg-transparent no-underline text-sm whitespace-nowrap">
						RSVP
					</Link>
					<Link href={"/pereira"} className="text-foreground bg-transparent no-underline text-sm whitespace-nowrap">
						Pereira
					</Link>
					<Link href={"/regalos"} className="text-foreground bg-transparent no-underline text-sm whitespace-nowrap">
						Regalos
					</Link>
					<Link href={"/faq"} className="text-foreground bg-transparent no-underline text-sm whitespace-nowrap">
						FAQ
					</Link>
				</div>
			</div>
		</div>
	);
};
export default Navbar;
