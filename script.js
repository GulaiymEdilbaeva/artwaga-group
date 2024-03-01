document.addEventListener("DOMContentLoaded", function () {
  const refreshButton = document.getElementById("refreshButton");
  const userListDiv = document.getElementById("userList");
  const sortSelect = document.getElementById("sortSelect");
  const filterInput = document.getElementById("filterInput");

  let users = [];

  refreshButton.addEventListener("click", getUsers);
  sortSelect.addEventListener("change", sortUsers);
  filterInput.addEventListener("input", filterUsers);

  getUsers();

  function getUsers() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        users = data;
        renderUsers(users);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }

  function renderUsers(usersToRender) {
    userListDiv.innerHTML = "";

    if (usersToRender.length === 0) {
      userListDiv.innerHTML = "<p>There is no such user!</p>";
    } else {
      usersToRender.forEach((user) => {
        const userCard = document.createElement("div");
        userCard.classList.add("user-card");
        userCard.innerHTML = `
            <h2>${user.name}</h2>
            <p>Email: ${user.email}</p>
            <p>Phone: ${user.phone}</p>
          `;
        userListDiv.appendChild(userCard);
      });
    }
  }

  function sortUsers() {
    const sortBy = sortSelect.value;
    const sortedUsers = [...users].sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "email") {
        return a.email.localeCompare(b.email);
      }
    });
    renderUsers(sortedUsers);
  }

  function filterUsers() {
    const filterValue = filterInput.value.trim().toLowerCase();
    const filteredUsers = users.filter((user) => {
      return (
        user.name.toLowerCase().includes(filterValue) ||
        user.email.toLowerCase().includes(filterValue) ||
        user.phone.includes(filterValue)
      );
    });
    renderUsers(filteredUsers);
  }
});
