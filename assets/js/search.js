async function search() {
    let input = document.getElementById("search-shoe-input");
    const data = await new Promise((resolve, reject) => {
        fetch('/assets/json/shoes.json')
            .then(respond => {
                resolve(respond.json())
            }).catch(err => {
            reject(err)
        })
    })
    const value = input.value;

    const list = data["data"]
    const options = {
        // includeScore: true,
        // Search in `author` and in `tags` array
        keys: ['name', 'price']
    }

    const fuse = new Fuse(list, options)

    if (value === "") {
        result = JSON.parse(JSON.stringify(list))
    } else {
        result = fuse.search(value).map(i => {
                return {
                    "name": i.item.name,
                    "price": i.item.price,
                    "image": i.item.image
                }
            }
        )
    }
    $("#shoes-container").empty();
    result.forEach(i => {
        $("#shoes-container").append(`
        <div class="w-full sm:w-2/3 lg:w-1/3">
        <div class="mt-8 text-center single-team wow fadeIn" data-wow-duration="1s" data-wow-delay="0.5s">
            <div class="relative team-image">
                <img class="w-full" src="assets/images/${i.image}" alt="Team">
                <div class="team-social">
                    <ul>
                        <li class="mx-4"><a target="_blank"
                                            href="https://wa.me/19154227706?text=Hello%2C%20I%20am%20interested%20in%20this%20product"><i
                                class="lni lni-whatsapp"></i></a></li>
                    </ul>
                </div>
            </div>
            <div class="p-8">
                <h5 class="mb-1 text-xl font-bold text-gray-900">
                    ${i.name}
                </h5>
                <p>${i.price}</p>
                <p>In Store Pick Up</p>
            </div>
        </div> 
    </div>
    `);
    });


}


$(document).ready(function () {
    // Execute a function when the user presses a key on the keyboard
    let input = document.getElementById("search-shoe-input");
    input.addEventListener("keypress", function (event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            document.getElementById("search-shoe-btn").click();
        }
    });
    search();
});
