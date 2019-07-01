
async function f1(f: (a: string) => string) {
    
    let frag1 = 1;

    let res = await Promise.resolve({
        text() {
            return Promise.resolve("Hello world!");
        }
    });

    let frag2 = 1;

    let txt = await res.text();

    let frag3 = 1;

    return f(txt);
}

f1(abc => `${abc}, Hahaha`).then(res => console.log(res));

(async () => {
    const res = await f1(abc => abc + ", Emmm");
    console.log(res);
})()