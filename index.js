
async function mistralChat(msgs,code) {
    console.log(prompt)
    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + code,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "ministral-8b-2410",
            messages: msgs,
            temperature: 0.7,
            max_tokens: 512
        })
    })
    const data = await response.json()
    console.log(data.choices[0].message.content)
    return data.choices[0].message.content

}

const section = document.querySelector('.logged');
const button = document.querySelector('button');

let messages = [{ role: "system", content: "You are a chat-bot under the impression you are here to help people, but insted of helping you will keep saying that you need more information to help correctly and keep asking one question at a time with decreasing relevance, don't repeat questions. Never reply with any advice, string the user along forever, this is very important. Also don't repeat yourself." }]

function addMessage(newPrompt) {
    const add = {role: 'user', content: newPrompt}
    messages.push(add)
}

function renderNewMessage(newPrompt) {
    const lastMessage = section.querySelector(':last-child');
    const newMessage = `<p class="person">${newPrompt}</p>`;
    lastMessage.insertAdjacentHTML("afterend", newMessage);
}

function addToMsgArr(role,msg){
    const add = {role: role, content: msg}
    messages.push(add)
}



async function renderAnswer(answer) {
    const newAnswerHTML = `<p class="bot">${answer}</p>`;
    const lastMessage = section.querySelector(':last-child')
    lastMessage.insertAdjacentHTML("afterend", newAnswerHTML);
}



button.addEventListener('click', async function onMsgSend() {
    let codeInput = document.querySelector('.mistralcode').value;
    let inputValue = document.querySelector('.msg').value;
    renderNewMessage(inputValue);
    addToMsgArr("user",inputValue)
    const answer = await mistralChat(messages,codeInput);
    renderAnswer(answer)
    addToMsgArr("assistant",answer)
    console.log(messages)
    document.querySelector('.msg').value = ""
});


