import React, { Component } from 'react';
import "./index.css";
import HeaderNav from "../../components/HeaderNav";
import PersonView from './PersonView';

export default class Person extends Component {
  render() {
    return (
      <div className='person'>
        <HeaderNav />
        <div className='my-info'>
          <PersonView />
        </div>
      </div>
    )
  }
}
