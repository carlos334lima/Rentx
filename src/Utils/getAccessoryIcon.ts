//@Types
import { SvgProps } from "react-native-svg";

//@Assets
import speedSvg from "../assets/speed.svg";
import accelerationSvg from "../assets/acceleration.svg";
import forceSvg from "../assets/force.svg";
import gasolineSvg from "../assets/gasoline.svg";
import energySvg from "../assets/energy.svg";
import hybridSvg from "../assets/hybrid.svg";
import exchangeSvg from "../assets/exchange.svg";
import peopleSvg from "../assets/people.svg";
import Car from "../assets/car.svg";

export function getAccessoryIcon(type: string): React.FC<SvgProps> {
  switch (type) {
    case "speed":
      return speedSvg;
    case "acceleration":
      return accelerationSvg;
    case "turning_diameter":
      return forceSvg;
    case "gasoline_motor":
      return gasolineSvg;
    case "electric_motor" || "electric":
      return energySvg;
    case "hybrid_motor":
      return hybridSvg;
    case "exchange":
      return exchangeSvg;
    case "seats":
      return peopleSvg;
    default:
      return Car;
  }
}
