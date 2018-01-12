import React, { Component } from 'react';

class EditTodo extends Component {
    constructor(props) {
        super();
        this.state = {
            id: props.name,
            item: props.item,
            newText: props.item.text,
            newPriority: props.item.priority
        };
        this.addItem = this.addItem.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.updateItem = this.updateItem.bind(this);
    }

    addItem(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            newText: value
        });
      };
    
    handleSelect(e) {
        this.setState({ newPriority: e.target.value })
    }

    updateItem(e) {
        e.preventDefault();
        const updateItem = {
            id: this.state.id,
            text: this.state.newText,
            priority: this.state.newPriority,
            editEnabled: false
        }

        this.props.changeTodo(updateItem);
    }


    render() {
        return (
            <form className="editform" onSubmit={this.updateItem}>
                <div className="form-group row">
                    <label htmlFor="description">Description</label>
                    <div className="col-sm-10">
                        <textarea className="update-todo-text" name="text" rows="6" value={this.state.text} onChange={this.addItem}>
                        </textarea>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="priority">Priority</label>
                    <div className="col-sm-10">
                        <select className="update-todo-priority" name="priority" value={this.state.option} onChange={this.handleSelect}>
                            <option value="1">Low priority</option>
                            <option value="2">Medium priority</option>
                            <option value="3">High priority</option>
                        </select>
                    </div>
                </div>
                <button type="submit" className="update-todo">Save
                </button>
            </form>
        )
    }
}

export default EditTodo;

