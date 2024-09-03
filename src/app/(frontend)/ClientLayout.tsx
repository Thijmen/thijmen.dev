"use client";

import { LivePreviewListener } from "@/core/common/components/LivePreviewListener";
import CommandPalette from "@/core/common/components/elements/CommandPalette";
import { CommandPaletteProvider } from "@/core/common/context/CommandPaletteContext";
import { firaCode, jakartaSans, soraSans } from "@/core/common/styles/fonts";
import AOS from "aos";
import { ThemeProvider } from "next-themes";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const ProgressBar = dynamic(
	() => import("@/core/common/components/elements/ProgressBar"),
	{ ssr: false },
);

export default function ClientLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	useEffect(() => {
		AOS.init({
			duration: 800,
			delay: 50,
		});
	}, []);

	return (
		<>
			<style jsx global>
				{`
          html {
            --jakartaSans-font: ${jakartaSans.style.fontFamily};
            --soraSans-font: ${soraSans.style.fontFamily};
            --firaCode-font: ${firaCode.style.fontFamily};
          }
        `}
			</style>
			{/*// todo: add defaultseo*/}
			<ThemeProvider attribute="class" defaultTheme="dark">
				<CommandPaletteProvider>
					<LivePreviewListener />
					<CommandPalette />
					{children}
				</CommandPaletteProvider>
			</ThemeProvider>
		</>
	);
}
