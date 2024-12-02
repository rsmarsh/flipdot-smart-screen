const { getClient, getClientReadyStatus } = require('./dbClient');

async function queryFontId(fontName) {
  if (!getClientReadyStatus()) {
    return;
  }

  const fontQuery = 'SELECT font_id FROM fonts WHERE font_name = $1';
  const res = await getClient().query(fontQuery, [fontName]);

  if (res.rows.length === 0) {
    console.log('no font found with the name: ', fontName);
    return;
  }

  return res.rows[0].font_id;
}

async function insertMessage(message, fontName) {
  if (!getClientReadyStatus()) {
    return;
  }

  const fontId = await queryFontId(fontName);
  if (typeof fontId === 'undefined') {
    return;
  }

  const insertQuery =
    'INSERT INTO messages (message_text, font_id, sent_on) VALUES ($1, $2, NOW())';
  try {
    getClient().query(insertQuery, [message, fontId]);
  } catch (err) {
    console.error('Error when writing message to DB: ', err);
  }
}

async function queryMessageHistory() {
  if (!getClientReadyStatus()) {
    return;
  }

  try {
    const messagesQuery = `
      SELECT messages.message_text, messages.sent_on, fonts.font_name 
      FROM messages 
      INNER JOIN fonts ON messages.font_id=fonts.font_id
      ORDER BY messages.sent_on DESC
      LIMIT 20;
    `;

    const messageList = await getClient().query(messagesQuery);
    return messageList.rows;
  } catch (err) {
    console.error('Failed history query:', err);
  }
}

async function getActiveApp() {
  // A query to select the most recent active app from the app table
}

async function setActiveApp(appName) {
  // A query to add an active app entry to the app table
  // Not sure yet if this should be a long list of "active app events", or update an "active" field on the next active app
}

module.exports = {
  insertMessage,
  queryMessageHistory
};
