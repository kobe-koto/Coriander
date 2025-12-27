import { CorianderDB } from "@scripts/CorianderDB";
const DB = new CorianderDB();
class GradientRecord extends HTMLElement {
    constructor() {
        super();
    }

    private depencencyElements: {
        ToastNotification: ToastNotification;
    };

    get GradientCode() {
        let code = this.querySelector(".description .code") as HTMLElement;
        return code.innerText;
    }
    get RecordUUID() {
        return this.dataset.uuid as string;
    }
    connectedCallback() {
        // setup listeners for buttons
        this.querySelector("button[data-role=\"delete\"]").addEventListener("click", this.delete)
        this.querySelector("button[data-role=\"copy\"]").addEventListener("click", this.copy);

        this.depencencyElements = {
            ToastNotification: document.querySelector("toast-notification") as ToastNotification,
        };
    }
    disconnectedCallback() {
        // cleanup listeners for buttons
        this.querySelector("button[data-role=\"delete\"]").removeEventListener("click", this.delete)
        this.querySelector("button[data-role=\"copy\"]").removeEventListener("click", this.copy);
    }
    private delete = () => {
        DB.delete(this.RecordUUID);
        this.remove();
        this.depencencyElements.ToastNotification.new("iconoir:trash", "Deleted from favorites");
    }
    private copy = () => {
        navigator.clipboard.writeText(this.GradientCode);
        this.depencencyElements.ToastNotification.new("iconoir:check-circle-solid", "Copied to clipboard");
    }
}
customElements.define("gradient-record", GradientRecord);
