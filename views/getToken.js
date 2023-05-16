fetch('http://localhost:3300/users/islogged')
.then(response => response.json())
.then(data => {
    console.log(data.status)
    
    if (data.status === 401) {
        window.location.href = '/'
    } else {
        const userlog = document.getElementById('userlog')
        userlog.innerHTML = data.user.name
    }
})