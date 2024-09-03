import {
	MdOutlineFullscreenExit as ExitFullScreenIcon,
	MdOutlineFullscreen as FullScreenIcon,
} from "react-icons/md";

import Tooltip from "@/core/common/components/elements/Tooltip";

interface PanelFooterProps {
	isFullScreen?: boolean;
	onCloseFullScreen?: () => void;
	onFullScreen?: () => void;
}

const PanelFooter = ({
	isFullScreen,
	onCloseFullScreen,
	onFullScreen,
}: PanelFooterProps) => {
	return (
		<div className="flex items-center justify-between rounded-b-md border border-t-0 border-neutral-700 bg-neutral-900 px-2 py-1">
			<div className="items-center font-sora text-sm text-neutral-500">
				&copy; <a href="https://thijmen.dev">Thijmen Stavenuiter</a>
			</div>
			{isFullScreen ? (
				<Tooltip title="Close">
					<ExitFullScreenIcon
						size={22}
						onClick={onCloseFullScreen}
						className=" cursor-pointer text-neutral-500"
						data-umami-event="Open Fullscreen Playground"
					/>
				</Tooltip>
			) : (
				<Tooltip title="Fullscreen">
					<FullScreenIcon
						size={22}
						onClick={onFullScreen}
						className=" cursor-pointer text-neutral-500"
						data-umami-event="Exit Fullscreen Playground"
					/>
				</Tooltip>
			)}
		</div>
	);
};

export default PanelFooter;
