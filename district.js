let arr = {
    "Barisal":
        [
            "Barguna",
            "Barisal",
            "Bhola",
            "Jhalokati",
            "Patuakhali",
            "Pirojpur"
        ],
    "Chittagong":
        [
            "Bandarban",
            "Brahmanbaria",
            "Chandpur",
            "Chittagong",
            "Comilla",
            "Cox's Bazar",
            "Feni",
            "Khagrachhari",
            "Lakshmipur",
            "Noakhali",
            "Rangamati"
        ],
    "Dhaka":
        [
            "Dhaka",
            "Faridpur",
            "Gazipur",
            "Gopalganj",
            "Kishoreganj",
            "Madaripur",
            "Manikganj",
            "Munshiganj",
            "Narayanganj",
            "Narsingdi",
            "Rajbari",
            "Shariatpur",
            "Tangail"
        ],
    "Khulna":
        [
            "Bagerhat",
            "Chuadanga",
            "Jessore",
            "Jhenaidah",
            "Khulna",
            "Kushtia",
            "Magura",
            "Meherpur",
            "Narail",
            "Satkhira"
        ],
    "Mymensingh":
        [
            "Jamalpur",
            "Mymensingh",
            "Netrakona",
            "Sherpur"
        ],
    "Rajshahi":
        [
            "Bogra",
            "Chapainawabganj",
            "Joypurhat",
            "Naogaon",
            "Natore",
            "Pabna",
            "Rajshahi",
            "Sirajganj"
        ],
    "Rangpur":
        [
            "Dinajpur",
            "Gaibandha",
            "Kurigram",
            "Lalmonirhat",
            "Nilphamari",
            "Panchagarh",
            "Rangpur",
            "Thakurgaon"
        ],
    "Sylhet":
        [
            "Habiganj",
            "Moulvibazar",
            "Sunamganj",
            "Sylhet"
        ]
};

let sl = 1;
for (const x in arr) {
    let array = arr[x]
    for (let i = 0; i < array.length; i++) {
        let element = `<tr id="${sl}" class="hidden show border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
                            <td class="px-6 py-4">${sl}</td>
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                ${array[i]}
                            </th>
                            <td class="px-6 py-4">${x}</td>
                        </tr>`
        document.getElementById("List").innerHTML += element;
        sl++
    }
}

let totalData = sl-1;
let showPerPage = 8;
let current_page = 1;
let page_count = Math.ceil(totalData/showPerPage);
let wrapper = document.getElementById('pagination');
let element = document.querySelectorAll(".show");

function DisplayList (data, page) {
	page--;
    
	let start = showPerPage * page;
	let end = start + showPerPage;
	for (let i = 0; i < data.length; i++) {
        if (parseInt(data[i].id) > start && parseInt(data[i].id) <= end) {
            data[i].classList.remove('hidden');
        }
        else{
            data[i].classList.add('hidden');
        }
	}
}

function SetupPagination (data, totalPage) {
	wrapper.innerHTML = "";

    if(totalPage > 1) {
        for (let i = 1; i < totalPage + 1; i++) {
            let btn = PaginationButton(i, data);
            wrapper.appendChild(btn);
        }
    }
}

function PaginationButton (page, data) {
	let button = document.createElement('button');
	button.innerText = page;

	if (current_page == page) button.classList.add('active');

	button.addEventListener('click', function () {
		current_page = page;
		DisplayList(data, current_page);

		let current_btn = document.querySelector('.pagenumbers button.active');
		current_btn.classList.remove('active');

		button.classList.add('active');
	});

	return button;
}

SetupPagination(element, page_count);
DisplayList(element, current_page);

function filter(data) {
    let inputVal = data.toLowerCase();
    let myLi = document.querySelectorAll(".show");
    let j = 1;

    for (let i = 0; i < myLi.length; i++) {
        if (!inputVal) {
            SetupPagination(element, page_count);
            DisplayList(element, current_page);
        } else if (myLi[i].innerHTML.toLowerCase().indexOf(inputVal) > -1) {
            myLi[i].classList.remove('hidden');
            myLi[i].classList.add('cc');
            myLi[i].removeAttribute("id");
            myLi[i].setAttribute("id", j);
            let cc = document.querySelectorAll(".cc");
            SetupPagination(cc, Math.ceil(cc.length/showPerPage));
            DisplayList(cc, 1);
            j++
        } else {
            myLi[i].classList.add('hidden');
            myLi[i].classList.remove('cc');
        }
    }
}
