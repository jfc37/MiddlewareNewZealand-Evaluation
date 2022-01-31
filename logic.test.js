const logic = require("./logic");

describe("API", () => {
  describe("isValidEndpoint", () => {
    const invalidUrls = [
      "/",
      "/companies",
      "/companies/",
      "/companies/aaa",
      "/commpanies/1",
      "/companies/1/",
    ];

    invalidUrls.forEach((invalidUrl) => {
      it(`should be false when route is "${invalidUrl}"`, () => {
        const isValid = logic.isValidEndpoint(invalidUrl);
        expect(isValid).toBe(false);
      });
    });

    const validUrls = ["/companies/1", "/companies/0", "/companies/42"];

    validUrls.forEach((validUrl) => {
      it(`should be true when route is "${validUrl}"`, () => {
        const isValid = logic.isValidEndpoint(validUrl);
        expect(isValid).toBe(true);
      });
    });
  });

  describe("getIdFromRoute", () => {
    it("should last segment of the url", () => {
      const url = "/companies/1";

      const id = logic.getIdFromRoute(url);

      expect(id).toBe("1");
    });
  });

  describe("getXml", () => {
    it("should call correct url with id", async () => {});
    describe("when api fails with 404 status code", () => {
      it("should return with error property of 404", () => {});
      it("should return with NO xml property", () => {});
    });

    describe("when api fails with 500 status code", () => {
      it("should return with error property of 500", () => {});
      it("should return with NO xml property", () => {});
    });

    describe("when api succeeds", () => {
      it("should return with xml property of api result", () => {});
      it("should return with NO error property", () => {});
    });
  });
});
