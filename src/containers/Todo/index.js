import React, { Component } from "react";
import { connect } from "react-redux";
import TodoList from "../../components/TodoList";
import TodoItem from "../../components/TodoList/TodoItem";
import PropTypes from "prop-types";
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import * as modalActions from '../../action/modal';
import { bindActionCreators, compose } from "redux";
import { withStyles } from "@mui/styles";
import FormTodo from '../FormTodo';
import * as todoActions from "./../../action/todo";

import styles from "./styles";

class Todo extends Component {
  componentDidMount() {
    const { todoActionCreators } = this.props;
    const { fetchListTodo } = todoActionCreators;
    fetchListTodo();
  }
//Show Lists to-do
  // showTodos(data) {
  //   var result = null;
  //   if (data && data.length > 0) {
  //     result = data.map((el, index) => {
  //       return <TodoItem  key={index} DeleteForm={this.showModalDeleteTodo} EditForm={this.handleEditTodo}  data={el} />;
  //     });
  //   }
  //   return result;
  // }

  HandleDeleteTodo = todo => {
     const { modalActionCreators, classes } = this.props;
     const {
       showModal,
       hideModal,
       changeModalTitle,
       changeModalContent,
     } = modalActionCreators;
     showModal();
     changeModalTitle('Delete todo');
     changeModalContent(
       <div className={classes.modalDelete}>
         <div className={classes.modalConfirmText}>
           Bạn chắc chắn muốn xóa{' '}
           <span className={classes.modalConfirmTextBold}>{todo.title}</span>?
         </div>
         <Box display="flex" flexDirection="row-reverse" mt={2}>
           <Box ml={1}>
             <Button variant="contained" onClick={hideModal}>
               Hủy Bỏ
             </Button>
           </Box>
           <Box>
             <Button
               variant="contained"
               color="primary"
               onClick={() => this.onDeleteTodo(todo)}
             >
               Đồng Ý
             </Button>
           </Box>
         </Box>
       </div>,
     );
   };
   onDeleteTodo(todo) {
     const { id } = todo;
     const { todoActionCreators,modalActionCreators } = this.props;
       const {hideModal} = modalActionCreators
       const { deleteTodo } = todoActionCreators;
       hideModal()
     deleteTodo(id);
   }
  // Paging event
  handleChange = (value) => {
    const { todoActionCreators } = this.props;
    const { fetchListTodo } = todoActionCreators;
    fetchListTodo({ page: value });
  };
  //Mở form nhập liệu
  openForm = () => {
     const { modalActionCreators,todoActionCreators } = this.props;
     const { setTodoEditing } = todoActionCreators;
     setTodoEditing(null);
     const {
       showModal,
       changeModalTitle,
       changeModalContent,
     } = modalActionCreators;
     showModal();
     changeModalTitle('Add');
     changeModalContent(<FormTodo />);
   };
   //Mở form edit
   handleEditTodo = Todo => {
     const { todoActionCreators, modalActionCreators } = this.props;
     const { setTodoEditing } = todoActionCreators;
     setTodoEditing(Todo);
     const {
       showModal,
       changeModalTitle,
       changeModalContent,
     } = modalActionCreators;
     showModal();
     changeModalTitle('Edit Todo');
     changeModalContent(<FormTodo />);
   };
  render() {
    console.log( this.props)

    var { data, pagination } = this.props;
    return (
      <div>
        <TodoList
          onOpenForm={this.openForm}
          handleChange={(event, val) => this.handleChange(val)}
          pagination={pagination}
          data = {data}
          handleDelete = {this.HandleDeleteTodo}
          handleEdit = {this.handleEditTodo}

        >
          {/* {this.showTodos(data)} */}
        </TodoList>
      </div>
    );
  }
}
Todo.propTypes = {
  classes: PropTypes.object,
  Data: PropTypes.array,
};
const mapStateToProps = (state) => {
  return {
    data: state.todo.ListTodo ? state.todo.ListTodo.data : null,
    pagination: state.todo.ListTodo
      ? state.todo.ListTodo.meta.pagination
      : null,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    todoActionCreators: bindActionCreators(todoActions, dispatch),
    modalActionCreators: bindActionCreators(modalActions, dispatch),
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withStyles(styles), withConnect)(Todo);
