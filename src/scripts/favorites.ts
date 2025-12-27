import { CorianderDB } from "@scripts/CorianderDB";
import type { FavoItem } from "@scripts/CorianderDB";
const DB = new CorianderDB();

function FavoritesInit ( DBData: { [UUIDv4: string]: FavoItem } ) {
    if (Object.keys(DBData).length === 0) {
        document.querySelector("div.FavoriteCon").innerHTML = 
            `<h3 style="text-align: center;">It's seems like you haven't add anything to your favorites yet.</h3>` +
            `<h4 style="text-align: center;"><a href="/">Return to Coriander Homepage</a></h4>`;
        return;
    }

    // sort DBData by Date descending
    DBData = Object.fromEntries(
        Object.entries(DBData).sort(([, a], [, b]) => b.Date - a.Date)
    );

    const container = document.querySelector("div.FavoriteCon");
    container.innerHTML = "";

    let GradientPrototype = document.querySelector(".prototype gradient-record").cloneNode(true) as HTMLElement;
    for (let UUIDv4 in DBData) {
        let GradientElement = GradientPrototype.cloneNode(true) as HTMLElement;
        let LinearGradient = `linear-gradient(${DBData[UUIDv4].Gradient.Degree}deg, ${DBData[UUIDv4].Gradient.ColorArray.join(", ")})`;
        GradientElement.querySelector(".gradient > .preview").style.backgroundImage = LinearGradient;
        GradientElement.querySelector(".gradient > .description > .code").textContent = LinearGradient;
        GradientElement.querySelector(".gradient > .description > .date").textContent = (new Date(DBData[UUIDv4].Date)).toLocaleString();
        GradientElement.querySelector(".gradient > .description > .UUID").textContent = UUIDv4;
        GradientElement.dataset.uuid = UUIDv4;
        container.append(GradientElement);
    }
}

document.addEventListener("DOMContentLoaded", function () {
   FavoritesInit(DB.DB);
   // listen to DB changes
    const DBSyncChannel = new BroadcastChannel("CorianderDBSyncChannel");
    DBSyncChannel.addEventListener("message", (event) => {
        if (event.data.changed === true) {
            FavoritesInit(DB.DB);
        }
    });
});
