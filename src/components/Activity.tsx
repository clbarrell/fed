import React from "react";
// import styled from 'styled-components'
import { destructMS } from "../lib/times";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export type ActivtiyProps = { timestamp: number; mainSide?: string; activityType: string; sinceLastFeed?: number };
export const Activtiy: React.FC<ActivtiyProps> = ({ timestamp, mainSide, activityType, sinceLastFeed = 0 }) => {
  const time = new Date(timestamp);
  const sinceLastFeedDecon = destructMS(sinceLastFeed);
  const sinceLastFeedString = () => {
    let str = "";
    if (sinceLastFeedDecon.h > 0) {
      str += `${sinceLastFeedDecon.h}h`;
    }
    str += `${sinceLastFeedDecon.m}m`;
    return str;
  };

  const timeString = `${days[time.getDay()]}  ${time.toLocaleTimeString().substr(0, 5)}`;

  return (
    <div className="m-4 bg-indigo-100 text-indigo-900 rounded-full text-left px-6 py-4 grid grid-cols-2 gap-4 items-center">
      <p className="font-bold  text-2xl">
        {timeString}
        {sinceLastFeed > 0 && sinceLastFeedDecon.d === 0 && (
          <span className="ml-2 text-sm text-indigo-300 font-normal">+ {sinceLastFeedString()}</span>
        )}
      </p>
      <p className="">
        {activityType} {mainSide && `on ${mainSide}`}
      </p>
    </div>
  );
};

export default Activtiy;
