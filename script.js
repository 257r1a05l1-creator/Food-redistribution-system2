const defaultFoods = [
  {name:"Rice & Vegetable Curry",category:"Cooked Meals",quantity:"20 meals",location:"Kompally, Hyderabad",until:"Today, 10:00 PM",emoji:"🍛"},
  {name:"Fresh Bananas",category:"Fruits & Vegetables",quantity:"8 kg",location:"Secunderabad",until:"Tomorrow, 8:00 AM",emoji:"🍌"},
  {name:"Bread & Bakery Items",category:"Bakery",quantity:"35 packets",location:"Kukatpally",until:"Today, 9:00 PM",emoji:"🥖"}
];

let foods = JSON.parse(localStorage.getItem("foodBridgeFoods") || "null") || defaultFoods;

function renderFoods(){
  const list=document.getElementById("foodList");
  list.innerHTML="";
  foods.forEach((food,index)=>{
    const card=document.createElement("div");
    card.className="food-card";
    card.innerHTML=`
      <div class="emoji">${food.emoji || "🍱"}</div>
      <h3>${escapeHtml(food.name)}</h3>
      <p><strong>Category:</strong> ${escapeHtml(food.category)}</p>
      <p><strong>Quantity:</strong> ${escapeHtml(food.quantity)}</p>
      <p><strong>📍 Location:</strong> ${escapeHtml(food.location)}</p>
      <p><strong>⏰ Available:</strong> ${escapeHtml(food.until)}</p>
      <button class="btn primary" onclick="requestFood(${index})">Request Food</button>
    `;
    list.appendChild(card);
  });
}

function requestFood(index){
  const food=foods[index];
  alert(`Request submitted for ${food.name}. A volunteer/NGO can contact you for pickup coordination.`);
}

document.getElementById("donationForm").addEventListener("submit", function(e){
  e.preventDefault();
  const food={
    name:document.getElementById("foodName").value,
    category:document.getElementById("category").value,
    quantity:document.getElementById("quantity").value,
    location:document.getElementById("location").value,
    until:new Date(document.getElementById("availableUntil").value).toLocaleString(),
    emoji:"🍱"
  };
  foods.unshift(food);
  localStorage.setItem("foodBridgeFoods",JSON.stringify(foods));
  renderFoods();
  document.getElementById("totalDonations").textContent=12 + foods.length - defaultFoods.length;
  document.getElementById("mealCount").textContent="+" + (1250 + foods.length*10).toLocaleString();
  document.getElementById("formMessage").textContent="✓ Food donation published successfully!";
  this.reset();
});

function escapeHtml(value){
  return String(value).replace(/[&<>"']/g, char => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[char]));
}

renderFoods();
