import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const style = {
  table: {
    borderCollapse: 'collapse'
  },
  tableCell: {
    border: '1px solid gray',
    margin: 0,
    padding: '5px 10px',
    width: 'max-content',
    minWidth: '150px'
  },
  form: {
    container: {
      padding: '20px',
      border: '1px solid #F0F8FF',
      borderRadius: '15px',
      width: 'max-content',
      marginBottom: '40px'
    },
    inputs: {
      marginBottom: '5px'
    },
    submitBtn: {
      marginTop: '10px',
      padding: '10px 15px',
      border:'none',
      backgroundColor: 'lightseagreen',
      fontSize: '14px',
      borderRadius: '5px'
    }
  }
}

function PhoneBookForm(props) {
  return (
    <form onSubmit={props.addEntryToPhoneBook} style={style.form.container}>
      <label>First name:</label>
      <br />
      <input 
        style={style.form.inputs}
        className='userFirstname'
        name='userFirstname' 
        type='text'
      />
      <br/>
      <label>Last name:</label>
      <br />
      <input 
        style={style.form.inputs}
        className='userLastname'
        name='userLastname' 
        type='text' 
      />
      <br />
      <label>Phone:</label>
      <br />
      <input
        style={style.form.inputs}
        className='userPhone' 
        name='userPhone' 
        type='text'
      />
      <br/>
      <input 
        style={style.form.submitBtn} 
        className='submitButton'
        type='submit' 
        value='Add User' 
      />
    </form>
  )
}

function InformationTable(props) {
  return (
    <table style={style.table} className='informationTable'>
      <thead> 
        <tr>
          <th style={style.tableCell}>First name</th>
          <th style={style.tableCell}>Last name</th>
          <th style={style.tableCell}>Phone</th>
        </tr>
      </thead> 
      <tbody>
        {props.listPersonas.map((elem) => 
          <tr>
            <td>{elem.firstName}</td>
            <td>{elem.lastName}</td>
            <td>{elem.phone}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

function Application(props) {

  const [personas, setPersonas] = useState([])
  function addPersona(e) {
    e.preventDefault();
    const firstName = e.target.userFirsname.value;
    const lastName = e.target.userLastname.value;
    const phone = e.target.userPhone.value;
    const nuevo = {
      firstName: firstName,
      lastName: lastName,
      phone: phone 
    };
    setPersonas([nuevo, ...personas]);
    e.target.userFirsname.value = '';
    e.target.userLastname.value = '';
    e.target.userPhone.value = '';

  }

  return (
    <section>
      <PhoneBookForm addEntryToPhoneBook={addPersona} />
      <InformationTable listPersonas={personas} />
    </section>
  );
}

ReactDOM.render(
  <Application />,
  document.getElementById('root')
);