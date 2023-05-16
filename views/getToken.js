fetch('http://localhost:3300/users/islogged')
.then(response => response.json())
.then(data => {
    // console.log(data.status)
    
    if (data.status === 401) {
        window.location.href = '/'
    } else {
        // const userlog = document.getElementById('userlog')
        // userlog.innerHTML = data.user.name
        fetch(`http://localhost:3300/users/${data.user.id}`)
        .then(response => response.json())
        .then(data => {
            const userlog = document.getElementById('userlog').innerHTML = data.selecteduser.name
            const name = document.getElementById('name').value = data.selecteduser.name;
            const email = document.getElementById('email').value = data.selecteduser.email;
            const password = document.getElementById('password').value = data.selecteduser.password;
            // const userlog = document.getElementById('userlog')
            // userlog.innerHTML = data.selecteduser.name
            // userlog.innerHTML = data.user.name
        })
    }
})