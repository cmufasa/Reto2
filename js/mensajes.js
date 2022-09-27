let navMessage = document.getElementById("navMessage");
let dataMessage = document.getElementById("dataMessage");
let registerMessage = document.getElementById("registerMessage");
let editedMessage = document.getElementById("editedMessage");
let deletedMessage = document.getElementById("deletedMessage");
let footMessage = document.getElementById("footMessage");

loadMessages()

function initMessage() {
    navMessage.style.display = "block"
    registerMessage.style.display = "none"
    editedMessage.style.display = "none"
    deletedMessage.style.display = "none"
    footMessage.style.display = "block"
    dataMessage.style.display = "block"
}

function createMessage() {
    navMessage.style.display = "block"
    registerMessage.style.display = "block"
    editedMessage.style.display = "none"
    deletedMessage.style.display = "none"
    footMessage.style.display = "block"
    dataMessage.style.display = "none"
}

function saveMessage() {

    let messagetext = document.getElementById("message").value
    
    let object = {
        messagetext: messagetext
    };
    
    let objectJson = JSON.stringify(object)

    let url = "https://gdf2b0d7345738d-bdtest.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/message/message";

    let request = new XMLHttpRequest()
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {
            loadMessages()
            initMessage()
        }
    }

    request.open("POST", url, true)
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    request.send(objectJson)
}

function loadMessages() {
    let table = ""
    let id = ""

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            for (var i in response.items) {
                id = response.items[i].id;
                table += "<tr>\
                    <th scope=\"row\">" + response.items[i].id + "</th>\
                    <td>" + response.items[i].messagetext + "</td>\
                    <td>\
                        <a href=\"#\" class=\"btn btn-warning btn-circle btn-sm\">\
                            <i class=\"fas fa-edit\" onclick=\"editMessageById(" + id + ")\"></i>\
                        </a>\
                        <a href=\"#\" class=\"btn btn-danger btn-circle btn-sm\" >\
                            <i class=\"fas fa-trash\" onclick=\"deleteMessageById(" + id + ")\"></i>\
                        </a>\
                    </td>\
                    </tr>"
            }
            document.getElementById("tableMessages").innerHTML = table;
            initMessage()
          }
    };
    xhttp.open("GET","https://gdf2b0d7345738d-bdtest.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/message/message",true);
    xhttp.send();
}

function editMessageById(id) {

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.responseText);

            idEdit = document.getElementById("idEditMessage")
            messagetextModif = document.getElementById("messageEdit")
            
            idEdit.value = response.items[0].id
            messagetextModif.value = response.items[0].messagetext
            
            document.getElementById("idEditMessage").innerHTML = idEdit.value;
            navMessage.style.display = "block"
            registerMessage.style.display = "none"
            editedMessage.style.display = "block"
            deletedMessage.style.display = "none"
            footMessage.style.display = "block"
            dataMessage.style.display = "none"
        }
    };
    xhttp.open("GET","https://gdf2b0d7345738d-bdtest.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/message/message/" + id, true);
    xhttp.send();
}

function saveEditMessage() {
    let url = "https://gdf2b0d7345738d-bdtest.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/message/message";

    idEdit = document.getElementById("idEditMessage").value
    messagetextModif = document.getElementById("messageEdit").value

    let object = {
        id: idEdit,
        messagetext: messagetextModif
    };

    let objectJSON = JSON.stringify(object)
    let request = new XMLHttpRequest()

    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 201) {
            loadMessages()
            initMessage()
        }
    }

    request.open("PUT", url, true)
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    request.send(objectJSON)
}

function deleteMessageById(id) {
    let url = "https://gdf2b0d7345738d-bdtest.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/message/message"

    let request = new XMLHttpRequest()

    request.open("GET", url + "/" + id, true)
    request.send();

    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {

            let response = JSON.parse(this.responseText)

            document.getElementById("idDeleteMessage").innerHTML = response.items[0].id
            document.getElementById("messageDelete").innerHTML = response.items[0].messagetext
            document.getElementById("idDeleteMessage").value = response.items[0].id
            document.getElementById("messageDelete").value = response.items[0].messagetext

            navMessage.style.display = "block"
            registerMessage.style.display = "none"
            editedMessage.style.display = "none"
            deletedMessage.style.display = "block"
            footMessage.style.display = "block"
            dataMessage.style.display = "none"
        }
    }

}

function saveDeleteMessage() {
    let url = "https://gdf2b0d7345738d-bdtest.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/message/message"

    let request = new XMLHttpRequest();
    let id = document.getElementById("idDeleteMessage").value

    let object = {
        id: id
    }

    let objectJSON = JSON.stringify(object)

    request.open("DELETE", url, true)
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    request.send(objectJSON)

    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 204) {
            loadMessages()
            initMessage()
        }
    }
}