'use strict';

const userID = document.querySelector('.user_id');
const userUserName = document.querySelector('.user_username');
const userName = document.querySelector('.user_name');
const userEmail = document.querySelector('.user_mail');
const userLists = document.querySelector('.lists');
const userSearch = document.querySelector('.userSearch')
const userChange = document.querySelector('.userChange')
const userChangeButton = document.querySelector('.userChangeButton')

fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((data) => {
        console.log(data)

        const userList = [];

        data.forEach(user => {
            const li = document.createElement('li')
            const del_btn = document.createElement('button')
            del_btn.innerHTML = "Delete"
            const savedName = localStorage.getItem(`user-name-${user.id}`);
            const finalName = savedName ? savedName : user.name;
            li.innerHTML = `
            <strong>ID:</strong> <span class="user_id">${user.id} </span> <br>
            <strong>Username:</strong> <span class="user_username">${user.username} </span> <br>
            <strong>Name:</strong> <span class="user-name"> ${finalName} </span> <br>
            <strong>Email:</strong> <span class="user_email">${user.email} </span>
            `
            userLists.appendChild(li);
            li.appendChild(del_btn);
            userList.push({
                id: user.id,
                name: user.name,
                username: user.username,
                element: li
            });
            del_btn.addEventListener('click', function () {
                li.remove();
            })
        });

        userSearch.addEventListener('keyup', function () {
            const inputValue = userSearch.value.toLowerCase();
            userLists.innerHTML = ""
            userList.forEach(user_list => {
                const idMatch = (user_list.id.toString().includes(inputValue))
                const nameMatch = user_list.name.toLowerCase().includes(inputValue);
                const usernameMatch = user_list.username.toLowerCase().includes(inputValue);

                if (nameMatch || usernameMatch || idMatch) {
                    userLists.appendChild(user_list.element);
                }
            })
        });

        userChangeButton.addEventListener('click', function () {
            const targetId = parseInt(userSearch.value);
            const newName = userChange.value;
            const user = userList.find(u => u.id === targetId)
            if (user) {
                user.name = newName;
            }


            localStorage.setItem(`user-name-${user.id}`, newName);


            const nameSpan = document.querySelector('.user-name');
            if (nameSpan) {
                nameSpan.textContent = newName;
            } else {
                alert("Bu ID'ye ait kullanıcı bulunamadı")
            }
        })

    });