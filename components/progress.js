"use client";
import ProgressBar from "@ramonak/react-progress-bar";
import Progress from "react-circle-progress-bar";
export const Bar = ({ completed, label }) => (
  <ProgressBar
    completed={completed}
    height="12px"
    borderRadius="10px"
    labelAlignment="outside"
    labelColor="black"
    animateOnRender
    customLabel={`${label}%`}
    labelSize="14px"
  />
);
export const Circle = ({ progress, sub }) => (
  <Progress progress={progress} subtitle={sub} className="m-auto" />
);
