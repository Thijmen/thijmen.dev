import { createContext } from "react";

type MenuContextType = {
	hideNavbar: () => void;
};

export const MenuContext = createContext<MenuContextType>({
	// biome-ignore lint/suspicious/noEmptyBlockStatements: TODO: fixme
	hideNavbar: () => {},
});
