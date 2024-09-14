
function sendTextToClipboard() {
    var _id = document.querySelector(".clipboard .select-item.id").value,
        _text = document.querySelector(".clipboard textarea").value;
    fetch(`https://apis.cancin.cn/clipboard?mode=send&id=${_id}&content=${encodeURIComponent(_text)}`)
        .then(response => response.json()).then(data => {
            if (data.code == 200) {
                if (set_notice.checked) tools.showMessage(data.message, "success", 2);
            } else {
                console.log(data.message);
                if (set_notice.checked) tools.showMessage(data.message, "error", 2);
            }
    })
        .catch(error => console.error(error));
}

function getTextFromClipboard() {
    var _id = document.querySelector(".clipboard .select-item.id").value,
        _text = document.querySelector(".clipboard textarea");
    fetch(`https://apis.cancin.cn/clipboard?mode=get&id=${_id}&content=`)
        .then(response => response.json()).then(data => {
            if (data.code == 200) {
                _text.value = data.content[0].content;
                if (set_notice.checked) tools.showMessage(data.message, "success", 2);
            } else {
                console.log(data.message);
                if (set_notice.checked) tools.showMessage(data.message, "error", 2);
            }
    })
        .catch(error => console.error(error));
}