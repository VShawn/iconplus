$(document).ready(function (h) {
    function c(a) {
        var c = "INPUT" === a.tagName || "TEXTAREA" === a.tagName,
            f, g;
        if (c) b = a,
            f = a.selectionStart,
            g = a.selectionEnd;
        else {
            b = document.getElementById("_hiddenCopyText_");
            if (!b) {
                var b = document.createElement("textarea");
                b.style.position = "absolute";
                b.style.left = "-9999px";
                b.style.top = "0";
                b.id = "_hiddenCopyText_";
                document.body.appendChild(b)
            }
            b.textContent = a.textContent
        }
        var d = document.activeElement;
        b.focus();
        b.setSelectionRange(0, b.value.length);
        var e;
        try {
            e = document.execCommand("copy")
        } catch (h) {
            e = !1
        }
        d && "function" === typeof d.focus && d.focus();
        c ? a.setSelectionRange(f, g) : b.textContent = "";
        return e
    }
    $("#dynamic-text").on("change",
        function () {
            $("#text").html($(this).val())
        });
    $("#boxsize").on("input",
        function () {
            var a = $(this).val();
            $("#box").height(a).width(a)
        });
    $("#fontsize").on("input",
        function () {
            var a = $(this).val();
            $("#text").css("font-size", a + "px")
        });
    $("input[type=radio][name=fontweight]").on("change",
        function () {
            var a = $(this).val();
            $("#text").css("font-weight", a)
        });
    $("#font-color").on("blur",
        function () {
            var a = $(this).val();
            if (0 == /^#[0-9A-F]{6}$/i.test(a) && "" != a) return alert("Please eneter correct color code. E.g : #8e44ad"),
                $(this).val(""),
                !1;
            $("#text").css("color", a)
        });
    $("#preview").on("click",
        function () {
            var a = $("#gen-Icon").html();
            $(".icon-preview").html(a);
            $(".icon-preview").children("#box").css("box-shadow", "none")
        });
});