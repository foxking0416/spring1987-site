const DEF_BUILD_WORK_NAME = "工程階段";
const DEF_IMAGE_FILE_PATH = "../Image/"
const DEF_BUILD_CASE_IMAGE_PATH = DEF_IMAGE_FILE_PATH + "BuildCase/";
const DEF_BUILD_CASE_SHOW_IMAGE_PATH = "show/"
const DEF_BUILD_CASE_BUILD_IMAGE_PATH = "build"

const DEF_HOME_HTML_PATH = "../Home/"

const m_kBuildData = JSON.parse( localStorage["kData"] );

Initialize();
ConnectionButton();
ShowBuildInfo();
ShowMap();
ShowBanner();

function Initialize() {
	Initialize_ShowImageTool( m_kBuildData, DEF_BUILD_CASE_IMAGE_PATH, DEF_BUILD_CASE_BUILD_IMAGE_PATH )
}

function ConnectionButton() {
	$( window ).scroll( function() {
		if( IsWebPageBottom() ){
			if( GetCurrentDeviceState() == "pc" ){
				$( ".cGoToControlBox" ).css({ "bottom" : "calc( 100vw * 0.06 )", "transition" : "0.3s" } );
			}
			else{
				$( ".cGoToControlBox" ).css({ "bottom" : "calc( 100vw * 0.16 )", "transition" : "0.3s" } );
			}
		}
		else{
			$( ".cGoToControlBox" ).css({ "bottom" : "calc( 100vw * 0.03 )", "transition" : "0.3s" } );
		}
	});

	$( ".cGoToControlBox .cGoTop" ).click( function ( event ) {
        event.preventDefault();
		$('html , body').animate( { scrollTop : 0 } , 800);
	} );
	
	$( ".cGoToControlBox .cGoBottom" ).click( function ( event ) {
		event.preventDefault();
		const nPosition = $('.cFooterBox').offset().top;
		$('html , body').animate( { scrollTop : nPosition } , 800);
	} );
	
	$( ".cGoToControlBox .cGoBack" ).click( function ( event ) {
		event.preventDefault();
		if( m_kBuildData.nCurrentPosition == undefined || m_kBuildData.nCurrentPosition == null ){
			console.log( "Error : cGoBack" );
			GoToPage( DEF_HOME_HTML_PATH );
			return;
		}

		if (window.localStorage) {
			localStorage.nCurrentPosition = m_kBuildData.nCurrentPosition;
			localStorage.strCurrentBuildClassify = m_kBuildData.strCurrentBuildClassify;
			localStorage.strCurrentSubBuildClassify = m_kBuildData.strCurrentSubBuildClassify
			GoToPage( DEF_HOME_HTML_PATH );
		}
		else {
			alert("NOT SUPPORT");
		}
    } );
}


function ShowBuildInfo(){
	$( ".cBuildInfoBox .cTitle h1" ).text( m_kBuildData.Name );
	if(  m_kBuildData.Name.length > 30 ){
		$( ".cBuildInfoBox .cTitle h1" ).css( { "font-size" : "calc( 100vw * 0.020 )" } )
	}
	
	if( m_kBuildData.StartYear == DEF_BUILD_WORK_NAME ){
		$( ".cBuildInfoBox .cStartYear data" ).text(  m_kBuildData.StartYear );
	}
	else{
		$( ".cBuildInfoBox .cStartYear data" ).text(  "民國" + m_kBuildData.StartYear + "年" );
	}
	if( m_kBuildData.FinishYear == DEF_BUILD_WORK_NAME ){
		$( ".cBuildInfoBox .cFinishYear data" ).text(  m_kBuildData.FinishYear );
	}
	else{
		$( ".cBuildInfoBox .cFinishYear data" ).text(  "民國" + m_kBuildData.FinishYear + "年" );
	}
	
	$( ".cBuildInfoBox .cBoss data" ).text(  m_kBuildData.Owner );
	$( ".cBuildInfoBox .cDesign data" ).text( m_kBuildData.Design );
}

function ShowMap(){
	var strMapSrc = "<iframe id='mapposition' width={{mapWidth}} height={{mapHeight}} frameborder='0' scrolling='yes' marginheight='20' marginwidth='100' src='https://maps.google.com.tw/maps?f=q&hl=zh-TW&geocode=&q={{mapAddr}}&z={{mapScale}}&output=embed&t={{mapType}}'></iframe>";
	var strLocation= m_kBuildData.Map;
	var kType=['p','h'];

	var strMapData = strMapSrc.replace("{{mapAddr}}",strLocation)
                              .replace("{{mapWidth}}",'100%')
                              .replace("{{mapHeight}}",'100%')
                              .replace("{{mapType}}",kType[0])
                              .replace("{{mapScale}}",16);
    $( ".cMapBox .cMap" ).html( strMapData);
}

function ShowBanner(){
	const DEF_BANNER_SWITCH_TIMMER = 5000;
	var strBannerPath = "";
	var kBannerTextureUrlList = [ "0.jpg", "0.jpg", "0.jpg" ];
	var kShowBannerID = { pre : 0, main : 1, next : 2 };
	var nBannerMainID =  0;
	
	strBannerPath = DEF_BUILD_CASE_IMAGE_PATH + m_kBuildData.ImagePath + "/" +DEF_BUILD_CASE_SHOW_IMAGE_PATH;

	var kBannerDataList = [];
	if( m_kBuildData.Banner != undefined && m_kBuildData.Banner != "" ){
		kBannerDataList = m_kBuildData.Banner;
	}
	else{
		kBannerDataList.push( m_kBuildData.ShowImage );	
	}

	kBannerTextureUrlList = ProcessImageListByAbbreviation( kBannerDataList );

	if( kBannerTextureUrlList.length == 1 ){
		kBannerTextureUrlList.push( kBannerTextureUrlList[ 0 ] );
		kBannerTextureUrlList.push( kBannerTextureUrlList[ 0 ] );
	}

	CreatBanner( kShowBannerID, nBannerMainID, kBannerTextureUrlList, strBannerPath, DEF_BANNER_SWITCH_TIMMER );
}