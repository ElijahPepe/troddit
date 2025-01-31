import { useTheme } from "next-themes";
import ReactSwitch from "react-switch";
import { CgArrowsShrinkH, CgArrowsMergeAltH } from "react-icons/cg";
import { useMainContext } from "../MainContext";
import { useEffect, useState } from "react";
const ToggleWideUI = () => {
  const context: any = useMainContext();
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      title={"toggle wide ui in single column and posts"}
    >
      <label className="flex flex-row items-center justify-between cursor-pointer">
        <span className="cursor-pointer">Wide UI</span>
        <ReactSwitch
          onChange={() => context.toggleWideUI()}
          checked={context.saveWideUI === true}
          checkedHandleIcon={<div></div>}
          checkedIcon={
            <div className="flex items-center justify-center h-full text-lg font-white dark:font-darkBG">
              <CgArrowsShrinkH />
            </div>
          }
          uncheckedHandleIcon={<div></div>}
          uncheckedIcon={
            <div className="flex items-center justify-center h-full text-lg font-white dark:font-darkBG">
              <CgArrowsMergeAltH />
            </div>
          }
          offColor={resolvedTheme === "dark" ? "#4B5563" : "#D1D5DB"}
          onColor={resolvedTheme === "dark" ? "#4B5563" : "#D1D5DB"}
          offHandleColor="#0284C7"
          onHandleColor="#0284C7"
        />
      </label>
    </div>
  );
};

export default ToggleWideUI;
