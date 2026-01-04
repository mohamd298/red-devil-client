// 🔗 رابط السيرفر (مهم جدًا)
const API = "https://red-devil-server.onrender.com";

let currentUser = null;

// ===== عناصر =====
const loginBox = document.getElementById("login");
const profileBox = document.getElementById("profile");
const usernameInput = document.getElementById("username");
const avatarImg = document.getElementById("avatar");
const avatarInput = document.getElementById("avatarInput");
const loginLoader = document.getElementById("loginLoader");
const profileLoader = document.getElementById("profileLoader");

// ===== أدوات =====
function show(el) {
  el.classList.remove("hidden");
}
function hide(el) {
  el.classList.add("hidden");
}
function loading(el, state) {
  el.style.display = state ? "block" : "none";
}

// ===== تسجيل الدخول =====
async function login() {
  const username = usernameInput.value.trim();

  if (!username) {
    alert("اكتب اسمك");
    return;
  }

  loading(loginLoader, true);

  try {
    const res = await fetch(API + "/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username })
    });

    if (!res.ok) throw new Error("HTTP ERROR");

    const data = await res.json();

    if (!data.success) throw new Error("LOGIN FAILED");

    currentUser = data.user;

    // عرض البروفايل
    hide(loginBox);
    show(profileBox);

    avatarImg.src = currentUser.avatar;

  } catch (err) {
    console.error(err);
    alert("❌ خطأ في الاتصال بالسيرفر");
  }

  loading(loginLoader, false);
}

// ===== حفظ الملف الشخصي =====
async function saveProfile() {
  if (!currentUser) return;

  loading(profileLoader, true);

  const avatar = avatarInput.value.trim();

  try {
    const res = await fetch(API + "/api/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: currentUser.username,
        avatar
      })
    });

    if (!res.ok) throw new Error("SAVE ERROR");

    const data = await res.json();

    if (data.success && avatar) {
      avatarImg.src = avatar;
    }

  } catch (err) {
    console.error(err);
    alert("❌ فشل حفظ الملف الشخصي");
  }

  loading(profileLoader, false);
}
