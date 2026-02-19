import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

interface ILoader {
	open: boolean;
	opaque?: boolean;
	fullscreen?: boolean;
	fitContainer?: boolean;
}

const Loader = ({ opaque, fitContainer, open }: ILoader) => {
	const [showIcon, setShowIcon] = useState(false);
	const [iconOpacity, setIconOpacity] = useState(0);

	const position = useMemo(() => (fitContainer ? "absolute" : "fixed"), [fitContainer]);
	const bgColor = useMemo(() => (opaque ? "bg-ey-white/70 backdrop-blur-xs" : "bg-ey-white"), [opaque]);
	const opacity = useMemo(() => (open ? "opacity-100" : "opacity-0"), [open]);
	const pointerEvents = useMemo(() => (open ? "pointer-events-auto" : "pointer-events-none"), [open]);

	useEffect(() => {
		if (open) {
			setShowIcon(true);
			// Start fade-in animation after a small delay
			const timer = setTimeout(() => {
				setIconOpacity(1);
			}, 100);
			return () => clearTimeout(timer);
		} else {
			setIconOpacity(0);
			// Hide icon after fade-out completes
			const timer = setTimeout(() => {
				setShowIcon(false);
			}, 300);
			return () => clearTimeout(timer);
		}
	}, [open]);

	return (
		<div
			id="loader-fullscreen"
			className={[
				"h-full flex justify-center rounded-[inherit] items-center z-50 fixed top-0 right-0 left-0 transition-opacity duration-500 ease-linear",
				position,
				bgColor,
				opacity,
				pointerEvents,
			].join(" ")}>
			{showIcon && (
				<Image
					src="/assets/icon.png"
					alt="Loading"
					width={64}
					height={64}
					className="transition-opacity duration-[500ms] ease-in-out animate-pulse"
					style={{
						opacity: iconOpacity,
					}}
				/>
			)}
		</div>
	);
};
export default Loader;
