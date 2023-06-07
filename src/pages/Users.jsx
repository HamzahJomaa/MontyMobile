import React, { useState } from 'react';
import MaterialTable from 'material-table';
import Modal from '@mui/material/Modal';
import { getUsersApi } from '../APIs/Users';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Grid, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from "@mui/icons-material/Edit"
import PreviewIcon from "@mui/icons-material/Visibility"
import Swal from 'sweetalert2'
import { Bar } from 'react-chartjs-2';


class UserTable extends React.Component {
    constructor() {
        super()
        this.state = {
            data: [],
            openModal: false,
            selectedUser: null,
            CountOfNationalities: null,
            UniqueNationalities: null
        }
    }
    getUsers = async () => {
        try {
            let users = await getUsersApi()
            this.setState({ data: users?.data })

            const nationalityCount = {};
            for (let i = 0; i < users?.data.length; i++) {
                const nationality = users?.data[i].nationality;

                if (nationalityCount.hasOwnProperty(nationality)) {
                    nationalityCount[nationality] += 1;
                } else {
                    nationalityCount[nationality] = 1;
                }
            }
            this.setState({ CountOfNationalities: Object.values(nationalityCount), UniqueNationalities: [...new Set(users?.data.map((item) => item.nationality))] })

        } catch (e) {
            console.error(e)
        }
    }
    componentDidMount() {
        this.getUsers()
    }

    render() {

        const columns = [
            { title: 'First Name', field: 'firstName' },
            { title: 'Last Name', field: 'lastName' },
            { title: 'Nationality', field: 'nationality' },
            { title: 'Phone Number', field: 'phoneNumber' },
            { title: 'Last Month Bill', field: 'lastMonthBill' },
            {
                title: 'Actions',
                render: (rowData) => (
                    <div>
                        <IconButton onClick={() => {
                            Swal.fire({
                                title: 'Confirmation',
                                text: 'Are you sure you want to delete this user?',
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonText: 'Yes, delete it!',
                                cancelButtonText: 'Cancel',
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    // Delete the user
                                    this.setState({ data: data?.filter(item => item?.id != rowData?.id) })
                                    Swal.fire('Deleted!', 'The user has been deleted.', 'success');
                                    const nationalityCount = {};
                                    for (let i = 0; i < data?.filter(item => item?.id != rowData?.id).length; i++) {
                                        const nationality = data?.filter(item => item?.id != rowData?.id)[i].nationality;

                                        if (nationalityCount.hasOwnProperty(nationality)) {
                                            nationalityCount[nationality] += 1;
                                        } else {
                                            nationalityCount[nationality] = 1;
                                        }
                                    }
                                    this.setState({ CountOfNationalities: Object.values(nationalityCount), UniqueNationalities: [...new Set(data?.filter(item => item?.id != rowData?.id).map((item) => item.nationality))] })
                                }
                            });

                        }} aria-label="delete" size="small">
                            <DeleteIcon fontSize="inherit" />
                        </IconButton>
                        <IconButton aria-label="edit" size="small">
                            <EditIcon fontSize="inherit" />
                        </IconButton>
                        <IconButton aria-label="preview" size="small">
                            <PreviewIcon fontSize="inherit" />
                        </IconButton>
                    </div>
                ),
            },
        ];

        // Additional info columns for the modal
        const additionalInfoColumns = [
            { title: 'Address', field: 'address' },
            { title: '# of Services Subscribed', field: 'services' },
            { title: 'Age', field: 'age' },
        ];

        // Handle row click to open modal
        const handleRowClick = (event, rowData) => {
            if (
                event.target.tagName.toLowerCase() === 'button' ||
                event.target.parentNode.tagName.toLowerCase() === 'button' ||
                event.target.parentNode.tagName.toLowerCase() === 'svg'
            ) {
                return;
            }
            this.setState({ selectedUser: rowData, openModal: true })
        };

        // Close modal
        const handleCloseModal = () => {
            this.setState({ openModal: false })
        };
        const { data, selectedUser, openModal, CountOfNationalities, UniqueNationalities } = this.state
        return (
            <>
                <MaterialTable
                    title="Users"
                    columns={columns}
                    data={data}
                    onRowClick={handleRowClick}
                    options={{
                        actionsColumnIndex: -1,
                        clickableRow: false,
                    }}
                />
                <Modal open={openModal} onClose={handleCloseModal}>
                    <div style={{ margin: 'auto', marginTop: '100px', width: '300px', background: '#fff', padding: '20px' }}>
                        {selectedUser && (
                            <>
                                <h2>{`${selectedUser.firstName} ${selectedUser.lastName}`}</h2>
                                <p>Nationality: {selectedUser.nationality}</p>
                                <p>Phone Number: {selectedUser.phoneNumber}</p>
                                <p>Last Month Bill: {selectedUser.lastMonthBill}</p>
                                <hr />
                                <h3>Additional Info</h3>
                                {additionalInfoColumns.map((column) => (
                                    <p key={column.field}>
                                        {column.title}: {selectedUser[column.field]}
                                    </p>
                                ))}
                            </>
                        )}
                    </div>
                </Modal>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <h2>Chart 1: Countries Distribution</h2>
                        <Bar
                            data={{
                                labels: UniqueNationalities,
                                datasets: [
                                    {
                                        label: 'Users',
                                        data: CountOfNationalities,
                                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                        borderColor: 'rgba(75, 192, 192, 1)',
                                        borderWidth: 1,
                                    }
                                ],
                            }} />
                    </Grid>
                    {/* <Grid item xs={12} sm={6}>
                        <h2>Chart 2: Calls</h2>
                        <Bar data={chart2Data} />
                    </Grid> */}
                </Grid>
            </>
        );
    }
};

export default UserTable;
