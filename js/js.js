

$(document).ready(function () {
    $.getJSON({
        url: "https://fakestoreapi.com/products"
    }).then(function (result) {
        let data=result;
        $(data).each(function(index,item){
            console.log(item)
            $("#shoplist").append(`
            <div class="col mb-4">
            <div class="card">
              <img src="${item.image}" class="card-img-top" alt="${item.title}">
              <div class="card-body">
                <h5 class="card-title">${item.title}</h5>
                <h3 class="card-text price">${item.price} TL</h3>
               
              </div>
              <div class="card-footer d-flex align-items-center justify-content-end">
              <button > <i class="fa-solid fa-eye"></i></button>
              <button><i class="fa-solid fa-basket-shopping"></i></button>
              </div>
            </div>
          </div>`)
        })
        
       

    });
});

           