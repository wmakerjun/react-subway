const PAGE_URL = "http://localhost:3000/admin/path";
describe("경로 조회 페이지", () => {
  beforeEach(() => {
    cy.intercept(METHODS.GET, BASE_URL.STATIONS, [...DEFAULT_STATIONS]);
    cy.visit(PAGE_URL);
  });

  it("경로 조회", () => {});
});
