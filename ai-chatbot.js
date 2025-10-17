let prompt = document.querySelector('#prompt');
let submitbtn = document.querySelector('#submit');
let chatcontainer = document.querySelector('.chat-container');
let imagebtn = document.querySelector("#image");
let image = document.querySelector("#image img");
let imageinput = document.querySelector("#image input");
const api_key= "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyCKwN3FOil6npML6zwtvifo5AzzFit3OTU";

let user = {
    message:null,
    file:{
        mime_type:null,
        data: null
    }

}
async function generateresponse(aichatbox) {
    let text = aichatbox.querySelector(".ai-chat-area");
    let requestoption = {
        method:"post",
        headers: {'Content-Type' : 'application/json'},
        body:JSON.stringify({
            "contents":[
                {"parts":[{"text":user.message},(user.file.data?[{"inline_data":user.file}]:[])

                ]}
            ]
        })
    }
    try{
        let response = await fetch(api_key,requestoption);
        let data = await response.json();
        let apiresponse = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1").trim();
        text.innerHTML= apiresponse;
        console.log(apiresponse)
    }
    catch(error){
        console.log(error)
    }
    finally{
        chatcontainer.scrollTo({top:chatcontainer.scrollHeight,behavior:"smooth"});
        image.src = `image.svg`;
        image.classList.remove("choose");
        user.file={}
    }
}

function createchatbox(html,classes){
    let div = document.createElement("div");
    div.innerHTML = html;
    div.classList.add(classes);;
    return div
}

function handlechatresponse(usermessage){
    user.message = usermessage;
    let html = `<img src="user.png" alt="" id="userimage" width="8%">
            <div class="user-chat-area">
            ${user.message}
            ${user.file.data?`<img src="data:${user.file.mime_type};base64,${user.file.data}" class="chooseimg"/>`:""}
            </div>`;
            prompt.value="";
    let userchatbox = createchatbox(html,"user-chatbox");
    chatcontainer.appendChild(userchatbox);
    chatcontainer.scrollTo({top:chatcontainer.scrollHeight,behavior:"smooth"});


    setTimeout(() => {
        let html = `<img src="ai.png" alt="" id="aiimage" width="13%">
            <div class="ai-chat-area">
            <img src="loading.gif" alt="" class="load" width="50px">

            </div>`;
            let aichatbox = createchatbox(html,"ai-chatbox");
            chatcontainer.appendChild(aichatbox);
            generateresponse(aichatbox);
    }, 600);
}

prompt.addEventListener("keydown",(e)=>{
    if(e.key === "Enter"){
        handlechatresponse(prompt.value);
    }
});
submitbtn.addEventListener('click',()=>{
    handlechatresponse(prompt.value)
})
imageinput.addEventListener("change",()=>{
    const file = imageinput.files[0];
    if(!file) return
    let reader = new FileReader();
    reader.onload =(e)=>{
        let base64string = e.target.result.split(",")[1];
        user.file={
        mime_type:file.type,
        data: base64string
    }

    image.src = `data:${user.file.mime_type};base64,${user.file.data}`;
    image.classList.add("choose");
    }
    reader.readAsDataURL(file);
});
imagebtn.addEventListener('click',()=>{
    imagebtn.querySelector('input').click();
});