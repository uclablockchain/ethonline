import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const Selector = (data) => {
  const classes = useStyles();
  const [func, setFunc] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setFunc(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Button className={classes.button} onClick={handleOpen}>
        Select a Contract Function
      </Button>
      <FormControl className={classes.formControl}>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={func}
          onChange={handleChange}
        >
          {
              data.data.map((func, index) => {
                  return <MenuItem key={index} value={func.name}>{func.name}</MenuItem>
              })
          }
        </Select>
      </FormControl>
    </div>
  );
}

export default Selector;