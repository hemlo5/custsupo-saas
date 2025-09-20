document.getElementById("send-button").addEventListener("click", sendMessage);
function appendMessage(sender, message) {
  const messagesDiv = document.getElementById("messages");
  const p = document.createElement("p");
  p.textContent = `${sender}: ${message}`;
  messagesDiv.appendChild(p);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
async function sendMessage() {
  const box = document.getElementById("user-input");
  const text = box.value.trim();
  if (!text) return;
  appendMessage("You", text);
  box.value = "";
  try {
    const res = await fetch("http://localhost:8000/api/handle_query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });
    const data = await res.json();
    appendMessage("Agent", data.response);
  } catch (e) {
    appendMessage("Agent", "Sorry, something went wrong.");
    console.error(e);
  }
}
