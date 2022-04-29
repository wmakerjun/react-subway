import { DEFAULT_STATIONS, METHODS, BASE_URL } from "../constants";

const PAGE_URL = "http://localhost:3000/admin/section";

const DEFAULT_LINE_RESPONSE = {
  id: 1,
  name: "1호선",
  color: "#4caf50",
  distance: "5",
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
  cy.intercept(METHODS.GET, `${BASE_URL.LINES}/${DEFAULT_LINE_RESPONSE.id}`, {
    ...DEFAULT_LINE_RESPONSE,
  });
  cy.get("[data-cy='line-select']").click();
  cy.get("li[data-cy='line-item']")
    .contains(DEFAULT_LINE_RESPONSE.name)
    .click();
});

describe("구간 관리 페이지", () => {
  beforeEach(() => {
    cy.intercept(METHODS.GET, BASE_URL.STATIONS, [...DEFAULT_STATIONS]);
    cy.intercept(METHODS.GET, BASE_URL.LINES, [{ ...DEFAULT_LINE_RESPONSE }]);
    cy.visit(PAGE_URL);
  });

  it("최초 구간 확인: 1호선 사당 - 방배", () => {
    cy.initLine();
    cy.get("[data-cy='section-list'] li").should("have.length", 2);
  });

  it("새 구간 추가: 사당 - 방배 => 서초", () => {
    cy.initLine();
    cy.intercept(
      METHODS.POST,
      `${BASE_URL.LINES}/${DEFAULT_LINE_RESPONSE.id}/sections`,
      {}
    ).as("createSection");
    cy.intercept(METHODS.GET, `${BASE_URL.LINES}/${DEFAULT_LINE_RESPONSE.id}`, {
      ...UPDATED_LINE_RESPONSE,
    }).as("getUpdatedLine");
    cy.get("[data-cy='section-create-button']").click();
    cy.get("[data-cy='up-station-select']").click();
    cy.get("li[data-cy='up-station-item']").contains("방배역").click();
    cy.get("[data-cy='down-station-select']").click();
    cy.get("li[data-cy='down-station-item']").contains("서초역").click();
    cy.get("form input[name=distance]").type(DEFAULT_LINE_RESPONSE.distance);
    cy.get("button[type=submit]").click();
    cy.wait("@createSection");
    cy.wait("@getUpdatedLine");
    cy.wait(100);
    cy.get("[data-cy='section-list'] li")
      .eq(0)
      .should("have.text", UPDATED_LINE_RESPONSE.stations[0].name);
    cy.get("[data-cy='section-list'] li")
      .eq(1)
      .should("have.text", UPDATED_LINE_RESPONSE.stations[1].name);
    cy.get("[data-cy='section-list'] li")
      .eq(2)
      .should("have.text", UPDATED_LINE_RESPONSE.stations[2].name);
  });

  it("구간 삭제: 사당 - 방배 - 서초 => 사당 - 방배", () => {
    cy.intercept(METHODS.GET, `${BASE_URL.LINES}/${DEFAULT_LINE_RESPONSE.id}`, {
      ...UPDATED_LINE_RESPONSE,
    });
    cy.intercept(
      METHODS.DELETE,
      `${BASE_URL.LINES}/${UPDATED_LINE_RESPONSE.id}/sections?stationId=${UPDATED_LINE_RESPONSE.stations[2].id}`,
      {}
    );
    cy.get("[data-cy='line-select']").click();
    cy.get("li[data-cy='line-item']")
      .contains(DEFAULT_LINE_RESPONSE.name)
      .click();
    cy.intercept(METHODS.GET, `${BASE_URL.LINES}/${DEFAULT_LINE_RESPONSE.id}`, {
      ...DEFAULT_LINE_RESPONSE,
    });
    cy.get("[data-cy='section-delete-button']").eq(2).click();
    cy.on("window:confirm", () => true);
    cy.get("[data-cy='section-list'] li").should("have.length", 2);
  });
});
