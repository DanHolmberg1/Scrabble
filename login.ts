function handleLogin(formId: string) {
  const form = document.getElementById(formId) as HTMLFormElement;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const usernameInput = form.querySelector(
      'input[type="text"][placeholder="Username"]'
    ) as HTMLInputElement;
    const passwordInput = form.querySelector(
      'input[type="text"][placeholder="Password"]'
    ) as HTMLInputElement;

    // You can perform further actions like sending the data to a server or checking credentials here
    console.log(
      `Username: ${usernameInput.value}, Password: ${passwordInput.value}`
    );
  });
}

// Handle login for each form
handleLogin("login-form-p1");
handleLogin("login-form-p2");
handleLogin("create_user");
