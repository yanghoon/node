$(document).ready(function() {
	var scope = {};
	
	// jquery object cache & initialize view
	var $result = $('#result').hide();
	var $keyword = $('#keyword');
	var $count = $('#count');
	var $tbody = $('tbody');

	function draw(){
		// search result area
		scope.showResult ? $result.show() : $result.hide();
		$keyword.html(scope.keyword);
		$count.html(scope.epl && scope.epl.length || '0');
		
		// data table area
		// ver.1
//		var tbody = '';
//		var column= 'rank,name,total,winPoint,win,draw,lose,goals,eat,diff'.split(',');
//		function builder(i, item){
//			var td = '';
//			for(var idx in column)
//				td += "<td>" + item[column[idx]] + "</td>";
//				
//			tbody += "<tr>" + td + "</tr>";
//		}
//
//		$.each(scope.epl, builder);
//		$tbody.html(tbody);

		// ver.1
		$tbody.empty();
		var column= 'rank,name,total,winPoint,win,draw,lose,goals,eat,diff'.split(',');
		function builder(i, item){
			var td = '';
			for(var idx in column)
				td += "<td>" + item[column[idx]] + "</td>";
				
			$tbody.append("<tr>" + td + "</tr>");
			$tbody.children().last().on('click', function(e){
				location.href = '/main/team/' + item.id;
			});
		}

		$.each(scope.epl, builder);
	}

	// bind ajax event
	var $form = $('form');
	$form.on('submit', function(e) {
		e.preventDefault();

		scope.keyword = $form.find('input[name=keyword]').val();
		var promise = $.ajax({
			url : '/main/search',
			data : $form.serialize(),
			dataType : "json",
			type : 'post',
			success : success,
			fail : fail
		});

		return false;
	});
	
	// callback
	function success(res) {
		scope.showResult = true;
		scope.epl = res.epl;

		if(!res || !res.epl || res.epl.length == 0){
			$form.find('input[name=keyword]').val('');
		}
		
		draw();
	}

	function fail(res) {
		console.log(res);
	}
});
