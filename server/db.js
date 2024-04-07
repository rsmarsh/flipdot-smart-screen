const { Client } = require("pg");

let client;

(async () => {
  client = await connectToClient();
})();

async function connectToClient() {
  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

  await client.connect();
  return client;
}

async function queryFontId(fontName) {
  const fontQuery = "SELECT font_id FROM fonts WHERE font_name = $1";
  const res = await client.query(fontQuery, [fontName]);

  if (res.rows.length === 0) {
    console.log("no font found with the name: ", fontName);
    return;
  }

  return res.rows[0].font_id;
}

async function insertMessage(message, fontName) {
  const fontId = await queryFontId(fontName);
  if (typeof fontId === "undefined") {
    return;
  }

  const insertQuery =
    "INSERT INTO messages (message_text, font_id, sent_on) VALUES ($1, $2, NOW())";
  try {
    client.query(insertQuery, [message, fontId]);
  } catch (err) {
    console.error("Error when writing message to DB: ", err);
  }
}

async function queryMessageHistory() {
  const messagesQuery = `
    SELECT messages.message_text, messages.sent_on, fonts.font_name 
    FROM messages 
    INNER JOIN fonts ON messages.font_id=fonts.font_id
    ORDER BY messages.sent_on DESC
    LIMIT 20;
  `;

  const messageList = await client.query(messagesQuery);
  return messageList.rows;
}

module.exports = {
  insertMessage,
  queryMessageHistory,
};
