console.log("script is running");
const RESPONSE_DONE = 4;
const STATUS_OK = 200;
const CONTACTS_LIST_ID_ACTIVE = "contacts_active";

function refreshContacts(){
	// console.log("refreshContacts RUNNING");
    document.getElementById(CONTACTS_LIST_ID_ACTIVE).innerHTML = "";
    getContactsAJAX();
}

window.onload = function () {
	// console.log("onload RUNNING");
    getContactsAJAX();
}

function getContactsAJAX() {
	console.log("getContactsAJAX RUNNING");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/contacts", true);

    xhr.onreadystatechange = function () {
        if(xhr.readyState == RESPONSE_DONE){
            if(xhr.status == STATUS_OK){
                // console.log(xhr.responseText);
                addContactElements(CONTACTS_LIST_ID_ACTIVE, xhr.responseText);
            }
        }
    }
    xhr.send(data = null);
};

function addContactElements(id, contacts_data_json){
	// console.log("addContactElements RUNNING");
    var contacts = JSON.parse(contacts_data_json);
    console.log(contacts);
    var parent = document.getElementById(id);
    console.log("asasasaa"+contacts_data_json);
    
    if(parent){
        Object.keys(contacts).forEach(
            function (key) {
            	console.log("ARRAY   key: "+contacts[key]);
                var contact_element = createContactElement(key, contacts[key],contacts_data_json);
                parent.appendChild(contact_element);
            }
        )
    }

    /*if(parent){
        var objKeyList = Object.keys(contacts);
        for(i in objKeyList) {
            var key = objKeyList[i];
            function (key) {
                console.log("ARRAY on index: " + i + "==> key: "+contacts[key]);
                var contact_element = createContactElement(key, contacts[key],contacts_data_json);
                parent.appendChild(contact_element);
            }
        }
    }*/

}

function createContactElement(id, contact_object, contacts_data_json) {
	// console.log("createContactElement RUNNING");
    var contact_box = document.createElement("div");
    contact_box.setAttribute("class", "container");

    var contact_box_row = document.createElement("div");
    contact_box_row.setAttribute("class", "row");
    contact_box.appendChild(contact_box_row);

    var contact_box_row_1 = document.createElement("div");
    contact_box_row_1.setAttribute("class", "col-sm-2");

    var contact_box_row_2 = document.createElement("div");
    contact_box_row_2.setAttribute("class", "col-sm-2");

    var contact_box_row_3 = document.createElement("div");
    contact_box_row_3.setAttribute("class", "col-sm-2");

    var contact_box_row_4 = document.createElement("div");
    contact_box_row_4.setAttribute("class", "col-sm-2");

	var contact_box_row_5 = document.createElement("div");
    contact_box_row_5.setAttribute("class", "col-sm-2");

	var contact_box_row_6 = document.createElement("div");
    contact_box_row_6.setAttribute("class", "col-sm-2");


    var contact_element1 = document.createElement("input");
    contact_element1.setAttribute("value", contact_object.name);
    contact_element1.setAttribute("disabled","true");
    contact_element1.setAttribute("data-id", id);
    contact_box_row_1.appendChild(contact_element1);
    
    var contact_element2 = document.createElement("input");
    contact_element2.setAttribute("value", contact_object.mobileOffice);
    contact_element2.setAttribute("disabled","true");
    contact_element2.setAttribute("data-id", id);
    contact_box_row_2.appendChild(contact_element2);

    var contact_element3 = document.createElement("input");
    contact_element3.setAttribute("value", contact_object.mobilePersonal);
    contact_element3.setAttribute("disabled","true");
    contact_element3.setAttribute("data-id", id);
    contact_box_row_3.appendChild(contact_element3);

    var contact_element4 = document.createElement("input");
    contact_element4.setAttribute("value", contact_object.address);
    contact_element4.setAttribute("disabled","true");
    contact_element4.setAttribute("data-id", id);
    contact_box_row_4.appendChild(contact_element4);

    var contact_element5 = document.createElement("button");
    contact_element5.innerText = "EDIT";

    contact_element5.setAttribute("data-id", id);
    console.log(id);
    console.log(contacts_data_json);
    contact_element5.setAttribute("onclick","updateContactAJAX("+id+","+contacts_data_json+")");
    contact_box_row_5.appendChild(contact_element5);

    var contact_element6 = document.createElement("button");
    contact_element6.innerText = "DELETE";
    contact_element6.setAttribute("data-id", id);
    contact_element6.setAttribute("onclick","deleteContactAJAX("+id+","+contacts_data_json+")");
    contact_box_row_6.appendChild(contact_element6);

    contact_box_row_1.setAttribute("align", "center");
    contact_box_row_2.setAttribute("align", "center");
    contact_box_row_3.setAttribute("align", "center");
    contact_box_row_4.setAttribute("align", "center");
    contact_box_row_5.setAttribute("align", "center");
    contact_box_row_5.setAttribute("align", "center");
    contact_box_row.appendChild(contact_box_row_1);
    contact_box_row.appendChild(contact_box_row_2);
    contact_box_row.appendChild(contact_box_row_3);
    contact_box_row.appendChild(contact_box_row_4);
    contact_box_row.appendChild(contact_box_row_5);
    contact_box_row.appendChild(contact_box_row_6);
    
    return contact_box;

}

function addNewContactElements(id, contacts_data_json){
	// console.log("addContactElements RUNNING");
    var contacts = JSON.parse(contacts_data_json);
    var parent = document.getElementById(id);
    var contact_element = createContactElement(id, contacts, contacts_data_json);
    parent.appendChild(contact_element);   
    refreshContacts(); 
}

function addContactAJAX() {
    // console.log("addContactAJAX RUNNING");
    var name = document.getElementById("form1").elements[0].value;
    var mobileOffice = document.getElementById("form1").elements[1].value;
    var mobilePersonal = document.getElementById("form1").elements[2].value;
    var address = document.getElementById("form1").elements[3].value;
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/contacts", true);

    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var data = "name=" + encodeURI(name) +"&mobileOffice="+encodeURI(mobileOffice)+"&mobilePersonal="+encodeURI(mobilePersonal)+"&address="+encodeURI(address);
    xhr.onreadystatechange = function () {
        if(xhr.readyState == RESPONSE_DONE){
            if(xhr.status == STATUS_OK){
                // console.log("addContactAJAX RUNNING"+xhr.responseText);
                addNewContactElements(CONTACTS_LIST_ID_ACTIVE, xhr.responseText);
                // getContactsAJAX();
            }else{
                console.log(xhr.responseText);
            }
        }
    };
    xhr.send(data);

    document.getElementById("name").value = "";
    document.getElementById("mobileOffice").value = "";
    document.getElementById("mobilePersonal").value = "";
    document.getElementById("address").value = "";

};

function deleteContactAJAX(id, contacts_data_json) {
	var _id;
    Object.keys(contacts_data_json).forEach(
        function (key) {
        	if(key == id)
        		_id = contacts_data_json[key]._id;
        	// console.log(contacts_data_json[key]._id);
        }
    );
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/api/contacts/"+_id, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    // xhr.onreadystatechange = function () {
    //     if(xhr.readyState == RESPONSE_DONE){
    //         if(xhr.status == STATUS_OK){
    // 			// addContactElements(CONTACTS_LIST_ID_ACTIVE, xhr.responseText);
    //         }else{
    //             console.log(xhr.responseText);
    //         }
    //     }
    // };
    xhr.send(data);
    refreshContacts();
};

function updateContactAJAX(id, contacts_data_json) {
	var _id;
    Object.keys(contacts_data_json).forEach(
        function (key) {
        	if(key == id){
        		_id = contacts_data_json[key]._id;
        		var name = document.getElementById("form1").elements[0];
        		name.value = contacts_data_json[key].name;
    			var mobileOffice = document.getElementById("form1").elements[1];
    			mobileOffice.value = contacts_data_json[key].mobileOffice;
    			var mobilePersonal = document.getElementById("form1").elements[2];
    			mobilePersonal.value = contacts_data_json[key].mobilePersonal;
    			var address = document.getElementById("form1").elements[3];
    			address.value = contacts_data_json[key].address;
    			document.getElementById("create").setAttribute("disabled","true");
  
    		}
        }
    );

    
    var parent = document.getElementById("editDIV");
    var update = document.createElement("button");
    parent.appendChild(update);
    update.innerHTML = "Update";
    update.setAttribute("id", "update");
    update.setAttribute("onclick", "update('"+_id+"')");
};



function update(id){
	var nvalue = document.getElementById("form1").elements[0].value;
    var movalue = document.getElementById("form1").elements[1].value;
    var mpvalue = document.getElementById("form1").elements[2].value;
    var avalue = document.getElementById("form1").elements[3].value;
    
	// console.log("yoyooyoyo"+id+ data);

	var xhr = new XMLHttpRequest();
    xhr.open("PUT", "/api/contacts/"+id, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var data = "name=" + encodeURI(nvalue) +"&mobileOffice="+encodeURI(movalue)+"&mobilePersonal="+encodeURI(mpvalue)+"&address="+encodeURI(avalue);
    xhr.onreadystatechange = function () {
        if(xhr.readyState == RESPONSE_DONE){
            if(xhr.status == STATUS_OK){
                console.log(xhr.responseText);
                addTodoElements(TODOS_LIST_ID_COMPLETED, xhr.responseText);
            }else{
                console.log(xhr.responseText);
            }
        }
    }

    xhr.send(data);
    refreshContacts();

    
    document.getElementById("name").value = "";
    document.getElementById("mobileOffice").value = "";
    document.getElementById("mobilePersonal").value = "";
    document.getElementById("address").value = "";

	var child = document.getElementById("update");
	child.remove();
	document.getElementById("create").removeAttribute("disabled");
}