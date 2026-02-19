import { useEffect, useMemo, useState } from "react";

export const useBreakpoint = () => {
	const [breakpoint, setBreakpoint] = useState<string | null>(null);
	const [isScreenHeightShort, setIsScreenHeightShort] = useState<boolean>(false);

	useEffect(() => {
		const handleResize = () => {
			const screens = {
				sm: "640px", // Small screens (default)
				md: "768px", // Medium screens (default)
				lg: "1024px", // Large screens (default)
				xl: "1280px", // Extra large screens (default)
				"2xl": "1536px", // 2x extra large screens (default)
				tablet: "768px", // Custom breakpoint named 'tablet'
				desktop: "1024px", // Custom breakpoint named 'desktop'
				wide: "1400px", // Another custom breakpoint named 'wide'
			};
			const screenWidth = window.innerWidth;
			const screenHeight = window.innerHeight;
			const breakpointValues = Object.values(screens) as string[];

			setIsScreenHeightShort(screenHeight < 650);

			for (let i = breakpointValues.length - 1; i >= 0; i--) {
				const breakpointValue = parseInt(breakpointValues[i].replace("px", ""));
				if (screenWidth >= breakpointValue) {
					setBreakpoint(Object.keys(screens)[i] as string);
					return;
				}
			}

			setBreakpoint(null);
		};

		window.addEventListener("resize", handleResize);
		handleResize();

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const isSm = useMemo(() => ["sm", null].includes(breakpoint), [breakpoint]);
	const isMd = useMemo(() => !["sm", null].includes(breakpoint), [breakpoint]);
	const isLg = useMemo(() => !["sm", "md", null].includes(breakpoint), [breakpoint]);

	return { isMd, isLg, isSm, isScreenHeightShort };
};
