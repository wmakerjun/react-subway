import {
  DEFAULT_STATIONS,
  METHODS,
  BASE_URL,
  DEFAULT_LINE,
} from "../constants";

const PAGE_URL = "http://localhost:3000/admin/section";

const DEFAULT_LINE_RESPONSE = {
  id: 1,
  name: "1호선",
  color: "#4caf50",
  stations: [
    {
      id: 1,
      name: "사당역",
    },
    {
      id: 2,
      name: "방배역",
    },
  ],
};

describe("구간 관리 페이지", () => {
  beforeEach(() => {
    cy.intercept(METHODS.GET, BASE_URL.STATIONS, [...DEFAULT_STATIONS]);
    cy.intercept(METHODS.GET, BASE_URL.LINES, [{ ...DEFAULT_LINE }]);
    cy.visit(PAGE_URL);
  });

  it("최초 구간 확인: 방배 => 서초", () => {
    cy.intercept(METHODS.GET, `${BASE_URL.LINES}/${DEFAULT_LINE.id}`, [
      { ...DEFAULT_LINE_RESPONSE },
    ]);
    cy.get("[data-cy='line-select']").click();
    cy.get("li[data-cy='line-item']").contains(DEFAULT_LINE.name).click();
  });

  xit("구간 생성", () => {});

  xit("구간 삭제", () => {});
});
