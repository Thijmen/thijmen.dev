import { Nav } from "@/payload/payload-types";
import Sidebar from "../partials/Sidebar";

interface Props {
	navGlobal: Nav;
}
const HeaderSidebar = (props: Props) => {
	return (
		<header className="lg:w-1/5">
			<Sidebar navGlobal={props.navGlobal} />
		</header>
	);
};

export default HeaderSidebar;
