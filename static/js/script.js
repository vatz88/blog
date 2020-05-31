(function() {
	// Make header tags linkable
	$h = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
	var linkableHeaderClickListener = function(e) {
		window.location.hash = e.target.id;
	};
	for (var i = 0; i < $h.length; i++) {
		$h[i].addEventListener('click', linkableHeaderClickListener);
	}

	// Toast
	var snackBar = document.createElement('div');
	snackBar.id = 'snackbar';
	document.getElementsByTagName('body')[0].appendChild(snackBar);

	function makeTaost(str) {
		snackBar.innerText = str;
		snackBar.className = 'show';
		setTimeout(function() {
			snackBar.className = snackBar.className.replace('show', '');
		}, 3000);
	}

	// Copy code
	var $pre = document.querySelectorAll('pre');
	var copyClickListener = function(e) {
		try {
			document.designMode = 'on';
			window.getSelection().removeAllRanges();
			const range = document.createRange();
			range.selectNode(e.target.nextSibling);
			window.getSelection().addRange(range);
			const copyStatus = document.execCommand('copy');
			if (copyStatus) {
				makeTaost('Copied!');
			} else {
				makeTaost("Couldn't copy. Try again.");
			}
			window.getSelection().removeAllRanges();
			document.designMode = 'off';
		} catch (err) {
			makeTaost("Something went wrong! Couldn't copy :(");
			console.log('Err in copy ', err);
		}
	};
	for (var i = 0; i < $pre.length; i++) {
		var $span = document.createElement('span');
		$span.classList.add('copy-code');
		$span.addEventListener('click', copyClickListener);
		$pre.item(i).insertBefore($span, $pre.item(i).firstChild);
	}

	// console ;)
	var consolestyles = ['font-size: 46px', 'color: #757575'].join(';');
	console.log('%cvatz88', consolestyles);
})();
