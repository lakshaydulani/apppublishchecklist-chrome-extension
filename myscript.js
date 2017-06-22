document.querySelector("input[type='submit']").style.color='red';
document.querySelector("input[type='submit']").onclick = function(){
    alert('locked');
    return false;
}