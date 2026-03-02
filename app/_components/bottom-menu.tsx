"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
				<p className="text-sm font-semibold mb-3 text-center md:text-left">Ve a</p>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-2">
					<Link
						href="/regalos"
						className="text-foreground border border-foreground/30 rounded-md px-4 py-2 text-center hover:bg-foreground/10 transition-colors text-sm">
						Regalos
					</Link>
					<Link
						href="/rsvp"
						className="text-foreground border border-foreground/30 rounded-md px-4 py-2 text-center hover:bg-foreground/10 transition-colors text-sm">
						RSVP
					</Link>
					<Link
						href="/faq"
						className="text-foreground border border-foreground/30 rounded-md px-4 py-2 text-center hover:bg-foreground/10 transition-colors text-sm">
						FAQ
					</Link>
					{isHome && (
						<Link
							href="/pereira"
							className="text-foreground border border-foreground/30 rounded-md px-4 py-2 text-center hover:bg-foreground/10 transition-colors text-sm">
							Pereira
						</Link>
					)}
					{isPereira && (
						<Link
							href="/"
							className="text-foreground border border-foreground/30 rounded-md px-4 py-2 text-center hover:bg-foreground/10 transition-colors text-sm">
							Diego y Maca
						</Link>
					)}
				</div>
			</div>
		</div>
	);
};
export default BottomMenu;
