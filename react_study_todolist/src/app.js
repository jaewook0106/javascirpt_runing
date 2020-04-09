class Header extends React.Component {
  render() {
    return (
      <header>
        <h1 className="text-center">Todo List</h1>
      </header>
    )
  }
}


class FormTag extends React.Component {
  constructor() {
    super()
    this.state = {
      targetValue: ''
    }
  }

  inputAddValue = (e) => {
    const value = e.target.value;
    this.setState((state, props) => {
      return state.targetValue = value;
    })
  }

  enterAdd = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.targetEvent();
    }
    
  }

  clickAddList = () => {
    this.targetEvent()
  }

  targetEvent = () => {
    if ( this.state.targetValue.length > 0 ) {
      this.props.addListDataEvent(this.state.targetValue);
      document.querySelector('.form-control').value = '';
      this.setState((state, props) => {
        return state.targetValue = '';
      })
    } else {
      alert('글자를 입력해주세요');
    }
  }

  render() {
    return (
      // <form className="text-center mb-3">
      <div className="text-center mb-3">
        <input type="text" className="form-control mb-3" onInput={this.inputAddValue} onKeyDown={this.enterAdd} />
        <button type="button" className="btn btn-primary" onClick={this.clickAddList}>Add Todo</button>
        <div>{this.state.targetValue}</div>
      </div>
      // </form>
    )
  }
}

class ListItem extends React.Component {

  clickListDel = () => {
    this.props.delListDataEvent(this.props.listItem.id)
  }
  render() {
    return (
      <li className="list-group-item d-flex justify-content-between align-items-center">
        <input type="checkbox"/>
        <span className="flex-grow-1 ml-3">{this.props.listItem.id + 1}) {this.props.listItem.name} / key: {'list' + this.props.listItem.id}</span>
        <button type="button" className="btn btn-danger" onClick={this.clickListDel}>
          Delete
        </button>
      </li>
    )
  }
}

class TodoListTag extends React.Component {
  render() {
    return (
      <ul className="list-group">
        {this.props.list.map((item) => {
          return <ListItem listItem={item} key={'list' + item.id} delListDataEvent={this.props.delListDataEvent}></ListItem>
        })}
      </ul>
    )
  }
}




class App extends React.Component {
  constructor() {
    super()
    this.state = {
      listData: [
        {name: '영어 공부하기'},
        {name: 'React 공부하기'},
        {name: 'VueJs 공부하기'},
        {name: 'Javascript 공부하기'}
      ],
      totalLength: 0
    }
  }

  componentWillMount() {
    console.log('did')
    this.setState((state) => {
      return state.listData.map((item, idx) => {
        item.id = idx
      })
    })
    this.setState((state) => {
      return state.totalLength = state.listData.length
    })
  }
  addListDataEvent = (value) => {
    
    this.setState((state) => {
      const obj = {
        name: value,
      }
      return state.listData.push(obj)
    })
    this.setState((state) => {
      return state.listData.map((item, idx) => {
        item.id = idx
      })
    })
  }

  delListDataEvent = (id) => {
    console.log(id)
    this.setState((state) => {
      return state.listData.splice(id, 1);
    })
    this.setState((state) => {
      return state.listData.map((item, idx) => {
        item.id = idx
      })
    })
  }

  render() {
    return (
      <div className="container mt-3">
        <Header></Header>
        <FormTag addListDataEvent={this.addListDataEvent}></FormTag>
        <TodoListTag list={this.state.listData} delListDataEvent={this.delListDataEvent}></TodoListTag>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.querySelector('#root'))
