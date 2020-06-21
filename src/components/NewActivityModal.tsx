import React, { useState } from "react";
import Button from "./Button";
import Checkbox from "./form/Checkbox";
import { destructMS } from "../lib/times";

export type NewActivityModalProps = {
  newFeed: (timestamp: number, activityType: string, mainSide: string) => void;
  cancel: () => void;
  defaultMainSide: string;
};
export const NewActivityModal: React.FC<NewActivityModalProps> = ({ newFeed, cancel, defaultMainSide }) => {
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
    console.log("raw input", e.target.value);
    console.log(new Date(e.target.value).toISOString());
    console.log(new Date(e.target.value));
    console.log("Current timeoffeed", timeOfFeed);
    setTimeOfFeed(new Date(e.target.value));
  };

  const formatDateForInput = (date: Date) => {
    const tzoffset = date.getTimezoneOffset() * 60000; //offset in milliseconds
    return new Date(date.getTime() - tzoffset).toISOString().substr(0, 16);
  };

  return (
    <div className="max-w-sm mx-auto text-indigo-800">
      <h1 className="font-bold text-4xl text-indigo-700 mb-6">New feed</h1>
      <div>
        <p className="my-4">
          Started: <span>{JSON.stringify(destructMS(Date.now() - timeOfFeed.getTime()))}</span>
        </p>
        <p>ISO: {timeOfFeed.toISOString()}</p>
        <p>Local: {timeOfFeed.toLocaleString()}</p>
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

export default NewActivityModal;
