import { useEffect, useState } from "react";

import useIsMobile from "@/core/common/hooks/useIsMobile";

import Breakline from "../../elements/Breakline";
import Navigation from "../../sidebar/Navigation";
import Profile from "../../sidebar/Profile";
import Copyright from "./Copyright";
import { Nav } from "@/payload/payload-types";

interface Props {
  navGlobal: Nav;
}
const Sidebar = (props: Props) => {
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      id="sidebar"
      className="sticky top-0 z-10 flex flex-col transition-all duration-300 lg:py-8"
    >
      <Profile isScrolled={isScrolled} />
      {!isMobile && (
        <>
          <Breakline />
          <Navigation navGlobal={props.navGlobal} />
          <Breakline className="mt-2" />
          <Copyright />
        </>
      )}
    </div>
  );
};

export default Sidebar;
