import { BASE_URL, DEFAULT_STATIONS, METHODS } from "../constants";

const PAGE_URL = "http://localhost:3000/admin/path";

const DEFAULT_PATH_RESULT = {
  distance: "5",
  fare: 1000,
  stations: [...DEFAULT_STATIONS],
};

const DEFAULT_PATH_REQUEST = {
  sourceId: DEFAULT_PATH_RESULT.stations[0].id,
  targetId: DEFAULT_PATH_RESULT.stations[1].id,
  age: 0,
};

describe("구간 검색 페이지", () => {
  beforeEach(() => {
    cy.intercept(METHODS.GET, BASE_URL.STATIONS, [...DEFAULT_STATIONS]);
    cy.visit(PAGE_URL);
  });

  it("구간 검색: '사당 => 서초'의 검색 결과: 사당 - 방배 - 서초", () => {
    const { sourceId, targetId, age } = DEFAULT_PATH_REQUEST;
    console.log(
      `${BASE_URL.PATH}?source=${sourceId}&target=${targetId}&age=${age}`
    );
    cy.intercept(
      METHODS.GET,
      `${BASE_URL.PATH}?source=${sourceId}&target=${targetId}&age=${age}`,
      {
        ...DEFAULT_PATH_RESULT,
      }
    );
    cy.get("[data-cy='source-station-select']").click();
    cy.get("li[data-cy='source-station']").contains("사당역").click();
    cy.get("[data-cy='target-station-select']").click();
    cy.get("li[data-cy='target-station']").contains("서초역").click();
    cy.get("button[type=submit]").contains("검색").click();
    cy.get("").should("have.length", 2);
  });
});
