import React from "react";
import { PubMaterial, AwardStyle } from "./styles";
// import { useLocation } from "react-router-dom";

const Award = ({ award, divider }) => {
  if (award) {
    return (
      <>
        {divider && " |  "} <AwardStyle>{award}</AwardStyle>
      </>
    );
  } else {
    return <></>;
  }
};

const BibTexLink = ({ bibTex, divider }) => {
  // const location = useLocation();
  if (bibTex) {
    return (
      <>
        {divider && " | "}
        <PubMaterial
          href={process.env.PUBLIC_URL + "/pubs/bibtex/" + bibTex[1] + "/"}
        >
          BibTeX
        </PubMaterial>
      </>
    );
  } else {
    return <></>;
  }
};

const Materials = ({ materials, award, bibTex }) => {
  let listMaterials = Object.entries(materials);
  listMaterials = listMaterials.filter((pair) => pair[1]);
  return (
    <>
      {listMaterials.map((pair, index) => (
        <span key={index}>
          <PubMaterial key={index} href={pair[1]}>
            {pair[0]}
          </PubMaterial>
          {index !== listMaterials.length - 1 ? " | " : ""}
        </span>
      ))}
      <BibTexLink bibTex={bibTex} divider={listMaterials.length > 0} />
      <Award award={award} divider={listMaterials.length > 0 || bibTex} />
    </>
  );
};

export default Materials;
