export type ScheduleItem = { time: string; title: string };
export type ScheduleDay = {
  dayLabel: string;
  date: string;
  items: ScheduleItem[];
};

export const mockSchedule: ScheduleDay[] = [
  {
    dayLabel: "Friday",
    date: "March 19, 2027",
    items: [
      { time: "6:00 PM", title: "Gates Open" },
      { time: "7:00 PM", title: "PRCA Rodeo Performance" },
      { time: "9:30 PM", title: "Live Music" },
    ],
  },
  {
    dayLabel: "Saturday",
    date: "March 20, 2027",
    items: [
      { time: "11:00 AM", title: "Mutton Busting" },
      { time: "1:00 PM", title: "Slack Round" },
      { time: "7:00 PM", title: "PRCA Rodeo Performance" },
    ],
  },
  {
    dayLabel: "Sunday",
    date: "March 21, 2027",
    items: [
      { time: "11:00 AM", title: "Cowboy Church" },
      { time: "1:00 PM", title: "PRCA Rodeo Finals" },
      { time: "4:00 PM", title: "Awards Ceremony" },
    ],
  },
];
