import React, { Component } from 'react';

export default function CampusForm(){
  return (
    <div>
      <h3>Add Location</h3>
      <form className="form-inline">
        <label htmlFor="name">Location name:</label>
        <input
          type="text"
          name="name"
          placeholder="Enter new name"
          className="form-control"
        />
        <label htmlFor="name">Dean name:</label>
        <input
          type="text"
          name="dean"
          placeholder="Enter new Dean"
          className="form-control"
        />
        <label htmlFor="name">Image:</label>
        <input
          type="text"
          name="dean"
          placeholder="Enter new image"
          className="form-control"
        />
        <span class="input-group-btn"><button className="btn btn-default" type="submit">Add Location</button></span>
      </form>
    </div>
  )
}
