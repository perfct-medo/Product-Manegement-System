let title = document.querySelector("#title");
let price = document.querySelector("#prics");
let taxes = document.querySelector("#taxes");
let ads = document.querySelector("#ads");
let disscount = document.querySelector("#disscount");
let total = document.querySelector("#total");
let count = document.querySelector("#count");
let category = document.querySelector("#category");
let submitBtn = document.querySelector("#submit");
let tbody = document.querySelector("#tbody");
let deleteallbtn = document.querySelector("#deleteall");
let node = "create";
let serchMood = "title";
let tem;
let serch = document.querySelector("#search");
// console.log(tbody);

// get totale
function getTotale() {
    if (price.value !== "") {
        let result =
            Number(price.value) +
            Number(taxes.value) +
            Number(ads.value) -
            Number(disscount.value);
        total.style.backgroundColor = "darkcyan";
        total.innerHTML = result;
    } else {
        total.style.backgroundColor = "red";
        total.innerHTML = "";
    }
}

// // cereat Product

// console.log(localStorage.getItem("product"));
let dataPro = [];
if (localStorage.getItem("product") !== null) {
    dataPro = JSON.parse(localStorage.getItem("product"));
    // console.log(localStorage.getItem("product"));
    showData();
} else {
    let dataPro = [];
}

submitBtn.addEventListener("click", () => {
    inputsemp();
});
// console.log(dataPro);
function inputsemp() {
    if (
        price.value === "" ||
        taxes.value === "" ||
        ads.value === "" ||
        disscount.value === "" ||
        title.value === "" ||
        category.value === ""
    ) {
        window.alert("empaty");
    } else {
        let newpro = {
            title: title.value,
            price: price.value,
            taxes: taxes.value,
            ads: ads.value,
            disscount: disscount.value,
            total: total.innerHTML,
            count: count.value,
            category: category.value,
        };
        if (node === "create") {
            if ((newpro.count > 1) & (newpro.count < 100)) {
                for (let i = 0; i < newpro.count; i++) {
                    dataPro.push(newpro);
                }
            } else {
                dataPro.push(newpro);
            }
        } else {
            dataPro[tem] = newpro;
            node = "create";
            submitBtn.innerHTML = "Create";
            count.style.display = "block";
        }

        //     // save in localeStorge
        localStorage.setItem("product", JSON.stringify(dataPro));
        // console.log(dataPro);
        clearData();
        showData();
    }
}
// // remove data from input
function clearData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    count.value = "";
    disscount.value = "";
    total.innerHTML = "";
    category.value = "";
}
// // read
function showData() {
    getTotale();
    let table = "";
    for (let i = 0; i < dataPro.length; i++) {
        table += `<tr>
                            <td>${i + 1}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].disscount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button   onclick="ubdateele(${i} )" id="update">update</button></td>
                            <td><button  onclick="deletes(${i})" id="delete">delete</button></td>
                        </tr>`;
    }
    tbody.innerHTML = table;
    if (dataPro.length > 0) {
        deleteallbtn.innerHTML = `<button  onclick="deleteall()" id="deleteall">Delete all</button>`;
    } else {
        deleteallbtn.innerHTML = "";
    }
}
// showData();
// //delete
function deletes(p) {
    dataPro.splice(p, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}

function deleteall() {
    dataPro.splice(0);
    localStorage.clear();
    showData();
}
// //count
function numbersofitem() {}
// //update
function ubdateele(e) {
    title.value = dataPro[e].title;
    price.value = dataPro[e].price;
    taxes.value = dataPro[e].taxes;
    ads.value = dataPro[e].ads;
    getTotale();
    count.style.display = "none";
    disscount.value = dataPro[e].disscount;

    submitBtn.innerHTML = "Update";
    node = "Ubdate";

    category.value = dataPro[e].category;
    tem = e;
    scroll({
        top: 0,
        behavior: "smooth",
    });
}
// //serch
function serchele(id) {
    serch.focus();
    serch.style.display = "block";
    if (id == "by-title") {
        serchMood = "title";
    } else {
        serchMood = "category";
    }
    serch.placeholder = "Search By " + serchMood;
}

function serchData(value) {
    let table = "";
    for (let i = 0; i < dataPro.length; i++) {
        if (serchMood == "title") {
            if (dataPro[i].title.toLowerCase().includes(value.toLowerCase())) {
                table += `<tr>
                            <td>${i + 1}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].disscount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button   onclick="ubdateele(${i} )" id="update">update</button></td>
                            <td><button  onclick="deletes(${i})" id="delete">delete</button></td>
                        </tr>`;
            }
        } else if (dataPro[i].category.includes(value.toLowerCase())) {
            table += `<tr>
                            <td>${i + 1}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].disscount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button   onclick="ubdateele(${i} )" id="update">update</button></td>
                            <td><button  onclick="deletes(${i})" id="delete">delete</button></td>
                        </tr>`;
        } else {}
    }
    tbody.innerHTML = table;
}
serch.onblur = () => {
    serch.style.display = "none";
    showData();
};
// //clean data