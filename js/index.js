const form = document.getElementById('github-form')

form.addEventListener('submit', function(e){
    e.preventDefault()
   
    const search = document.getElementById('search').value
    
    const configObj = {
        method: "GET",
        headers: {
            "Content-Type": "applicaiton/json",
            "Accept": "application/vnd.github.v3+json"
        }
    }

    fetch("https://api.github.com/search/users?q="+search, configObj)
    .then(response => response.json())
    .then(userData => userData.items.forEach(element => displayUserInfo(element)))
})

function displayUserInfo(userObj){
    let li = document.createElement('li')
    document.getElementById('user-list').appendChild(li)
    
    
    let btn = document.createElement('button')
    btn.innerHTML = `${userObj.login}` 
    li.appendChild(btn)

    let img = document.createElement('img')
    img.src = `${userObj.avatar_url}`
    li.appendChild(img)

    let a = document.createElement('a')
    let linkText = document.createTextNode('My Profile')
    a.appendChild(linkText)
    a.title= 'My Profile'
    a.href = `${userObj.html_url}`
    console.log(`${userObj.html_url}`)
    li.appendChild(a)

    btn.addEventListener('click', function(e){
        const search = document.getElementById('search').value
        
        const configObj = {
            method: "GET",
            headers: {
                "Content-Type": "applicaiton/json",
                "Accept": "application/vnd.github.v3+json"
            }
        }
        fetch("https://api.github.com/users/"+search+"/repos", configObj)
        .then(response => response.json())
        .then(userRepo => userRepo.forEach(element => displayUserRepo(element)))
        
    })

}

function displayUserRepo(userRepoObj){
    let li = document.createElement('li')
    li.innerHTML = `${userRepoObj.name}`
    document.getElementById('repos-list').appendChild(li)
    

}

