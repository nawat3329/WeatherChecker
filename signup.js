var users = [
    {
        fname: "John",
        lname: "Doe",
        email: "gg",
        username: "test",
        password: "1234"
    },

    {
        fname: "JJ",
        lname: "DD",
        email: "ff",
        username: "test2",
        password: "1234"
    }
]

function login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('pwd').value;

    for (i = 0; i < users.length; i++) {
        if (username == users[i].username && password == users[i].password) {
            console.log(username + "is logged in")
            return
        }
    }
    console.log("incorrect username or password")
}

function signup() {
    var firstname = document.getElementById('fname').value;
    var lastname = document.getElementById('lname').value;
    var email = document.getElementById('email').value;
    var newusername = document.getElementById('newusername').value;
    var newpassword = document.getElementById('newpwd').value;
    users.push()
}
