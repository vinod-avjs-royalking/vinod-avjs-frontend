const API = "https://vinod-avjs-backend.onrender.com";
let balance = parseInt(localStorage.getItem('balance') || '0');
let user = JSON.parse(localStorage.getItem('user') || '{"name":"VINOD AVJS","id":"RK-123456"}');
function updateUI(){
  document.getElementById('balance').innerText = '₹' + balance;
  document.getElementById('walletBal').innerText = '₹' + balance;
  document.getElementById('totalEarn').innerText = '₹' + balance;
  document.getElementById('todayEarn').innerText = '₹' + balance;
  document.getElementById('userName').innerText = user.name;
  document.getElementById('userId').innerText = 'ID: ' + user.id;
}
function show(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}
function doTask(name, amount){
  alert(name + " Task Shuru! ₹" + amount + " milega.");
  fetch(API + '/api/task-complete', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({userId:user.id, task:name, amount})}).catch(e=>{});
  balance += amount;
  localStorage.setItem('balance', balance);
  updateUI();
  alert("✅ ₹" + amount + " Wallet me add ho gaya!");
}
function copyRef(){
  navigator.clipboard.writeText(document.getElementById('refCode').innerText);
  alert("Referral Code Copy Ho Gaya!");
}
function withdraw(){
  let upi = document.getElementById('upi').value;
  let amt = parseInt(document.getElementById('amount').value);
  if(!upi) return alert("UPI ID daalo!");
  if(amt < 100) return alert("Minimum ₹100 hai!");
  if(amt > balance) return alert("Balance kam hai!");
  balance -= amt;
  localStorage.setItem('balance', balance);
  updateUI();
  alert("✅ Withdrawal Request Bhej Diya! 24-48 ghante me aayega.");
}
function logout(){ localStorage.clear(); location.reload(); }
updateUI();
