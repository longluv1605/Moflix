const fetchData = async () => {
    try {
        const token_admin = localStorage.getItem('token_admin');
        const response = await axios.get('http://localhost:8080/api/admin/profile',
            {
                headers: {Authorization: `Bearer ${token_admin}`}
            }
        );
        return response.data.data[0];
    } catch (error) {
        console.log(error);
    }
};

function change_infomation(data){
    const userName = document.querySelectorAll('.change_username');
    userName.forEach((element) => {
        element.textContent = data.username;
    });
    const email = document.querySelector('.email_placeholder');
    email.placeholder = data.email;
    const firstName = document.querySelector('.firstname_placeholder');
    firstName.placeholder = data.first_name;
    const lastName = document.querySelector('.lastname_placeholder');
    lastName.placeholder = data.last_name;
}

function updateProfile(){
    const token_admin = localStorage.getItem('token_admin');
    const email = document.querySelector('.email_placeholder').value;
    const first_name = document.querySelector('.firstname_placeholder').value;
    const last_name = document.querySelector('.lastname_placeholder').value;
    axios.put('http://localhost:8080/api/admin/profile',
        {
            email: email,
            first_name: first_name,
            last_name: last_name
        },
        {
            headers: {Authorization: `Bearer ${token_admin}`}
        }
    ).then((response) => {
        if(response.status === 200){
            alert('Update profile successfully');
            window.location.reload();
        }
    }).catch((error) => {
        console.log(error);
    });
}

function changePassword(){
    const token_admin = localStorage.getItem('token_admin');
    const oldPassword = document.querySelector('.old_password').value;
    const newPassword = document.querySelector('.new_password').value;
    const confirmPassword = document.querySelector('.confirm_new_password').value;
    axios.post('http://localhost:8080/api/admin/profile',
        {
            old_password: oldPassword,
            new_password: newPassword
        },
        {
            headers: {Authorization: `Bearer ${token_admin}`}
        }
    ).then((response) => {
        if(response.status === 200){
            alert('Change password successfully');
            window.location.reload();
        }
    }).catch((error) => {
        alert(error.response.data.message);
    });
    if(newPassword !== confirmPassword){
        alert('New password and confirm password are not the same');
        return;
    }
};

document.addEventListener('DOMContentLoaded', function(){
    fetchData().then((data) => {
        change_infomation(data);
    });

    const saveButton = document.getElementById('save_button');
    saveButton.addEventListener('click', updateProfile);

    const changePasswordButton = document.getElementById('change_button');
    changePasswordButton.addEventListener('click', changePassword);
});