const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#user_name').value.trim();
  const password = document.querySelector('#passWord').value.trim();

  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log("wtf")
    if (response.ok) {
      console.log("is ok")
      document.location.replace('/');
    } else {
      console.log("fail")
      console.log(response)
      alert('Failed to log in.');
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#user_name_signup').value.trim();
  const password = document.querySelector('#passWordSignup').value.trim();

  if (username && password) {
    const response = await fetch('/api/users/signUp', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to sign up.');
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('click', loginFormHandler);  

document
  .querySelector('.signup-form')
  .addEventListener('click', signupFormHandler);
