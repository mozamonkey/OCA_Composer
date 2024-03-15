import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import BackNextSkeleton from '../components/BackNextSkeleton';
import { Box, Typography } from '@mui/material';
import { Context } from '../App';
import { AgGridReact } from 'ag-grid-react';
import { gridStyles } from '../constants/styles';
import { CustomPalette } from '../constants/customPalette';


const DatasetView = () => {
  const gridRef = useRef(null);
  const schemaGridRef = useRef(null);
  const {
    setCurrentDataValidatorPage,
    dataEntryDataRowData,
    dataEntryDataHeader,
    setDataEntryDataRowData,
    schemaDataConformantHeader,
    schemaDataConformantRowData,
    setSchemaDataConformantRowData
  } = useContext(Context);

  const [columnDefs, setColumnDefs] = useState([]);
  const [tableLength, setTableLength] = useState(0);
  const [schemaColumnDefs, setSchemaColumnDefs] = useState([]);
  const [schemaTableLength, setSchemaTableLength] = useState(0);

  const defaultColDef = useMemo(() => {
    return {
      editable: true,
      cellDataType: false,
    };
  }, []);

  useEffect(() => {
    const titles = [];
    let newTableLength = 0;
    dataEntryDataHeader.forEach((header) => {
      titles.push({
        headerName: header,
        field: header,
        width: 100,
        resizable: true,
        editable: true,
      });
      newTableLength += 100;
    });

    const schemaTitles = [];
    let newSchemaTableLength = 0;
    schemaDataConformantHeader.forEach((header) => {
      schemaTitles.push({
        headerName: header,
        field: header,
        width: 100,
        resizable: true,
        editable: true,
      });
      newSchemaTableLength += 100;
    });

    setSchemaTableLength(newSchemaTableLength);
    setSchemaColumnDefs(schemaTitles);
    setTableLength(newTableLength);
    setColumnDefs(titles);
  }, [dataEntryDataHeader, schemaDataConformantHeader]);

  return (
    <>
      <BackNextSkeleton isBack pageBack={() => {
        setDataEntryDataRowData(gridRef.current?.api.getRenderedNodes()?.map(node => node?.data));
        setSchemaDataConformantRowData(schemaGridRef.current?.api.getRenderedNodes()?.map(node => node?.data));
        setCurrentDataValidatorPage('StartDataValidator');
      }} />
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}>
        <Typography variant="h5" sx={{ mb: 2, color: CustomPalette.PRIMARY, fontWeight: 500 }}>Data Entry</Typography>
        {dataEntryDataHeader.length > 0 ?
          <div className="ag-theme-balham" style={{ width: tableLength, maxWidth: '90%' }}>
            <style>{gridStyles}</style>
            <AgGridReact
              ref={gridRef}
              rowData={dataEntryDataRowData}
              columnDefs={columnDefs}
              domLayout="autoHeight"
              defaultColDef={defaultColDef}
            />
          </div>
          : <Typography>No Data Entry</Typography>}
        <Typography variant="h5" sx={{ mb: 2, mt: 6, color: CustomPalette.PRIMARY, fontWeight: 500 }}>Schema Data</Typography>
        {schemaDataConformantHeader.length > 0 ?
          <div className="ag-theme-balham" style={{ width: schemaTableLength, maxWidth: '90%' }}>
            <style>{gridStyles}</style>
            <AgGridReact
              ref={schemaGridRef}
              rowData={schemaDataConformantRowData}
              columnDefs={schemaColumnDefs}
              domLayout="autoHeight"
              defaultColDef={defaultColDef}
            />
          </div>
          : <Typography>No Schema Conformant Data</Typography>}
      </Box>
    </>
  );
};

export default DatasetView;