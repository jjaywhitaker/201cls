$(document).ready(function(){

    $("#button").click(
    function(e){
      var myCategory = document.getElementById("dropdown").value;
       
     var myQuery = document.getElementById("inputbox").value;
   // var urls=  "http://api.walmartlabs.com/v1/search?apiKey=2w9xg6wasagm2atc99qn8fjg&query=tires&categoryId=91083_1074767_1072089&sort=price&ord=asc"
      var urls = "http://api.walmartlabs.com/v1/search?apiKey=2w9xg6wasagm2atc99qn8fjg&query="+myQuery+"&categoryId="+ myCategory +"&facet=on&facet.range=price:[4.50%20TO%205.01]&sort=bestseller";
      console.log(urls);

      //document.getElementById("result").<html>
       document.getElementById("result").innerHTML = ""
      console.log("Hello");
      $.ajax({
        // console.log("Walmart");
        url: urls,
          dataType: 'jsonp',
          success: function( data ){

            console.log("Hello from data");
            console.log(data);
            $("#result")
          $.each(data['items'], function(name2, value)
          {
             $("#result").append("<div class='items'><strong>"+value.name+"</strong><br><img src="+value.largeImage+"><br>Price: <strong>$" + value.salePrice+"</strong> <p></p><a href="+value.addToCartUrl+"><button type='button' class='btn btn-primary'>Click here to Buy</button></a></div><br><br>");
             console.log(value.parentItemId);
          });
           document.getElementById("title").innerHTML="";
           document.getElementById("result").style.backgroundImage="none";
          document.getElementById("result").style.backgroundColor= "white";     
            document.getElementById("result").style.width="55%";
             document.getElementById("result").style.height="500px";
             document.getElementById("result").style.overflow= "scroll";
             document.getElementById("result").display="block";
             document.getElementById("result").marginLeft="auto";
             document.getElementById("result").marginRight="auto";


          }

      }
    )
    });


    })

