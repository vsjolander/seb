import React, {useState} from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Card from "./components/Card";

import './App.scss';

const renderTableData = (tableData, sorted) => {

  if (sorted) {
    return tableData.sort((a, b) => {
      if(sorted === 'desc') {
        return a.balance - b.balance
      }

      if(sorted === 'asc') {
        return b.balance - a.balance
      }
    }).map(item => {
      return (
        <tr key={item.id}>
          <td>{item.accountId}</td>
          <td>{item.bank}</td>
          <td>{item.currency}</td>
          <td>{item.balance}</td>
        </tr>
      )
    })
  }
  return tableData.map(item => {
    return (
      <tr key={item.id}>
        <td>{item.accountId}</td>
        <td>{item.bank}</td>
        <td>{item.currency}</td>
        <td>{item.balance}</td>
      </tr>
    )
  })
}

const App = () => {

  const [tableData, setTableData] = useState([]);
  const [sorted, setSorted] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Switch>
          <Route exact path="/">
            <div className="container pt-5">
              <div className="row flex-column-reverse flex-md-row">
                <div className="col-12 col-md-6 mb-4">
                  <Card text={'This is the first item'} header={'First Item'} button={'Click me'}></Card>
                </div>
                <div className="col-12 col-md-6 mb-4">
                  <Card text={'This is the second item'} header={'Second Item'} button={'Click me'}></Card>
                </div>
                <div className="col-12 mb-4">
                  <Card text={'This is the third item'} header={'Third Item'} button={'Click me'}></Card>
                </div>
              </div>
            </div>
          </Route>
          <Route exact path="/table">
            <div className="container pt-5">
              <div className="row mb-5">
                <div className="col">
                  {!loading &&
                  <button className="btn btn-primary" onClick={() => {
                    setLoading(true);
                    fetch('https://private-9b37c2-wlb.apiary-mock.com/accounts?ccy=SEK').then(response => response.json()).then(data => {
                      setTableData(data);
                      setLoading(false);
                    })
                  }}>Fetch Accounts</button>
                  }
                  {loading &&
                  <button className="btn btn-primary disabled"><span className="mr-2">Loading</span>
                    <div className="spinner" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </button>
                  }
                </div>
              </div>
              <div className="row">
                <div className="col">
                  {loading &&
                  <div className="spinner spinner-sm" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                  }
                  {!loading && tableData.length > 0 &&
                  <div className="card">
                    <div className="card-body">
                      <table className="table w-100">
                        <thead>
                        <tr>
                          <th>Account number</th>
                          <th>Bank</th>
                          <th>Currency</th>
                          <th className={`sort ${sorted && `sort-${sorted}`}`} onClick={() => {
                            switch (sorted) {
                              case 'asc':
                                setSorted('desc');
                                break;
                              default:
                                setSorted('asc');
                                break;

                            }
                          }}>Balance
                          </th>
                        </tr>
                        </thead>
                        <tbody>
                        {tableData && renderTableData(tableData, sorted)}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  }
                </div>
              </div>
            </div>
          </Route>
        </Switch>

      </div>
    </Router>
  );
};

export default App;
