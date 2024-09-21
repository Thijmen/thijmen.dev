import { motion } from "framer-motion";

import Breakline from "../elements/Breakline";
import Navigation from "./Navigation";
import type { Nav } from "@/payload/payload-types";

interface Props {
  navGlobal: Nav;
}
const MobileMenu = (props: Props) => {
  return (
    <motion.div
      className="my-3 flex h-screen flex-col"
      initial={{ y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <Breakline className="mt-2" />
        <Navigation navGlobal={props.navGlobal} />
      </div>
    </motion.div>
  );
};

export default MobileMenu;
