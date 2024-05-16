import PowerBadge from "./power-badge";
import Warpcast from "./warpcast";
import X from "./x";
import ChevDown from "./chev-down";
import GasIcon from "./gas-icon";

export default function Icon({ name, style }: { name: string; style?: any }) {
  switch (name) {
    case "gasIcon":
      return <GasIcon />;
    case "chevDown":
      return <ChevDown />;
    case "x":
      return <X />;
    case "powerBadge":
      return <PowerBadge />;
    case "warpcast":
      return <Warpcast />;
  }
}
