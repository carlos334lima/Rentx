//@Libraries
import { eachDayOfInterval, format } from "date-fns";

//@utils
import { getPlatformDate } from "../../Utils/getPlatformDate";
import { DayProps, MarkedDateProps } from ".";

//@styles
import theme from "../../styles/theme";


export function generateInterval(
  start: DayProps,
  end: DayProps
): MarkedDateProps {
  let interval: MarkedDateProps = {};

  eachDayOfInterval({
    start: new Date(start.timestamp),
    end: new Date(end.timestamp),
  }).forEach((item) => {
    const date = format(getPlatformDate(item), "yyyy-MM-dd");

    interval = {
      ...interval,
      [date]: {
        color:
          start.dateString === date || end.dateString === date
            ? theme.colors.main
            : theme.colors.main_light,
        textColor:
          start.dateString === date || end.dateString === date
            ? theme.colors.shape
            : theme.colors.main,
      },
    };
  });

  return interval;
}
