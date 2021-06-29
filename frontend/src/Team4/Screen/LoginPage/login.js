import React from 'react';

function Loginpage() {
  return(
    <form>
      <label>
        <p>Username</p>
        <input type="text" />
      </label>
      <br></br>
      <label>
        <p>Password</p>
        <input type="password" />
      </label>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

function display() {
  return (
    <div style={{margin:" 20px 100px"}}>
      <h1>User Login</h1>
      <Loginpage/>
    </div>
  )
}

export default display;
