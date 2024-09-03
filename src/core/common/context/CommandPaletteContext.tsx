import { ReactNode, createContext, useState } from "react";

interface CommandPaletteContextType {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
}

export const CommandPaletteContext = createContext<CommandPaletteContextType>({
	isOpen: false,
	// biome-ignore lint/suspicious/noEmptyBlockStatements: TODO: fixme
	setIsOpen: () => {},
});

interface CommandPaletteProviderProps {
	children: ReactNode;
}

export const CommandPaletteProvider = ({
	children,
}: CommandPaletteProviderProps) => {
	const [isOpen, setOpen] = useState(false);

	const setIsOpen = (open: boolean) => {
		setOpen(open);
	};

	return (
		<CommandPaletteContext.Provider value={{ isOpen, setIsOpen }}>
			{children}
		</CommandPaletteContext.Provider>
	);
};
