$(document).ready(function() {
	console.log("Loaded");
	console.log(words.length);

	$("#wordle-form").submit(function(event) {
		var candidates = words.slice();

		let notPresentStr = $("#not-present").val().toLowerCase();
		for (let i = 0; i < notPresentStr.length; i++) {
			if (isValidChar(notPresentStr[i])) {
				candidates = removeWordsWithChar(candidates, notPresentStr[i]);
			}
		}

		for (let i=0; i<5; i++) {
			let presentCh = $("#at-" + (i+1)).val().toLowerCase();
			if (presentCh != null && presentCh != "") {
				candidates = filterWordsWithCharAtPlace(candidates, presentCh, i);
			}

			let notRightCh = $("#not-at-" + (i+1)).val().toLowerCase();
			if (notRightCh != null && notRightCh != "") {
				for (let j = 0; j < notRightCh.length; j++) {
					if (isValidChar(notRightCh[j])) {
						candidates = removeWordsWithCharAtPlace(candidates, notRightCh[j], i);
					}
				}
			}
		}

		$("#result-header").html("Suggested words (" + candidates.length + ")");
		$("#result-text").empty();
		if (candidates.length > 0) {
			for (let i=0; i<candidates.length; i++) {
				$("<label class='word'>" + candidates[i] +"</label>").appendTo("#result-text");
			}
		}
		else {
			$("#result-text").html("No matching word found");
		}
		event.preventDefault();
	});

	var isValidChar = function (ch) {
		return 'a' <= ch && ch <= 'z';
	}

	var removeWordsWithChar = function (wordList, ch) {
		return wordList.filter (function (word) {
			return word.indexOf(ch) < 0;
		});
	};

	var removeWordsWithCharAtPlace = function (wordList, ch, index) {
		return wordList.filter (function (word) {
			return (word.indexOf(ch) >= 0 && word[index] != ch);
		});
	};

	var filterWordsWithCharAtPlace = function (wordList, ch, index) {
		return wordList.filter (function (word) {
			return word.indexOf(ch) == index;
		});
	};
});