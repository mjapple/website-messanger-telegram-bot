const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const { Sequelize, DataTypes } = require('sequelize');
const socketIo = require('socket.io');
const cookieParser = require('cookie-parser');
const TelegramBot = require('node-telegram-bot-api');

// Logging setup
const logFilePath = '/YOUR_RELATIVE_SERVERS_DIRECTORY/logs.txt';

function logToConsoleAndFile(...args) {
  const message = args.map(arg => (typeof arg === 'object' ? JSON.stringify(arg) : arg)).join(' ');

  // Log to the console
  console.log(message);

  // Log to the file
  fs.appendFile(logFilePath, `${new Date().toISOString()} - ${message}\n`, (err) => {
    if (err) {
      logToConsoleAndFile('Error writing to log file:', err);
    }
  });
}

// const io = require('socket.io')(server); iremoved it because it was declared 

// SSL credentialss
const privateKey = fs.readFileSync('YOUR_SSL_KEY_FILE.key', 'utf8');
const certificate = fs.readFileSync('YOUR_CERTIFICATE_FILE.cert', 'utf8');
const ca = fs.readFileSync('YOUR_BUNDLE_FILE.bundle', 'utf8');
const credentials = { key: privateKey, cert: certificate, ca: ca };

// Create a custom logging function that does nothing
const sequelizeLogger = (logMessage) => {
  // Do nothing, or log to a file if needed
};

// Initialize Sequelize with the custom logger
const sequelize = new Sequelize('YOUR_DATABASE', 'USERNAME', 'PASSWORD', {
  host: 'localhost',
  dialect: 'mysql',
  dialectOptions: {
    charset: 'utf8mb4',
  },
  logging: sequelizeLogger, // Use the custom logger here
});

// Dynamic Model Definition
function defineDynamicModel(sequelize, username) {
  return sequelize.define(username, {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    receivedMessage: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isClient: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      defaultValue: username,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    modifiedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    NameCookieOperator: {
      type: DataTypes.STRING,
    },
    MJMJ: {
      type: DataTypes.STRING,
    },
  });
}
// Initialize the database and start the server
(async function initializeDatabaseAndStartServer() {
  try {
    // Test the database connection
    await sequelize.authenticate();
    logToConsoleAndFile('Connection to the database has been established successfully!!!');

    // Sync all models at once
    await sequelize.sync();
    logToConsoleAndFile('All models were synchronized successfully.');

    // Start your express server here after the database initialization
    const socketServer = https.createServer(credentials, app);
    const io = socketIo(socketServer, {
      transports: ["websocket", "polling"]
    });
    // Middlewares
    app.use(bodyParser.json());  // Moved up before route declarations
    app.use(cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
    }));
    app.use(cookieParser());
    // from here
    // Define Map for each user connected 
    const userSocketMap = {};

    // Define a map to keep track of whether chat history has been loaded for each user
    const chatHistoryLoadedMap = new Map();

    // Telegram bot setup
    const telegramBotToken = 'YOUR_TELEGRAN_BOT_TOKEN';
    const bot = new TelegramBot(telegramBotToken);

    // Webhook setup
    const webhookURL = `https://EXAMPLE.COM:8443/webhook/${telegramBotToken}`; // CHANGE "EXAMPLE.COM" TO YOUR SERVER URL
    bot.setWebHook(webhookURL).then(() => {
      logToConsoleAndFile(`🎉 Webhook set to ${webhookURL} 🔗 🔌 🎉`);
    });

    app.post(`/webhook/${telegramBotToken}`, async (req, res) => {
      logToConsoleAndFile('📞 Webhook hit: JSON Data Received:', JSON.stringify(req.body, null, 2));
    
      // Check if the message has a new_chat_member field and if its first_name is "TFICo_CHAT_Bot"
      if (req.body.message && req.body.message.new_chat_member && req.body.message.new_chat_member.username === "TFICo_CHAT_Bot") {
        const chatId = req.body.message.chat.id;
        bot.sendMessage(chatId, `👋🏼 Welcome to bot🤖 <b>Tools For Internet (TFI)</b>\n Your Chat ID for <u>window.TFICo_CHAT_Bot</u> is:\nChatID👉<code>${chatId}</code>👈Copy this \nFor More information on installation and functionalities, \n Please Visit🙏🏼\n🌐 <a href="https://tfi.tools/telegrambotchat">https://tfi.tools/telegrambotchat</a>`, {
          parse_mode: 'HTML',
          disable_web_page_preview: false
        });
        return res.sendStatus(200);
      }
    
      if (req.body && req.body.message) {
        const chatId = req.body.message.chat.id;
        const receivedText = req.body.message.text || '';
        let username = null;
        let operatorName = null;
    
        if (receivedText === "/start") {
          // Check if the "Visitors" table exists in the database
          sequelize.query("SHOW TABLES LIKE 'Visitors'").then((result) => {
            if (result[0].length === 0) {
              // If the table doesn't exist, create it
              sequelize.query(`
                CREATE TABLE Visitors (
                  NAAMEKAAR_BARI VARCHAR(255),
                  ESME_KOOHCAK VARCHAR(255),
                  NAAME_KHANEVADEGI VARCHAR(255),
                  SHENASE_PAYAM_TG INT
                );
              `).then(() => {
                // Insert data into the table
                const query = `
                  INSERT INTO Visitors (NAAMEKAAR_BARI, ESME_KOOHCAK, NAAME_KHANEVADEGI, SHENASE_PAYAM_TG)
                  VALUES ('${req.body.message.from.username}', '${req.body.message.from.first_name}', '${req.body.message.from.last_name}', ${req.body.message.message_id});
                `;
                sequelize.query(query).then(() => {
                  logToConsoleAndFile('Table "Visitors" created and data inserted.');
                }).catch((error) => {
                  logToConsoleAndFile('Error inserting data into "Visitors" table:', error);
                });
              }).catch((error) => {
                logToConsoleAndFile('Error creating "Visitors" table:', error);
              });
            } else {
              // Table "Visitors" already exists, insert data into it
              const query = `
                INSERT INTO Visitors (NAAMEKAAR_BARI, ESME_KOOHCAK, NAAME_KHANEVADEGI, SHENASE_PAYAM_TG)
                VALUES ('${req.body.message.from.username}', '${req.body.message.from.first_name}', '${req.body.message.from.last_name}', ${req.body.message.message_id});
              `;
              sequelize.query(query).then(() => {
                logToConsoleAndFile('Data inserted into existing "Visitors" table.');
              }).catch((error) => {
                logToConsoleAndFile('Error inserting data into "Visitors" table:', error);
              });
            }
          }).catch((error) => {
            logToConsoleAndFile('Error checking for "Visitors" table:', error);
          });
        }
    
        if (req.body && req.body.message) {
          // handle message updates
          let username = null;
          let operatorName = null;
          const chatId = req.body.message.chat.id; // Extract the chat ID
          const receivedText = req.body.message.text || ''; // Extract the received text
      
          // Check for specific commands and reply with the chat ID
          if (["@TFICo_CHAT_Bot", "/start", "/chatId", "@TFICo_CHAT_Bot /start"].includes(receivedText)) {
            bot.sendMessage(chatId, `👋🏼 Welcome to bot🤖 <b>Tools For Internet (TFI)</b>\n Your Chat ID for <u>window.TFICo_CHAT_Bot</u> is:\nChatID👉<code>${chatId}</code>👈Copy this \nFor More information on installation and functionalities, \n Please Visit🙏🏼\n🌐 <a href="https://tfi.tools/telegrambotchat">https://tfi.tools/telegrambotchat</a>`, {
            parse_mode: 'HTML',
            disable_web_page_preview:false
            });
            return res.sendStatus(200); // End the function here
          }
  
        if (req.body.message.reply_to_message) {
          username = req.body.message.reply_to_message.text.substring(0, 7);
        } else {
          const chatId = req.body.message.chat.id;
          bot.sendMessage(chatId, `❌ Message Not Sent, 🙏🏼 Please reply to the Visitor's Message \nلطفا به پیام مشتری اشاره کنید .`);
          return res.sendStatus(200);
        }
  
        if (req.body.message.from.first_name || req.body.message.from.last_name) {
          operatorName = [req.body.message.from.first_name, req.body.message.from.last_name].join(" ").trim();
        }
  
        const UserMessage = defineDynamicModel(sequelize, username);
        sequelize.sync();
  
        try {
          const messageData = {
            receivedMessage: req.body.message.text,
            isClient: false,
            userName: username,
            NameCookieOperator: operatorName,
            MJMJ: "Your MJMJ value here---"
          };
          const message = await UserMessage.create(messageData);
  
          io.to(userSocketMap[username]).emit('new-message', {
            message,
            operator: { name: operatorName }
          });
        } catch (error) {
          logToConsoleAndFile('❌ Error adding message:', error);
        }
  
      } else if (req.body && req.body.my_chat_member) {
        // handle chat membership updates
        // Implement your logic here
      } else {
        // Log and ignore unknown update types
        console.warn('Received unknown update object', JSON.stringify(req.body));
      }
    
        return res.sendStatus(200);
      }
    
      // Handle chat membership updates and unknown update types
    
      if (req.body && req.body.my_chat_member) {
        // Handle chat membership updates
        // Implement your logic here
      } else {
        // Log and ignore unknown update types
        console.warn('Received unknown update object', JSON.stringify(req.body));
      }
    
      res.sendStatus(200);
    });
    


      // Create a mapping object to track table existence
      const tableExistenceMap = {};
    io.on('connection', (socket) => {
      // Extract UUID_SHIRINI as username
      const username = socket.handshake.query.uuid;
      const value__Shirini_ = socket.handshake.query.value__Shirini_;
      const ADRES_SAFHE = socket.handshake.query.ADRESS_SAFHE;
      const telegramBotChatID_new = socket.handshake.query.UUID_ID_68; // IT RECIEVES IT FROM CLIENT SIDE
      const KhoshamadGooyiii = socket.handshake.query.UUID_khoshamad_gooyii;
      logToConsoleAndFile('🎉A user connected with UUID_SHIRINI:', username, value__Shirini_, ADRES_SAFHE, telegramBotChatID_new, KhoshamadGooyiii);
      userSocketMap[username] = socket.id;

      // Define UserMessage outside of the connection event
      const UserMessage = defineDynamicModel(sequelize, username);
      sequelize.sync();
      // Initialize with default values
      let telegramBotChatID = telegramBotChatID_new;
      let firstAutoMessage = KhoshamadGooyiii;
      // Check if the table exists for the given username
      if (!tableExistenceMap[username]) {
        sequelize.query(`SHOW TABLES LIKE '${username}'`).then((result) => {
          if (result[0].length === 0) {
            // If the table doesn't exist, send a welcoming message via Socket.IO
            socket.emit('welcome-message', { message: `<code>${username}</code> 👋🏼 ${firstAutoMessage}` });
            // Once the message is sent, create the table
            UserMessage.sync().then(() => {
              UserMessage.create({
                receivedMessage: firstAutoMessage,
                isClient: false,
                userName: username,
                NameCookieOperator: value__Shirini_,
                MJMJ: "Your MJMJ value here---"
              });
              // Update the mapping to indicate the table's existence
              tableExistenceMap[username] = true;
            }).catch((error) => {
              logToConsoleAndFile("Error creating table and initial record:", error);
            });
          } else {
            // Table exists, update the mapping
            tableExistenceMap[username] = true;
          }

          // Log the tableExistenceMap
          logToConsoleAndFile('Table Existence Mapping:', tableExistenceMap);
        });
      }
      socket.on('BAARGOZARI_TARIKHCHE', async () => {
        // Before fetching and emitting the history, check if it has been loaded already
        if (!chatHistoryLoadedMap.get(username)) {
          try {
            const messages = await UserMessage.findAll({
                attributes: ['receivedMessage', 'isClient', 'NameCookieOperator'],
                where: { userName: username }
            });
            io.to(userSocketMap[username]).emit('GAP_TARIKHCHE_AZ_MARKAZ', messages);
            chatHistoryLoadedMap.set(username, false); // Set flag that history has been loaded
          } catch (error) {
            logToConsoleAndFile('❌ Error fetching chat history:', error);
          }
        }
      });
      // Listen for initialize-config
      socket.on('initialize-config', (config) => {
        telegramBotChatID = config.telegramBotChatID;
        firstAutoMessage = config.firstAutoMessage;  // Capture the firstAutoMessage
        logToConsoleAndFile(`Telegram Bot Chat ID updated to: ${telegramBotChatID}`);
      });
      logToConsoleAndFile("TelegramBotChatID:", telegramBotChatID);

      bot.sendMessage(telegramBotChatID, `<code>${username}</code> 👋🏼 Clicked on the Chat 📣 \n 🤵🏻‍♂️: ${value__Shirini_}\n 🌐: <a href="${ADRES_SAFHE}">See the Website</a> \n 🔋 💪🏽 To prosperity!! 📣 💰 \n-  -  -  -  -\n🙏🏻 😇 <i>Please Reply to this message to answer the Visitor</i>`, {
        parse_mode: 'HTML',
        disable_web_page_preview: true
      })
      .catch((error) => {
          logToConsoleAndFile("Telegram sendMessage Error:", error);
      });

      socket.on('disconnect', () => {
        logToConsoleAndFile(`🚫 User ${username} disconnected 🚫`);
        // Notify the Telegram bot about the disconnection with HTML and 'code' formatting
        bot.sendMessage(telegramBotChatID, `<code>${username}</code> ✋🏼 ${value__Shirini_} Went Offline 📵`, {
          parse_mode: 'HTML',
          disable_web_page_preview: true
        });
      });

      socket.on('new-message', async (data) => {
        try {
          const { text, isClient, clientName } = data;
          const message = await UserMessage.create({
            receivedMessage: text,
            isClient,
            userName: username,
            NameCookieOperator: clientName
          });

          io.to(userSocketMap[username]).emit('new-message', { message });
          // Notify the Telegram bot about the new message with HTML and 'code' formatting
          bot.sendMessage(telegramBotChatID, `<code>${username}</code> ${clientName}:\n\n💬: <b>${text}</b>\n\n 👓: <a href="${ADRES_SAFHE}">One This Page</a>`, {
            parse_mode: 'HTML',
            disable_web_page_preview: true
          });
        } catch (error) {
          logToConsoleAndFile('❌ Error adding message:', error);
        }

      });


    });

    socketServer.listen(8443 , () => {
      logToConsoleAndFile('🚀 Server is running on port 8843... 🚀');
    });

  } catch (error) {
    logToConsoleAndFile('Unable to connect to the database:', error);
  }
})();
