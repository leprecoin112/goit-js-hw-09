const t={startBtn:document.querySelector("[data-start]"),stopBtn:document.querySelector("[data-stop]")};let n=0;function e(n){t.startBtn.disabled=n}function o(){document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}t.startBtn.addEventListener("click",(function(){n=setInterval(o,1e3),e(!0)})),t.stopBtn.addEventListener("click",(function(){clearInterval(n),e(!1)}));
//# sourceMappingURL=01-color-switcher.0f91ed8e.js.map
