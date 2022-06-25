import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux'
import catStore from './components/catStore';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import Search from './pages/Search';
import CatList from './components/CatList';
import Nothing from './pages/Nothing';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={catStore}>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='search' element={<Search />}>
            <Route path=":searchInput" element={<CatList />} />
            <Route path="breed" element={<h1>BREEED</h1>} />
           {/*  <Route index element={<Nothing />} /> */}
          </Route>
          <Route path='*' element={<main><h1>404 Moew</h1></main>} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
