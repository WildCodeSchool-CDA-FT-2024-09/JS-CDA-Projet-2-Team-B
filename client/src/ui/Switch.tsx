import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

export const CustomSwitch = styled(Switch)(() => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#4caf50',
    '&:hover': {
      backgroundColor: 'rgba(76, 175, 80, 0.08)'
    }
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#4caf50'
  },
  '& .MuiSwitch-switchBase:not(.Mui-checked)': {
    color: '#f44336'
  },
  '& .MuiSwitch-switchBase:not(.Mui-checked) + .MuiSwitch-track': {
    backgroundColor: '#f44336'
  }
}));
