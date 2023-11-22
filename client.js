  // -----------------------
  // Global Utility Functions
  // -----------------------
 
  function setInitialStyles() {
    const root = document.documentElement;
  
    // Get the mainColor and buttonColor values from the Chat_ToolsCustomizations object
    const mainColor = window.Chat_ToolsCustomizations.mainColor;
    const buttonColor = window.Chat_ToolsCustomizations.buttonColor;
    const chatId_TelegramMassenger = window.Chat_ToolsId;
    const khoshamad_gooyii = window.Chat_ToolsCustomizations.introMessage;
    // const input_customized_TFI = window.Chat_ToolsCustomizations.titleClosed; already set in nex function 
    // Set the tfiaccent-color and tfibutton-color CSS variables
    root.style.setProperty('--tfiaccent-color', mainColor);
    root.style.setProperty('--tfibutton-color', '#3494a4');
    localStorage.setItem('UUID_ID_68', chatId_TelegramMassenger);
    localStorage.setItem('UUID_khoshamad_gooyii', khoshamad_gooyii);
  }
  
  // Call the setInitialStyles() function 
  setInitialStyles();
  // Function to set the custom placeholders for both input elements and the call for it is in the last DOMLOADED!!
  function setCustomPlaceholders() {
    const input_customized_TFI = window.Chat_ToolsCustomizations.titleClosed;
    const title_customized_TFI = window.Chat_ToolsCustomizations.titleOpen;
    const TITLE_CHAT_TFI = title_customized_TFI; // Replace with your desired title
    const jay_gah_esm = window.Chat_ToolsCustomizations.nameHolder;
    const messageInputDisplay = document.getElementById('messageInput_mj_display');
    const messageInput = document.getElementById('messageInput_mj');
    const chatTitle = document.querySelector('.chat_title_');
  
    if (messageInputDisplay && messageInput && chatTitle) {
      messageInputDisplay.setAttribute('placeholder', input_customized_TFI);
      messageInput.setAttribute('placeholder', input_customized_TFI);
      chatTitle.textContent = TITLE_CHAT_TFI;
    }
  }

  function getCookie(cname) {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(";");
  
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i].trim();
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
  
    return "";
  }

  function setCookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
  
    // Setting the cookie
    document.cookie = cname + "=" + cvalue + ";" +
      expires + ";" +
      "path=/;" +
      "SameSite=None;" +
      "Secure";
  }
  // ------ 
  // Layer A
  // ------
  async function Shirini() {
    const esmShiriniValue = getCookie("__Shirini_");
  
    // Check if the cookie exists
    if (esmShiriniValue !== "") {
      // If the cookie exists, hide the `name__place__` div
      document.getElementById("name__place__").style.display = "none";
      
      // Set the focus on the input after the display change
      document.getElementById("messageInput_mj").focus();

      // Log a success message to the console
      console.log("Cookie Shirini is Already available. in browser Value:", esmShiriniValue);
  
      // Parse to outer Layer B
      await Layer_B(esmShiriniValue);
    } else {
      // If the cookie does not exist, show the HTML form and wait for user input
      console.log("Cookie is not available. Waiting for user...");
      await Shirini_esm_porsidan();
    }
  }
  async function Shirini_esm_porsidan() {
    // Instead of creating a new div, find the existing one by its ID
    const elem = document.getElementById("name__place__");
    if (!elem) {
      console.error('Element with ID "name__place__" not found.');
      return;
    }
  
    const formHTML = `<style>#name__place__ {
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      background-color: rgb(21 21 21 / 0.7) !important;
        display: flex;
      align-items: center !important;
      justify-content: center !important;
      z-index: 19999 !important;
  }
  .mini-form {
      text-align: center !important;
      padding-top: 0vh !important;
      padding-left: 0px !important;
      margin-left: 0px !important;
      display: flex;
  }
  .mini-form input {
    border-radius: 9px !important;
    padding: 2px 9px 2px 9px !important;
    margin: 0px !important;
    height: 26px !important;
    border: solid 1px skyblue !important;
}
.mini-form button {
  left: 0px !important;
  outline: 0 !important;
  background-color: #3494a4 !important;
  border: none;
  padding: 10px 19px 11px 19px !important;
  border-radius: 9px;
  max-height: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center !important;
  margin-left: 6px;
}
  .mini-form button i {
      color: white !important;
      font-style: bold !important;
  }</style>
      <form class="mj Bob_class mini-form">
        <input type="text" name="name" class="Shirini_sabt_bepors Charlie_class new_new" id="jayGahEsm" placeholder="Type your name..." required>
        <button type="submit" class="Shirini_sabt_kon Diane_class">></button>
      </form>
    `;
  
    // Set the innerHTML of the existing element
    elem.innerHTML = formHTML;
  
     // Add the `setTimeout()` function to the `submit` event listener
    elem.querySelector("form").addEventListener("submit", async (event) => {
      event.preventDefault();
      document.getElementById("messageInput_mj").focus();
      const inputValue = elem.querySelector(".Shirini_sabt_bepors").value;
      setCookie("__Shirini_", inputValue, 365);

      // Force the `name__place__` div to display none after 1 second
      setTimeout(() => {
        document.getElementById("name__place__").style.display = "none";
      }, 100);

      console.log("Cookie is set. Value:", inputValue);

      // Parse to outer Layer B
      await Layer_B(inputValue);
    });

  }
  
  // ------ 
  // Layer B
  // ------
  
  // Write to LocalStorage UUID_SHIRINI based on the cookie value 
    async function Function_MarkazItilat(uniqueID) {
        // Check if uniqueID is not undefined or null
        if (uniqueID) {
        localStorage.setItem('UUID_SHIRINI', uniqueID); 
        console.log("Success: UUID_SHIRINI set in localStorage", uniqueID);
        return "Local Storage Success";
        } else {
        console.error("Error: uniqueID is null or undefined. Cannot set UUID_SHIRINI in localStorage");
        return "Local Storage Failure";
        }
    }
    async function Function_MarkazItilatvalue__Shirini_(value__Shirini_) {
      // Check if value__Shirini_ is not undefined or null
      if (value__Shirini_) {
      localStorage.setItem('UUID_value__Shirini_', value__Shirini_); 
      console.log("Success: UUID_value__Shirini_ set in localStorage", value__Shirini_);
      return "Local Storage Success";
      } else {
      console.error("Error: value__Shirini_ is null or undefined. Cannot set UUID_value__Shirini_ in localStorage");
      return "Local Storage Failure value__Shirini_";
      }
  }
  async function layerBB(ADRESS_SAFHE) {
    await new Promise(resolve => setTimeout(resolve, 33));
    const Function_MarkazItilat_ADRESS_SAFHE = await Function_MarkazItilat_ADRESS_SAFHE(ADRESS_SAFHE);
        // Setting ADRESS_SAFHE here based on ADRESS_SAFHE
          await Function_MarkazItilat_ADRESS_SAFHE(ADRESS_SAFHE);
          console.log("address-safhe", ADRESS_SAFHE)
  }
  async function Layer_B(inputValue) {
      await new Promise(resolve => setTimeout(resolve, 33));
      const BeKhoonSHIRINI = await Function_BeKhoonSHIRINI(); //read cookie esme moshtari
      const BeKhoonOOO = await Function_BeKhoonOOO();
      // const BeKhoonID = await Function_BeKhoonID();
      const PardazOOO = await Function_PardazOOO(BeKhoonOOO);
      const PardazOOOO = await Function_PardazOOOO(BeKhoonOOO);
      const Dorehamkon = await Function_Dorehamkon(PardazOOOO, PardazOOO, inputValue);
      const TILIGRAM = await Function_TILIGRAM(Dorehamkon);
      const MarkazItilat = await Function_MarkazItilat(PardazOOOO);
        // Setting UUID_SHIRINI here based on PardazOOOO
        await Function_MarkazItilat(PardazOOOO);
      
      const MarkazItilatvalue__Shirini_ = await Function_MarkazItilatvalue__Shirini_(inputValue);
      // Setting UUID_value__Shirini_ here based on inputValue
        await Function_MarkazItilatvalue__Shirini_(inputValue);
    
      const functionResults = {
        BeKhoonOOO,
        PardazOOO,
        PardazOOOO,
        Dorehamkon,
        TILIGRAM,
        MarkazItilat,
        MarkazItilatvalue__Shirini_,
        Function_BeKhoonSHIRINI,//read cookie esme moshtari
      };
    
      const jsonOutput = JSON.stringify(functionResults);
      Layer_C(jsonOutput);
    }
    
    // Functions in Layer B
    async function Function_BeKhoonOOO() {
      const value = getCookie('TFI_TOOLS_OOO');
      console.log("Success: Value has read for TFI_TOOLS_OOO:", value);
      return value;
    }
      // Functions in Layer B
      async function Function_BeKhoonSHIRINI() {
        const value__Shirini_ = getCookie('__Shirini_');
        console.log("Success: Value has read for __Shirini_:", value__Shirini_);
        return value__Shirini_;
      }

    
    async function Function_PardazOOO(oooValue) {
      await new Promise(resolve => setTimeout(resolve, 33));
      const obj = JSON.parse(oooValue);
      console.log("obj is :", oooValue);
      const areaOfInterest = obj.Area_of_interest;

      console.log("Success: Extracted Area_of_interest:", areaOfInterest);
      return areaOfInterest;
    }

    async function Function_PardazOOOO(oooValue) {
      await new Promise(resolve => setTimeout(resolve, 33));
      const obj = JSON.parse(oooValue);
      const uniqueID = obj.uniqueID;
      console.log("Success: Extracted uniqueID:", uniqueID);
      return uniqueID;
    }
    
    async function Function_Dorehamkon(value__Shirini_, uniqueID, area, inputValue) {
      const obj = {
        ESM: value__Shirini_,
        ID: uniqueID,
        Area: area,
        InputValue: inputValue
      };
    
      const jsonOutput = JSON.stringify(obj);
      return jsonOutput;
      console.log('function Function_Dorehamkon(uniqueID, area, inputValue, value__Shirini_) result :', jsonOutput);
    }
    
    async function Function_TILIGRAM(jsonOutput) {
      await new Promise(resolve => setTimeout(resolve, 1.5));
      // Perform Telegram send message logic here
      console.log("👏 Telegram message sent successfully 👏");
      return "Telegram Success";
    }
    
  
  // ------ 
  // Layer C
  // ------
  async function Function_Layers_B_bekhoon(layerBData) {
    await new Promise(resolve => setTimeout(resolve, 1.4));

    console.log("layerBData - Layer C ready to receive the following data:", layerBData);
    return layerBData;
  }
  function ADRESS_SAFHE_BEGIR() {
    // Get the current page's URL
    const pageUrl = window.location.href;
  
    // Store the URL in localStorage with the key "UUID_ADRESS_SAFHE"
    localStorage.setItem('UUID_ADRESS_SAFHE', pageUrl);
  
    // Return the URL in the variable "ADRESS_SAFHE"
    const ADRESS_SAFHE = pageUrl;
    return ADRESS_SAFHE;
  }
  const ADRESS_SAFHE = ADRESS_SAFHE_BEGIR();
  async function Function_SOOKETShorooKon(preparedData) {
    console.log('prepared data for emit is:', preparedData)
    await new Promise(resolve => setTimeout(resolve, 1.9));
    const value__Shirini_ = localStorage.getItem('UUID_value__Shirini_');
    const uuid = localStorage.getItem('UUID_SHIRINI');
    const ADRESS_SAFHE = localStorage.getItem('UUID_ADRESS_SAFHE');
    const UUID_ID_68 = localStorage.getItem('UUID_ID_68');
    const UUID_khoshamad_gooyii = localStorage.getItem('UUID_khoshamad_gooyii');
    const socket = io('https://example.com:8443', {   // change it to ypur server url
        query: {
            uuid,
            value__Shirini_,
            ADRESS_SAFHE,
            UUID_ID_68,
            UUID_khoshamad_gooyii
        },
        transports: ["websocket", "polling"]
    });

    document.getElementById('chatForm').addEventListener('submit', function(e) {
      e.preventDefault();
      document.getElementById("messageInput_mj").focus();
      const messageInput = document.getElementById('messageInput_mj');
      const messageText = messageInput.value;
      if (messageText) {
          socket.emit('new-message', {
              text: messageText,
              isClient: true,  // Or determine based on the context
              clientName: value__Shirini_ // Replace with actual client name if available
          });
          messageInput.value = ''; // Clear the input field
      }
    });
      // Add a flag to track whether the history has been loaded
      let historyLoaded = false;
      socket.emit('BAARGOZARI_TARIKHCHE');
      // Handle the incoming chat history data from the server. 
      socket.on('GAP_TARIKHCHE_AZ_MARKAZ', (history) => {
        console.log('History is 📝', history);
        // Only handle the history if it hasn't been loaded yet
        if (!historyLoaded) {
          // history is expected to be an array of message objects
          allMessages = history;  // Set the allMessages to the received history
          history.forEach(Function_Safhe_berooz_kon); // Update UI with each historical message
          historyLoaded = true;
          BoroPAeeNePAeeN(chatArea); // Set the flag to indicate history has been loaded
        }
      });
    // handling the new messages from sever
    socket.on('new-message', (data) => {
      console.log('Socket.io 🤡:', data);
      const { message } = data;
      Function_Safhe_berooz_kon(message);
      // Check if the 'isClient' property is set to 'false' in the message object
      if (message.isClient === false) {
        // Logic to display the message on the client's screen
        // Play the sound when isClient is false
        const dingSound = document.getElementById('ding-sound');
        dingSound.play();
      }
    });
        
      // Handling socket events
    socket.on('connect', () => {
        console.log('Connected to socket.io server 🤡');
        const dingSound = document.getElementById('ding-sound');
        dingSound.play();
    });

      
    socket.on('message', (message) => {
        console.log('New message from server:', message);
        // Here you can call Function_Safhe_berooz_kon to update the UI
        Function_Safhe_berooz_kon(message);
        const dingSound = document.getElementById('ding-sound');
        dingSound.play();

    });

    // Sending preparedData if needed
    socket.emit('data123', preparedData);
    console.log('data123, prepared', preparedData)
  }

  async function Layer_C(layerBData) {
    const data123 = JSON.parse(layerBData);// Parse the layerBData if it's a JSON string
    console.log("Layer_C received:", data123);// Example processing (replace with actual logic)
    const layerBOutput = await Function_Layers_B_bekhoon(data123);
    await Function_SOOKETShorooKon(layerBOutput);
  }

  // Function to scroll to the bottom of a container
  function BoroPAeeNePAeeN(element) {
      const scrollHeight = element.scrollHeight;
      const scrollTopMax = scrollHeight - element.clientHeight;
      element.style.transition = 'scrollTop 0.3s ease-out';
      element.scrollTop = scrollTopMax;
  }
  let kolePayamHa = [];
  // Function to update the page with new messages
  function Function_Safhe_berooz_kon(message) {
    // Validate the message
    if (!message || typeof message !== 'object' || !message.receivedMessage) {
        console.error("Invalid message object", message);
        return;
    }

    // Add the new message to the kolePayamHa array
    kolePayamHa.push(message);

    // Select the chat area and clear it
    const chatArea = document.getElementById('chatArea');
    chatArea.innerHTML = '';

    // Create a container for messages
    const messageUl = document.createElement('ul');
    messageUl.classList.add('message-viewer-ul', 'flex-container');

    // Iterate over all messages to display them
    kolePayamHa.forEach((msg) => {
        const messageLi = document.createElement('li');
        const containerDiv = document.createElement('div');
        containerDiv.classList.add('message-bubble', msg.isClient ? 'three3' : 'two2');
        messageLi.classList.add('msg');
        messageLi.textContent = msg.receivedMessage;

        const operatorSpan = document.createElement('div');
        operatorSpan.classList.add('op_name');
        operatorSpan.textContent = msg.userName || "Unknown";

        containerDiv.appendChild(messageLi);
        containerDiv.appendChild(operatorSpan);
        messageUl.appendChild(containerDiv);
    });

    chatArea.appendChild(messageUl);
    BoroPAeeNePAeeN(chatArea); // Function to scroll to the newest message
  }

  
  // ------ 
  // Layer D
  // ------

function ToDOMBezar_thenWait(content) {
  // Append the provided content to the DOM.
  const element = document.createElement("div");
  element.innerHTML = content;
  document.body.appendChild(element);

  // Return a promise that resolves after 200 seconds.
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 200); // 200 seconds
  });
}

async function function_AzFilePiadeKonTo(url) {
  try {
    // Fetch the content from the specified URL.
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch content");
    }

    const content = await response.text();

    // Check if the </body> tag exists in the fetched content.
    const bodyTagIndex = content.indexOf("</body>");
    if (bodyTagIndex !== -1) {
      console.log("</body> inserted.");
      // Insert the content before the </body> tag.
      const contentToInsert = content.slice(0, bodyTagIndex);
      document.body.insertAdjacentHTML("beforeend", contentToInsert);
    } else {
      // Handle the case where the </body> tag is not found.
      console.log("</body> tag not found in the fetched content.");
      // Handle the case where the </body> tag is not found.
      // You can choose to insert the content at the end of the document if needed.
      document.body.insertAdjacentHTML("beforeend", content);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}


document.addEventListener("DOMContentLoaded", () => {
  function_AzFilePiadeKonTo("https://example.com/index.html").then(() => {   // change it to where index.html file is located
    setCustomPlaceholders();
    // After 200 seconds, you can proceed with other functions here.
    document.getElementById('close-icon').addEventListener('click', function() {
      document.getElementById("shirini").style.display = "none";
      document.getElementById("shirini-loaded").style.display = "block";
      document.getElementById("container_TFI_chat").style.display = "none";
      document.getElementById("displayform").style.display = "flex";
    });
    document.getElementById('shirini-loaded').addEventListener('click', async () => {
      
      // Set the focus on the input after the display change
      document.getElementById("messageInput_mj").focus();
      // UI updates (if any) go here...
      document.getElementById("shirini").style.display = "none";
      document.getElementById("shirini-loaded").style.display = "none";
      document.getElementById("container_TFI_chat").style.display = "block";
      document.getElementById("displayform").style.display = "none";
    });
  
    document.getElementById('shirini').addEventListener('click', async () => {
    
      // Call Shirini() and wait for its output.
      const jsonInput = await Shirini();
    
      // Check if jsonInput is not null/undefined before proceeding.
      if (jsonInput) {
        // Since jsonInput is valid, call Function_Layers_B_bekhoon() and wait for its output.
        const layerBOutput = await Function_Layers_B_bekhoon(jsonInput);
        // Check if layerBOutput is not null/undefined before proceeding.
        if (layerBOutput) {
          // Since layerBOutput is valid, call Function_SOOKETShorooKon() and wait for its completion.
          await Function_SOOKETShorooKon(layerBOutput);
        }
      }
      // Set the focus on the input after the display change
      document.getElementById("messageInput_mj").focus();
      // UI updates (if any) go here...
      document.getElementById("shirini").style.display = "none";
      document.getElementById("container_TFI_chat").style.display = "block";
      document.getElementById("displayform").style.display = "none";
    });
  });
});
