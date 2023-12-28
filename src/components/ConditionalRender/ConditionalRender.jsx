import React from "react";
import Spinner from "../Spinner/Spinner";

const ConditionalRender = ({ conditions, content }) => {
  const shouldRender = conditions.every((condition) => condition);

  return shouldRender ? content : <Spinner />;
};

export default ConditionalRender;
