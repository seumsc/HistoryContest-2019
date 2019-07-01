var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function f1(f) {
    return __awaiter(this, void 0, void 0, function* () {
        let frag1 = 1;
        let res = yield Promise.resolve({
            text() {
                return Promise.resolve("Hello world!");
            }
        });
        let frag2 = 1;
        let txt = yield res.text();
        let frag3 = 1;
        return f(txt);
    });
}
f1(abc => `${abc}, Hahaha`).then(res => console.log(res));
(() => __awaiter(this, void 0, void 0, function* () {
    const res = yield f1(abc => abc + ", Emmm");
    console.log(res);
}))();
