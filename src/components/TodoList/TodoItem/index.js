import React, { Component } from "react";
import moment from "moment";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { withStyles } from "@mui/styles";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
// import products from '../reducers/products';
class TodoItem extends Component {
  render() {
    const IOSSwitch = withStyles((theme) => ({
      root: {
        width: 42,
        height: 26,
        padding: 0,
        margin: theme.spacing(1),
      },
      extendedIcon: {
          marginRight: theme.spacing(1),
        },
      switchBase: {
        padding: 1,
        "&$checked": {
          transform: "translateX(16px)",
          color: theme.palette.common.white,
          "& + $track": {
            backgroundColor: "#52d869",
            opacity: 1,
            border: "none",
          },
        },
        "&$focusVisible $thumb": {
          color: "#52d869",
          border: "6px solid #fff",
        },
      },
      thumb: {
        width: 24,
        height: 24,
      },
      track: {
        borderRadius: 26 / 2,
        border: `1px solid ${theme.palette.grey[400]}`,
        backgroundColor: theme.palette.grey[50],
        opacity: 1,
        transition: theme.transitions.create(["background-color", "border"]),
      },
      checked: {},
      focusVisible: {},
    }))(({ classes, ...props }) => {
      return (
        <Switch
          focusVisibleClassName={classes.focusVisible}
          disableRipple
          classes={{
            root: classes.root,
            switchBase: classes.switchBase,
            thumb: classes.thumb,
            track: classes.track,
            checked: classes.checked,
          }}
          {...props}
        />
      );
    });
    var { data, } = this.props;
    return (
      <tr>
        <td className="text-center">{data.id}</td>
        <td className="w-auto">{data.title}</td>
        <td>{moment(data.due_on).format("DD-MM-YYYY")}</td>
        <td>
          <FormControlLabel
            control={
              <IOSSwitch
                checked={data.status === "pending" ? false : true}
                name="checkedB"
              />
            }
          />
        </td>
        <td>
             
      <IconButton aria-label="edit" onClick={() => this.HanleEditForm(data)} >
        <EditIcon color="primary"  />
      </IconButton>
      <IconButton style={{border:1}} aria-label="delete" onClick={() => this.HanleDeleteForm(data)}>
        <DeleteIcon color="secondary"   />
      </IconButton>
      </td>
      </tr>
    );
 
  }
  HanleEditForm = (item) =>{
    this.props.EditForm(item);
  }
  HanleDeleteForm = (item) =>{
    this.props.DeleteForm(item);
  }
}
export default TodoItem;
