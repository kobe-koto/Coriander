type Gradient = {
    Degree: number,
    ColorArray: string[]
}

export type FavoItem = {
    Gradient: Gradient,
    Date: EpochTimeStamp
}

export class CorianderDB {
    private DBSyncChannel = new BroadcastChannel("CorianderDBSyncChannel");
    private operatorID = crypto.randomUUID();

    DB: { [UUIDv4: string]: FavoItem } = JSON.parse(window.localStorage.getItem("CorianderDatabase"));
    private updateDB () {
        window.localStorage.setItem("CorianderDatabase", JSON.stringify(this.DB));
        this.DBSyncChannel.postMessage({
            changed: true,
            operatorID: this.operatorID
        });
    }
    private syncDB () {
        this.DB = JSON.parse(window.localStorage.getItem("CorianderDatabase"));
    }

    constructor() {
        // initialize database
        if (window.localStorage) {
            if (!this.DB) {
                this.DB = {};
            }
        } else {
            alert("Your browser doesn't support localStorage, Coriander can't work properly.");
            return;
        }
        // listen to sync channel
        this.DBSyncChannel.addEventListener("message", (event) => {
            if (event.data.operatorID !== this.operatorID) {
                console.log("CorianderDB: Detected external database change, syncing...");
                this.syncDB();
            }
        });
    }

    public put (GradientObj: Gradient) {
        const UUIDv4 = crypto.randomUUID();
        this.DB[UUIDv4] = {
            Gradient: GradientObj,
            Date: Date.now()
        };
        this.updateDB();
        return UUIDv4;
    }
    public delete (UUIDv4: string) {
        delete this.DB[UUIDv4];
        this.updateDB();
        return UUIDv4;
    }
}
