import React, {Component} from 'react';
import axios from 'axios'

class AddContact extends Component {
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

    submit(event){
        event.preventDefault();

        let newContact ={
            name:this.refs.name.value,
            mobileOffice:this.refs.mobileOffice.value,
            mobilePersonal:this.refs.mobilePersonal.value,
            address:this.refs.address.value
        };

        axios.post(this.apiUrl, newContact)
            .then((res) => {
                this.props.addContactInList(res.data);
            });

        this.resetfields();
    }
    render() {
        return (
            <div className="container">
                <span>
                    <h4> Add New Contact</h4>
                </span>

                    <form class="col s12">
                            <div class="input-field col s2">
                                <input ref = "name" id="name" type="text" class="validate" placeholder="Name" className="form-control"></input>
                                    <label for="icon_prefix"></label>
                            </div>

                            <div class="input-field col s2">
                                <input ref="mobileOffice" id="mobileOffice" type="tel" class="validate" placeholder="MobileOffice" className="form-control"></input>
                                    <label for="icon_telephone"></label>
                            </div>

                            <div class="input-field col s2">
                                <input ref="mobilePersonal" id="mobilePersonal" type="tel" class="validate" placeholder="MobilePersonal" className="form-control"></input>
                                    <label for="icon_telephone1"></label>
                            </div>
                            <div class="input-field col s2">
                                <input ref="address" id="address" type="text" class="validate" placeholder="Address" className="form-control"></input>
                                    <label for="icon_telephone1"></label>
                            </div>
                            <div class="input-field col s2.4">
                                <div>
                                <button className="btn btn-primary" onClick={this.submit.bind(this)}>Add Contact</button>
                            </div>
                            </div>
                            
                    </form>
            </div>
        )
    }
}

export default AddContact;