let currentUser = null;

function showLoader(id, show) {
  document.getElementById(id).style.display = show ? "block" : "none";
}

async function login() {
  const username = document.getElementById("username").value;

  showLoader("loginLoader", true);

  try {
    const res = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username })
    });

    const data = await res.json();

    if (!data.success) throw new Error();

    currentUser = data.user;

    document.getElementById("login-box").classList.add("hidden");
    document.getElementById("profile-box").classList.remove("hidden");
    document.getElementById("avatar").src = currentUser.avatar;
  } catch {
    alert("خطأ في الاتصال بالسيرفر");
  }

  showLoader("loginLoader", false);
}

async function saveProfile() {
  const avatar = document.getElementById("avatarInput").value;

  showLoader("profileLoader", true);

  try {
    await fetch("/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: currentUser.username,
        avatar
      })
    });

    document.getElementById("avatar").src =
      avatar || currentUser.avatar;
  } catch {
    alert("فشل حفظ الملف");
  }

  showLoader("profileLoader", false);
}
