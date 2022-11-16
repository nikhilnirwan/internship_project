import * as React from "react";
import { Table, Input, Button, Space, Tag } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import * as shortid from "shortid";
interface Props {
  className?: string;
  children?: any;
  columns?: any;
  data?: any;
}

class TableComponent extends React.Component<Props> {
  searchInput: any;

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps() {}

  render() {
    return <Table columns={this.props.columns} dataSource={this.props.data} />;
  }
}

export default TableComponent;
