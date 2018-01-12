import React, { Component } from 'react';
import EditTodo from './edit-todo';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      items: [],
    };
    this.addItem = this.addItem.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.editItem = this.editItem.bind(this);
   // this.saveItem = this.saveItem.bind(this);  
    this.deleteItem = this.deleteItem.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
  }

  addItem(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSelect(e) {
    this.state.priority = e.target.value;
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    const newItem = {
      text: this.state.text,
      priority: this.state.priority,
      id: Date.now(),
      editEnabled: false
    };
    this.setState(prevState => ({
      items: prevState.items.concat(newItem),
      text: '',
      priority: 0
    }));
  }

  editItem(e) {
    e.preventDefault();
    var copyOfItems = [...this.state.items];
    var todo = copyOfItems.find(item => {
      return item.id == e.target.name;
    });

    todo.editEnabled = true;
    
    this.setState ({
      items : copyOfItems
     });
  }; 

  deleteItem(e) {
    e.preventDefault();
    //make a copy of this.state.items
    var copyOfItems = [...this.state.items];
    
    //find the id inside of items findIndex()
    var i = copyOfItems.findIndex(item => {
      return item.id == e.target.name;
    });

    copyOfItems.splice(i, 1);
    //set state of this.state.items with copyOfItems
    this.setState({
      items: copyOfItems
    })
  };

  updateTodo(item) {
    //make a copy of this.state.items
    var copyOfItems = [...this.state.items];
    
    //find the id inside of items findIndex()
    var index = copyOfItems.findIndex(i => {
      return i.id == item.id;
    });

    copyOfItems.splice(index, 1, item);

    this.setState({ items: copyOfItems })
  }

  render() {
    return (
      <div className='container'>
        <div className="jumbotron">
          <h1 className="display-4">Very Simple Todo App</h1>
          <p className="lead">Track all of the things</p>
          <hr className="my-4" />

          <div className="row">
            <div className="col-4">
              <div className="card">
                <div className="card-header">
                  Add New Todo
                  </div>
                <div className="card-body">
                  <form>
                    <div className="form-group row">
                      <label htmlFor="inputlist">I want to..</label>
                      <div className="col-sm-10">
                        <textarea className="create-todo-text" name="text" rows="6" onChange={this.addItem} value={this.state.text}>
                        </textarea>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="proiority">How much of a priority is this?</label>
                      <div className="col-sm-10">
                        <div>
                          <select className="create-todo-priority" name="priority" defaultValue={this.state.option} onChange={this.handleSelect}>
                            <option value="0">Select a Priority</option>
                            <option value="1">Low priority</option>
                            <option value="2">Medium priority</option>
                            <option value="3">High priority</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="card-footer">
                  <button type="submit" className="create-todo" onClick={this.handleSubmit}>Add</button>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-10">
                <div className="card">
                  <div className="card-header">
                    View Todos
                  </div>
                  <div className="card-body">
                    <div className="list-group">
                      <ul className="thisList">
                        {this.state.items.map(item => {
                          if (item.editEnabled) {
                            return (
                              <EditTodo key={item.id} item={item} name={item.id} changeTodo={this.updateTodo} />
                            )
                          } else {
                            return (<li key={item.id} className="success">
                              {item.text}
                              <a href="#" name={item.id} className="edit-todo" onClick={this.editItem}>Edit</a>
                              <a href="#" name={item.id} className="delete-todo" onClick={this.deleteItem}>Delete</a>
                            </li>);
                          }
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
