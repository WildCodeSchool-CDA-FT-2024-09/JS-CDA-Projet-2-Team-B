import { alpha, styled } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import Switch, { SwitchProps } from '@mui/material/Switch';

const GreenSwitch = styled((props: SwitchProps) => <Switch {...props} />)(
  ({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: green[600],
      '&:hover': {
        backgroundColor: alpha(green[600], theme.palette.action.hoverOpacity)
      }
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: green[600]
    }
  })
);

export default GreenSwitch;

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
