import FormulaTableShow from "./FormulaTableShow";
import { render } from "@testing-library/react";
import useData from "./Hooks/useData";
import { ProgressSpinner } from "primereact/progressspinner";

jest.mock("./Hooks/useData", () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock("primereact/progressspinner", () => ({
  ProgressSpinner: jest.fn()
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
      const { container } = render(<FormulaTableShow id="test" />);

      expect(useData).toBeCalledWith("/api/formulas/test"); // Actually better test it separately

      expect(container).toContainHTML("delay_formatted");
      expect(container).toContainHTML("size_formatted");
    });
  });

  describe("when data is being fetched", () => {
    it("renders the spinner loader", () => {
      ProgressSpinner.mockImplementation(() => <>Loading</>)
      useData.mockReturnValue({
        status: "loading",
      });
      const { container } = render(<FormulaTableShow />);
      expect(container).toContainHTML("Loading")
    });
  });

  describe("if an error happens", () => {
    it("it displays an error", () => {
      useData.mockReturnValue({
        status: "error",
      });
      const { container } = render(<FormulaTableShow id="test" />);
      expect(container).toContainHTML("Error fetching data")
    });
  });
});
