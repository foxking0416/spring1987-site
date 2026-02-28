

	
	$( document ).ready(function() {
		var cw = $('.header').width();
		cw = cw * 0.3;
		$('.header').css({'height':cw+'px'});
	});

	//For switching banner 
	var banner=new Array();   
	var adNum=0;  
	var opacity = 1.0;
	var fadeOut = false;


	var projectList = new Array();
	var projectListPic = new Array();
	var positionCollection={};
	//preload information
	$.getJSON('project.json', function(data) {
		banner = data.Banner;
		preloadImages(banner);//preload banner image

		//Sort all the projects from start year
		var nonSortedProjectList = data.ProjectList;
		nonSortedProjectList.sort(function(a, b) {
			return parseFloat(b.startYear) - parseFloat(a.startYear);
		});

		projectList = nonSortedProjectList;//data.ProjectList;
		for(i = 0; i < projectList.length; i++){
			if(projectList[i].detail === 'True'){
				projectListPic[i] = new Image();
				projectListPic[i].src = projectList[i].image;
			}
			
			//Used longitude and latitude to locate the pointer
			var shiftX = 39903-332.74*projectList[i].longitude;
			var shiftY = 343.48*projectList[i].latitude - 8456.9; 

			positionCollection[projectList[i].linkPath]=[shiftX, shiftY, 900, 1170]; 
		}
		
		for(i = 0; i < projectList.length; i++){
			if(projectList[i].display === 'True'){
				var pageName = projectList[i].linkPath;

					$(".project_list").append('<div id= '+pageName+' class="divAutoAdd"><p>'+projectList[i].startYear+'年_'+projectList[i].name+'</p></div>');
					$('#' + pageName).prepend(projectListPic[i]);
					$('#' + pageName).click(function(){ 
						jumpToProjectPage( $(this).context.id );
					});

				
				$('#' + pageName).hover(function () {
					var projectId = $(this).context.id;
					$('.region_select').css('background-position', positionCollection[projectId][0] + 'px ' + positionCollection[projectId][1] + 'px');	
					$('.region_select').css('background-size', positionCollection[projectId][2] + 'px ' + positionCollection[projectId][3] + 'px');
					setTimeout(function(){ $(".region_select img").toggle("blind", {}, 50)}, 1500);
					//$(".region_select img").toggle("blind", {}, 500);
				}, function () {
					$('.region_select').css('background-position', 0 + 'px ' + 0 + 'px');
					$('.region_select').css('background-size', 300 + 'px ' + 390 + 'px');
					$(".region_select img").toggle("blind", {}, 10);
				});
			}
		}		
  });
	

	var init = true;
	function nextBanner(){
		if(init === true){
			init = false;
			$(".header img").attr("src", banner[0]);
		}
		$('.header img').load(function() {
				$('.header img').fadeTo(1000, 1);
				setTimeout(function() {
					$('.header img').fadeOut(1000, LoadImages);
				}, 10000);
		});
	}
	

	
	function LoadImages() {
		if(adNum<banner.length-1)
				adNum++ ;
			else 
				adNum=0;
		$(".header img").attr("src", banner[adNum]);
	}
	
	function preloadImages(array) {
    if (!preloadImages.list) {
        preloadImages.list = [];
    }
    var list = preloadImages.list;
    for (var i = 0; i < array.length; i++) {
        var img = new Image();
        img.onload = function() {
            var index = list.indexOf(this);
            if (index !== -1) {
                // remove image from the array once it's loaded
                // for memory consumption reasons
                list.splice(index, 1);
            }
        }
        list.push(img);
        img.src = array[i];
    }
}
	
	
	function jumpToProjectPage(pg) {
		sessionStorage.setItem('projectIndex', pg);
		window.open('projectInfo.html', '_blank');
		sessionStorage.setItem('session', 'project');
  };
 
 	function jumpFromProjectToOther(destination){
		sessionStorage.setItem('session', destination);
		window.location.href='home.html';
	};
	
	function detectBrowser(){
		var sAgent = navigator.userAgent.toLowerCase();
		this.isIE = (sAgent.indexOf("msie")!=-1); //IE6.0-7
		this.isFF = (sAgent.indexOf("firefox")!=-1);//firefox
		this.isSa = (sAgent.indexOf("safari")!=-1);//safari
		this.isOp = (sAgent.indexOf("opera")!=-1);//opera
		this.isNN = (sAgent.indexOf("netscape")!=-1);//netscape
		this.isCh = (sAgent.indexOf("chrome")!=-1);//chrome
		this.isMa = this.isIE;//marthon
		this.isOther = (!this.isIE && !this.isFF && !this.isSa && !this.isOp && !this.isNN && !this.isSa);//unknown Browser
	};
	
	function valueExistence(list, value) {
		for (var i = 0; i < list.length; i++) {
			if (list[i] === value) {
				return true;
			}
		}
		return false;
	};
	
	function resortProjects(subClassSelectedValue){
		switch (subClassSelectedValue){
			case "101"://依年份_由近往前
				for(i = 0; i < projectList.length; i++){
					if(projectList[i].display === 'True'){
						createAutoDiv(i);
					}
				}
			break;
			case "102"://依年份_由前往近
				for(i = projectList.length-1; i >= 0; i--){
					if(projectList[i].display === 'True'){
						createAutoDiv(i);
					}
				}
			break;
			case "201"://依金額_
				for(i = 0; i < projectList.length; i++){
					if(projectList[i].display === 'True'){
						createAutoDiv(i);
					}
				}
			break;
			case "202"://依金額_1000萬以下
				for(i = 0; i < projectList.length; i++){
					if(projectList[i].display === 'True' && projectList[i].amount < 1000){
						createAutoDiv(i);
					}
				}
			break;
			case "203"://依金額_1000萬~2500萬
				for(i = 0; i < projectList.length; i++){
					if(projectList[i].display === 'True' && projectList[i].amount >= 1000 && projectList[i].amount < 2500){
						createAutoDiv(i);
					}
				}
			break;
			case "204"://依金額_2500萬~5000萬
				for(i = 0; i < projectList.length; i++){
					if(projectList[i].display === 'True' && projectList[i].amount >= 2500 && projectList[i].amount < 5000){
						createAutoDiv(i);
					}
				}
			break;
			case "205"://依金額_5000萬~1億
				for(i = 0; i < projectList.length; i++){
					if(projectList[i].display === 'True' && projectList[i].amount >= 5000 && projectList[i].amount < 10000){
						createAutoDiv(i);
					}
				}
			break;		
			case "206"://依金額_1億以上
				for(i = 0; i < projectList.length; i++){
					if(projectList[i].display === 'True' && projectList[i].amount >= 10000){
						createAutoDiv(i);
					}
				}
			break;					
			case "301"://依類型_全部
				for(i = 0; i < projectList.length; i++){
					if(projectList[i].display === 'True' ){
						createAutoDiv(i);
					}
				}
			break;
			case "302"://依類型_建築
				for(i = 0; i < projectList.length; i++){
					if(projectList[i].display === 'True' && valueExistence( projectList[i].type, 1 )){
						createAutoDiv(i);
					}
				}
			break;
			case "303"://依類型_景觀
				for(i = 0; i < projectList.length; i++){
					if(projectList[i].display === 'True' && valueExistence( projectList[i].type, 2 )){
						createAutoDiv(i);
					}
				}
			break;
			case "304"://依類型_裝修
				for(i = 0; i < projectList.length; i++){
					if(projectList[i].display === 'True' && valueExistence( projectList[i].type, 3 )){
						createAutoDiv(i);
					}
				}
			break;
			case "305"://依類型_廠房
				for(i = 0; i < projectList.length; i++){
					if(projectList[i].display === 'True' && valueExistence( projectList[i].type, 4 )){
						createAutoDiv(i);
					}
				}
			break;
			case "306"://依類型_土木
				for(i = 0; i < projectList.length; i++){
					if(projectList[i].display === 'True' && valueExistence( projectList[i].type, 5 )){
						createAutoDiv(i);
					}
				}
			break;
			case "307"://依類型_運動設施
				for(i = 0; i < projectList.length; i++){
					if(projectList[i].display === 'True' && valueExistence( projectList[i].type, 6 )){
						createAutoDiv(i);
					}
				}
			break;
			case "308"://依類型_木造
				for(i = 0; i < projectList.length; i++){
					if(projectList[i].display === 'True' && valueExistence( projectList[i].type, 7 )){
						createAutoDiv(i);
					}
				}
			break;
			case "309"://依類型_廟宇建築
				for(i = 0; i < projectList.length; i++){
					if(projectList[i].display === 'True' && valueExistence( projectList[i].type, 8 )){
						createAutoDiv(i);
					}
				}
			break;
			case "310"://依類型_古蹟修復
				for(i = 0; i < projectList.length; i++){
					if(projectList[i].display === 'True' && valueExistence( projectList[i].type, 9 )){
						createAutoDiv(i);
					}
				}
			break;
			case "311"://依類型_綠建築
				for(i = 0; i < projectList.length; i++){
					if(projectList[i].display === 'True' && valueExistence( projectList[i].type, 10 )){
						createAutoDiv(i);
					}
				}
			break;
			case "401"://依地區_全部
				for(i = 0; i < projectList.length; i++){
					if(projectList[i].display === 'True'){
						createAutoDiv(i);
					}
				}
			break;
			case "402"://依地區_台北
				for(i = 0; i < projectList.length; i++){
					if(projectList[i].display === 'True' && projectList[i].region === '台北'){
						createAutoDiv(i);
					}
				}
			break;
			case "403"://依地區_苗栗
				for(i = 0; i < projectList.length; i++){
					if(projectList[i].display === 'True' && projectList[i].region === '苗栗'){
						createAutoDiv(i);
					}
				}
			break;
			case "404"://依地區_南投
				for(i = 0; i < projectList.length; i++){
					if(projectList[i].display === 'True' && projectList[i].region === '南投'){
						createAutoDiv(i);
					}
				}
			break;
			case "405"://依地區_雲林
				for(i = 0; i < projectList.length; i++){
					if(projectList[i].display === 'True' && projectList[i].region === '雲林'){
						createAutoDiv(i);
					}
				}
			break;
			case "406"://依地區_嘉義
				for(i = 0; i < projectList.length; i++){
					if(projectList[i].display === 'True' && projectList[i].region === '嘉義'){
						createAutoDiv(i);
					}
				}
			break;
			case "407"://依地區_台南
				for(i = 0; i < projectList.length; i++){
					if(projectList[i].display === 'True' && projectList[i].region === '台南'){
						createAutoDiv(i);
					}
				}
			break;
			case "408"://依地區_高雄
				for(i = 0; i < projectList.length; i++){
					if(projectList[i].display === 'True' && projectList[i].region === '高雄'){
						createAutoDiv(i);
					}
				}
			break;
			case "409"://依地區_屏東
				for(i = 0; i < projectList.length; i++){
					if(projectList[i].display === 'True' && projectList[i].region === '屏東'){
						createAutoDiv(i);
					}
				}
			break;
			case "410"://依地區_台東
				for(i = 0; i < projectList.length; i++){
					if(projectList[i].display === 'True' && projectList[i].region === '台東'){
						createAutoDiv(i);
					}
				}
			break;
			case "411"://依地區_澎湖
				for(i = 0; i < projectList.length; i++){
					if(projectList[i].display === 'True' && projectList[i].region === '澎湖'){
						createAutoDiv(i);
					}
				}
			break;
			case "501"://重點工程
				for(i = 0; i < projectList.length; i++){
					if(projectList[i].display === 'True' && projectList[i].important === 'high'){
						createAutoDiv(i);
					}
				}
			break;
		}
	};
	
	function createAutoDiv(i){
		var pageName = projectList[i].linkPath;

		$(".project_list").append('<div id= '+pageName+' class="divAutoAdd"><p>'+projectList[i].startYear+'年_'+projectList[i].name+'</p></div>');
		$('#' + pageName).prepend(projectListPic[i]);
		$('#' + pageName).click(function(){ 
			jumpToProjectPage( $(this).context.id );
		});


		$('#' + pageName).hover(function () {
			var projectId = $(this).context.id;
			$('.region_select').css('background-position', positionCollection[projectId][0] + 'px ' + positionCollection[projectId][1] + 'px');	
			$('.region_select').css('background-size', positionCollection[projectId][2] + 'px ' + positionCollection[projectId][3] + 'px');
			setTimeout(function(){ $(".region_select img").toggle("blind", {}, 50)}, 1500);
		}, function () {
			$('.region_select').css('background-position', 0 + 'px ' + 0 + 'px');
			$('.region_select').css('background-size', 300 + 'px ' + 390 + 'px');
			$(".region_select img").toggle("blind", {}, 10);
		});
	};
	
	function loadBikeShelfImage(){
		for(var i = 1; i <= 56; i++){
			$('#bikeShelf').append('<a class="fancybox" rel="galleryBikeShelf" href="spring/images/share/bikeshelf/bikeshelf'+i+'.jpg"><img src="spring/images/share/bikeshelf/bikeshelf'+i+'.jpg"></a>');
		}
		bikeShelfImageLoaded = true;
	};
	
	function loadUrinalImage(){
		for(var i = 1; i <= 6; i++){
			$('#urinal').append('<a class="fancybox" rel="galleryUrinal" href="spring/images/share/urinal/urinal'+i+'.jpg"><img src="spring/images/share/urinal/urinal'+i+'.jpg"></a>');
		}
		urinalImageLoaded = true;
	};
	
	function loadSinkImage(){
		for(var i = 1; i <= 17; i++){
			$('#sink').append('<a class="fancybox" rel="gallerySink" href="spring/images/share/sink/sink'+i+'.jpg"><img src="spring/images/share/sink/sink'+i+'.jpg"></a>');
		}
		sinkImageLoaded = true;
	};
	
	
