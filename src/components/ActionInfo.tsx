import React, { useState, useEffect } from "react";
import Button from "./Button";
import { destructMS, DeconstructedTime } from "../lib/times";

export type ActionInfoProps = {
  newFeed: () => void;
  lastFeed: { timestamp: number; activityType: string; mainSide: string } | null;
};

export const ActionInfo: React.FC<ActionInfoProps> = ({ newFeed, lastFeed }: ActionInfoProps) => {
  const timeSince = (timestamp: number) => {
    return destructMS(Date.now() - timestamp);
  };

  const [sinceLastFeed, setSinceLastFeed] = useState(lastFeed ? timeSince(lastFeed.timestamp) : null);

  useEffect(() => {
    if (lastFeed !== null) {
      const ms = timeSince(lastFeed.timestamp);
      setSinceLastFeed(ms);
      if (ms.h === 0) {
        const interval = setInterval(() => {
          console.log("Resetting sinceLastFeedString");
          setSinceLastFeed(timeSince(lastFeed.timestamp));
        }, 60000);
        return () => clearInterval(interval);
      }
    } else {
      setSinceLastFeed(null);
    }
  }, [lastFeed]);

  useEffect(() => {
    const onFocus = () => {
      if (lastFeed !== null) {
        setSinceLastFeed(timeSince(lastFeed.timestamp));
        console.log("onFocus updating the timeSince");
      }
    };
    window.addEventListener("focus", onFocus);
    return () => {
      window.removeEventListener("focus", onFocus);
    };
  });

  const lastFedString = (slf: DeconstructedTime | null) => {
    if (slf === null) {
      return <span className="text-5xl font-bold">Not sure..</span>;
    } else if (slf.d === 0 && slf.h === 0) {
      return (
        <>
          <span className="text-5xl font-bold">{slf.m}</span>
          <span className="text-4xl">m ago</span>
        </>
      );
    } else if (slf.d === 0) {
      return (
        <>
          <span className="text-5xl font-bold">{slf.h}</span>
          <span className="text-4xl">h </span>
          <span className="text-5xl font-bold">{slf.m}</span>
          <span className="text-4xl">m ago</span>
        </>
      );
    } else {
      return <span className="text-5xl font-bold">Long ago</span>;
    }
  };

  return (
    <div className="flex flex-no-wrap justify-around items-center">
      <div>
        <p className="text-gray-600 uppercase text-sm tracking-wider">Last Fed</p>
        <div className="text-indigo-700 tracking-tighter font-medium leading-tight">
          {lastFedString(sinceLastFeed)}
          {lastFeed && (
            <p className="text-xl leading-snug tracking-tight">
              on <span className="text-pink-500">{lastFeed.mainSide}</span>
            </p>
          )}
        </div>
      </div>
      <Button onClick={newFeed}>New Feed</Button>
    </div>
  );
};

export default ActionInfo;
