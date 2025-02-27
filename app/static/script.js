document.getElementById("sendButton").addEventListener("click", function () {
	const userInput = document.getElementById("userInput").value;
	const chatbox = document.getElementById("chatbox");
	chatbox.innerHTML += `<p>You: ${userInput}</p>`;
	document.getElementById("userInput").value = "";
});
