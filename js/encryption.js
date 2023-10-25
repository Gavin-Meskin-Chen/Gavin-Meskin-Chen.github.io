var _type = document.querySelector(".encryption .select-item.type"),
    _code = document.querySelector(".encryption .select-item.code"),
    _case = document.querySelector(".encryption .select-item.case"),
    _mode = document.querySelector(".encryption .select-item.mode"),
    _pad = document.querySelector(".encryption .select-item.pad"),
    _key = document.querySelector(".encryption .select-item.key"),
    _iv = document.querySelector(".encryption .select-item.iv"),
    textIn = document.querySelector('.encryption .inner'),
    textOut = document.querySelector('.encryption .outer');
textOut.addEventListener("input", ()=>{
    if (textOut.value == '') {
        textOut.disabled = true;
        textOut.classList.add('lock');
    } else {
        textOut.disabled = false;
        textOut.classList.remove('lock');
    }
})
_type.addEventListener('change', ()=>{
    if (_type.value == 'AESEncode') {
        _case.classList.contains('hide') ? null : _case.classList.add('hide'); // 隐藏 大小写
        _code.classList.contains('hide') ? _code.classList.remove('hide') : null; // 显示
        _mode.classList.contains('hide') ? _mode.classList.remove('hide') : null;
        _pad.classList.contains('hide') ? _pad.classList.remove('hide') : null;
        _key.classList.contains('hide') ? _key.classList.remove('hide') : null;
        _iv.classList.contains('hide') ? _iv.classList.remove('hide') : null;
    } else if (_type.value == 'AESDecode') {
        _code.classList.contains('hide') ? null : _code.classList.add('hide'); // 隐藏 编码、大小写
        _case.classList.contains('hide') ? null : _case.classList.add('hide');
        _mode.classList.contains('hide') ? _mode.classList.remove('hide') : null; // 显示
        _pad.classList.contains('hide') ? _pad.classList.remove('hide') : null;
        _key.classList.contains('hide') ? _key.classList.remove('hide') : null;
        _iv.classList.contains('hide') ? _iv.classList.remove('hide') : null;
    } else {
        _code.classList.contains('hide') ? _code.classList.remove('hide') : null; // 显示
        _case.classList.contains('hide') ? _case.classList.remove('hide') : null;
        _mode.classList.contains('hide') ? null : _mode.classList.add('hide'); // 隐藏
        _pad.classList.contains('hide') ? null : _pad.classList.add('hide');
        _key.classList.contains('hide') ? null : _key.classList.add('hide');
        _iv.classList.contains('hide') ? null : _iv.classList.add('hide');
    }
})
_mode.addEventListener('change', ()=>{
    if (_mode.value != 'ECB') {
        if (_iv.classList.contains('lock')) {
            _iv.classList.remove('lock');
            _iv.disabled = false;
        };
    } else {
        if (!_iv.classList.contains('lock')) {
            _iv.classList.add('lock');
            _iv.disabled = true;
        };
    }
})

function copyTranscode() {
    textOut.select();
    document.execCommand('copy');
}

function clearTranscode() {
    document.querySelector('.encryption .inner').value = '';
    textOut.value = '';
    textOut.disabled = true;
    textOut.classList.add('lock');
}

function transcode() {
    var a = '',
        b = '',
        __mode = '',
        __pad = '',
        __text = '',
        __key = CryptoJS.enc.Utf8.parse(_key.value),
        __iv = CryptoJS.enc.Utf8.parse(_iv.value);
    switch (_mode.value) {
        case "CBC": __mode = CryptoJS.mode.CBC; break;
        case "CFB": __mode = CryptoJS.mode.CFB; break;
        case "CTR": __mode = CryptoJS.mode.CTR; break;
        case "OFB": __mode = CryptoJS.mode.OFB; break;
        case "ECB": __mode = CryptoJS.mode.ECB; break;
        default: __mode = CryptoJS.mode.CBC;
    }
    switch (_pad.value) {
        case "Pkcs7": __pad = CryptoJS.pad.Pkcs7; break;
        case "Iso97971": __pad = CryptoJS.pad.Iso97971; break;
        case "Iso10126": __pad = CryptoJS.pad.Iso10126; break;
        case "AnsiX923": __pad = CryptoJS.pad.AnsiX923; break;
        case "ZeroPadding": __pad = CryptoJS.pad.ZeroPadding; break;
        case "NoPadding": __pad = CryptoJS.pad.NoPadding; break;
        default: __pad = CryptoJS.pad.Pkcs7;
    }
    switch (_type.value) {
        case "MD5": 
            a = CryptoJS.MD5(textIn.value);
            b = _code.value == 'Hex' ? a.toString() : CryptoJS.enc.Base64.stringify(a);
            textOut.value = _case.value == 'Lower' ? b : b.toUpperCase();
            break;
        case "SHA1": 
            a = CryptoJS.SHA1(textIn.value);
            b = _code.value == 'Hex' ? a.toString() : CryptoJS.enc.Base64.stringify(a);
            textOut.value = _case.value == 'Lower' ? b : b.toUpperCase();
            break;
        case "SHA3": 
            a = CryptoJS.SHA3(textIn.value);
            b = _code.value == 'Hex' ? a.toString() : CryptoJS.enc.Base64.stringify(a);
            textOut.value = _case.value == 'Lower' ? b : b.toUpperCase();
            break;
        case "SHA224": 
            a = CryptoJS.SHA224(textIn.value);
            b = _code.value == 'Hex' ? a.toString() : CryptoJS.enc.Base64.stringify(a);
            textOut.value = _case.value == 'Lower' ? b : b.toUpperCase();
            break;
        case "SHA256": 
            a = CryptoJS.SHA256(textIn.value);
            b = _code.value == 'Hex' ? a.toString() : CryptoJS.enc.Base64.stringify(a);
            textOut.value = _case.value == 'Lower' ? b : b.toUpperCase();
            break;
        case "SHA384": 
            a = CryptoJS.SHA384(textIn.value);
            b = _code.value == 'Hex' ? a.toString() : CryptoJS.enc.Base64.stringify(a);
            textOut.value = _case.value == 'Lower' ? b : b.toUpperCase();
            break;
        case "SHA512": 
            a = CryptoJS.SHA512(textIn.value);
            b = _code.value == 'Hex' ? a.toString() : CryptoJS.enc.Base64.stringify(a);
            textOut.value = _case.value == 'Lower' ? b : b.toUpperCase();
            break;
        case "RIPEMD160": 
            a = CryptoJS.RIPEMD160(textIn.value);
            b = _code.value == 'Hex' ? a.toString() : CryptoJS.enc.Base64.stringify(a);
            textOut.value = _case.value == 'Lower' ? b : b.toUpperCase();
            break;
        case "AESEncode": 
            __text = CryptoJS.enc.Utf8.parse(textIn.value);
            a = CryptoJS.AES.encrypt(__text, __key, { iv: __iv, mode: __mode, padding: __pad });
            b = _code.value == 'Hex' ? CryptoJS.enc.Hex.stringify(a.ciphertext) : a.toString();
            textOut.value =  b;
            break;
        case "AESDecode": 
            var base64Regex = /^[A-Za-z0-9+/]*={1,2}$/,
                hexRegex = /^(?:[0-9a-fA-F]{4})*$/;
            if (base64Regex.test(textIn.value)) {
                console.log('base64');
                __text = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Base64.parse(textIn.value));
                textOut.value = CryptoJS.AES.decrypt(__text, __key, { iv: __iv, mode: __mode, padding: __pad }).toString(CryptoJS.enc.Utf8);
                break;
            } else if (hexRegex.test(textIn.value)) {
                console.log('hex');
                __text = CryptoJS.enc.Hex.parse(textIn.value);
                textOut.value = CryptoJS.AES.decrypt({ ciphertext: __text }, __key, { iv: __iv, mode: __mode, padding: __pad }).toString(CryptoJS.enc.Utf8);
                break;
            } else {
                console.log('数据错误');
                alert('数据错误');break;
            }
        default: ;
    }
    textOut.disabled = false;
    textOut.classList.remove('lock');
}