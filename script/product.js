$(() => {
    
    function refreshList() {
      $.get('/vendor', (data) => { 
        $("#product").val('');
        $("#price").val('');

        $("#productlist").empty();
        $('#vendors').empty()
        for (let vendor of data) {
          $('#vendors').append(
            `<option id = "${vendor.id}"> ${vendor.name}   </option>`  
          ) 
        }  
      })
      $.get('/product',(data)=>{
        for (let product of data) {
            $('#productlist').append(
              `<li> ${product.name}   <button id = ${product.id} >delete </button> </li>`  
            )
            $("button").click(function(){
              jQuery.ajax({
                url: '/productdelete/'+this.id,
                type: 'DELETE',
                success: function(data) {
                   refreshList();
                }
            });
            })
        }
      })
    }
    refreshList();
    
    function check(inp)
    {
        if(inp ==='')
        return false;
        else
        return true;
    }
    $('#addproduct').click(function(){
        
        if(check($('#product').val()))
         { if(check($("#price").val()))
           {
            $.post('/product',
            {
                name:$('#product').val(),
                vendorId : $('#vendors option:selected').attr("id"),
                price:$("#price").val()
            },
            (data) => {
                if (data.success) {
                  refreshList();
                } else {
                  alert('Some error occurred')
                }
            })
           }
           else
           {
             alert("Please give the product price");
           }
            
         }
         else
         {
             alert("please give some input");
         }
        
    })
})