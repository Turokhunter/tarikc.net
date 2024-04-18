import citations from "../../data/citations.json";
import {
  scaleTime,
  extent,
  group,
  timeYear,
  timeDay,
  scaleLinear,
  interpolatePurples,
  scaleSequentialLog,
  max,
} from "d3";
import { Tooltip } from "react-tooltip";
import { useState } from "react";

// This is a test to see if its possible to create visualization directly into react.
// The paradigm I'm using is the same as svelte. Normally, hooks and effects + d3.select to
// achieve the same effect. But you have to take the control of dom away from react.

const DrawTick = ({ year, x, yA, direction = 1 }) => {
  let currYear = year.getFullYear();
  if (currYear % 2 === 0) {
    return (
      <line
        x1={x(currYear)}
        y1={yA}
        x2={x(currYear)}
        y2={yA + direction * 8}
        strokeWidth={2}
        stroke="black"
      />
    );
  } else {
    return (
      <>
        <line
          x1={x(currYear)}
          y1={yA}
          x2={x(currYear)}
          y2={yA + direction * 14}
          strokeWidth={2}
          stroke="black"
        />
        <rect
          x={x(currYear) + 2}
          y={yA - 4}
          width={34}
          height={8}
          fill="white"
          stroke="white"
        />
        <text
          textAnchor="start"
          fontSize={12}
          fontWeight={20}
          x={x(currYear) + 3}
          y={yA + 4}
          style={{ background: "white" }}
        >
          {currYear}
        </text>
      </>
    );
  }
};

export const CitationChart = ({
  jounalPapers,
  conferencePapers,
  otherTypes,
}) => {
  const margin = { left: 40, right: 40, top: 50, bottom: 26 };
  const sett = { pr: 7, cr: 3.5 };
  const height = 360;
  const width = 1000;
  const mapLinkPaper = {};
  const mapCitations = {};
  const [highlighted, setHighlighted] = useState(-1);
  //Create a hash look up
  jounalPapers.forEach((paper) => {
    mapLinkPaper[paper.hashLink] = paper;
  });
  conferencePapers.forEach((paper) => {
    mapLinkPaper[paper.hashLink] = paper;
  });
  otherTypes.forEach((paper) => {
    mapLinkPaper[paper.hashLink] = paper;
  });
  //Reorder the data
  const paperGroup = group(Object.values(mapLinkPaper), (d) => d.year);
  //Find the range
  let dataRange = extent(Object.entries(mapLinkPaper), (ele) => {
    return ele[1].year;
  });

  const ticks = timeYear.range(
    new Date(dataRange[0]),
    timeYear.offset(new Date(dataRange[1]), 3)
  );
  dataRange[1] = ticks[ticks.length - 1].getFullYear();
  let x = scaleTime()
    .range([margin.left, width - margin.right])
    .domain(dataRange);
  const widthSize = x("2022") - x("2021") - 8;
  const widthCiteSize = Math.floor(widthSize / (sett.cr * 2 + 2));
  let paperArray = Array.from(paperGroup, ([name, value]) => ({ name, value }));
  paperArray.forEach((group) => {
    group.value.forEach((paper, idx) => {
      paper.pos = idx;
    });
  });
  let groupCitations = {};
  citations.forEach((cita) => {
    let count = 0;
    Object.entries(cita.citeCount).forEach((yearCount) => {
      if (yearCount[0] === "") {
        return;
      }
      if (!(yearCount[0] in groupCitations)) {
        groupCitations[yearCount[0]] = [];
      }
      for (let i = 0; i < yearCount[1]; i++) {
        groupCitations[yearCount[0]].push({
          id: count,
          link: cita.link,
          pos: groupCitations[yearCount[0]].length,
        });
        count++;
      }
    });
  });
  citations.forEach((cita) => {
    mapCitations[cita.link] = cita;
  });
  const paperColor = scaleSequentialLog(
    [
      1,
      max(citations, (paper) => {
        return paper.total ? paper.total : 0;
      }),
    ],
    interpolatePurples
  );

  return (
    <div>
      <svg
        height={height}
        width={width}
        style={{ background: "white", borderRadius: "16px" }}
      >
        <g>
          <line
            x1={x(dataRange[0]) - 1}
            y1={margin.top}
            x2={x(dataRange[1]) + 1}
            y2={margin.top}
            strokeWidth={2}
            stroke="black"
          />
          {ticks.map((currYear) => (
            <DrawTick
              key={currYear}
              year={currYear}
              x={x}
              yA={margin.top}
              direction={1}
            />
          ))}
        </g>
        <g>
          {Object.entries(groupCitations).map((group) => (
            <>
              {group[1].map((cite, idx) => (
                <>
                  {mapLinkPaper[cite.link] === undefined ? (
                    <p>{cite.link}</p>
                  ) : (
                    <line
                      key={cite.id + cite.link}
                      x1={
                        x(group[0]) +
                        (sett.cr * 2 + 1) * ((idx % widthCiteSize) + 1)
                      }
                      y1={
                        height -
                        margin.bottom -
                        Math.floor(idx / widthCiteSize) *
                          ((sett.cr + 1.2) * 2) -
                        sett.cr -
                        7
                      }
                      x2={x(mapLinkPaper[cite.link].year) + widthSize / 2}
                      y2={
                        margin.top +
                        mapLinkPaper[cite.link].pos * ((sett.pr + 1) * 2) +
                        sett.pr +
                        7
                      }
                      opacity={cite.link === highlighted ? 0.4 : 0.05}
                      stroke={cite.link === highlighted ? "#f44336" : "black"}
                      strokeWidth={1}
                    />
                  )}
                </>
              ))}
            </>
          ))}
        </g>
        <g>
          {paperArray.map((group) => (
            <>
              {group.value.map((paper, idx) => (
                <a href={"#" + paper.hashLink}>
                  <circle
                    key={paper.hashLink}
                    data-tooltip-id="paper_tooltip"
                    data-tooltip-content={paper.title}
                    onMouseEnter={() => setHighlighted(paper.hashLink)}
                    onMouseLeave={() => setHighlighted(-1)}
                    cx={x(group.name) + widthSize / 2}
                    cy={margin.top + idx * ((sett.pr + 1) * 2) + sett.pr + 7}
                    r={sett.pr}
                    fill={paperColor(
                      paper.hashLink in mapCitations
                        ? mapCitations[paper.hashLink].total
                        : 0
                    )}
                    stroke="black"
                    strokeWidth={2}
                  />
                </a>
              ))}
            </>
          ))}
        </g>
        <g>
          {Object.entries(groupCitations).map((group) => (
            <>
              {group[1].map((cite, idx) => (
                <circle
                  key={cite.id + cite.link}
                  cx={
                    x(group[0]) +
                    (sett.cr * 2 + 2) * ((idx % widthCiteSize) + 1)
                  }
                  cy={
                    height -
                    margin.bottom -
                    Math.floor(idx / widthCiteSize) * ((sett.cr + 1.2) * 2) -
                    sett.cr -
                    9
                  }
                  r={sett.cr}
                  fill={cite.link === highlighted ? "#f44336" : "#0277bd"}
                  stroke="#37474f"
                  strokeWidth={1}
                />
              ))}
            </>
          ))}
        </g>
        <g>
          <line
            x1={x(dataRange[0]) - 1}
            y1={height - margin.bottom}
            x2={x(dataRange[1]) + 1}
            y2={height - margin.bottom}
            strokeWidth={2}
            stroke="black"
          />
          {ticks.map((currYear) => (
            <DrawTick
              key={currYear}
              year={currYear}
              x={x}
              yA={height - margin.bottom}
              direction={-1}
            />
          ))}
        </g>
        <image
          x={width / 1.5}
          y={-2}
          href="Legend.svg"
          height={50}
          width={320}
          alt="Shows the color mapping"
        />
        <text
          x={15}
          y={25}
          fontSize={20}
          fontWeight="bold"
          textAnchor="start"
          fontFamily="sans-serif"
        >
          My Publications and their Citations
        </text>
        <text
          x={width / 2}
          y={height - 6}
          fontSize={14}
          fontWeight="bold"
          textAnchor="middle"
          fontFamily="sans-serif"
        >
          Paper Citations
        </text>
      </svg>
      <Tooltip
        id="paper_tooltip"
        render={({ content }) => (
          <span>
            {content}
            <br />
          </span>
        )}
      />
    </div>
  );
};
