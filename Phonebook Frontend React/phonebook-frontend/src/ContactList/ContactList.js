import React, {Component} from 'react';
import axios from 'axios'
import { render } from 'react-dom'
import AddContact from "../AddContact/AddContact";
import EditContact from "../EditContact/EditContact";

const Contact = ({contact, editContact, deleteContact}) => {
    return (
        
        <div class="col s12 m7">
            <div class="card horizontal">
                <div class="card-content">
                    <span class="card-title" black-text>{contact.name}</span>
                </div>
                <div class="card-stacked">
                    <div class="card-content">
                        <p>{`Mobile Office : `+contact.mobileOffice}</p>
                        <p>{`Mobile Personal : `+contact.mobilePersonal}</p>
                        <p>{`Address : `+contact.address}</p>
                    </div>
                    <div class="card-action">
                        <a href="#" onClick={() => {
                            editContact(contact)
                        }}>Edit</a>
                    </div>
                    <div class="card-action">
                        <a href="#" onClick={() => {
                            deleteContact(contact)
                        }}>Delete</a>
                    </div>
                </div>
            </div>
        </div>        
    )
}

const ContactListElements = ({contacts, editContact, deleteContact}) => {
    const contactNode = contacts.map((contact) => {
        return (<Contact contact={contact} key={contact._id} editContact={editContact} deleteContact={deleteContact}/>)
    });
    return (<div className="list-group" style={{marginTop:'30px'}}>{contactNode}</div>);
}

class ContactList extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            contactToUpdate: null
        };
        this.apiUrl = 'http://localhost:3200/api/contacts';
    }

    componentDidMount(){

        axios.get(this.apiUrl)
            .then((res) => {
                this.setState({data:res.data});
            });
    }

    addContactInList(contact){
        
        console.log(contact);

        for(var i = 0; i < this.state.data.length; i++) {
            if(this.state.data[i]._id == contact._id) {
                this.state.data.splice(i, 1);
                this.setState({data: this.state.data});
                break;
            }
        }
        this.state.data.push(contact);
        this.setState({data: this.state.data});
        this.setState({showEditForm: false});
    }

    handleEditContact(contact){
        this.setState({contactToUpdate:contact});
        this.setState({showEditForm: true});
    }

    handleDeleteContact(contact){
        
        axios.delete(this.apiUrl+'/'+contact._id).then((res) => {
            for(var i = 0; i < this.state.data.length; i++) {
                if(this.state.data[i]._id == contact._id) {
                    this.state.data.splice(i, 1);
                    this.setState({data: this.state.data});
                    break;
                }
            }
        });
    }

    render(){


        return this.state.showEditForm ?( <div>

                <AddContact
                    addContactInList = {this.addContactInList.bind(this)}
                />
                    <EditContact
                        contact={this.state.contactToUpdate}
                        addContactInList = {this.addContactInList.bind(this)}
                    />
                <ContactListElements
                    contacts={this.state.data}
                    editContact = {this.handleEditContact.bind(this)}
                    deleteContact = {this.handleDeleteContact.bind(this)}
                />

                </div>
            )
            :
            (
            <div>
                <AddContact
                    addContactInList = {this.addContactInList.bind(this)}
                />
                <ContactListElements
                    contacts={this.state.data}
                    editContact = {this.handleEditContact.bind(this)}
                    deleteContact = {this.handleDeleteContact.bind(this)}
                />


            </div>

        );
    }
}
export default ContactList;