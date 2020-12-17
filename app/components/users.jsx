import React from "react";
import {withRouter} from 'react-router-dom'
import LogOut from 'components/logout';
import { Container, Row, Form, FormGroup, FormControl, FormLabel, Button, Alert, Table } from "react-bootstrap";
import '../../docs/css/usersTable.css';
class Users extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            userId:'',
            name:'',
            planName:'',
            planStart:'',
            planEnd:'',
            address:'',
            location: "",
            mobile:'',
			users: [],
			showAlert: false,
			alertMsg: "",
			alertType: "success",
			userId: "",
			update: false,
		};
	}

	handleChange = (evt) => {
		this.setState({
			[evt.target.name]: evt.target.value,
		});
	};

	componentDidMount() {
		var token = localStorage.getItem("token");
		if(token) {
			this.fetchAllUsers();
		}
		else {
			this.props.history.push("/login");
		}
	}

	fetchAllUsers = () => {
		
		fetch("http://localhost:9000/v1/users", {
			method: "GET",
			headers: {Authorization:localStorage.getItem("token")},
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("result", data);
				this.setState({
					users: data.results,
				});
			})
			.catch((error) => console.log("error", error));
	};

	deleteUser = (userId) => {
		
		fetch(`http://localhost:9000/v1/users/${userId}`, {
			method: "DELETE",
			headers: {Authorization:localStorage.getItem("token")},
		})
			.then((response) => response.json())
			.then((result) => {
				this.setState({
					showAlert: true,
					alertMsg: result.response,
					alertType: "danger",
				});
				this.fetchAllUsers();
			})
			.catch((error) => console.log("error", error));
	};


	render() {
		return (
			<div>
				<Button onClick={()=> this.props.history.push('/users/create',{update: false, user:{}})} className='button'>AddUser</Button>
				
				<Container>
					{this.state.showAlert === true ? (
						<Alert
							variant={this.state.alertType}
							onClose={() => {
								this.setState({
									showAlert: false,
								});
							}}
							dismissible
						>
							<Alert.Heading>{this.state.alertMsg}</Alert.Heading>
						</Alert>
					) : null}
					<Row>
						<Table striped bordered hover size="sm" id='users'>
							<thead>
								<tr>
									<th>UserId</th>
									<th>Name</th>
                                    <th>PlanName</th>
                                    <th>PlanStart</th>
                                    <th>PlanEnd</th>
                                    <th>Address</th>
                                    <th>Location</th>
                                    <th>Mobile</th>
									<th colSpan="2">Actions</th>
								</tr>
							</thead>
							<tbody>
								{this.state.users && this.state.users.map((user) => {
									var planStartDate = new Date(user.planStart);
									var planEndDate = new Date(user.planEnd);
									var planStart=planStartDate.getFullYear()+'/' + (planStartDate.getMonth()+1) + '/'+planStartDate.getDate();
									var planEnd=planEndDate.getFullYear()+'/' + (planEndDate.getMonth()+1) + '/'+planEndDate.getDate();
									return (
										<tr>
											<td>{user.userId}</td>
											<td>{user.name}</td>
                                            <td>{user.planName}</td>
                                            <td>{planStart}</td>
                                            <td>{planEnd}</td>
                                            <td>{user.address}</td>
											<td>{user.location}</td>
                                            <td>{user.mobile}</td>
											<td>
											<Button variant="info" onClick={()=> this.props.history.push('/users/create',{update: true, user})} className='button'>
													Edit
												</Button>
											</td>
											<td>
												<Button variant="danger" onClick={() => this.deleteUser(user.userId)} className='delete'>
													Delete
												</Button>
											</td>
										</tr>
									);
								})}
							</tbody>
						</Table>
					</Row>
				</Container>
				<LogOut/> 

			</div>
		);
	}
}

export default withRouter(Users);