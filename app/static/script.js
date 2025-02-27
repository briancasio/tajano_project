document.addEventListener("DOMContentLoaded", function () {
	const chatBox = document.getElementById("chat-box");
	const chatForm = document.getElementById("chat-form");
	const userInput = document.getElementById("user-input");

	chatForm.addEventListener("submit", async function (event) {
		event.preventDefault();

		const userMessage = userInput.value.trim();
		if (userMessage === "") return;

		addMessage("you", userMessage);

		try {
			const aiResponse = await sendMessageToAI(userMessage);
			addMessage("Jack", aiResponse);
		} catch (error) {
			addMessage("Jack", "Oops! Something went wrong.");
			console.error("Error:", error);
		}

		userInput.value = "";
	});

	async function sendMessageToAI(message) {
		const response = await fetch("http://127.0.0.1:5000/chat", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ message }),
		});

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		const data = await response.json();
		return data.response;
	}

function addMessage(sender, text) {
	const messageDiv = document.createElement("div");
	messageDiv.classList.add("message", sender === "you" ? "user" : "bot");

	const senderName = document.createElement("p");
	senderName.classList.add(sender === "you" ? "user-name" : "bot-name");
	senderName.innerHTML = `<strong>${sender}</strong>`;

	const messageText = document.createElement("p");
	messageText.classList.add("message-text");

	// Convert text: Preserve line breaks and format code
	messageText.innerHTML = formatAIResponse(text);

	messageDiv.appendChild(senderName);
	messageDiv.appendChild(messageText);
	document.getElementById("chat-box").appendChild(messageDiv);

	// Scroll to latest message
	document.getElementById("chat-box").scrollTop =
		document.getElementById("chat-box").scrollHeight;
}

// ✅ Function to Format AI Responses for Better Readability
function formatAIResponse(text) {
	// Preserve line breaks
	let formattedText = text.replace(/\n/g, "<br>");

	// Format Markdown-style code blocks (` ```language ... ``` `)
	formattedText = formattedText.replace(
		/```([\s\S]*?)```/g,
		function (match, code) {
			return `<pre><code>${code.trim()}</code></pre>`;
		}
	);

	return formattedText;
}

});
