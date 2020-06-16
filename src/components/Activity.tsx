import React, { useState, useEffect } from "react";
// import styled from 'styled-components'
import { destructMS } from "../lib/times";
import { ReactComponent as Trash } from "../assets/trash.svg";

export const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export type ActivtiyProps = {
  timestamp: number;
  mainSide?: string;
  activityType: string;
  sinceLastFeed?: number;
  id: number;
  deleteActivity: (id: number) => void;
};
export const Activtiy: React.FC<ActivtiyProps> = ({
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
        <div className="absolute bg-red-10 text-red-600 w-full h-full inset-0 text-center align-center content-center flex justify-center font-medium rounded-full">
          <div className="leading-none inline-block h-auto self-center bg-red-100 py-3 px-8 rounded-lg shadow-md">
            Are you sure?
            <button
              className="font-bold py-2 px-5 rounded-lg text-sm bg-red-200 inline-flex items-center uppercase ml-4 hover:bg-red-300"
              onClick={deleteMe}
            >
              <span className="icon inline w-4 h-4 mr-2">
                <Trash />
              </span>
              <span>delete</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Activtiy;