import React from "react";
import { TextField, Button, Container, Grid, Skeleton } from "@mui/material";


class DynamicForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            FormData: null,
            loading: true
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

    componentDidMount(){
        setTimeout(()=> {
            this.setState({loading: false})
        },[2000])
    }


    render() {
        const { formConfig } = this.props
        return (
            <Container>
                <h2>Dynamic Form</h2>
                <form onSubmit={this.handleSubmit}>
                    <Grid container gap={2}>
                        {formConfig.fields.map((field) => (
                            <Grid item xs={12}>
                                {!this?.state?.loading ? <TextField
                                    key={field.name}
                                    fullWidth
                                    label={field.label}
                                    name={field.name}
                                    variant="outlined"
                                    type={field.type}
                                    onChange={this.handleChange}
                                /> : <Skeleton variant="text" width="100%" height={56} />} 
                            </Grid>
                        ))}
                        <Button type="submit" disabled={this.state.loading} fullWidth variant="contained" color="primary">
                            Submit
                        </Button>
                    </Grid>
                </form>
            </Container>
        )
    }
}


export default DynamicForm