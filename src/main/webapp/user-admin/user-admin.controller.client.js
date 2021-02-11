let userService = new UserServiceClient()

let $createBtn
let $updateBtn

let $usernameFld
let $passwordFld
let $firstNameFld
let $lastNameFld
let $roleFld

let users = []

const roleDefault = "FACULTY"

function resetFields(){
    $usernameFld.val("")
    $passwordFld.val("")
    $firstNameFld.val("")
    $lastNameFld.val("")
    $roleFld.val(roleDefault)
}

function isEmpty(newUser)
{
    return Object.values(newUser).some(x => (x === null || x === ""));
}

function createUser() {
    let newUser = {
        username: $usernameFld.val(),
        password: $passwordFld.val(),
        firstName: $firstNameFld.val(),
        lastName: $lastNameFld.val(),
        role: $roleFld.val()
    }
    resetFields()

    if(isEmpty(newUser))
        alert("Empty data not accepted!!!")
    else{
        userService.createUser(newUser)
            .then(function (actualUser) {
                users.push(actualUser)
                renderUsers(users)
            })
    }
}

var selectedUser = null
function selectUser(event) {
    var id = $(event.target).closest("tr").attr("id")
    selectedUser = users.find(user => user._id === id)
    $usernameFld.val(selectedUser.username)
    $passwordFld.val(selectedUser.password)
    $firstNameFld.val(selectedUser.firstName)
    $lastNameFld.val(selectedUser.lastName)
    $roleFld.val(selectedUser.role)
}

function updateUser() {
    if(selectedUser === null)
        return

    selectedUser.username = $usernameFld.val()
    selectedUser.password = $passwordFld.val()
    selectedUser.firstName = $firstNameFld.val()
    selectedUser.lastName = $lastNameFld.val()
    selectedUser.role = $roleFld.val()

    resetFields()

    if(isEmpty(selectedUser))
    {
        alert("Empty data not accepted!!!")

        userService.findUserById(selectedUser._id)
            .then(function (existingUser) {
                var index = users.findIndex(user => user._id === selectedUser._id)
                users[index] = existingUser
            })
    }
    else{
        userService.updateUser(selectedUser._id, selectedUser)
            .then(status => {
                var index = users.findIndex(user => user._id === selectedUser._id)
                users[index] = selectedUser
                renderUsers(users)
            })
    }
}

function deleteUser(event) {
    var id = $(event.target).closest("tr").attr("id")
    var index = users.findIndex(user => user._id === id)

    userService.deleteUser(id)
        .then(function (status) {
            users.splice(index, 1)
            renderUsers(users)
        })
}

function renderUsers(users) {
    const tableBody = jQuery("tbody")
    tableBody.empty()
    for (let i = 0; i < users.length; i++) {
        let user = users[i]
        tableBody.append
        (`<tr id="${user._id}">
        <td><p>${user.username}</p></td>
        <td><p>***</p></td>
        <td><p>${user.firstName}</p></td>
        <td><p>${user.lastName}</p></td>
        <td><p>${user.role}</p></td>
        <td>
            <button class="btn btn-light wbdv-delete"><i class="fa fa-times"></i></button>
            <button class="btn btn-light wbdv-select"><i class="fa fa-pencil"></i></button>
        </td>
        </tr>`)
    }
    $(".wbdv-delete").click(deleteUser)
    $(".wbdv-select").click(selectUser)
}

function main() {
    $usernameFld = $("#usernameFld")
    $passwordFld = $("#passwordFld")
    $firstNameFld = $("#firstNameFld")
    $lastNameFld = $("#lastNameFld")
    $roleFld = $("#roleFld")

    $createBtn = $(".wbdv-create-btn")
    $updateBtn = $(".wbdv-update-btn")

    $createBtn.click(createUser)
    $updateBtn.click(updateUser)

    userService.findAllUsers()
        .then(function (existingUsers) {
            users = existingUsers
            renderUsers(users)
        })
}
$(main)