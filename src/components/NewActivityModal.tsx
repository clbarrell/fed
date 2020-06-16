import React, { useState } from "react";
import Button from "./Button";
import Checkbox from "./form/Checkbox";
import { days } from "./Activity";

export type NewActivityModalProps = {
  newFeed: (timestamp: number, activityType: string, mainSide: string) => void;
  cancel: () => void;
  defaultMainSide: string;
};
export const NewActivityModal: React.FC<NewActivityModalProps> = ({ newFeed, cancel, defaultMainSide }) => {
  const [mainSide, setMainSide] = useState(defaultMainSide);
  const [timeOfFeed, setTimeOfFeed] = useState(new Date());

  const handleNewFeed = () => {
    console.log("new feed saved...");
    newFeed(timeOfFeed.getTime(), "Feed", mainSide);
  };

  const handleCheckboxClick = () => {
    const otherSide = {
      left: "right",
      right: "left",
    };
    setMainSide(otherSide[mainSide]);
  };

  const tenMins = 1000 * 60 * 10;
  const timeRound = (time, roundTo) => {
    return Math.round(time / roundTo) * roundTo;
  };

  const incTimeOfFeed = () => {
    setTimeOfFeed(new Date(timeRound(timeOfFeed.getTime() + 10 * 60000, tenMins)));
  };

  const decTimeOfFeed = () => {
    setTimeOfFeed(new Date(timeRound(timeOfFeed.getTime() + -10 * 60000, tenMins)));
  };

  return (
    <div className="max-w-sm mx-auto text-indigo-800">
      <h1 className="font-bold text-4xl text-indigo-700 mb-6">New feed</h1>
      <div>
        <p className="my-4">Started:</p>
        <div className="flex font-medium text-lg my-4">
          <button
            onClick={decTimeOfFeed}
            className="px-4 py-4 border-2 border-r-0 border-indigo-400 text-indigo-400 rounded-l-lg hover:border-indigo-600 hover:text-indigo-600 hover:bg-indigo-200"
          >
            -
          </button>
          <span className="border-2 border-indigo-400 px-4 py-4">
            {days[timeOfFeed.getDay()]} {timeOfFeed.toLocaleTimeString().substr(0, 5)}
          </span>
          <button
            onClick={incTimeOfFeed}
            className="px-4 py-4 border-2 border-l-0 border-indigo-400 text-indigo-400 rounded-r-lg hover:border-indigo-600 hover:text-indigo-600 hover:bg-indigo-200"
          >
            +
          </button>
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
