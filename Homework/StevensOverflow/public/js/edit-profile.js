function readURL(input) {
    if (input.files[0].type !== "image/jpeg") {
        alert("wrong file type: file should be jpeg");
        return;
    }
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('.img-circle')
                .attr('src', e.target.result)
                .width(200)
                .height(200);
        };
        reader.readAsDataURL(input.files[0]);
    }
}