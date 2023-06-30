
(async function () {
    let input = document.getElementById("input");
    let sendBtn = document.getElementById("sendBtn");
    let res = document.getElementById("answer");
    let loading = document.getElementById("loading");
    loading.classList.add('hide-loading');

    const url = 'https://chatgpt-chatgpt3-5-chatgpt4.p.rapidapi.com/v1/chat/completions';
    const options = {
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '67e51170a1mshc515adaabac9158p1dccc9jsn467590858dcb',
            'X-RapidAPI-Host': 'chatgpt-chatgpt3-5-chatgpt4.p.rapidapi.com'
        },
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
    console.log(input.value);
    sendBtn.addEventListener("click", async () => {
        // input.value;
        res.innerHTML += `
        <div class="chat-bubble chat-user">
           <p class="chat-text">${input.value}</p>
           <span class="chat-time">Just now</span>
       </div>
       `;

        options.method = 'POST'
        options.body = JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: input.value
                }
            ],
            temperature: 0.8
        })

        // remove class hide-loading
        loading.classList.remove('hide-loading');
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
            res.innerHTML += ` 
         <div class="chat-bubble chat-bot">
            <p class="chat-text">${result.choices[0].message.content}</p>
            <span class="chat-time">Just now</span>
        </div>
        `;
            // add class hide-loading
            loading.classList.add('hide-loading');
        } catch (error) {
            console.error(error);
        }

    });
})()

function sleep(ms) {
    return new Promise(function (reslove, reject) {
        setTimeout(reslove, ms)
    });

}