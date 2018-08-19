import React, { Component, Fragment } from 'react';
import AppUI from './AppUI';
import { handleAdd, handleClickItem, handleInputChange, getInitlist } from '../../store/actions';
import store from '../../store';
import axios from 'axios';

class App extends Component {

  constructor() {
    super()

    this.state = store.getState();

    // 订阅数据变化之后的派发规则
    store.subscribe((() => {
      this.handleStoreChange();
    }))
  }

  // 输入框change事件
  handleInputChange = (e) => {
    let value = e.target.value;
    store.dispatch(handleInputChange(value));
  }

  // 点击列表item,删除事件
  handleClickItem = (index) => {
    store.dispatch(handleClickItem(index));
  }

  // 点击add
  handleAdd = (value) => {
    store.dispatch(handleAdd(value));
  }

  // 键盘回车事件
  handlePressEnter = (e) => {
    let value = e.target.value;
    this.handleAdd(value);
  }

  // store数据发生改变，执行的事件
  handleStoreChange = () => {
    this.setState(store.getState());
  }

  render() {
    const childProps = {
      listData: this.state.listData,
      handleClickItem: this.handleClickItem,
      handleAdd: this.handleAdd,
      inputVal: this.state.inputVal,
      handleInputChange: this.handleInputChange,
      handlePressEnter: this.handlePressEnter
    }

    return (
      <Fragment>
        <AppUI {...childProps} />
      </Fragment>
    );
  }

  componentDidMount() {
    axios.get('https://easy-mock.com/mock/5aeb2da4d8f9ce513397a497/www.demo.com/listData').then(res => {
      const data = res.data;
      if (data.info === "ok") {
        store.dispatch(getInitlist(data.data))
      }
    }).catch(error => {
      console.log(error)
    })
  }
}

export default App;
