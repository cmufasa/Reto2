let navClient = document.getElementById("navClient");
let dataClient = document.getElementById("dataClients");
let registerClient = document.getElementById("registerClient");
let editedClient = document.getElementById("editedClient");
let deletedClient = document.getElementById("deletedClient");
let footClient = document.getElementById("footClient");

loadClients()

function initClient() {
    navClient.style.display = "block"
    registerClient.style.display = "none"
    editedClient.style.display = "none"
    deletedClient.style.display = "none"
    footClient.style.display = "block"
    dataClient.style.display = "block"
}

function createClient() {
    navClient.style.display = "block"
    registerClient.style.display = "block"
    editedClient.style.display = "none"
    deletedClient.style.display = "none"
    footClient.style.display = "block"
    dataClient.style.display = "none"
}

function saveClient() {

    let name = document.getElementById("name").value
    let email = document.getElementById("email").value
    let age = document.getElementById("age").value
    
    let object = {
        name: name,
        email: email,
        age: age
    };
    
    let objectJson = JSON.stringify(object)

    let url = "https://gdf2b0d7345738d-bdtest.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/client/client";

    let request = new XMLHttpRequest()
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {
            loadClients()
            initClient()
        }
    }

    request.open("POST", url, true)
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    request.send(objectJson)
}

function loadClients() {
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
                    <td>" + response.items[i].name + "</td>\
                    <td>" + response.items[i].email + "</td>\
                    <td>" + response.items[i].age + "</td>\
                    <td>\
                        <a href=\"#\" class=\"btn btn-warning btn-circle btn-sm\">\
                            <i class=\"fas fa-edit\" onclick=\"editClientById(" + id + ")\"></i>\
                        </a>\
                        <a href=\"#\" class=\"btn btn-danger btn-circle btn-sm\" >\
                            <i class=\"fas fa-trash\" onclick=\"deleteClientById(" + id + ")\"></i>\
                        </a>\
                    </td>\
                    </tr>"
            }
            document.getElementById("tableClients").innerHTML = table;
            initClient()
          }
    };
    xhttp.open("GET","https://gdf2b0d7345738d-bdtest.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/client/client",true);
    xhttp.send();
}

function editClientById(id) {

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.responseText);

            idEdit = document.getElementById("idEditClient")
            nameEdit = document.getElementById("nameEdit")
            emailEdit = document.getElementById("emailEdit")
            ageEdit = document.getElementById("ageEdit")
            
            idEdit.value = response.items[0].id
            nameEdit.value = response.items[0].name
            emailEdit.value = response.items[0].email
            ageEdit.value = response.items[0].age
            
            document.getElementById("idEditClient").innerHTML = idEdit.value;
            navClient.style.display = "block"
            registerClient.style.display = "none"
            editedClient.style.display = "block"
            deletedClient.style.display = "none"
            footClient.style.display = "block"
            dataClient.style.display = "none"
        }
    };
    xhttp.open("GET","https://gdf2b0d7345738d-bdtest.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/client/client/" + id, true);
    xhttp.send();
}

function saveEditClient() {
    let url = "https://gdf2b0d7345738d-bdtest.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/client/client";

    idEdit = document.getElementById("idEditClient").value
    nameEdit = document.getElementById("nameEdit").value
    emailEdit = document.getElementById("emailEdit").value
    ageEdit = document.getElementById("ageEdit").value

    let object = {
        id: idEdit,
        name: nameEdit,
        email: emailEdit,
        age: ageEdit
    };

    let objectJSON = JSON.stringify(object)
    let request = new XMLHttpRequest()

    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 201) {
            loadClients()
            initClient()
        }
    }

    request.open("PUT", url, true)
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    request.send(objectJSON)
}

function deleteClientById(id) {
    let url = "https://gdf2b0d7345738d-bdtest.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/client/client"

    let request = new XMLHttpRequest()

    request.open("GET", url + "/" + id, true)
    request.send();

    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {

            let response = JSON.parse(this.responseText)

            document.getElementById("idDeleteClient").innerHTML = response.items[0].id
            document.getElementById("nameDelete").innerHTML = response.items[0].name
            document.getElementById("emailDelete").innerHTML = response.items[0].email
            document.getElementById("ageDelete").innerHTML = response.items[0].age
            document.getElementById("idDeleteClient").value = response.items[0].id
            document.getElementById("nameDelete").value = response.items[0].name
            document.getElementById("emaiDelete").value = response.items[0].email
            document.getElementById("ageDelete").value = response.items[0].age

            navClient.style.display = "block"
            registerClient.style.display = "none"
            editedClient.style.display = "none"
            deletedClient.style.display = "block"
            footClient.style.display = "block"
            dataClient.style.display = "none"
        }
    }
}

function saveDeleteClient() {
    let url = "https://gdf2b0d7345738d-bdtest.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/client/client"

    let request = new XMLHttpRequest();
    let id = document.getElementById("idDeleteClient").value

    let object = {
        id: id
    }

    let objectJSON = JSON.stringify(object)

    request.open("DELETE", url, true)
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    request.send(objectJSON)

    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 204) {
            loadClients()
            initClient()
        }
    }
}