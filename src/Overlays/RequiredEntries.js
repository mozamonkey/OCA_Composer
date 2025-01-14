import React, { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../App';
import BackNextSkeleton from '../components/BackNextSkeleton';
import { Box } from '@mui/material';
import { flexCenter, gridStyles, preWrapWordBreak } from '../constants/styles';
import { AgGridReact } from 'ag-grid-react';
import CellHeader from '../components/CellHeader';
import DeleteConfirmation from './DeleteConfirmation';

const RequiredEntries = () => {
  const {
    attributesList,
    characterEncodingRowData,
    setCurrentPage,
    setSelectedOverlay,
    setCharacterEncodingRowData,
    setOverlay,
  } = useContext(Context);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [columnDefs, setColumnDefs] = useState([]);
  const gridRef = useRef();

  const RequiredEntryHeader = () => {
    const inputRef = useRef();

    const handleCheckboxChange = (event) => {
      const checked = event.target.checked;
      gridRef.current.api.forEachNode((node) => {
        node.setDataValue("Make selected entries required", checked);
      });
    };

    useEffect(() => {
      inputRef.current.checked = false;
    }, []);

    return (
      <CellHeader
        headerText={
          <Box sx={{ display: 'flex', direction: 'row', alignItems: 'center' }}>
            Required entries {' '}
            <input
              type="checkbox"
              ref={inputRef}
              onChange={handleCheckboxChange}
            />
          </Box>
        }
        helpText='Check for each attribute where the data entry cannot be left empty in a dataset.' />
    );
  };

  const CheckboxRenderer = ({ value, rowIndex, colDef }) => {
    const inputRef = useRef();

    useEffect(() => {
      inputRef.current.checked = value;
    }, [value]);

    const handleChange = (event) => {
      const checked = event.target.checked;
      gridRef.current.api.forEachNode((node, index) => {
        if (rowIndex === index) {
          node.setDataValue("Make selected entries required", checked);
        } else if (!node.data[colDef.field]) {
          node.setDataValue("Make selected entries required", false);
        }
      });
    };

    return <input type="checkbox" ref={inputRef} onChange={handleChange} />;
  };

  useEffect(() => {
    setColumnDefs([
      {
        field: "Attribute",
        editable: false,
        width: 180,
        autoHeight: true,
        cellStyle: () => preWrapWordBreak,
        headerComponent: () => <CellHeader headerText='Attribute' helpText='This is the name for the attribute and, for example, will be the column header in every tabular data set no matter what language.' />,
      },
      {
        field: "Make selected entries required",
        width: 180,
        headerComponent: RequiredEntryHeader,
        cellRenderer: CheckboxRenderer,
        checkboxSelection: false,
        cellStyle: () => flexCenter,
      },
    ]);
  }, [attributesList]);

  const handleForward = () => {
    setSelectedOverlay('');
    setCurrentPage('Overlays');
  };

  const handleDeleteCurrentOverlay = () => {
    setOverlay((prev) => ({
      ...prev,
      "Make selected entries required": {
        ...prev["Make selected entries required"],
        selected: false,
      },
    }));

    // Delete attribute from characterEncodingRowData
    const newCharacterEncodingRowData = characterEncodingRowData.map((row) => {
      delete row['Make selected entries required'];
      return row;
    });
    setCharacterEncodingRowData(newCharacterEncodingRowData);
    setSelectedOverlay('');
    setCurrentPage('Overlays');
  };

  return (
    <BackNextSkeleton isForward pageForward={handleForward} isBack pageBack={() => setShowDeleteConfirmation(true)} backText="Remove overlay">
      {showDeleteConfirmation && (
        <DeleteConfirmation
          removeFromSelected={handleDeleteCurrentOverlay}
          closeModal={() => setShowDeleteConfirmation(false)}
        />
      )}
      <Box
        sx={{
          margin: "2rem",
          gap: "3rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="ag-theme-balham" style={{ width: 360 }}>
          <style>{gridStyles}</style>
          <AgGridReact
            ref={gridRef}
            rowData={characterEncodingRowData}
            columnDefs={columnDefs}
            domLayout="autoHeight"
          />
        </div>
      </Box>
    </BackNextSkeleton>
  );
};

export default RequiredEntries;