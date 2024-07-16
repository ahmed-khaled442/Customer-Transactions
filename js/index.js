async function getapi() {
  let api = await fetch("../cuts.json");
  let response = await api.json();
  console.log(response);
  display(response);
}
getapi();

function display(customers) {
  let box = "";
  for (let i = 0; i < customers.length; i++) {
    box += `
      <li class="transaction-item">
            <span class="customer-name ">${customers[i].name}</span>
            <span class="transaction-amount ">$${customers[i].amount}</span>
            <span class="transaction-date">${customers[i].date}</span>
            <button id="show" class="btn-success btn">show detils</button>
          </li>
      
       `;
  }
  document.getElementById("box").innerHTML = box;
  let show = document.querySelectorAll("#show");
  console.log(show);
  for (let i = 0; i < show.length; i++) {
    show[i].addEventListener("click", function (e) {
      console.log(customers[i]);
      dispalydeytails(customers[i]);
      document.getElementById("home").classList.replace("d-block", "d-none");
      document
        .getElementById("detailes")
        .classList.replace("d-none", "d-block");
    });
  }
}

function cutomerfilter(filtercutomer) {
  console.log(filtercutomer[0].amount);

  let fc = filtercutomer.filter((cutomer) => {
    return cutomer.name.includes("ahmed khaled") && cutomer.amount <= 2000;
  });
  console.log(fc);
}
let nameinput = document.getElementById("nameFilter");
nameinput.addEventListener("input", () => {
  console.log("hi");
  console.log(nameinput.value);
  async function getapia() {
    let api = await fetch("../cuts.json");
    let response = await api.json();
    console.log(response);
    cutomerfilter(response);
  }
  getapia();
  function cutomerfilter(filtercutomer) {
    console.log(filtercutomer[0].amount);
    let fc = filtercutomer.filter((cutomer) => {
      return cutomer.name
        .toLowerCase()
        .includes(`${nameinput.value.toLowerCase()}`);
    });
    console.log(fc);
    display(fc);
  }
  //   filterboth();
});

let amountFilter = document.getElementById("amountFilter");
amountFilter.addEventListener("input", () => {
  console.log("hi");
  console.log(amountFilter.value);
  async function getapia() {
    let api = await fetch("../cuts.json");
    let response = await api.json();
    console.log(response);
    cutomerfilter(response);
  }
  getapia();
  function cutomerfilter(filtercutomer) {
    console.log(filtercutomer[0].amount);
    let fc = filtercutomer.filter((cutomer) => {
      return cutomer.amount >= `${amountFilter.value}`;
    });
    console.log(fc);
    display(fc.sort((a, b) => b.amount - a.amount));
  }
  //   filterboth();
});
// to display details cutomers
function dispalydeytails(onecustomer) {
  console.log(onecustomer);
  let box = "";
  box = `
  <i id="back" class="fa-solid fa-arrow-left"></i>
   <h1>Customer Transactions for One Day</h1>
      <div class="customer-info">
        <h2>Customer Name: ${onecustomer.name}</h2>
        <p>Email:  ${onecustomer.eimail}</p>
        <p>Phone: 0${onecustomer.phone}</p>
        <p>Date: ${onecustomer.date} </p>
      </div>

      <h2>Transaction History</h2>
      <ul class="transaction-list">
        <li class="transaction-item">
          <span class="transaction-description">Purchase at Store A</span>
          <span class="transaction-amount">$${onecustomer.amount}</span>
        </li>
        <li class="transaction-item">
          <span class="transaction-description">Purchase at Store B</span>
          <span class="transaction-amount">$${onecustomer.amount2}</span>
        </li>
      </ul>
      <h2>Transaction Amounts</h2>
      <canvas id="transactionChart"></canvas>
  
  `;

  document.getElementById("detailes").innerHTML = box;
  // to back to main site
  document.getElementById("back").addEventListener("click", function () {
    console.log("hi");
    document.getElementById("home").classList.replace("d-none", "d-block");
    document.getElementById("detailes").classList.replace("d-block", "d-none");
  });

  const ctx = document.getElementById("transactionChart").getContext("2d");
  const transactionChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Store A", "Store B"],
      datasets: [
        {
          label: "Transaction Amounts",
          data: [onecustomer.amount, onecustomer.amount2],
          backgroundColor: [
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
          ],
          borderColor: ["rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

// function filterboth() {
//   console.log("hi");
//   console.log(amountFilter.value);
//   async function getapia() {
//     let api = await fetch("../cuts.json");
//     let response = await api.json();
//     console.log(response);

//     cutomerfilter(response);
//   }
//   getapia();

//   function cutomerfilter(filtercutomer) {
//     console.log(filtercutomer[0].amount);

//     let fc = filtercutomer.filter((cutomer) => {
//       return (
//         cutomer.name
//           .toLowerCase()
//           .includes(`${nameinput.value.toLowerCase()}`) ||
//         cutomer.amount <= `${amountFilter.value}`
//       );
//     });
//     console.log(fc);
//     display(fc);
//   }
// }
