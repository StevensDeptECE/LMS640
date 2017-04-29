function voteUp(id, num) {
	var requestConfig = {
		method: "POST",
		url: "/voteUp",
		contentType: 'application/json',
		data: JSON.stringify({
			id: id,
			num: num
		})
	};

	$.ajax(requestConfig).then(function(responseMessage) {
		console.log(responseMessage);
	})
}


function voteDown(id, num) {
	var requestConfig = {
		method: "POST",
		url: "/voteDown",
		contentType: 'application/json',
		data: JSON.stringify({
			id: id,
			num: num
		})
	};
	$.ajax(requestConfig).then(function(responseMessage) {
		console.log(responseMessage);
	})
}



$('.vote-up').click((voteUpEvent) => {
	let target = voteUpEvent.target;
	let id = target.id;
	if ($(target).hasClass('vote-up-on')) {
		$(target).removeClass('vote-up-on').addClass('vote-up-off');
		let counter = $('#vote-count-' + id);
		counter.text(parseInt(counter.text()) - 1);

		// if the user has already voted up the question, vote it down
		voteDown(id, parseInt(counter.text()));

	} else {
		$(target).removeClass('vote-up-off').addClass('vote-up-on');
		let counter = $('#vote-count-' + id);
		counter.text(parseInt(counter.text()) + 1);

		voteUp(id, parseInt(counter.text()));
	}
})

$('.vote-down').click((voteDownEvent) => {
	let target = voteDownEvent.target;
	let id = target.id;
	if ($(target).hasClass('vote-down-on')) {
		$(target).removeClass('vote-down-on').addClass('vote-down-off');
		let counter = $('#vote-count-' + id);
		counter.text(parseInt(counter.text()) + 1);

		voteUp(id, parseInt(counter.text()));

	} else {
		$(target).removeClass('vote-down-off').addClass('vote-down-on');
		let counter = $('#vote-count-' + id);
		counter.text(parseInt(counter.text()) - 1);

		voteDown(id, parseInt(counter.text()));

	}
})