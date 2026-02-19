import { ReactNode, useEffect, useState } from "react";

export interface PropsDialog {
	id?: string;
	title?: string;
	subtitle?: string;
	children: ReactNode;
	secondaryHeaderAction?: ReactNode;
	open: boolean;
	onClose: () => void;
	footer?: ReactNode;
	loading?: boolean;
	zIndex?: string;
	className?: string;
	containerClassName?: string;
	noDivider?: boolean;
	containerId?: string;
}

export const Dialog = (props: PropsDialog) => {
	const { title, subtitle, footer, children, noDivider, onClose, open, containerClassName } = props;

	const [opacity, setOpacity] = useState<string>("opacity-0");

	useEffect(() => {
		if (open) {
			setOpacity("opacity-[100]");
		} else {
			setOpacity("opacity-[0]");
		}
	}, [open]);

	return open ? (
		<div
			id={props.id}
			className={[
				"fixed bottom-0 left-0 right-0 top-0 z-[999] flex items-center justify-center backdrop-brightness-50 transition-opacity duration-300",
				opacity,
			].join(" ")}
			onClick={onClose}>
			<div
				id={props.containerId}
				className={`min-h-30% max-h-90% duration-1200 ${
					title ? "bg-white" : ""
				} relative z-30 w-[95%] max-w-[500px] grid-cols-1 grid-rows-[15%_85%] rounded-xl p-4 transition-[max-height] md:max-h-95% md:w-1/3 md:min-w-[500px] md:p-6 ${containerClassName} `}
				onClick={(e) => e.stopPropagation()}>
				{(title || subtitle) && (
					<div className={`mb-4 mt-0 flex flex-col pb-3 ${!noDivider && "border-b-[1px] border-b-stone-700/20"}`}>
						<p suppressHydrationWarning className="text-xl font-bold leading-6 text-stone-900 md:text-2xl">
							{title}
						</p>
						<p suppressHydrationWarning className="mt-1 text-xs font-normal leading-4 text-stone-700 md:mt-2 md:text-sm">
							{subtitle}
						</p>
					</div>
				)}
				{children}
				{footer && <div className="absolute bottom-0 left-0 h-24 w-full bg-dialog-bg"></div>}
			</div>
		</div>
	) : null;
};
