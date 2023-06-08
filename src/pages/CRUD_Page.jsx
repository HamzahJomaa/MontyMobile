import React, { useState } from "react";
import DynamicForm from "../components/DynamicForm"
import { Container, Grid } from "@mui/material";
import MaterialTable from "material-table";

class CRUDPage extends React.Component {
  constructor() {
    super()
    this.state = {
      data: []
    }
  }

  handleEdit = (newData, oldData) => {
    console.log({ newData, oldData })
  };

  render() {
    const tableColumns = [
      { title: "First Name", field: "firstName" },
      { title: "Last Name", field: "lastName" },
      { title: "Email", field: "email" },
      { title: "Password", field: "password" },
    ];
    return (
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <DynamicForm
              formConfig={{
                fields: [
                  { name: "firstName", label: "First Name", type: "text" },
                  { name: "lastName", label: "Last Name", type: "text" },
                  { name: "email", label: "Email", type: "email" },
                  { name: "password", label: "Password", type: "password" },
                ]
              }}
              SubmitForm={(data) => {
                this.setState({ data: [...this?.state?.data, data] })
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <h2>Form Data</h2>
            <MaterialTable
              columns={tableColumns}
              data={this.state.data.map((record, index) => ({ ...record, tableData: { id: index } }))}
              title=""
              editable={{
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      const updatedData = [...this?.state?.data];
                      updatedData[oldData.tableData.id] = newData;
                      this.setState({ data: updatedData })
                      resolve();
                    }, 1000)
                  }),
                onRowDelete: oldData =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      const dataDelete = [...this?.state?.data];
                      const index = oldData.tableData.id;
                      dataDelete.splice(index, 1);
                      this.setState({ data: dataDelete })

                      resolve()
                    }, 1000)
                  }),
              }}
              options={{
                padding: "dense",
                maxBodyHeight: "calc(100vh - 250px)",
              }}
            />
          </Grid>
        </Grid>
      </Container>
    );
  }

}


export default CRUDPage
