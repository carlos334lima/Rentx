import React from "react";

//@Libraries
import {
  Calendar as CalendarsCustom,
  LocaleConfig,
  DateCallbackHandler,
} from "react-native-calendars";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";

//@Utils
import { ptBR } from "./Locale";

LocaleConfig.locales["pt-br"] = ptBR;
LocaleConfig.defaultLocale = "pt-br";

interface MarkedDateProps {
  [date: string]: {
    color: string;
    textColor: string;
    disabled: boolean;
    disabledTouchEvent: boolean;
  };
}

interface DayProps {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}

interface CalendarsProps {
  MarkedDates: MarkedDateProps;
  onDayPress: DateCallbackHandler;
}

function Calendars({ MarkedDates, onDayPress }: CalendarsProps) {
  const theme = useTheme();
  return (
    <CalendarsCustom
      renderArrow={(direction) => (
        <Feather
          size={24}
          color={theme.colors.text}
          name={direction == "left" ? "chevron-left" : "chevron-right"}
        />
      )}
      headerStyle={{
        backgroundColor: theme.colors.background_secondary,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.text_detail,
        paddingBottom: 10,
        marginBottom: 10,
      }}
      theme={{
        textDayFontFamily: theme.fonts.primary_400,
        textDayHeaderFontFamily: theme.fonts.primary_500,
        textDayHeaderFontSize: 10,
        textMonthFontSize: 20,
        textMonthFontFamily: theme.fonts.secoundary_600,
        monthTextColor: theme.colors.title,
        arrowStyle: {
          marginHorizontal: -15,
        },
      }}
      firstDay={1}
      minDate={new Date()}
      markingType="period"
      markedDates={MarkedDates}
      onDayPress={onDayPress}
    />
  );
}

export { DayProps, Calendars, MarkedDateProps };
