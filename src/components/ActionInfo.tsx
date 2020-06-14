import React, { useState, useEffect } from "react";
import Button from "./Button";
import { destructMS, DeconstructedTime } from "../lib/times";

export type ActionInfoProps = {
  userId: number;
  newFeed: () => void;
  lastFeed: { timestamp: number; activityType: string; mainSide: string };
};

export const ActionInfo: React.FC<ActionInfoProps> = ({ userId, newFeed, lastFeed }: ActionInfoProps) => {
  console.log({ userId, newFeed, lastFeed });

  const timeSince = (timestamp: number) => {
    return destructMS(Date.now() - timestamp);
  };

  const [sinceLastFeed, setSinceLastFeed] = useState(timeSince(lastFeed.timestamp));

  useEffect(() => {
    const ms = timeSince(lastFeed.timestamp);
    setSinceLastFeed(ms);
    if (ms.h === 0) {
      const interval = setInterval(() => {
        console.log("Resetting sinceLastFeedString");
        setSinceLastFeed(timeSince(lastFeed.timestamp));
      }, 60000);
      return () => clearInterval(interval);
    }
  }, [lastFeed]);

  const lastFedString = (slf: DeconstructedTime) => {
    if (slf.d === 0 && slf.h === 0) {
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
        <div className="text-indigo-700 tracking-tighter font-medium">
          {lastFedString(sinceLastFeed)}
          <p className="text-xl leading-snug tracking-tight">
            on <span className="text-pink-500">{lastFeed.mainSide}</span>
          </p>
        </div>
      </div>
      <Button onClick={newFeed}>New Feed</Button>
    </div>
  );
};

export default ActionInfo;
