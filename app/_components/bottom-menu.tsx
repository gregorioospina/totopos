"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MenuLink = ({ href, icon, label }: { href: string; icon: string; label: string }) => (
	<Link
		href={href}
		className="text-foreground border border-foreground/30 rounded-md px-4 py-3 flex flex-col items-center gap-1.5 hover:bg-foreground/10 transition-colors text-sm">
		<Image src={icon} width={88} height={88} alt={label} className="opacity-70" />
		{label}
	</Link>
);

const BottomMenu = () => {
	const pathname = usePathname();
	const isPereira = pathname === "/pereira";
	const isHome = pathname === "/";

	// Only show on home or pereira pages
	if (!isHome && !isPereira) {
		return null;
	}

	return (
		<div className="bg-background border-t border-foreground/30 p-4 z-40">
			<div className="max-w-5xl mx-auto">
				<p className="text-sm font-semibold mb-3 text-center md:text-left">Ve a otra sección</p>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-2">
					<MenuLink href="/regalos" icon="/assets/a-icons/gifts.png" label="Regalos" />
					<MenuLink href="/rsvp" icon="/assets/a-icons/house.png" label="RSVP" />
					<MenuLink href="/faq" icon="/assets/a-icons/coffeee.png" label="FAQ" />
					{isHome && <MenuLink href="/pereira" icon="/assets/a-icons/travel.png" label="Pereira" />}
					{isPereira && <MenuLink href="/" icon="/assets/a-icons/house.png" label="Diego y Maca" />}
				</div>
			</div>
		</div>
	);
};
export default BottomMenu;
