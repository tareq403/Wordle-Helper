$(document).ready(function() {

	$("#help-toggle").click(function (event) {
		$(".help-container").toggle();
		$(".video-link").toggle();
		if ($("#help-toggle").html().indexOf("Hide") < 0) {
			$("#help-toggle").html($("#help-toggle").html().replace("Show", "Hide"));
		} else {
			$("#help-toggle").html($("#help-toggle").html().replace("Hide", "Show"));
		}
		event.preventDefault();
	})

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
			if (presentCh != null && presentCh != "" && isValidChar(presentCh[0])) {
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
		$("#result-header").css("display", "block");
		$("#result-text").css("display", "flex");
		$("#result-section-border").css("display", "block");
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
			return word[index] == ch;
		});
	};
});