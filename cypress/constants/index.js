export const DEFAULT_STATION = {
  id: 1,
  name: "루터역",
};

export const METHODS = {
  POST: "POST",
  GET: "GET",
  PUT: "PUT",
  DELETE: "DELETE",
};

export const BASE_URL = {
  STATIONS: "/stations",
  LINES: "/lines",
  PATH: "/paths",
};

export const DEFAULT_STATIONS = [
  {
    id: 1,
    name: "사당역",
  },
  {
    id: 2,
    name: "방배역",
  },
  {
    id: 3,
    name: "서초역",
  },
];

export const DEFAULT_LINE = {
  id: 1,
  name: "1호선",
  upStation: "사당",
  downStation: "방배",
  distance: "5",
  color: "#4caf50",
};
