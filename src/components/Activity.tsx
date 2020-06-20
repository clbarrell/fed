import React, { useState, useEffect } from "react";
// import styled from 'styled-components'
import { destructMS } from "../lib/times";
import { ReactComponent as Trash } from "../assets/trash.svg";

export const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export type ActivityType = {
  timestamp: number;
  mainSide: string;
  activityType: string;
  id: number;
};

export type ActivityProps = ActivityType & {
  deleteActivity: (id: number) => void;
  sinceLastFeed?: number;
};
export const Activtiy: React.FC<ActivityProps> = ({
  timestamp,
  mainSide,
  activityType,
  sinceLastFeed = 0,
  deleteActivity,
  id,
}) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
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

  const showDelete = () => {
    setConfirmDelete(true);
  };

  useEffect(() => {
    if (confirmDelete) {
      const timer = setTimeout(() => {
        setConfirmDelete(false);
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [confirmDelete]);

  const deleteMe = () => {
    deleteActivity(id);
  };

  return (
    <div className="m-4 bg-indigo-100 text-indigo-900 rounded-full text-left px-6 py-4 flex justify-between items-center relative group">
      <p className="font-medium  text-3xl">
        {timeString}
        {sinceLastFeed > 0 && sinceLastFeedDecon.d === 0 && (
          <span className="ml-2 text-sm text-indigo-400 font-normal">+ {sinceLastFeedString()}</span>
        )}
      </p>
      <p className="w-1/3">
        {activityType} {mainSide && `on ${mainSide}`}
      </p>
      {!confirmDelete && (
        <div className="absolute top-0 right-0 mr- w-6 h-6 text-center rounded-full text-sm hidden group-hover:block">
          <button
            className="w-full h-full bg-indigo-100 rounded-full p-1 outline-none text-indigo-300 border border-indigo-300 hover:text-indigo-500 hover:border-indigo-500"
            onClick={showDelete}
          >
            <span className="icon">
              <Trash />
            </span>
          </button>
        </div>
      )}
      {confirmDelete && (
        <div className="absolute w-full h-full inset-0 text-center align-center content-center flex justify-center font-medium rounded-full">
          <div
            className={`bg-orange-600 text-white py-2 px-4 lg:px-6 font-semibold rounded-full leading-none shadow flex-auto flex items-center`}
          >
            <span className="w-4 h-4 inline">
              <Trash />
            </span>
            <span className="flex-auto text-left ml-2">Are you sure?</span>
            <button
              className="hover:bg-orange-100 rounded-full hover:text-orange-600 items-center bg-orange-500 uppercase px-3 py-2 font-bold flex"
              onClick={deleteMe}
            >
              <span className="flex-0">Delete me</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Activtiy;
