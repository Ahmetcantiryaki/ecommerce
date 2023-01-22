
if(localStorage.getItem("products") == null)
{
  $(".product-list").append("<span class='card-null'>Sepetiniz Boş</span>")
}
else{
  var a=JSON.parse(localStorage.getItem("products"))
  showdata(a)
  $(".badge-primary").text(a.length)
}
function showdata (parameters) {

  $(".product-list *").remove();
  $(parameters).each(function(index,item){
    $.ajax({
      url: "https://fakestoreapi.com/products/"+item
    }).then(function(response){
      // console.log(response)
      $(".product-list").append(`
      <div class="pl-row">
        <div class="pl-img">
            <img src="${response.image}">
        </div>
        <div class="pl-body">
            <div class="pl-flex"> 
                <h4>${response.title}</h4>
                <button class="btn btn-outline-danger remove-from-cart" onclick="deletecard($(this).data('id'))" data-id="${response.id}">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
          
            <div class="pl-footer">
              
                <div class="form-row m-0"> 
                    <button class="btn btn-outline-primary quantity-minus">
                        <i class="fas fa-minus"></i>
                    </button>
                    <input type="number" class="form-control w-25 mx-2 quantity" unitprice="10.99" value="1" min="1" readonly data-id="${response.id}">
                    <button class="btn btn-outline-primary quantity-plus">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <span class="price">${response.price}$ </span>
            </div>
        </div>
    </div>
      `)
    })
  })
}
function addtocard(id) {
  
 var new_data=id;
 if(localStorage.getItem("products")==null){
  localStorage.setItem("products",'[]');

 }
 var old_data=JSON.parse(localStorage.getItem('products'));
 
 if(!old_data.includes(id))
 {
  old_data.push(new_data);
 opencard();
 }
 else{
      Swal.fire({
      icon: 'error',
      title: 'Opps!',
      html:
    'Bu ürün zaten sepete ekli,<br/> ' +
    'Ürün adedini sepet içinde güncelleyebilirsin <br/>' +
    'İyi alışverişler',
    })
    $("#product_view").modal("hide")
 }

 $(".badge-primary").text(old_data.length)

 localStorage.setItem('products', JSON.stringify(old_data));
  showdata(old_data);
 
  
}

function deletecard(id)
{
  var data=JSON.parse(localStorage.getItem("products"));
  data.splice(id,1)
  localStorage.setItem('product', JSON.stringify(data));
  var ls= localStorage.getItem("products");
  console.log(ls)
}

function opencard() {
  $(".side-shop").toggleClass("open")
  $("body").toggleClass("open")
  $("header").css("z-index", "99999")
}
function closecard() {
  $(".side-shop").removeClass("open")
  $("body").removeClass("open")
  $("header").css("z-index", "99")
}
function view(id, oldprice) {
  $.ajax({
    url: "https://fakestoreapi.com/products/" + id
  }).then(function (result) {
    var item = result;

    $(".modal-body").append(`
        <div class="row">
          <div class="col-md-6 product_img">
          <a href="${item.image}" data-fancybox="gallery" >
          <img src="${item.image}" class="img-responsive"> 
          </a>
          </div>
          <div class="col-md-6 product_content">
              <h4 class="">${item.title}</h4>
             
              <p>${item.description}</p>
              <small class="pre-cost">${oldprice}</small>
              <h3 class="cost"> ${item.price}$ </h3>
            
              <div class="space-ten"></div>
              <div class="btn-ground d-flex align-items-center justify-content-between">
              <small>*Galeri için ürün görseline tıklayınız</small> <button type="button" data-dismiss="modal" class="btn btn-primary add-to-card" data-id="${item.id}" onclick="var id=$(this).data('id');addtocard(id);"><i class="fa-solid fa-basket-shopping" ></i> Add To Cart</button>
              </div>
          </div>
        </div>
    `)
  });
};

$(document).ready(function () {
  $('#product_view').on('hidden.bs.modal', function (event) {
    $(".modal-body .row").remove();
  })
  $.ajax({
    url: "https://fakestoreapi.com/products"
  }).then(function (result) {
    let data = result;
    $(data).each(function (index, item) {
      // console.log(item)
      var price = item.price;

      var oldprice = Number(price + 40.90)
      if (!(index % 2 == 0)) {
        $("#shoplist").append(`
            <div class="col mb-4 shop-col" data-category="${item.category}" data-id="${item.id}">
            <div class="card ">
            <span class="stock">${item.rating.count}</span>
            <a class="card-open" data-target="#product_view" data-toggle="modal" data-id="${item.id}">

            <a href="${item.image}" data-fancybox="gallery" >
              <img src="${item.image}" class="card-img-top" alt="${item.title}">
              </a>
              </a>
              <div class="card-body ">
              <a class="card-open" data-target="#product_view" data-toggle="modal" data-id="${item.id}">
                <h5 class="card-title text-primary ">${item.title}</h5>
                <p>${item.description}</p>
                </a>
                <small class="pre-cost">${oldprice}$</small>
                <h3 class="card-text price">${item.price}$</h3>
               
              </div>
             
              <div class="card-footer d-flex align-items-center justify-content-end">
              
              <div>
              <button class="view_button" data-target="#product_view" data-toggle="modal" data-id="${item.id}"> <i class="fa-solid fa-eye"></i></button>
              <button class="add-to-card" data-id="${item.id}"><i class="fa-solid fa-basket-shopping"></i></button>
              </div>
              </div>
            </div>
          </div>`)


      }
      else {
        $("#shoplist").append(`
            <div class="col mb-4 shop-col" data-category="${item.category}" data-id="${item.id}">
            <div class="card " >
            <span class="stock">${item.rating.count}</span>
            <a class="card-open" data-target="#product_view" data-toggle="modal" data-id="${item.id}">
            <a href="${item.image}" data-fancybox="gallery" >
              <img src="${item.image}" class="card-img-top" alt="${item.title}">
              </a>
              </a>
              <div class="card-body card-prices">
              <a class="card-open" data-target="#product_view" data-toggle="modal" data-id="${item.id}">
                <h5 class="card-title text-primary ">${item.title}</h5>
                <p>${item.description}</p>
                </a>
                <h3 class="card-text price">${item.price}$</h3>
               
              </div>
             
              <div class="card-footer d-flex align-items-center justify-content-end">
              
              <div>
              <button class="view_button" data-target="#product_view" data-toggle="modal" data-id="${item.id}"> <i class="fa-solid fa-eye"></i></button>
              <button class="add-to-card"  data-id="${item.id}" ><i class="fa-solid fa-basket-shopping"></i></button>
              </div>
              </div>
            </div>
          </div>`)
      }

    })

    $(".view_button,.card-open").click(function () {
      var id = $(this).data("id");
      var oldprice = $(this).parent().parent().siblings(".card-body").children(".pre-cost").text();
      // var url=""+id;
      // console.log(url)
      view(id, oldprice);
    })
    $(".add-to-card").click(function () {
      var id = $(this).data("id");
     
     
    
      addtocard(id);
    })
  });


  $.ajax({
    url: "https://fakestoreapi.com/products/categories"
  }).then(function (result) {
    // console.log(result)
    $(result).each(function (index, item) {
      // console.log(item)
      $("#myInput").before(`
      <a class="list-group-item list-group-item-action">${item}</a>
      `)
    })
    $(".list-group-item").click(function () {
      $(this).addClass("active").siblings().removeClass("active");
      var text = $(this).text();
      // console.log(text)
      $(".shop-col").each(function () {
        var category = $(this).data("category");
        // console.log(category)
        if (text == category) {
          $(this).show();
        }
        else if (text == "Tümü") {
          $(this).show();
        }
        else {
          $(this).hide();
        }
      })
    })
  });


  $("#myInput").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $(".shop-col").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)

    });
    if ($('.shop-col:visible').length == 0) {
      if ($(".search-error").length < 1) {
        $("#shoplist").append(`
      <div class="search-error">Ürün Bulunamadı</div>
      `)
      }


      console.log("Ürün bulunamadı")
    }
    else {
      $(".search-error").remove();
    }
  });

});

