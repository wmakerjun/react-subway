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

const UPDATED_DEFAULT_LINE = {
  id: 1,
  name: "2호선",
  upStation: "사당",
  downStation: "방배",
  distance: "5",
  color: "#4caf50",
};

const DEFAULT_LINES = [{ ...DEFAULT_LINE }];

describe("노선 관리 페이지", () => {
  beforeEach(() => {
    cy.intercept(METHODS.GET, BASE_URL.STATIONS, [...DEFAULT_STATIONS]);
    cy.visit(PAGE_URL);
  });

  it("노선 생성: 1호선", () => {
    cy.intercept(METHODS.POST, BASE_URL.LINES, [{ ...DEFAULT_LINE }]).as(
      "createDefaultLine"
    );
    cy.intercept(METHODS.GET, BASE_URL.LINES, [...DEFAULT_LINES]).as(
      "getDefaultLine"
    );
    cy.get("[data-cy='line-create-button']").click();
    cy.get("form input[name=name]").type(DEFAULT_LINE.name);
    cy.get("[data-cy='up-station-select']").click();
    cy.get("li[data-cy='up-station-item']")
      .contains(DEFAULT_LINE.upStation)
      .click();
    cy.get("[data-cy='down-station-select']").click();
    cy.get("li[data-cy='down-station-item']")
      .contains(DEFAULT_LINE.downStation)
      .click();
    cy.get("form input[name=distance]").type(DEFAULT_LINE.distance);
    cy.get(`.swatches-picker div[title="${DEFAULT_LINE.color}"]`).click();
    cy.get("button[type=submit]").click();
    cy.wait("@createDefaultLine");
    cy.wait("@getDefaultLine");
    cy.get("[data-cy='line-list'] li").should("have.length", 1);
  });

  it("노선 이름 수정: 1호선 => 2호선", () => {
    cy.intercept(METHODS.GET, BASE_URL.LINES, [...DEFAULT_LINES]);
    cy.get("[data-cy='line-list'] li")
      .contains(DEFAULT_LINE.name)
      .get("[data-cy='line-edit-button']")
      .click();
    cy.get("[data-cy='line-name-input']").clear();
    cy.get("[data-cy='line-name-input']").type("2호선");
    cy.get("[data-cy='up-station-select']").click();
    cy.get("li[data-cy='up-station-item']")
      .contains(DEFAULT_LINE.upStation)
      .click();
    cy.get("[data-cy='down-station-select']").click();
    cy.get("li[data-cy='down-station-item']")
      .contains(DEFAULT_LINE.downStation)
      .click();
    cy.intercept(METHODS.PUT, `${BASE_URL.LINES}/${DEFAULT_LINE.id}`, {
      ...UPDATED_DEFAULT_LINE,
    });
    cy.intercept(METHODS.GET, BASE_URL.LINES, [{ ...UPDATED_DEFAULT_LINE }]);
    cy.get("button").contains("수정").click();
    cy.get("[data-cy='line-list'] li").first().should("have.text", "2호선");
  });

  it("노선 삭제", () => {
    cy.intercept(METHODS.GET, BASE_URL.LINES, [...DEFAULT_LINES]);
    cy.intercept(METHODS.DELETE, `${BASE_URL.LINES}/${DEFAULT_LINE.id}`, []);
    cy.intercept(METHODS.GET, BASE_URL.LINES, []).as("getEmptyLines");
    cy.get("[data-cy='line-list'] li")
      .contains(DEFAULT_LINE.name)
      .get("[data-cy='line-delete-button']")
      .click();
    cy.on("window:confirm", () => true);
    cy.wait("@getEmptyLines");
    cy.get("[data-cy='line-list'] li").should("have.length", 0);
  });
});
