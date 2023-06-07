import React from "react";
import { TextField, Button, Container, Grid } from "@mui/material";


class DynamicForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            FormData: null
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ FormData: { ...this.state.FormData, [name]: value } })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.SubmitForm(this.state.FormData)
        // Perform CRUD operation or other desired action with the form data
    };


    render() {
        const { formConfig } = this.props
        return (
            <Container>
                <h2>Dynamic Form</h2>
                <form onSubmit={this.handleSubmit}>
                    <Grid container gap={2}>
                        {formConfig.fields.map((field) => (
                            <Grid item xs={12}>
                                <TextField
                                    key={field.name}
                                    fullWidth
                                    label={field.label}
                                    name={field.name}
                                    variant="outlined"
                                    type={field.type}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                        ))}
                        <Button type="submit" fullWidth variant="contained" color="primary">
                            Submit
                        </Button>
                    </Grid>
                </form>
            </Container>
        )
    }
}


export default DynamicForm