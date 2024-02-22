import React from 'react';
import BackNextSkeleton from '../components/BackNextSkeleton';
import { Box, Button, Typography } from '@mui/material';
import Drop from '../StartSchema/Drop';
import useHandleEntryCodeDrop from './useHandleEntryCodeDrop';
import { gridStyles } from '../constants/styles';
import { AgGridReact } from 'ag-grid-react';
import { CustomPalette } from '../constants/customPalette';

const UploadPage = () => {
  const {
    rawFile,
    setRawFile,
    loading,
    setLoadingState,
    dropDisabled,
    dropMessage,
    setDropMessage,
    handleClearUpload,
    tempEntryCodeRowData,
    tableLength,
    columnDefs,
    handleSave,
    gridRef,
    setCurrentPage,
    setChosenEntryCodeIndex
  } = useHandleEntryCodeDrop();

  return (
    <>
      <BackNextSkeleton
        isBack
        pageBack={() => {
          setCurrentPage("Codes");
          setChosenEntryCodeIndex(-1);
        }}
        isForward={rawFile?.length > 0}
        pageForward={handleSave} />
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}>
        <Drop
          setFile={setRawFile}
          setLoading={setLoadingState}
          loading={loading}
          dropDisabled={dropDisabled}
          dropMessage={dropMessage}
          setDropMessage={setDropMessage}
          version={2}
          tipDescription={null}
        />
        <Box display="flex">
          <Button
            variant="contained"
            color="button"
            onClick={handleClearUpload}
            sx={{ width: 230, mr: 2 }}
            disabled={!rawFile || rawFile?.length === 0}
          >
            Clear Entry Code File
          </Button>
        </Box>
        {rawFile?.length > 0 ? (
          <Typography variant="h4" style={{ marginTop: "60px", color: CustomPalette.PRIMARY }}>
            Preview of the data
          </Typography>
        ) : (
          <Typography variant="h4" style={{ marginTop: "60px", color: "Gray" }}>
            No table to display
          </Typography>
        )}
        {rawFile?.length > 0 &&
          <div className="ag-theme-balham" style={{ width: tableLength, maxWidth: '90%', marginTop: "30px" }}>
            <style>{gridStyles}</style>
            <AgGridReact
              ref={gridRef}
              rowData={tempEntryCodeRowData}
              columnDefs={columnDefs}
              domLayout="autoHeight"
              defaultColDef={columnDefs}
            />
          </div>
        }
      </Box>
    </>
  );
};

export default UploadPage;