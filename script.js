let user = null;

// مهم: استخدم نفس الدومين
const API = "";

function loader(id, show) {
  document.getElementById(id).style.display = show ? "block" : "none";
}

async function login() {
  const username = document.getElementById("username").value.trim();
  if (!username) return alert("اكتب اسم");

  loader("loginLoader", true);

  try {
    const res = await fetch(API + "/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username })
    });

    const data = await res.json();

    if (!data.success) throw 0;

    user = data.user;

    document.getElementById("login").classList.add("hidden");
    document.getElementById("profile").classList.remove("hidden");
    document.getElementById("avatar").src = user.avatar;

  } catch (e) {
    alert("❌ خطأ في الاتصال بالسيرفر");
  }

  loader("loginLoader", false);
}

async function saveProfile() {
  loader("profileLoader", true);

  const avatar = document.getElementById("avatarInput").value.trim();

  try {
    await fetch(API + "/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: user.username,
        avatar
      })
    });

    if (avatar) {
      document.getElementById("avatar").src = avatar;
    }

  } catch {
    alert("فشل الحفظ");
  }

  loader("profileLoader", false);
}
