let navCabin = document.getElementById("navCabin");
let dataCabin = document.getElementById("dataCabins");
let registerCabin = document.getElementById("registerCabin");
let editedCabin = document.getElementById("editedCabin");
let deletedCabin = document.getElementById("deletedCabin");
let footCabin = document.getElementById("footCabin");

loadCabins()

function initCabin() {
    navCabin.style.display = "block"
    registerCabin.style.display = "none"
    editedCabin.style.display = "none"
    deletedCabin.style.display = "none"
    footCabin.style.display = "block"
    dataCabin.style.display = "block"
}

function createCabin() {
    navCabin.style.display = "block"
    registerCabin.style.display = "block"
    editedCabin.style.display = "none"
    deletedCabin.style.display = "none"
    footCabin.style.display = "block"
    dataCabin.style.display = "none"
}

function saveCabin() {

    let brand = document.getElementById("brand").value
    let rooms = document.getElementById("rooms").value
    let category_id = document.getElementById("category_id").value
    let name = document.getElementById("name").value
    
    let object = {
        brand: brand,
        rooms: rooms,
        category_id: category_id,
        name: name
    };
    
    let objectJson = JSON.stringify(object)

    let url = "https://gdf2b0d7345738d-bdtest.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/cabin/cabin";

    let request = new XMLHttpRequest()
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {
            loadCabins()
            initCabin()
        }
    }

    request.open("POST", url, true)
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    request.send(objectJson)
}

function loadCabins() {
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
                    <td>" + response.items[i].brand + "</td>\
                    <td>" + response.items[i].rooms + "</td>\
                    <td>" + response.items[i].category_id + "</td>\
                    <td>" + response.items[i].name + "</td>\
                    <td>\
                        <a href=\"#\" class=\"btn btn-warning btn-circle btn-sm\">\
                            <i class=\"fas fa-edit\" onclick=\"editCabinById(" + id + ")\"></i>\
                        </a>\
                        <a href=\"#\" class=\"btn btn-danger btn-circle btn-sm\" >\
                            <i class=\"fas fa-trash\" onclick=\"deleteCabinById(" + id + ")\"></i>\
                        </a>\
                    </td>\
                    </tr>"
            }
            document.getElementById("tableCabins").innerHTML = table;
            initCabin()
          }
    };
    xhttp.open("GET","https://gdf2b0d7345738d-bdtest.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/cabin/cabin",true);
    xhttp.send();
}

function editCabinById(id) {

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.responseText);

            idEdit = document.getElementById("idEditCabin")
            brandEdit = document.getElementById("brandEdit")
            roomsEdit = document.getElementById("roomsEdit")
            categoryEdit = document.getElementById("categoryEdit")
            nameEdit = document.getElementById("nameEdit")
            
            idEdit.value = response.items[0].id
            brandEdit.value = response.items[0].brand
            roomsEdit.value = response.items[0].rooms
            categoryEdit.value = response.items[0].category_id
            nameEdit.value = response.items[0].name

            document.getElementById("idEditCabin").innerHTML = idEdit.value;
            navCabin.style.display = "block"
            registerCabin.style.display = "none"
            editedCabin.style.display = "block"
            deletedCabin.style.display = "none"
            footCabin.style.display = "block"
            dataCabin.style.display = "none"
        }
    };
    xhttp.open("GET","https://gdf2b0d7345738d-bdtest.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/cabin/cabin/" + id, true);
    xhttp.send();
}

function saveEditCabin() {
    let url = "https://gdf2b0d7345738d-bdtest.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/cabin/cabin";

    idEdit = document.getElementById("idEditCabin").value
    brandEdit = document.getElementById("brandEdit").value
    roomsEdit = document.getElementById("roomsEdit").value
    categoryEdit = document.getElementById("categoryEdit").value
    nameEdit = document.getElementById("nameEdit").value

    let object = {
        id: idEdit,
        brand: brandEdit,
        rooms: roomsEdit,
        category_id: categoryEdit,
        nameEdit: nameEdit
    };

    let objectJSON = JSON.stringify(object)
    let request = new XMLHttpRequest()

    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 201) {
            loadCabins()
            initCabin()
        }
    }

    request.open("PUT", url, true)
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    request.send(objectJSON)
}

function deleteCabinById(id) {
    let url = "https://gdf2b0d7345738d-bdtest.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/cabin/cabin"

    let request = new XMLHttpRequest()

    request.open("GET", url + "/" + id, true)
    request.send();

    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {

            let response = JSON.parse(this.responseText)

            document.getElementById("idDeleteCabin").innerHTML = response.items[0].id
            document.getElementById("brandDelete").innerHTML = response.items[0].brand
            document.getElementById("roomsDelete").innerHTML = response.items[0].rooms
            document.getElementById("categoryDelete").innerHTML = response.items[0].category_id
            document.getElementById("nameDelete").innerHTML = response.items[0].name
            document.getElementById("idDeleteCabin").value = response.items[0].id
            document.getElementById("brandDelete").value = response.items[0].brand
            document.getElementById("roomsDelete").value = response.items[0].rooms
            document.getElementById("categoryDelete").value = response.items[0].category_id
            document.getElementById("nameDelete").value = response.items[0].name

            navCabin.style.display = "block"
            registerCabin.style.display = "none"
            editedCabin.style.display = "none"
            deletedCabin.style.display = "block"
            footCabin.style.display = "block"
            dataCabin.style.display = "none"
        }
    }
}

function saveDeleteCabin() {
    let url = "https://gdf2b0d7345738d-bdtest.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/cabin/cabin"

    let request = new XMLHttpRequest();
    let id = document.getElementById("idDeleteCabin").value

    let object = {
        id: id
    }

    let objectJSON = JSON.stringify(object)

    request.open("DELETE", url, true)
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    request.send(objectJSON)

    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 204) {
            loadCabins()
            initCabin()
        }
    }
}