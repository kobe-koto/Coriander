window.Coriander = {};
if (window.localStorage && window.localStorage.getItem("CorianderDatabase")) {
    Coriander.DB = JSON.parse(window.localStorage.getItem("CorianderDatabase"));

    Coriander.OldDB = JSON.parse(window.localStorage.getItem("RGPDatabase"));
    if (typeof Coriander.OldDB === "object" && Coriander.OldDB.main.length > 0) {
        Coriander.DB = {
            main: [
                ...Coriander.OldDB.main,
                ...Coriander.DB.main
            ]
        }
        window.localStorage.setItem("CorianderDatabase", JSON.stringify(Coriander.DB))
        localStorage.removeItem("RGPDatabase")
    }
} else {
    Coriander.DB = { main: [] };
}

let FavoArray = Coriander.DB.main;
let GradientPrototype = document.querySelector("div.GradientCon.Prototype").cloneNode(true);
GradientPrototype.classList.remove("Prototype");

Coriander.FavoInit = function () {
    if (FavoArray.length === 0) {
        let Warn = document.createElement("h3");
        Warn.style.textAlign = "center";
        Warn.innerText = "It's seems like you haven't add anything to your favorites yet.";
        document.querySelector("div.FavoriteCon").append(Warn);

        let ReturnTip = document.createElement("h4");
        ReturnTip.style.textAlign = "center";
        ReturnTip.innerHTML = "<a href=\"/\">Return to Coriander Homepage</a>";
        document.querySelector("div.FavoriteCon").append(ReturnTip);

        return;
    }

    for ( let i=FavoArray.length-1; i>=0; i--) {
        let TmpGradientPrototype = GradientPrototype.cloneNode(true);
        let LinearGradient = `linear-gradient(${FavoArray[i].Obj.Degree}deg, ${FavoArray[i].Obj.ColorArray.toString().replace(/,/gi, "\, ")})`;
        TmpGradientPrototype.querySelector("div.Gradient > div.Preview").style.backgroundImage = LinearGradient;
        TmpGradientPrototype.querySelector("div.Desc > p.Code").innerText = LinearGradient;
        TmpGradientPrototype.querySelector("div.Desc > p.Date").innerText = FavoArray[i].Date;
        TmpGradientPrototype.id = `Gradient-${i}`;
        document.querySelector("div.FavoriteCon").append(TmpGradientPrototype);
    }
}

/**
 * @param Handler {Element}
 */
Coriander.copy = function (Handler) {
    if (!navigator.clipboard) {
        Toast.new("warn", "The navigator.clipboard API couldn't be found.")
        return;
    }
    navigator.clipboard.writeText(`background-image: ${Handler.parentElement.parentElement.querySelector("p.Code").innerText};`)
        .then(function () {
            Toast.new("check", "Succ to Copy CSS Code")
        })
        .catch(function (err) {
            Toast.new("error", "Error in copying text.")
        });
}

/**
 * @param Handler {Element}
 */
Coriander.remove = function (Handler) {
    let TargetCon = Handler.parentElement.parentElement;

    // get id.
    let TargetID = parseInt(TargetCon.id.replace(/^Gradient-/, ""));

    // remove it from database
    Coriander.DB.main.splice(TargetID, 1)

    // save database
    window.localStorage.setItem("CorianderDatabase", JSON.stringify(Coriander.DB))

    // do re-init to refresh id for other favo item
    document.querySelector("div.FavoriteCon").innerHTML = "";
    Coriander.FavoInit()

    // send a "Succ" toast msg.
    Toast.new("check", "Succ to delete.")
}

// init favo list.
addEventListener("DOMContentLoaded", function () {
    Coriander.FavoInit()
})
