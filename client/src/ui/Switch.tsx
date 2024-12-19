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
