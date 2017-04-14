
function searchProducts()
{
    var returnresult = false;
    jQuery(function($) {
        try {
            var searchQuery = $("#searchID").val();
            if (searchQuery) {
                var requestConfig = {
                    method: "POST",
                    url: "/browse/search",
                    contentType: 'application/json',
                    data: JSON.stringify({
                        searchQuery : searchQuery
                    })
                };

                $.ajax(requestConfig).then(function (responseMessage) {
                    console.log(responseMessage.message);
                });
            }
        }catch (e) {
         console.log("Error while searching for product", e)
    }
    });
}
