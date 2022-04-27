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

const UPDATED_LINE_RESPONSE = {
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
    {
      id: 3,
      name: "서초역",
    },
  ],
};

Cypress.Commands.add("initLine", () => {
  cy.intercept(METHODS.GET, `${BASE_URL.LINES}/${DEFAULT_LINE.id}`, {
    ...DEFAULT_LINE_RESPONSE,
  });
  cy.get("[data-cy='line-select']").click();
  cy.get("li[data-cy='line-item']").contains(DEFAULT_LINE.name).click();
});

describe("구간 관리 페이지", () => {
  beforeEach(() => {
    cy.intercept(METHODS.GET, BASE_URL.STATIONS, [...DEFAULT_STATIONS]);
    cy.intercept(METHODS.GET, BASE_URL.LINES, [{ ...DEFAULT_LINE }]);
    cy.visit(PAGE_URL);
  });

  xit("최초 구간 확인: 1호선 사당 - 방배", () => {
    cy.initLine();
    cy.get("[data-cy='section-list'] li").should("have.length", 2);
  });

  it("새 구간 추가: 사당 - 방배 => 서초", () => {
    cy.initLine();
    cy.intercept(
      METHODS.POST,
      `${BASE_URL.LINES}/${DEFAULT_LINE.id}/sections`,
      {}
    ).as("createSection");
    cy.intercept(METHODS.GET, `${BASE_URL.LINES}/${DEFAULT_LINE.id}`, {
      ...UPDATED_LINE_RESPONSE,
    }).as("getUpdatedLine");
    cy.get("[data-cy='section-create-button']").click();
    cy.get("[data-cy='up-station-select']").click();
    cy.get("li[data-cy='up-station-item']").contains("방배역").click();
    cy.get("[data-cy='down-station-select']").click();
    cy.get("li[data-cy='down-station-item']").contains("서초역").click();
    cy.get("form input[name=distance]").type(DEFAULT_LINE.distance);
    cy.get("button[type=submit]").click();
    cy.wait("@createSection");
    cy.wait("@getUpdatedLine");
    cy.get("[data-cy='section-list'] li").eq(0).should("have.text", "사당역");
    cy.get("[data-cy='section-list'] li").eq(1).should("have.text", "방배역");
    cy.get("[data-cy='section-list'] li").eq(2).should("have.text", "서초역");
  });
});
