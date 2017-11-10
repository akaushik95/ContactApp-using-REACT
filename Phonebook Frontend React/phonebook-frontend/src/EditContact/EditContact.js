import React, {Component} from 'react';
import axios from 'axios';;

class EditContact extends Component{
    constructor(){
        super();
        this.apiUrl = 'http://localhost:3200/api/contacts'
    }

    resetfields(){
        document.getElementById("name").value = "";
        document.getElementById("mobileOffice").value = "";
        document.getElementById("mobilePersonal").value = "";
        document.getElementById("address").value = "";
    }

    submit(event) {
        event.preventDefault();
        console.log(this);
        console.log(this.props.contact);
        let newContact = {
            name:this.refs.name.value,
            mobileOffice:this.refs.mobileOffice.value,
            mobilePersonal:this.refs.mobilePersonal.value,
            address:this.refs.address.value
        }

        axios.put(this.apiUrl + "/" + this.props.contact._id, newContact)
            .then((res) => {
                axios.get(this.apiUrl + "/" + this.props.contact._id).then((resIn) => {
                    this.props.addContactInList(resIn.data);
                })
            });

        this.resetfields();
    }

    render(){
        console.log(this.props.contact);
        return (
            <div className="container">
                <span>
                    <h4>Edit Contact</h4>
                </span>

                    <form class="col s12">
                            <div class="input-field col s3">
                                <input ref = "name" id="name" type="text" class="validate" className="form-control"></input>
                                <label for="icon_prefix">{this.props.contact.name}</label>
                            </div>

                            <div class="input-field col s3">
                                <input ref="mobileOffice" id="mobileOffice" type="tel" class="validate" className="form-control"></input>
                                <label for="icon_telephone">{this.props.contact.mobileOffice}</label>
                            </div>

                            <div class="input-field col s3">
                                <input ref="mobilePersonal" id="mobilePersonal" type="tel" class="validate" className="form-control"></input>
                                <label for="icon_telephone1">{this.props.contact.mobilePersonal}</label>
                            </div>
                            <div class="input-field col s3">
                                <input ref="address" id="address" type="tel" class="validate" className="form-control" ></input>
                                <label for="icon_telephone1">{this.props.contact.address}</label>
                            </div>
                            

                            <div>
                                <button className="btn btn-primary" onClick={this.submit.bind(this)}>Edit</button>
                            </div>
                    </form>
            </div>
        )
    }


}

export default EditContact;