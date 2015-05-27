var $content, $nav, $search, mainStructure;
function loadTree()
{
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", "/docs/index.json", true);
	xmlhttp.addEventListener("readystatechange", function()
	{
		if(xmlhttp.readyState == 4)
		{
			if(xmlhttp.status == 200)
			{
				mainStructure = JSON.parse(xmlhttp.responseText).structure;
				renderMenu();
			}
		}
	});
	xmlhttp.send(null);
}
function renderMenu()
{
	$nav.innerHTML = "";
	var renderStructure = function(structure, $ul)
	{
		var rtn = false;
		structure.forEach(function(element)
		{
			var $li = document.createElement("li");
			var $a = document.createElement("a");
			$a.href = "#" + element.file;
			$a.innerText = element.title;
			$li.appendChild($a);
			if(element.children)
			{
				$li.className += " parent";
				var $sub = document.createElement("ul");
				$li.appendChild($sub);
				if(renderStructure(element.children, $sub))
				{
					rtn = true;
				}
			}
			if(((element.title + element.file).toLowerCase().indexOf($search.value.toLowerCase()) > -1) || rtn)
			{
				rtn = true;
				$ul.appendChild($li);
			}
		});
		return rtn;
	};
	renderStructure(mainStructure, $nav);
}
function renderContent()
{
	$content.innerHTML = "";
	if(location.hash)
	{
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET", "/docs/" + location.hash.substr(1), true);
		xmlhttp.addEventListener("readystatechange", function()
		{
			if(xmlhttp.readyState == 4)
			{
				if(xmlhttp.status == 200)
				{
					$content.innerHTML = xmlhttp.responseText;
				}
			}
		});
		xmlhttp.send(null);
	}
	else
	{
		$content.innerHTML = "<h1>Страница не выбрана</h1>";
	}
}
window.addEventListener("load", function()
{
	$content = document.querySelector(".content");
	$nav = document.querySelector(".nav");
	$search = document.querySelector("input[type=search]");
	loadTree();
	renderContent();
	window.addEventListener("hashchange", renderContent);
	$search.addEventListener("keydown", renderMenu);
});