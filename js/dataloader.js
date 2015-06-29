// JSON data from Google Spreadsheet
var dataURL = "https://spreadsheets.google.com/feeds/list/1saNvuCOt9_tHNZ8RQDi0z5ZY0N4sivlA1H2f2qmMOHI/od6/public/values?alt=json";

// takes in JSON object from google sheets and turns into a json formatted
// this way based on the original google Doc
// [
// 	{
// 		'column1': info1,
// 		'column2': info2,
// 	}
// ]
function clean_google_sheet_json(data){
	var formatted_json = [];
	var elem = {};
	var real_keyname = '';
	$.each(data.feed.entry.reverse(), function(i, entry) {
		elem = {};
		$.each(entry, function(key, value){
			// fields that were in the spreadsheet start with gsx$
			if (key.indexOf("gsx$") == 0)
			{
				// get everything after gsx$
				real_keyname = key.substring(4);
				elem[real_keyname] = value['$t'];
			}
		});
		formatted_json.push(elem);
	});
	return formatted_json;
}

function addData(){
	$.getJSON(dataURL, function(json){
		var data = clean_google_sheet_json(json);
		var source = $("#card-template").html();
		var cardTemp = Handlebars.compile(source);

		$("#content").append(cardTemp({apidata: data}));

	});
}

// execute addData() function
addData();