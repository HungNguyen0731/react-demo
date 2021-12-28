import React, { Component } from "react";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import moment from "moment";
import FormControlLabel from "@mui/material/FormControlLabel";
import Pagination from "@mui/lab/Pagination";
import Switch from "@mui/material/Switch";
import { withStyles } from "@mui/styles";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from '@mui/material/Button';
import  {ROLES} from "../../constants/permissions";

import {
  AuthorizedSection
} from "@tshio/react-router-permissions";

class TodoList extends Component {
  onOpenPopup = () => {
    this.props.onOpenForm();
  };

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
    var { data, pagination, handleChange,handleDelete,handleEdit } = this.props;
    const columns = [
      {
        field: "id",
        headerName: "id",
        flex: 0.3,
        minWidth: 50,
      },
      {
        field: "title",
        headerName: "Title",
        flex: 0.3,
        minWidth: 50,
      },
      {
        field: "due_on",
        headerName: "due_on",
        flex: 0.3,
        minWidth: 50,
        renderCell: (params) => (
          <p>{moment(params.value).format("DD-MM-YYYY")}</p>
        ),
      },
      {
        field: "status",
        headerName: "status",
        flex: 0.3,
        minWidth: 50,
        renderCell: (params) => (
          //   <FormControlLabel
          //   control={
          //     <IOSSwitch
          //       checked={params.value === "pending" ? false : true}
          //       name="checkedB"
          //     />
          //   }
          // />
          <p>{params.value}</p>
        ),
      },
      {
        field: "action",
        headerName: "action",
        flex: 0.3,
        minWidth: 50,
        renderCell: (params) => (
          <pre>
              <AuthorizedSection requires={ROLES.CREATE}>
          {({ isAuthorized }) =>
            isAuthorized ? (
              <React.Fragment>
                  <IconButton
              aria-label="edit"
              onClick={() => handleEdit(params.row)}
            >
              <EditIcon color="primary" />
            </IconButton>
              </React.Fragment>
            ) : null
          }
           </AuthorizedSection>
          
            <IconButton
              style={{ border: 1 }}
              aria-label="delete"
              onClick={() => handleDelete(params.row)}
            >
              <DeleteIcon color="secondary" />
            </IconButton>
          </pre>
        ),
      },
    ];

    const CustomPagination = () => {
      return (
        <Pagination
          count={pagination?.pages}
          page={pagination.page ?? 1}
          color="primary"
          siblingCount={1}
          boundaryCount={1}
          shape="rounded"
          size="large"
          onChange={handleChange}
        />
      );
    };
    return (
      <div>
        <div className="container-fluid d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
          <div className="d-flex align-items-center flex-wrap mr-2">
         
          </div>
          <div className="d-flex align-items-center">
            <div className="card-toolbar">
            <Button variant="contained" color="success"  onClick={() => this.onOpenPopup()}>
  Add Todo
</Button>
            
            </div>
          </div>
        </div>
        <div className="card m-0 p-0">
          <div className="card-body " style={{ height: 500, width: "100%" }}>
            <DataGrid
              columns={columns}
              rows={data.length > 1 ? data : []}
              pagination
              pageSize={20}
              rowsPerPageOptions={[20]}
              components={{
                Pagination: CustomPagination,
              }}
             loading= {data.length > 1 ? false : true }
            />
          </div>
        </div>
      </div>
    );
  }
}
TodoList.propTypes = {
  children: PropTypes.array,
  pagination: PropTypes.shape({
    limit: PropTypes.number,
    links: PropTypes.object,
    page: PropTypes.number,
    pages: PropTypes.number,
    total: PropTypes.number,
  }),
};
export default TodoList;
