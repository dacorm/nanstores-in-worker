import { atom } from "nanostores";

const $counterStore = atom(0);

self.onconnect = (ev) => {
    const [port] = ev.ports;
    port.onmessage = e => {
        const { data } = e.data;
        $counterStore.set(data)
        $counterStore.subscribe((value) => {
            port.postMessage(value);
            console.log('posted message', value);
        })
    };
};
