import { Spinner } from "@chakra-ui/react";
import React from "react";

const Loader = () => {
  return (
    <div className="w-full flex justify-center items-center py-3">
      <Spinner size="lg" />
    </div>
  );
};

export default Loader;
