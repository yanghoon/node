
/*
 * GET home page.
 * 
 * exports.module = object name
 */

exports.index = function(req, res){
  // function render(viewName, model)
  res.render('index', { title: 'Express' });
};

exports.build = function(express, module){
	console.log('Start Handler Mapping...');

	append(express, 'get', module.get);
	append(express, 'post', module.post);
	
	function append(express, method, map){
		if(!map){
			console.log('<no mappings>');
			return;
		}
		
		var name = method.constructor;
		for(var url in map){
			express[method](url, map[url]);
			console.log('+', method, url);
		}
	}
}