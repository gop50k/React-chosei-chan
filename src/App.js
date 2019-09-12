import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Home from "./Home";
import EventEntry from "./EventEntry";
import Event from "./Event";

import './App.css';


class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Layout>
                    <Layout.Header className="App-header">
                        <h1>調整ちゃん</h1>
                    </Layout.Header>

                    <Layout.Content style={{
                        background: '#fff', padding: 24, margin: 0, minHeight: 280
                    }}>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/event/' component={EventEntry} />
                        <Route exact path='/event/:id' component={Event} />
                    </Layout.Content>
                </Layout>
            </BrowserRouter>
        );
    }
}

export default App;
