import React from "react";
const BoldName = ({ text = "" }) => {
  if ("Tarik Crnovrsanin" === text) {
    return <b>Tarik Crnovrsanin</b>;
  } else {
    return text;
  }
};

const Authors = ({ names }) => {
  return names.map((name, index) => (
    <React.Fragment key={index}>
      <BoldName text={name} />
      {index < names.length - 2
        ? ", "
        : index < names.length - 1 && names.length === 2
        ? " and "
        : index < names.length - 1
        ? ", and "
        : ""}
    </React.Fragment>
  ));
};

export default Authors;
