const API_BASE_URL =
  import.meta.env.VITE_API_URL || "";

async function parseResponse(response) {
  const text = await response.text();

  let data;

  try {
    data = JSON.parse(text);
  } catch {
    data = null;
  }

  if (!response.ok) {
    const error = new Error(
      data?.error ||
        "The chatbot service returned an unexpected response."
    );

    error.status = response.status;

    throw error;
  }

  return data;
}

export async function sendChatMessage({
  messages,
  conversationState = null
}) {
  const response = await fetch(
    `${API_BASE_URL}/api/chat`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        messages,
        conversationState
      })
    }
  );

  return parseResponse(response);
}