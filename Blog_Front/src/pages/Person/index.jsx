import React, { Component } from 'react';
import "./index.css";
import PersonView from './PersonView';

export default class Person extends Component {
  render() {
    return (
      <div className='person'>
        <div className='my-info'>
          <PersonView />
        </div>
      </div>
    )
  }
}
