import React from 'react';
import {
  Button
} from '@mui/material';
import { generateDataEntry } from './generateDataEntry';
import { generateDataEntryV2 } from './generateDataEntryV2';
import { CustomPalette } from '../constants/customPalette';
import { useTranslation } from 'react-i18next';

const GenerateDataEntryExcel = ({ rawFile, setLoading, disableButtonCheck }) => {
  const { t } = useTranslation();

  return (
    <Button
      variant='contained'
      color='navButton'
      onClick={() => {
        if (rawFile?.[0]?.type?.includes('zip')) {
          generateDataEntry(rawFile, setLoading);
        } else if (rawFile?.[0]?.type?.includes('json')) {
          generateDataEntryV2(rawFile, setLoading);
        }
      }}
      sx={{
        backgroundColor: CustomPalette.PRIMARY,
        ':hover': { backgroundColor: CustomPalette.SECONDARY },
        width: '100%',
        maxWidth: '300px',
        marginTop: '30px',
        marginBottom: '20px',
      }}
      disabled={disableButtonCheck}
    >
      {t('Generate Data Entry Excel')}
    </Button>
  );
};

export default GenerateDataEntryExcel;