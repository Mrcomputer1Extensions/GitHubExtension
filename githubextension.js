(function(ext){
	
	ext.version = "v1.0";
	ext.config = {
		"apikey": "*notset*",
		"apikeyset": false
	}
	ext.saves = {};
	var $_ = {
		"apiurl": "https://api.github.com/",
		"token": "?access_token=",
		"errors": {
			"err600": "Something went wrong in the extension!"
		}
	};
	ext.repeat = -1;
	ext._shutdown = function() {};
	
	ext._getStatus = function() {
		return {status: 2, msg: '((READY)) GitHub Extension ' + ext.version + ' [MRCOMPUTER1]'};
	};
	
	ext._ = function(){
		
	};
	ext._help = function(){
		var w = window.open("http://mrcomputer1extensions.github.io/GitHubExtension/help/index.html", "_blank",
		"channelmode=1,height=600,width=550,location=no,menubar=no,resizble=no,status=no,titlebar=yes,toolbar=no,scrollbars=1");
	};
	ext._ajax = function(url, callback){
		$.get(url, function(data){
			callback(data);
			return;
		}, "text");
	};
	
	// Auth
	ext.setapikey = function(key) {
		/*clearInterval(ext.repeat);
		ext.saves = {};
		ext.repeat = setInterval(function(){
			ext.saves = {};
		}, 300);*/
		ext.config.apikey = key;
		ext.config.apikeyset = true;
	};
	ext.rateLimit = function(callback){
		$.get($_.apiurl + "rate_limit" + $_.token + ext.config.apikey, function(data){
			callback(data.resources.core.remaining);
			return;
		});
	}
	
	//Users
	ext.getUser = function(user, type, callback){
		/*if(ext.saves['users.getUser.' + user]){
			var data = ext.saves['users.getUser.' + user];
			copy type if here
			return;
		}*/
		$.get($_.apiurl + "users/" + user, function(data){
			ext.saves['users.getUser.' + user] = data;
			if(type == "Username"){
				callback(data.login);
				return;
			}else if(type == "ID"){
				callback(data.id);
				return;
			}else if(type == "Avatar URL"){
				callback(data.avatar_url);
				return;
			}else if(type == "Gravatar ID"){
				callback(data.gravatar_id);
				return;
			}else if(type == "Profile URL"){
				callback(data.html_url);
				return;
			}else if(type == "User Type"){
				callback(data.type);
				return;
			}else if(type == "Admin"){
				callback(data.site_admin);
				return;
			}else if(type == "Name"){
				callback(data.name);
				return;
			}else if(type == "Company"){
				callback(data.company);
				return;
			}else if(type == "Website"){
				callback(data.blog);
				return;
			}else if(type == "Location"){
				callback(data.location);
				return;
			}else if(type == "Email"){
				callback(data.email);
				return;
			}else if(type == "Bio"){
				callback(data.bio);
				return;
			}else if(type == "Public Repo Count"){
				callback(data.public_repos);
				return;
			}else if(type == "Public Gist Count"){
				callback(data.public_gists);
				return;
			}else if(type == "Followers"){
				callback(data.followers);
				return;
			}else if(type == "Following"){
				callback(data.following);
				return;
			}else if(type == "Created At"){
				callback(data.created_at);
				return;
			}else if(type == "Updated At"){
				callback(data.updated_at);
				return;
			}else{
				callback("Error (Code 600): " + $_.errors.err600);
				return false;
			}
		}, "json");
	};
	ext.yourName = function(callback){
		if(ext.saves['users.yourName']){
			callback(ext.saves['users.yourName'].login);
			return;
		}
		$.get($_.apiurl + "user" + $_.token + ext.config.apikey, function(data){
			ext.saves['users.yourName'] = data;
			callback(data.login);
			return;
		});
	}
	
	//Issues and Pull Requests
	ext.getIssue = function(id, repo, owner, whatToGet, callback){
		/*if(ext.saves['issues.getIssue.' + owner + '.' + repo + '.' + id]){
			var data = ext.saves['issues.getIssue.' + owner + '.' + repo + '.' + id];
			copy whatToGet if here
			return;
		}*/
		$.get($_.apiurl + "repos/" + owner + "/" + repo + "/issues/" + id + $_.token + ext.config.apikey, function(data){
			ext.saves['issues.getIssue.' + owner + '.' + repo + '.' + id] = data;
			if(whatToGet == "Number"){
				callback(data.number);
				return;
			}else if(whatToGet == "ID"){
				callback(data.id);
				return;
			}else if(whatToGet == "URL"){
				callback(data.html_url);
				return;
			}else if(whatToGet == "State"){
				callback(data.state);
				return;
			}else if(whatToGet == "Title"){
				callback(data.title);
				return;
			}else if(whatToGet == "Body"){
				callback(data.body);
				return;
			}else if(whatToGet == "User"){
				callback(data.user.login);
				return;
			}else if(whatToGet == "Labels"){
				var s = "";
				var i = 0;
				while(i != data.labels.length){
					s = s + data.labels[i].name + ";";
					i = i + 1;
				}
				callback(s);
				return;
			}else if(whatToGet == "Assignee"){
				callback(data.assignee.login);
				return;
			}else if(whatToGet == "Milestone:URL"){
				callback(data.milestone.url);
				return;
			}else if(whatToGet == "Milestone:ID"){
				callback(data.milestone.id);
				return;
			}else if(whatToGet == "Milestone:State"){
				callback(data.milestone.state);
				return;
			}else if(whatToGet == "Milestone:Title"){
				callback(data.milestone.title);
				return;
			}else if(whatToGet == "Milestone:Info"){
				callback(data.milestone.description);
				return;
			}else if(whatToGet == "Milestone:Creator"){
				callback(data.milestone.creator.login);
				return;
			}else if(whatToGet == "Milestone:Opened Issues"){
				callback(data.milestone.open_issues);
				return;
			}else if(whatToGet == "Milestone:Closed Issues"){
				callback(data.milestone.closed_issues);
				return;
			}else if(whatToGet == "Milestone:Created at"){
				callback(data.milestone.created_at);
				return;
			}else if(whatToGet == "Milestone:Updated at"){
				callback(data.milestone.updated_at);
				return;
			}else if(whatToGet == "Milestone:Closed at"){
				callback(data.milestone.closed_at);
				return;
			}else if(whatToGet == "Milestone:Due on"){
				callback(data.milestone.due_on);
				return;
			}else if(whatToGet == "Locked"){
				callback(data.locked);
				return;
			}else if(whatToGet == "Comment Count"){
				callback(data.comments);
				return;
			}else if(whatToGet == "Closed at"){
				callback(data.closed_at);
				return;
			}else if(whatToGet == "Created at"){
				callback(data.created_at);
				return;
			}else if(whatToGet == "Updated at"){
				callback(data.updated_at);
				return;
			}else if(whatToGet == "Closed by"){
				callback(data.closed_by.login);
				return;
			}else{
				callback("Error (Code 600): " + $_.errors.err600);
				return;
			}
		});
	}
	
	//Gists
	ext.getGist = function(id, type, callback){
		$.get($_.apiurl + "gists/" + id + $_.token + ext.config.apikey, function(data){
			if(type == "ID"){
				callback(data.id);
				return;
			}else if(type == "Info"){
				callback(data.description);
				return;
			}else if(type == "Public"){
				callback(data.public);
				return;
			}else if(type == "Owner"){
				callback(data.owner.login);
				return;
			}else if(type == "Comments Count"){
				callback(data.comments);
				return;
			}else if(type == "URL"){
				callback(data.html_url);
				return;
			}else if(type == "Created At"){
				callback(data.created_at);
				return;
			}else if(type == "Updated At"){
				callback(data.updated_at);
				return;
			}else{
				callback("Error (Code 600): " + $_.errors.err600);
				return;
			}
		});
	}
	
	var blocksMenusURL = {
		blocks: [
			['!', 'Get help!', '_help'],
			['R', 'AJAX Get: %s', '_ajax', ''],
			// TODO : Add a AJAX request block
			['-'],
			
			['!', 'Auth', '_'],
			[' ', 'GitHub API key: %s', 'setapikey', ''],
			['R', 'Requests remaining', 'rateLimit'],
			['-'],
			
			['!', 'Users', '_'],
			['R', 'Get %s %m.userData', 'getUser', '', 'Username'],
			['R', 'Your username', 'yourName'],
			['-'],
			
			['!', 'Issues and Pull Requests', '_'],
			['R', 'Get issue %n on %s by %s %m.issueData', 'getIssue', '1', 'GitHubExtension', 'Mrcomputer1Extensions' , 'ID'],
			['-'],
			
			['!', 'Gists', '_'],
			['R', 'Get gist %s %m.gistData', 'getGist', '', 'ID'],
		],
		menus: {
			userData: ["Username", "ID", "Avatar URL", "Gravatar ID", "Profile URL", "User Type", "Admin", "Name", "Company", "Website", "Location",
			"Email", "Bio", "Public Repo Count", "Public Gist Count", "Followers", "Following", "Created At", "Updated At"],
			
			issueData: ["Number", "ID", "URL", "State", "Title", "Body", "User", "Labels", "Assignee", "Milestone:URL", "Milestone:ID", "Milestone:State",
			"Milestone:Title", "Milestone:Info", "Milestone:Creator", "Milestone:Opened Issues", "Milestone:Closed Issues", "Milestone:Created at",
			"Milestone:Updated at", "Milestone:Closed at", "Milestone:Due on", "Locked", "Comment Count", "Closed at", "Created at", "Updated at",
			"Closed by"],
			
			gistData: ["ID", "Info", "Public", "Owner", "Comments Count", "URL", "Created At", "Updated At"],
		},
		url: 'http://mrcomputer1extensions.github.io/GitHubExtension/'
	};
	ScratchExtensions.register('GitHub Extension', blocksMenusURL, ext);
})({});
