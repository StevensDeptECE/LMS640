console.log('singpost plus.js');
var hashmap = {};
var formsample = $("#comment-form");

function commentbtnevent(id) {
	if (hashmap[id] && hashmap[id] == 1) {
		$("#comment-form-" + id).addClass('hidden');
		hashmap[id] = 0;
		return;
	}

	console.log('commentbtnevent called');
	$("#comment-form-" + id).removeClass('hidden');
	hashmap[id] = 1;
}

$('.accept-btn').click((event) => {
	console.log('accepting answer: ' + event.target.parentElement.id);
	let currentAnswerId = event.target.parentElement.id
	var requestConfig = {
		method: "POST",
		url: "/acceptAnswer",
		contentType: 'application/json',
		data: JSON.stringify({
			acceptId: currentAnswerId
		})
	};
	$.ajax(requestConfig).then(function(responseMessage) {
		if (responseMessage.accepted) {
			location.reload();
		} else {
			console.log("don't try to accept answer by weird method");
		}
		// window.location.href = "http://localhost:3000/" + responseMessage.id;
	});
})

$('#answer-form').submit((submitEvent) => {
	submitEvent.preventDefault();
	// console.log(submitEvent)(''))
	var inputs = $('#answer-form :input');
	var body = {};
	inputs.each(function() {
		body[this.name] = $(this).val()
	});
	body['body'] = marked(body['body']);
	console.log(body);

	// console.log(inputs);
	var requestConfig = {
		method: "POST",
		url: "/answering",
		contentType: 'application/json',
		data: JSON.stringify(body)
	};

	$.ajax(requestConfig).then(function(responseMessage) {
		console.log(responseMessage);
		location.reload();
		// window.location.href = "http://localhost:3000/" + responseMessage.id;
	});
})

$('#post-form').submit((submitEvent) => {
	submitEvent.preventDefault();
	// console.log(submitEvent)(''))
	var inputs = $('#post-form :input');
	var body = {};
	inputs.each(function() {
		body[this.name] = $(this).val()
	});
	console.log(body);
	body['body'] = marked(body['body']);
	console.log(body);

	// console.log(inputs);
	var requestConfig = {
		method: "POST",
		url: "/posting",
		contentType: 'application/json',
		data: JSON.stringify(body)
	};

	$.ajax(requestConfig).then(function(responseMessage) {
		console.log(responseMessage);
		window.location.href = "http://localhost:3000"
		// window.location.href = "http://localhost:3000/" + responseMessage.id;
	});
})







