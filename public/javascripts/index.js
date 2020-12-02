document.addEventListener("DOMContentLoaded", async () => {
  console.log("hello from javascript!");

  document.getElementById("logout-button").addEventListener("click", () => {
    const res = fetch("/chorescore/api/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      const err = new Error("Try again later.");
      err.status = 500;
      err.message = "Fail to logout";
      err.title = "Logout error";
      throw err;
    }
    window.location.href = "http://localhost:8080/";
  });
});
