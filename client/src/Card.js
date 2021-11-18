import React from 'react';

export default function Card(user) {
    
    const cardStyle = {
      width: '18rem',
      color: 'black',
    };
  
    
    // TODO: Update the return statement to display the data we received as props
    return (
      <div >
        <div className="card" style={cardStyle}>
          <div className="card-body">
            <h5 className="card-title">{user.name}</h5>
            <p className="card-text">{user.email}</p>
          </div>
        </div>
      </div>
    );
  }