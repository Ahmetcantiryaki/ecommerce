

$(document).ready(function () {
  $.ajax({
    url: "https://fakestoreapi.com/products"
  }).then(function (result) {
    let data = result;
    $(data).each(function (index, item) {
      // console.log(item)
      $("#shoplist").append(`
            <div class="col mb-4 shop-col" data-category="${item.category}">
            <div class="card ">
            <span class="stock">${item.rating.count}</span>
              <img src="${item.image}" class="card-img-top" alt="${item.title}">
              <div class="card-body">
                <h5 class="card-title">${item.title}</h5>
                <h3 class="card-text price">${item.price}$</h3>
               
              </div>
              <div class="card-footer d-flex align-items-center justify-content-end">
              
              <div>
              <button class="view_button" data-target="#product_view" data-toggle="modal" data-id="${item.id}"> <i class="fa-solid fa-eye"></i></button>
              <button ><i class="fa-solid fa-basket-shopping"></i></button>
              </div>
              </div>
            </div>
          </div>`)
    })
    $(".view_button").click(function(){
      var id=$(this).data("id");
      // var url=""+id;
      // console.log(url)
      $.ajax({
        url:"https://fakestoreapi.com/products/"+id
      }).then(function(result){
        console.log(result)
      });
    })
  });


  $.ajax({
    url: "https://fakestoreapi.com/products/categories"
  }).then(function (result) {
    // console.log(result)
    $(result).each(function (index, item) {
      // console.log(item)
      $("#list-tab").append(`
      <a class="list-group-item list-group-item-action">${item}</a>
      `)
    })
    $(".list-group-item").click(function(){
      $(this).addClass("active").siblings().removeClass("active");
      var text=$(this).text();
      // console.log(text)
      $(".shop-col").each(function(){
        var category=$(this).data("category");
        console.log(category)
        if(text==category)
        {
          $(this).show();
        }
        else if(text=="Tümü")
        {
          $(this).show();
        }
        else{
          $(this).hide();
        }
      })
    })
  });

 


});

