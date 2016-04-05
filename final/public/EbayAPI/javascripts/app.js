$(document).ready(function(){
  $("#form").submit(function(event){
    var keywords = $("input:first").val();
    console.log(keywords);

//gameboy%203g
  $.ajax({
    type: "GET",
    url: 'http://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=JacobWhi-CS201Fin-PRD-238c4f481-c3ec72bc&OPERATION-NAME=findItemsAdvanced&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=' + keywords + '&paginationInput.entriesPerPage=10&itemFilter(0).name=ListingType&itemFilter(0).value=FixedPrice&itemFilter(1).name=MinPrice&itemFilter(1).value=0&itemFilter(2).name=MaxPrice&itemFilter(2).value=5.00',
    async: true, 
    dataType: 'jsonp',
    crossDomain:true,
    success: function(data, status, xhr){
      console.log(data);
          var items = data.findItemsAdvancedResponse[0].searchResult[0].item || [];
      console.log(items);
      console.log(items[0].sellingStatus[0].currentPrice[0].__value__);
      var html = [];
      html.push('<table width="100%" border="0" cellspacing="0" cellpadding="3"><tbody>');

      for (var i = 0; i < items.length; ++i)  
      {
        var item     = items[i];
        var title    = item.title;
        var pic      = item.galleryURL;
        var viewitem = item.viewItemURL;
        var price = item.sellingStatus[0].currentPrice[0].__value__;

        if (null != title && null != viewitem)
        {
        html.push('<tr><td>' + '<img src="' + pic + '" border="0">' + '</td>' + 
            '<td><a href="' + viewitem + '" target="_blank">' + title + '</a></td><td> ' + price + ' </td></tr>');
        }
      }
      html.push('</tbody></table>');
      document.getElementById("results").innerHTML = html.join("");
    }
  })
  event.preventDefault();
  });
});