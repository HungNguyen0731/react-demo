import React, { Component } from "react";
import { Box, Grid } from "@mui/material";
import { Field, reduxForm } from "redux-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import FormHelperText from "@mui/material/FormHelperText";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { withStyles } from "@mui/styles";
import styles from "./styles";
import moment from "moment";
import Switch from "@mui/material/Switch";
import * as modalActions from "../../action/modal";
import * as todoActions from "../../action/todo";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
const validate = (values) => {
  const errors = {};
  const requiredFields = ["title", "due_on"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  return errors;
};

const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
);

const renderDatePicker = ({
  input,
  label,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <FormControl >
    <TextField
      label={label}
      type="date"
      helperText={touched && error}
      error={touched && invalid}
      InputLabelProps={{
        shrink: true,
      }}
      {...input}
      {...custom}
    />
  </FormControl>
);
const renderCheckbox = ({
  input,
  label,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <div>
    <FormControlLabel
      control={
        <Switch
          checked={input.value ? true : false}
          onChange={input.onChange}
        />
      }
      label={label}
    />
    {renderFromHelper({ touched, error })}
  </div>
);
const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return;
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>;
  }
};
class FormTodo extends Component {
  handleSubmitForm = (data) => {
    const { ActionCreators, modalActionCreators, TodoEditing } = this.props;
    const { addTodo, updateTodo } = ActionCreators;
    const { hideModal } = modalActionCreators;
    if (!TodoEditing) {
      addTodo(data);
      hideModal();
    } else {
      data.status = !data.status  ? 'pending' : 'completed' 
      updateTodo(Object.assign(TodoEditing,data))
      hideModal();
    }
  };

  render() {
    const { modalActionCreators,TodoEditing } = this.props;
    const { hideModal } = modalActionCreators;

    const { handleSubmit, classes } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleSubmitForm)}>
        <Grid item md={12}>
          <Field
            name="title"
            className={classes.textField}
            component={renderTextField}
            label="Title"
          />
        </Grid>
        <Grid item md={12}>
          <Field
            name="due_on"
            className={classes.textField}
            component={renderDatePicker}
            label="due on"
          />
        </Grid>
        {TodoEditing ?
          <Grid item md={12}>
            <Field
              name="status"
              className={classes.textField}
              component={renderCheckbox}
              label="status"
            />
          </Grid> : null
        }
        <Grid item md={12}>
          <Grid item md={12}>
            <Box display="flex" flexDirection="row-reverse" mt={2}>
              <Box ml={1}>
                <Button variant="contained" color="secondary" onClick={hideModal}>
                  Hủy Bỏ
                </Button>
              </Box>
              <Button variant="contained" color="primary" type="submit">
                Lưu Lại
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    );
  }
}
FormTodo.propTypes = {
  todo: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      user_id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      due_on: PropTypes.string.isRequired,
      status: PropTypes.bool.isRequired,
    })
  ),
  modalActionCreators: PropTypes.shape({
    showModal: PropTypes.func,
    hideModal: PropTypes.func,
    changeModalTitle: PropTypes.func,
    changeModalContent: PropTypes.func,
  }),
  handleSubmit: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    TodoEditing: state.todo.editing||null,
    initialValues: {
      title: state.todo.editing ? state.todo.editing.title : null,
      due_on: state.todo.editing ? moment(state.todo.editing.due_on).format("YYYY-MM-DD") : null,
      status: state.todo.editing  ? state.todo.editing.status === 'pending' ? false : true  : false
      //  status:editing.title || null,
    },
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    modalActionCreators: bindActionCreators(modalActions, dispatch),
    ActionCreators: bindActionCreators(todoActions, dispatch),
  };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);

const FORM_NAME = "FormAdd";

const withReduxForm = reduxForm({
  form: FORM_NAME,
  validate,
});

export default compose(
  withStyles(styles),
  withConnect,
  withReduxForm
)(FormTodo);
