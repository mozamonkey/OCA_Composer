import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { CustomPalette } from '../constants/customPalette';
import BackNextSkeleton from '../components/BackNextSkeleton';
import { useTranslation } from 'react-i18next';
import useHandleOCAFileUpload from './useHandleOCAFileUpload';
import Drop from '../StartSchema/Drop';
import { datasetUploadDescription, datasetUploadTooltip, jsonUploadDescription, jsonUploadTooltip } from '../constants/constants';

const UploadingStart = () => {
  const { t } = useTranslation();

  const {
    setCurrentOCAMergePage,

    setOCAFile1Raw,
    setOCAFile2Raw,
    OCAFile1Loading,
    setOCAFile1Loading,
    OCAFile2Loading,
    setOCAFile2Loading,
    ocaFile1DropDisabled,
    setOcaFile1DropMessage,
    ocaFile1DropMessage,
    ocaFile2DropDisabled,
    setOcaFile2DropMessage,
    ocaFile2DropMessage,
    OCAFile1Raw,
    handleClearOCAFile1,
    OCAFile2Raw,
    handleClearOCAFile2,
    parsedOCAFile1,
    parsedOCAFile2,
  } = useHandleOCAFileUpload();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <BackNextSkeleton isForward={parsedOCAFile1 !== "" && parsedOCAFile2 !== ""} pageForward={() => {
        setCurrentOCAMergePage('UserSelection');
      }} />
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}>
        <Box sx={{ height: '3rem' }} />
        <Box>
          <Typography variant="h6" sx={{ textAlign: 'start', color: "black", marginBottom: "-1rem" }}>{t('Required')}: {t('OCA File 1')}</Typography>
          <Drop
            setFile={setOCAFile1Raw}
            setLoading={setOCAFile1Loading}
            loading={OCAFile1Loading}
            dropDisabled={ocaFile1DropDisabled}
            dropMessage={ocaFile1DropMessage}
            setDropMessage={setOcaFile1DropMessage}
            description={jsonUploadDescription}
            tipDescription={jsonUploadTooltip}
            version={6}
          />
        </Box>

        <Box display="flex">
          <Button
            variant="contained"
            color="button"
            onClick={handleClearOCAFile1}
            sx={{ width: 190, mr: 2 }}
            disabled={OCAFile1Raw.length === 0}
          >
            {t('Clear Schema File')}
          </Button>
        </Box>
        <Box sx={{ height: '4rem' }} />
        <Box>
          <Typography variant="h6" sx={{ textAlign: 'start', color: "black", marginBottom: "-1rem" }}>{t('Required')}: {t('OCA File 2')}</Typography>
          <Drop
            setFile={setOCAFile2Raw}
            setLoading={setOCAFile2Loading}
            loading={OCAFile2Loading}
            dropDisabled={ocaFile2DropDisabled}
            dropMessage={ocaFile2DropMessage}
            setDropMessage={setOcaFile2DropMessage}
            description={datasetUploadDescription}
            tipDescription={datasetUploadTooltip}
            version={6}
          />
        </Box>

        <Box display="flex">
          <Button
            variant="contained"
            color="button"
            onClick={handleClearOCAFile2}
            sx={{ width: 190, mr: 2 }}
            disabled={OCAFile2Raw.length === 0}
          >
            {t('Clear Dataset File')}
          </Button>
        </Box>

        <Box sx={{ height: '3rem' }} />
      </Box>
    </Box>
  );
};

export default UploadingStart;