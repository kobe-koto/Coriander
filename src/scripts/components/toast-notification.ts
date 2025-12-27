class ToastNotification extends HTMLElement {
    constructor() {
        super();
    }
    new(IconID: string, message: string) {
        const ToastElement = this.querySelector(".prototype > .toast").cloneNode(true) as HTMLElement;
        const TargetIcon = this.querySelector(`.prototype > .symbols > [data-icon="${IconID}"]`).cloneNode(true);
        ToastElement.querySelector(".symbol").appendChild(TargetIcon);
        ToastElement.querySelector(".msg").textContent = message;
        this.appendChild(ToastElement);
        setTimeout(() => {
            ToastElement.remove();
        }, 2350)
    }
}
customElements.define("toast-notification", ToastNotification);
console.log("ToastNotification component loaded.");
