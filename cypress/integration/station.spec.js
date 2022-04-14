import { METHODS, BASE_URL, DEFAULT_STATION } from "../constants";

const PAGE_URL = "http://localhost:3000/admin/station";
describe("역 관리 페이지", () => {
  beforeEach(() => {
    cy.intercept(METHODS.GET, BASE_URL.STATIONS, []);
    cy.intercept(METHODS.POST, BASE_URL.STATIONS, DEFAULT_STATION).as(
      "createStation"
    );
    cy.intercept(METHODS.GET, BASE_URL.STATIONS, [{ ...DEFAULT_STATION }]).as(
      "getDefaultStations"
    );
    cy.intercept(
      METHODS.DELETE,
      `${BASE_URL.STATIONS}/${DEFAULT_STATION.id}`,
      {}
    ).as("deleteStation");
    cy.visit(PAGE_URL);
  });

  it("역 생성: 루터역", () => {
    cy.get("[data-cy='station-name-input']").type(DEFAULT_STATION.name);
    cy.get("button").contains("추가").click();
    cy.wait("@createStation");
    cy.wait("@getDefaultStations");
    cy.get("[data-cy='station-list'] li")
      .first()
      .should("have.text", DEFAULT_STATION.name);
  });

  it("역 삭제", () => {
    cy.get("[data-cy='station-name-input']").type(DEFAULT_STATION.name);
    cy.get("button").contains("추가").click();
    cy.wait("@createStation");
    cy.wait("@getDefaultStations");
    cy.intercept(METHODS.GET, BASE_URL.STATIONS, []).as("getEmptyStations");
    cy.get("[data-cy='station-list'] li")
      .contains(DEFAULT_STATION.name)
      .get("[data-cy='station-delete-button']")
      .click();
    cy.wait("@deleteStation");
    cy.on("window:confirm", () => true);
    cy.wait("@getEmptyStations");
    cy.get("[data-cy='station-list'] li").should("have.length", 0);
  });
});
