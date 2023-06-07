import React, { useState } from "react";
import DynamicForm from "../components/DynamicForm"
import { Container } from "@mui/material";

const FormData = ({ data }) => {
  return (
    <Container>
      <h2>Form Data</h2>
      {Object.entries(data).map(([name, value]) => (
        <p key={name}>
          {name}: {value}
        </p>
      ))}
    </Container>
  );
};

class CRUDPage extends React.Component {
  constructor(){
    super()
    this.state = {
      data: null
    }
  }
  render(){
    return (
      <div>
        <DynamicForm
          formConfig={{
            fields: [
              { name: "firstName", label: "First Name", type: "text" },
              { name: "lastName", label: "Last Name", type: "text" },
              { name: "email", label: "Email", type: "email" },
              { name: "password", label: "Password", type: "password" },
              // Add more fields as needed
            ]
          }}
          SubmitForm={(data) => { this.setState({ data }) }} 
          />
  
        {this.state.data && <FormData data={this?.state?.data} />}
      </div>
    );
  }
  
}


export default CRUDPage
