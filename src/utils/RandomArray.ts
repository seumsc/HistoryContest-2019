//生成随机数集合
export function RandomArr(range:number,num:number):number[]{
    let arr:number[]=new Array(range).fill(0).map((currentvalue,index)=>index+1).sort(()=>0.5-Math.random()).filter((currentvalue,index)=>index<num);
    return arr;
}