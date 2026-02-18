class ToastNotification extends HTMLElement {
    constructor() {
        super();
    }
    // Duration, milliseconds, from "PoppingIn" ends to "PoppingOut" starts
    new(IconID: string, message: string, duration: number = 2000) {
        const ToastElement = this.querySelector(".prototype > .toast").cloneNode(true) as HTMLElement;
        const TargetIcon = this.querySelector(`.prototype > .symbols > [data-icon="${IconID}"]`).cloneNode(true);
        ToastElement.querySelector(".symbol").appendChild(TargetIcon);
        ToastElement.querySelector(".msg").textContent = message;
        ToastElement.classList.add("PoppingIn");
        this.appendChild(ToastElement);
        ToastElement.addEventListener("animationend", () => {
            ToastElement.classList.remove("PoppingIn");
            setTimeout(() => {
                ToastElement.classList.add("PoppingOut");
                ToastElement.style.marginTop = `-${ToastElement.offsetHeight}px`;
                ToastElement.addEventListener("animationend", () => {
                    ToastElement.remove();
                }, { once: true });
            }, duration);
        }, { once: true });
    }
}
customElements.define("toast-notification", ToastNotification);
console.log("ToastNotification component loaded.");
