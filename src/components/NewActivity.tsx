import React, { useState } from "react";
import Button from "./Button";
import Checkbox from "./form/Checkbox";
import { format, formatDistanceToNow } from "date-fns";

export type NewActivityProps = {
  newFeed: (timestamp: number, activityType: string, mainSide: string) => void;
  cancel: () => void;
  defaultMainSide: string;
};
export const NewActivity: React.FC<NewActivityProps> = ({ newFeed, cancel, defaultMainSide }) => {
  const [mainSide, setMainSide] = useState(defaultMainSide);
  const [timeOfFeed, setTimeOfFeed] = useState(new Date());

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

  const handleTimeInputChange = (e: any) => {
    setTimeOfFeed(new Date(e.target.value));
  };

  const formatDateForInput = (date: Date) => {
    const newDateFormat = format(date, "yyyy-MM-dd'T'HH:mm");
    return newDateFormat;
  };

  return (
    <div className="max-w-sm mx-auto text-indigo-800">
      <h1 className="font-bold text-4xl text-indigo-700 mb-6">New feed</h1>
      <div>
        <p className="my-4">
          Started:{" "}
          <span className="float-right text-indigo-400">{formatDistanceToNow(timeOfFeed, { addSuffix: true })}</span>
        </p>
        <div className="flex font-medium text-lg my-4">
          <input
            type="datetime-local"
            value={formatDateForInput(timeOfFeed)}
            onChange={handleTimeInputChange}
            className="border-2 border-indigo-400 px-4 py-4 rounded-lg font-medium hover:bg-indigo-100 cursor-pointer w-full bg-transparent"
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
      <div className="flex justify-end mt-6 space-x-2">
        <Button onClick={cancel} secondary={true}>
          Cancel
        </Button>
        <Button onClick={handleNewFeed}>Save</Button>
      </div>
    </div>
  );
};

export default NewActivity;
