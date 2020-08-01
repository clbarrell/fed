import React, { useState, useEffect } from "react";
import Button from "./Button";
import Checkbox from "./form/Checkbox";
import { formatDistanceToNow, setHours, setMinutes, sub, add } from "date-fns";
import TimeKeeper from "react-timekeeper";
import "../assets/timekeeper.css";

export type NewActivityProps = {
  newFeed: (timestamp: number, activityType: string, mainSide: string) => void;
  cancel: () => void;
  defaultMainSide: string;
};
export const NewActivity: React.FC<NewActivityProps> = ({ newFeed, cancel, defaultMainSide }) => {
  const [mainSide, setMainSide] = useState(defaultMainSide);
  const [timeOfFeed, setTimeOfFeed] = useState(new Date());
  const [time, setTime] = useState({
    hour: timeOfFeed.getHours(),
    minute: timeOfFeed.getMinutes(),
    // meridiem: timeOfFeed.getHours() > 11 ? "pm" : "am",
  });
  const [day, setDay] = useState("today");

  const handleNewFeed = () => {
    console.log("new feed saving...", timeOfFeed.toLocaleString());
    newFeed(timeOfFeed.getTime(), "Feed", mainSide);
  };

  const handleCheckboxClick = () => {
    const otherSide = {
      left: "right",
      right: "left",
    };
    setMainSide(otherSide[mainSide]);
  };

  const dateSelectOptions = [
    { label: "Today", value: "today" },
    { label: "Tomorrow", value: "tomorrow" },
    { label: "Yesterday", value: "yesterday" },
  ];

  const resetToday = () => {
    const d = new Date();
    setTime({
      hour: d.getHours(),
      minute: d.getMinutes(),
    });
    setDay("today");
  };

  useEffect(() => {
    // monitor time and day and set timeoffeed
    let current = new Date();
    current = setHours(current, time.hour);
    current = setMinutes(current, time.minute);
    if (day === "yesterday") {
      current = sub(current, { days: 1 });
    } else if (day === "tomorrow") {
      current = add(current, { days: 1 });
    }
    console.log("Setting timeoffeed");
    setTimeOfFeed(current);
  }, [time, day]);

  return (
    <div className="max-w-sm mx-auto text-indigo-800">
      <h1 className="font-bold text-4xl text-indigo-700 mb-6">New feed</h1>
      <div>
        <p className="my-4">
          Started:{" "}
          <span className="ml-3 text-indigo-400">...{formatDistanceToNow(timeOfFeed, { addSuffix: true })}</span>
        </p>
        <div className="flex font-medium text-lg my-4 justify-center md:justify-start">
          <select
            name="date select"
            id="dateSelect"
            className="bg-indigo-100 p-4 rounded-lg font-medium cursor-pointer w-64 text-indigo-700"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          >
            {dateSelectOptions.map((d) => (
              <option value={d.value} key={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-center md:justify-start">
          <TimeKeeper
            time={time}
            onChange={(newTime) => setTime({ hour: newTime.hour, minute: newTime.minute })}
            switchToMinuteOnHourSelect
            doneButton={() => (
              <div
                style={{ textAlign: "center", padding: "10px 0" }}
                onClick={resetToday}
                className="text-indigo-400 cursor-pointer hover:text-indigo-700 text-sm"
              >
                Reset to now
              </div>
            )}
          />
        </div>
      </div>
      <div className="">
        <p className="mb-4 mt-6">Main side:</p>
        <Checkbox
          isChecked={mainSide === "right"}
          onChange={handleCheckboxClick}
          checkedValue="right"
          labelLeft="Left"
          labelRight="Right"
        />
      </div>
      <div className="flex justify-center md:justify-start mt-6 space-x-2">
        <Button onClick={cancel} secondary={true}>
          Cancel
        </Button>
        <Button onClick={handleNewFeed}>Save</Button>
      </div>
    </div>
  );
};

export default NewActivity;
