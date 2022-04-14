import { DEFAULT_STATIONS, METHODS, BASE_URL } from "../constants";

const PAGE_URL = "http://localhost:3000/admin/line";

const DEFAULT_LINE = {
  id: 1,
  name: "1호선",
  upStation: "사당",
  downStation: "방배",
  distance: "5",
  color: "#4caf50",
};

const DEFAULT_LINES = [{ ...DEFAULT_LINE }];

Cypress.Commands.add("createLine", (line = DEFAULT_LINE) => {
  cy.intercept(METHODS.POST, BASE_URL.LINES, [{ ...DEFAULT_LINE }]);
  cy.intercept(METHODS.GET, BASE_URL.LINES, [...DEFAULT_LINES]);
  cy.get("button").contains("노선 생성").click();
  cy.get("form input[name=name]").type(DEFAULT_LINE.name);
  cy.get(".up-station-select").click();
  cy.get("li.up-station-item").contains(DEFAULT_LINE.upStation).click();
  cy.get(".down-station-select").click();
  cy.get("li.down-station-item").contains(DEFAULT_LINE.downStation).click();
  cy.get("form input[name=distance]").type(DEFAULT_LINE.distance);
  cy.get(`.swatches-picker div[title="${DEFAULT_LINE.color}"]`).click();
  cy.get("button[type=submit]").click();
});

describe("노선 관리 페이지", () => {
  beforeEach(() => {
    cy.intercept(METHODS.GET, BASE_URL.STATIONS, [...DEFAULT_STATIONS]);
    cy.visit(PAGE_URL);
  });

  it("노선 생성: 1호선", () => {
    cy.createLine();
    cy.get("[data-cy='line-list'] li").should("have.length", 1);
  });

  it("노선 이름 수정: 1호선 => 2호선", () => {
    cy.createLine();
    cy.get("[data-cy='line-list'] li")
      .contains(DEFAULT_LINE.name)
      .get("[data-cy='line-edit-button']")
      .click();
    cy.get("[data-cy='line-name-input']").clear();
    cy.get("[data-cy='line-name-input']").type("2호선");
    cy.intercept(METHODS.PUT, `${BASE_URL.LINES}/${DEFAULT_LINE.id}`, {
      id: 1,
      name: "2호선",
      upStation: "사당",
      downStation: "방배",
      distance: "5",
      color: "#4caf50",
    });
    cy.intercept(METHODS.GET, BASE_URL.LINES, [
      {
        id: 1,
        name: "2호선",
        upStation: "사당",
        downStation: "방배",
        distance: "5",
        color: "#4caf50",
      },
    ]);
    cy.get("button").contains("확인").click();
    cy.get("[data-cy='line-list'] li").first().should("have.text", "2호선");
  });

  it("노선 삭제", () => {
    cy.intercept(METHODS.DELETE, `${BASE_URL.LINES}/${DEFAULT_LINE.id}`);
    cy.createLine();
    cy.get("[data-cy='line-list'] li")
      .contains(DEFAULT_LINE.name)
      .get("[data-cy='line-delete-button']")
      .click();
    cy.intercept(METHODS.GET, BASE_URL.LINES, []);
    cy.on("window:confirm", () => true);
    cy.get("[data-cy='line-list'] li").should("have.length", 0);
  });
});
