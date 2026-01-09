let resultShown = false;
document.getElementById("display").style="color : white;";

function is_opt(chr){
    if (chr=='+' || chr=='-' || chr=='/' || chr =='x' || chr=='%') return true;
    return false;
}
function is_dig(chr){
    if (chr=='1' || chr=='0' || chr=='2' || chr=='3' || chr=='4' || chr=='5' || chr=='6'||
        chr== '7' || chr=='8' || chr=='9' || chr=='.'
    ) return true;
    return false;
}
function put(chr){
let p = document.getElementById("display");
    if(p.value === "Math Error!"){
        document.getElementById("display").value = "";
    }
    document.getElementById("display").style = "color : white;"
    if(is_opt(chr)){
        let last = p.value[p.value.length-1];
        if(is_opt(last)==false && (last !='(')) p.value += chr;
    }
    else p.value += chr;
    p.scrollLeft = p.scrollWidth;
}
function para(){
    let p = document.getElementById("display");
    if(p.value === "Math Error!"){
        document.getElementById("display").value = "";
    }
    document.getElementById("display").style = "color : white;"
    let found = false;
    let count = 0 ;
    for(let i of p.value){
        if(i=='('){
            count += 1;
        }
        else if(i==')'){
            count -= 1;
        }
    }
    
    let last = p.value[p.value.length-1];
    if(count>=1 && last!='(' && is_opt(last)==false){
        p.value += ')';
    }
    else{
        p.value += '(';
    }
    p.scrollLeft = p.scrollWidth;
}
function dot(){
    let p = document.getElementById("display");
    if(p.value === "Math Error!"){
        document.getElementById("display").value = "";
    }
    document.getElementById("display").style = "color : white;"
    let i = p.value.length - 1;
    let found = false;
    while (i >=0){
        if(is_dig(p.value[i])){
            i--;
        }
        else if(p.value[i]=='.'){
            found = true;
            break;
        }
        else{
            break;
        }
    }
    if(found == false) p.value += '.';
    p.scrollLeft = p.scrollWidth;
}
function ac(){
    document.getElementById("display").style = "color : white;"
    document.getElementById("display").value = "";
    document.getElementById("live-display").value = "";
    if(resultShown){
        p.style = "color : white;";
        resultShown = false;
    }
    
}
function clr(){
    let p = document.getElementById("display");
    if(p.value === "Math Error!"){
        document.getElementById("display").value = "";
    }
    p.value = p.value.slice(0,-1);            
    document.getElementById("display").style = "color : white;"
}

function pre(C){
    if (C == 'x' || C == '/' || C=='%')
        return 2;
    if (C == '-' || C == '+')
        return 1;
    if (C == '^')
        return 3;
    else
        return -1;
}
function arithmetic(a,x,b)
{
    try{
    if (x=='%')
        return 1/100*a*b;
    if (x == '+')
        return a + b;
    if (x == '-')
        return a - b;
    if (x == 'x')
        return a * b;
    if (x == '/')
    {
        if (b == 0)
        {
            return NaN;
        }
        else
            return a / b;
    }
    if (x == '^')
        return Math.pow(a, b);
    }
    catch(e){
        return NaN;
    }
}

function calculate(){
    p = document.getElementById("display").value;
    if(p==="Math Error!"){
        document.getElementById("display").value = "";
        return;
    }
    input = mod(p);
    operator = []
    operant = [];
    n = input.length;
    for(let i=0;i<n;i++){
        s = input[i];
        if(is_opt(s) == true){
            while (operator.length >= 1 && pre(s) < pre(operator[operator.length-1]) && operant.length >= 2){
                opt = operator.pop();
                b = operant.pop();
                a = operant.pop();                
                c = Number(arithmetic(a,opt,b));
                operant.push(c);
            }
            operator.push(s);
        }
        else if(s=='('){
            operator.push(s);
        }
        else if(s==')'){
            while (operator.length >= 1 && operator[operator.length-1] != '(' && operant.length >= 2){
                opt = operator.pop();
                b = operant.pop();
                a = operant.pop();                
                c = Number(arithmetic(a,opt,b));
                operant.push(c);
            }
            operator.pop();
        }
        else{
            num = "";
            idx = i ;
            n = input.length;
            while (i<n && is_dig(input[i])){
                num += input[i];
                i += 1;
            }
            i--;
            operant.push(Number(num));
        }
        console.log(operator);
        console.log(operant);
    }
     while (operator.length >= 1 && operant.length >= 2){
        opt = operator.pop();
        b = operant.pop();
        a = operant.pop();                
        c = Number(arithmetic(a,opt,b));
        operant.push(c);
    }
    if(operator.length==1 && operator[0]=='%') operant[0] = operant[0]/100;
    res = operant[0];
    if (Number.isNaN(res)){
        res = "Math Error!";
    }
    console.log(res);
    return res;
    // document.getElementById("display").value = res;
    // document.getElementById("display").style = "color : green;";
}
function mod(input){
    let res = "";
    let n = input.length;

    for(let i = 0; i < n; i++){
        let c = input[i];

        // handle unary minus
        if(c === '-' && (i === 0 || is_opt(input[i-1]) || input[i-1] === '(')){
            res += '0';
        }

        res += c;

        // implicit multiplication
        if(is_dig(c)){
            if(i+1 < n && input[i+1] === '('){
                res += 'x';
            }
        }
        else if(c === ')'){
            if(i+1 < n && is_dig(input[i+1])){
                res += 'x';
            }
        }
    }

    return res;
}


function f(){
    input = document.getElementById("display").value;
    if(input==="Math Error!"){
        console.log("yes");
        document.getElementById("display").value = "";
        return;
    }
    if(input ===""){
        document.getElementById("live-display").value = "";
    }
    res = calculate(input);
    if (typeof res === "number" || typeof res==="string" && res==="Math Error!")
        document.getElementById("live-display").value = res;
}

function f2(){
    let pp = document.getElementById("live-display").value;
    if(pp===""){
        return;
    }
    document.getElementById("display").value = pp;
    document.getElementById("live-display").value = "";
}