import FormulaTableShow from "./FormulaTableShow";
import { render } from "@testing-library/react";
import useData from "./Hooks/useData";

jest.mock("./Hooks/useData", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("FormulasNutrientName", () => {
  describe("when data is loaded", () => {
    it("renders the table", () => {
      useData.mockReturnValue({
        status: "success",
        data: {
          Doses: [{
            Delay: { Formatted: "delay_formatted" },
            Size: { Formatted: "size_formatted" },
            NutrientID: "some_nutrient_id"
          }],
          Name: "TestName",
        },
      });
      const { container, debug } = render(<FormulaTableShow id="test" />);

      // debug();

      expect(useData).toBeCalledWith("/api/formulas/test"); // Actually better test it separately

      expect(container).toContainHTML("delay_formatted");
      expect(container).toContainHTML("size_formatted");
      // Work in progress
    });
  });

  describe("when data is being fetched", () => {
    it.todo("renders the spinner loader");
  });

  describe("if an error happens", () => {
    it.todo("it displays an error ");
  });
});
