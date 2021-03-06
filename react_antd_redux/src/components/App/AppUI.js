import React from 'react'
import { Input, List } from 'antd'
import './App.css'

const Search = Input.Search;

class AppUI extends React.Component {

  render() {
    const { listData, handleClickItem, handleAdd, inputVal, handleInputChange, handlePressEnter } = this.props;

    return (
      <div className="content">
        <div className="inputArea">
          <Search
            placeholder="请输入..."
            enterButton="add"
            value={ inputVal }
            onChange={ handleInputChange }
            onSearch={value => {handleAdd(value)} }
            onPressEnter={handlePressEnter}
          />
        </div>
        <div className="list">
          <List
            size="small"
            header={<div>待办事项列表</div>}
            bordered
            dataSource={listData}
            renderItem={(item, index) => (
              <List.Item onClick={() => {handleClickItem(index)}}>
                {item}
              </List.Item>
            )}
          />
        </div>
      </div>  
    )
  }
}

export default AppUI