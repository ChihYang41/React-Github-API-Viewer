import React, { Component } from "react";
import { Layout, Menu, Breadcrumb, Icon, Row, Input } from "antd";
import logo from "./logo.svg";
import "./App.css";
import debounce from 'lodash/debounce'

import RepoCard from "./RepoCard";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Search } = Input;

class App extends Component {
  constructor() {
    super();
    this.state = {
      searchText: "",
      userData: []
    };
    
    this.handleGetData = debounce(this.handleGetData, 100)
    this.handleScroll = debounce(this.handleScroll, 100)
    this.page = 1;
  }

  componentDidMount() {
    const { searchText } = this.state;

    window.addEventListener("scroll", () => {
      this.handleScroll(searchText);
    });
  }

  handleGetData = username => {
    const { searchText, userData } = this.state;

    fetch(
      `https://api.github.com/users/${username}/repos?page=${this.page}&per_page=5&client_id=35727918a7ec5a5c1dee&client_secret=d8b819c9e106f96dcbad98231b5609678e25d3d4`
    )
      .then(res => {
        return res.json()
      })
      .then(data =>
        this.setState({
          userData: [...userData, ...data]
        })
      );
  };

  handleScroll = () => {
    const { searchText, userData } = this.state;

    let lastCard = document.querySelector(".ant-card:last-child");
    if (!lastCard) return;
    let lastCardOffset = lastCard.offsetTop + lastCard.clientHeight;
    let pageOffset = window.pageYOffset + window.innerHeight;

    if (pageOffset > lastCardOffset) {
      this.page++
      this.handleGetData(searchText);
    }
  };

  render() {
    const { searchText, userData } = this.state;
    
    return (
      <div className="App">
        <Layout>
          <Header className="header">
            <Search
              placeholder="請輸入 Github 帳號"
              enterButton="Search"
              size="large"
              onSearch={value => {
                this.handleGetData(value);
                this.setState({
                  searchText: value,
                  userData:[]
                });
                this.page = 1
              }}
              className="search-input"
            />
          </Header>
          <Layout>
            <Layout style={{ padding: "0 24px 24px" }}>
              <Content
                style={{
                  background: "#fff",
                  padding: 24,
                  margin: 0,
                  minHeight: 960
                }}
              >
                <h2>User's Repo</h2>
                <Row type="flex" justify="center">
                  <RepoCard userData={userData} />
                </Row>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default App;
