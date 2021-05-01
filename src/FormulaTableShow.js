import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import FormulasNutrientName from "./FormulasNutrientName";
import { ProgressSpinner } from "primereact/progressspinner";
import useData from "./Hooks/useData";

const FormulasTableShow = ({ id }) => {
  const { data, status } = useData(`/api/formulas/${id}`);

  const rowIndex = (rowData, column) => {
    return column.rowIndex + 1;
  };

  const nutrientName = (rowData) => {
    return <FormulasNutrientName id={rowData.NutrientID} />;
  };

  if (status === "loading") {
    return <ProgressSpinner />;
  }

  if (status === "error") {
    return <span colSpan={5}>Error fetching data</span>;
  }

  return (
    <div className="py-3">
      <p className="lead my-3">{data.Name} Configuration:</p>
      <DataTable
        rowHover
        dataKey="ID"
        paginator
        rows={5}
        className="text-center"
        value={data.Doses}
        emptyMessage="No data available"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        rowsPerPageOptions={[5, 10, 15]}
      >
        <Column rowReorder style={{ width: "3em" }} />
        <Column header="Order" body={rowIndex} className="text-center" />
        <Column header="Nutrient" body={nutrientName} className="text-center" />
        <Column
          header="Dose rate"
          field="Size.Formatted"
          className="text-center"
        />
        <Column
          header="Delay"
          field="Delay.Formatted"
          className="text-center"
        />
      </DataTable>
    </div>
  );
};

export default FormulasTableShow;
