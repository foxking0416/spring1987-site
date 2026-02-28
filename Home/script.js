const DEF_BUILD_WORK_NAME = "工程階段";
const DEF_BUILD_CASE_HTML_PATH = "../BuildCase/"
const DEF_ABOUT_HTML_PATH = "../About/"

const DEF_IMAGE_FILE_PATH = "../Image/"
const DEF_BANNER_PATH = DEF_IMAGE_FILE_PATH + "Home/Banner";
const DEF_BUILD_CASE_PATH = DEF_IMAGE_FILE_PATH + "BuildCase/";

const DEF_DATABASE_PATH = "../Database/";
const DEF_DATABASE_HOME_PATH = DEF_DATABASE_PATH + "Home.json";
const DEF_DATABASE_PROJECT_PATH = DEF_DATABASE_PATH + "Project.json";

const DEF_BUILD_CASE_BIOLD_TYPE_10_1_ICON = DEF_IMAGE_FILE_PATH + "Icon/BuildCaseSystem/BuildType/10_1.png"

const DEF_ALL = "all";
const DEF_SHOW_FOLDER_NAME = "show";

const DEF_URL_KEY = "Info";
const DEF_URL_VAULE_BUILD_CASE = "BuildCase";

const DEF_SPR_GREEN_1_COLOR = "#008a3a";

//---- Banner Variable Start-----
const m_BannerDataList = [];
const DEF_BANNER_SWITCH_TIMMER = 5000;
const DEF_BANNER_SWITCH_SPEED = 1000;
//-> Banner
const m_strBannerPath = DEF_BANNER_PATH + "/"
var m_kBannerTextureUrlList = [ "0.jpg", "1.jpg", "2.jpg" ];
var m_kShowBannerID = { pre : 0, main : 1, next : 2 };
var m_nBannerMainID =  0;
var m_BannerTimeout = setTimeout( NextBanner, DEF_BANNER_SWITCH_TIMMER );
//-> Info
var m_kInfoBannerTextList = [ "AAA | 2000", "BBB | 2010", "CCC | 2020" ];
var m_kShowInfoBannerID = { pre : 0, main : 1, next : 2 };
var m_nInfoBannerMainID =  0;
var m_InfoBannerTimeout = setTimeout( NextInfoBanner, DEF_BANNER_SWITCH_TIMMER );
//---- Banner Variable End -----

const eBuildClassifyEnum = {
  Type:      "Type",
  Position:  "Position",
  StartYear: "StartYear",
  Price:     "Price",
  Wonderful: "Wonderful",
};

const eSubBuildTypeEnum = {
  Build:        "build",
  Landscape:    "landscape",
  Decoration:   "decoration",
  Plant:        "plant",
  Cement:       "cement",
  Sport:        "sport",
  Wood:         "wood",
  Temple:       "temple",
  HistoricSite: "historicSite",
  Greenbuild:   "greenbuild",
  All:          "all",
};

const eSubBuildPositionEnum = {
  Taipei:       "台北",
  Taoyuan:      "桃園",
  Hsinchu:      "新竹",
  Miaoli:       "苗栗",
  Taichung:     "台中",
  Changhua:     "彰化",
  Nantou:       "南投",
  Yunlin:       "雲林",
  Chiayi:       "嘉義",
  Tainan:       "台南",
  Kaohsiung:    "高雄",
  Pingtung:     "屏東",
  Yilan:        "宜蘭",
  Hualien:      "花蓮",
  Taitung:      "台東",
  Penghu:       "澎湖",
  LittleRyukyu: "小琉球",
  Kinmen:       "金門",
  Mazu:         "馬祖",
  Lanyu:        "蘭嶼",
  GreenIsland:  "綠島",
  All:          "all",
};

const eSubBuildStartYearEnum = {
  NearToFar:  "NearToFar",
  FarToNear:  "FarToNear",
};

const eSubBuildPriceEnum = {
  Lower500:   500,
  Lower1000:  1000,
  Lower2500:  2500,
  Lower5000:  5000,
  Lower10000: 10000,
  All:          "all",
};

const eSubBuildWonderfulEnum = {
  Yes: "yes",
  No:  "no",
};

const m_kBuildClassifySubSelectRegister = {
  Type:      eSubBuildTypeEnum.All,
  Position:  eSubBuildPositionEnum.All,
  StartYear: eSubBuildStartYearEnum.NearToFar,
  Price:     eSubBuildPriceEnum.All,
  Wonderful: eSubBuildWonderfulEnum.Yes,
};

const eMainPositionEnum = {
	North: "北部地區",
	Central: "中部地區",
	South: "南部地區",
	East: "東部地區",
	Island: "外島地區",
	All: "全部"
}

const eChangePageState = {
	strDoing : "Doing",
	strFinish: "Finish"
}

var m_strCurrentChangePageState = "";

let m_kBuild_TypeMap = new Map();
let m_kBuild_PositionMap = new Map();
let m_kBuild_StartYearMap = new Map();
let m_kBuild_PriceMap = new Map();
let m_kBuild_WonderfulMap = new Map();
let m_kBuild_YearSortMap = new Map();

let m_PageDataMap = new Map();

var m_strCurrentBuildClassify = "";
var m_strCurrentSubBuildClassify = "";

var m_strTempMainPosition = "";
var m_nCurrentPage = 0;
const m_kDefaultMainPosition2SubAreaMap = new Map();
var m_strCurrentDevice = "";

const m_eDeviceStete = {
	pc : "pc",
	pad : "pad"
}

const m_BuildCaseAttr = {
	SystemHeight: 0,
	SystemMaxTop: 0,
	SystemMarginTop:0,
	BoxTop: 0,
	BoxTitleHeight: 0,
	BoxHeight: 0,
	OnePageScrollHeight: 0.0,
	PagePositionMap: new Map()
}

const eventReadFileFinish = new Event('readFileFinish');

Initialize();
ConnectionButton();

function Initialize() {
	UpdateCurrentDeviceData( false );
	
	m_strCurrentChangePageState = eChangePageState.strFinish;

	SetMainSearchButtonUnSelectCss();
	if( localStorage["strCurrentBuildClassify"] != undefined && localStorage["strCurrentBuildClassify"] != null && localStorage["strCurrentBuildClassify"] != "null" ){
		m_strCurrentBuildClassify = localStorage["strCurrentBuildClassify"];
		m_strCurrentSubBuildClassify = localStorage["strCurrentSubBuildClassify"];
		localStorage.strCurrentBuildClassify = null;
		localStorage.strCurrentSubBuildClassify = null;

		switch( m_strCurrentBuildClassify ){
			case eBuildClassifyEnum.Type :
				m_kBuildClassifySubSelectRegister.Type = m_strCurrentSubBuildClassify;
				$( ".cBuildCaseBox .cMainSearchBox .cBuildTypeButton" ).css( { "background-color" : DEF_SPR_GREEN_1_COLOR, "color" : "#fff" } );
				$( ".cBuildCaseBox .cSubSearchBox_BuildType" ).css( { "display" : "flex" } );
				break;
			case eBuildClassifyEnum.Position :
				m_kBuildClassifySubSelectRegister.Position = m_strCurrentSubBuildClassify;
				$( ".cBuildCaseBox .cMainSearchBox .cAreaButton" ).css( { "background-color" : DEF_SPR_GREEN_1_COLOR, "color" : "#fff" } );
				$( ".cBuildCaseBox .cSubSearchBox_Area" ).css( { "display" : "flex" } );
				break;
			case eBuildClassifyEnum.StartYear :
				m_kBuildClassifySubSelectRegister.StartYear = m_strCurrentSubBuildClassify;
				$( ".cBuildCaseBox .cMainSearchBox .cTimeButton" ).css( { "background-color" : DEF_SPR_GREEN_1_COLOR, "color" : "#fff" } );
				$( ".cBuildCaseBox .cSubSearchBox_Time" ).css( { "display" : "flex" } );
				break;
			case eBuildClassifyEnum.Price :
				m_kBuildClassifySubSelectRegister.Price = m_strCurrentSubBuildClassify;
				$( ".cBuildCaseBox .cMainSearchBox .cMoneyButton" ).css( { "background-color" : DEF_SPR_GREEN_1_COLOR, "color" : "#fff" } );
				$( ".cBuildCaseBox .cSubSearchBox_Money" ).css( { "display" : "flex" } );
				break;
			case eBuildClassifyEnum.Wonderful :
				m_kBuildClassifySubSelectRegister.Wonderful = m_strCurrentSubBuildClassify;
				$( ".cBuildCaseBox .cMainSearchBox .cWonderfulButton" ).css( { "background-color" : DEF_SPR_GREEN_1_COLOR, "color" : "#fff" } );
				$( ".cBuildCaseBox .cSubSearchBox_Wonderful" ).css( { "display" : "flex" } );
				break;
			default:
				Assert( false, "Error : 錯誤的 CurrentBuildClassify" )
				return false;
		}
	}
	else{
		m_strCurrentBuildClassify = eBuildClassifyEnum.Wonderful;
		m_strCurrentSubBuildClassify = m_kBuildClassifySubSelectRegister.Wonderful;
		$( ".cBuildCaseBox .cMainSearchBox .cWonderfulButton" ).css( { "background-color" : DEF_SPR_GREEN_1_COLOR, "color" : "#fff" } );
		//$( ".cBuildCaseBox .cSubSearchBox_BuildType" ).css( { "display" : "flex" } );
	}

	m_kDefaultMainPosition2SubAreaMap.set( eMainPositionEnum.North, eSubBuildPositionEnum.Taipei );
	m_kDefaultMainPosition2SubAreaMap.set( eMainPositionEnum.Central, eSubBuildPositionEnum.Taichung );
	m_kDefaultMainPosition2SubAreaMap.set( eMainPositionEnum.South, eSubBuildPositionEnum.Kaohsiung );
	m_kDefaultMainPosition2SubAreaMap.set( eMainPositionEnum.East, eSubBuildPositionEnum.Yilan );
	m_kDefaultMainPosition2SubAreaMap.set( eMainPositionEnum.Island, eSubBuildPositionEnum.Penghu );
	m_kDefaultMainPosition2SubAreaMap.set( eMainPositionEnum.All, eSubBuildPositionEnum.All );

	$("select[ name='MainSearch_Phone' ]").val( "BuildType" )
	$("select[ name='SubSearchBox_Area' ]").val( eSubBuildPositionEnum.All )

	InitializeBuildTypeBox();
	InitializeAreaBox();
	InitializeTimeBox();
	InitializePriceBox();
	InitializeWonderfulBox(); // 目前無作用

	GetBannerData();
	GetAllBuildData();
	GetBuildCaseAttr();
	GoToBuildCase();
	document.addEventListener( 'readFileFinish',  function (e) { 
		
		if( localStorage["nCurrentPosition"] != undefined && localStorage["nCurrentPosition"] != null ){
			const nCurrentPosition = localStorage["nCurrentPosition"];
			if( IsNumber( nCurrentPosition ) ){
				$('html , body').animate( { scrollTop : nCurrentPosition } , 0);
			}
		}
		localStorage.nCurrentPosition = undefined;
		eventReadFileFinish.stopPropagation();
	}, false );
}
function GoToBuildCase(){
	kUrlDataMap = new Map;
	GetUrlInfo( kUrlDataMap );
	if( kUrlDataMap.has( DEF_URL_KEY ) ){
		const strInfo = kUrlDataMap.get( DEF_URL_KEY );
		if( strInfo == DEF_URL_VAULE_BUILD_CASE ){
			const nPosition = $('.cBuildCaseBox').offset().top;
			$('html , body').animate( { scrollTop : nPosition } , 800);
		}
	}
}

function InitializeBuildTypeBox(){
	const kSubButtonList = $( ".cSubSearchBox_BuildType .cSubButtonBase" );
	for( let i = 0; i < kSubButtonList.length; i++ ){
		if( $( kSubButtonList[ i ] ).find( "data" ).text() == m_kBuildClassifySubSelectRegister.Type ){
			SetSubBuildButtonSelectCss( kSubButtonList[ i ] );
			break;
		}
	}
}

function InitializeAreaBox(){
	if( m_kBuildClassifySubSelectRegister.Position == DEF_ALL ){
		$( ".cSubSearchBox_Area .cAll_Button .cArea_Button" ).css( { "border-bottom-color" : DEF_SPR_GREEN_1_COLOR } );
		return;
	}

	const kSubButtonList = $( ".cSubSearchBox_Area .cAreaBase" );
	for( let i = 0; i < kSubButtonList.length; i++ ){
		if( $( kSubButtonList[ i ] ).find( "data" ).text() == m_kBuildClassifySubSelectRegister.Position ){
			SetSubAreaButtonSelectCss( kSubButtonList[ i ] );
			break;
		}
	}
}

function InitializeTimeBox(){
	if( m_kBuildClassifySubSelectRegister.StartYear == eSubBuildStartYearEnum.NearToFar ){
		ChangeImageUrl( $( ".cSubSearchBox_Time .cNearToFar_Button" ).find( ".cImage" ), "1.svg","0.svg" );
	}
	else{
		ChangeImageUrl( $( ".cSubSearchBox_Time .cFarToNear_Button" ).find( ".cImage" ), "1.svg","0.svg" );
	}
}

function InitializePriceBox(){
	if( m_kBuildClassifySubSelectRegister.Price == DEF_ALL ){
		 ChangeImageUrl( $( ".cSubSearchBox_Money .cAll_Button" ).find( ".cImage" ), "1.svg","0.svg" );
		return;
	}

	const kSubButtonList = $( ".cSubSearchBox_Money .cSubButtonBase" );
	for( let i = 0; i < kSubButtonList.length; i++ ){
		if( parseInt( $( kSubButtonList[ i ] ).find( "data" ).text() ) == m_kBuildClassifySubSelectRegister.Price ){
			ChangeImageUrl( $( kSubButtonList[ i ] ).find( ".cImage" ), "1.svg","0.svg" );
			break;
		}
	}
}

function InitializeWonderfulBox(){
	ChangeImageUrl( $(".cSubSearchBox_Wonderful .cWonderful_Button" ).find( ".cImage" ), "1.svg","0.svg" );
}

function UpdateCurrentDeviceData( bShowBuildData = true ){
	const nWindowWidth = $(window).width();
	
	let strOldDevice = m_strCurrentDevice;
	if( nWindowWidth > 1040 ){
		m_strCurrentDevice = m_eDeviceStete.pc;
	}
	else{
		m_strCurrentDevice = m_eDeviceStete.pad;	
	}

	if( strOldDevice == m_eDeviceStete.pc && m_strCurrentDevice == m_eDeviceStete.pad ){
		$( ".cBuildCaseSystem" ).css( { "top" : m_BuildCaseAttr.SystemMarginTop } );
		if( m_strCurrentBuildClassify == eBuildClassifyEnum.Position ){
			$( ".cBuildCaseBox .cSubSearchBox_Area" ).css( { "display" : "none" } )
			$( ".cBuildCaseBox .cSubSearchBox_Phone_Area" ).css( { "display" : "flex" } )
		}
	}
	else if( strOldDevice == m_eDeviceStete.pad && m_strCurrentDevice == m_eDeviceStete.pc ){
		if( m_strCurrentBuildClassify == eBuildClassifyEnum.Position ){
			$( ".cBuildCaseBox .cSubSearchBox_Area" ).css( { "display" : "flex" } )
			$( ".cBuildCaseBox .cSubSearchBox_Phone_Area" ).css( { "display" : "none" } )
		}
	}

	if( bShowBuildData && m_strCurrentDevice != strOldDevice ){
		ShowBuildData();
	}
}

function GetBuildCaseAttr(){
	m_BuildCaseAttr.SystemHeight = $(".cBuildCaseSystem").height();
	m_BuildCaseAttr.BoxTop = $(".cBuildCaseBox").offset().top;
	m_BuildCaseAttr.BoxTitleHeight = $(".cBuildCaseBox .cTitle").height(); 
	m_BuildCaseAttr.SystemMaxTop = m_BuildCaseAttr.BoxTop + m_BuildCaseAttr.BoxTitleHeight;
	m_BuildCaseAttr.SystemMarginTop = $(window).width() * 0.06;
	m_BuildCaseAttr.BoxHeight = $(".cBuildCaseBox").height();
}

function ConnectionButton() {
	function ProcessBuildCaseSystemPositioning( nBodyTop ){
		// LowPosition
		const nBuildCaseSystemHeight = m_BuildCaseAttr.SystemHeight;
		const nFooterTop = $(".cFooterBox").offset().top;
		const nFooterMarginTop = $(window).width() * 0.038;

		// MaxPosition
		const nBuildCaseBoxTop = m_BuildCaseAttr.BoxTop;
		const nBuildCaseBoxTitleHeight = m_BuildCaseAttr.BoxTitleHeight;
		const nBuildCaseSystemMaxTop = m_BuildCaseAttr.SystemMaxTop;
		const nBuildCaseSystemMarginTop = m_BuildCaseAttr.SystemMarginTop;

		const nTopBarHeight = $(".cPageBody .cTopBox .cTopBar").height();
		if( nBodyTop + nTopBarHeight > nBuildCaseSystemMaxTop  && nBodyTop + nBuildCaseSystemHeight < nFooterTop - nFooterMarginTop ){
			//const nCurrentTop = ( nBodyTop + nTopBarHeight ) - nBuildCaseSystemMaxTop + nBuildCaseSystemMarginTop;
			$( ".cBuildCaseSystem" ).css( { "position" : "fixed" } );
			$( ".cBuildCaseSystem" ).css( { "top" : nTopBarHeight } );
			nNextPage = GetBuildCasePage( nBodyTop );
			SwitchBuildCasePage( nNextPage, m_nCurrentPage );
		} 
		else if( nBodyTop + nTopBarHeight < nBuildCaseSystemMaxTop ){
			$( ".cBuildCaseSystem" ).css( { "position" : "absolute" } );
			$( ".cBuildCaseSystem" ).css( { "top" : nBuildCaseSystemMarginTop } );
		}
		else if( nBodyTop + nBuildCaseSystemHeight > nFooterTop - nFooterMarginTop ){
			const nOffset =  ( nFooterTop - nFooterMarginTop - nBuildCaseSystemHeight ) - nBuildCaseBoxTop;
			$( ".cBuildCaseSystem" ).css( { "position" : "absolute" } );
			$( ".cBuildCaseSystem" ).css( { "top" : nOffset } );
		}
	}
	function GetBuildCasePage( nBodyTop ){
		nPagePosition = nBodyTop - ( m_BuildCaseAttr.BoxTop + m_BuildCaseAttr.BoxTitleHeight + m_BuildCaseAttr.SystemMarginTop );
		nPage = Math.abs( Math.ceil( nPagePosition / m_BuildCaseAttr.OnePageScrollHeight ) ) + 1;
		if( m_PageDataMap.has( nPage - 1 ) ){
			$( ".cPageControlBox .cPageBox .cPageBase" ).css( { "background-color" : "#fff", "color" : DEF_SPR_GREEN_1_COLOR } )
			$( ".cPageControlBox .cPageBox .cPage" + nPage.toString()  ).css( { "background-color" : DEF_SPR_GREEN_1_COLOR, "color" : "#fff" } );
		}
		return nPage;
	}

	$( window ).scroll( function() {
		var nBodyTop = window.pageYOffset;
		if( m_strCurrentDevice == m_eDeviceStete.pc ){
			ProcessBuildCaseSystemPositioning( nBodyTop );
		}
	});

	$( window ).resize(function() {
		GetBuildCaseAttr();
		ProcessPagePositionForScroll();
		UpdateCurrentDeviceData();
	});

	// -- BuildType SubButton --
	$( ".cSubSearchBox_BuildType .cSubButtonBase" ).click( function ( event ) {
        event.preventDefault();
        const kSubButtonList = $( ".cSubSearchBox_BuildType .cSubButtonBase" );
        for( let i = 0; i < kSubButtonList.length; i++ ){
        	SetSubBuildButtonUnSelectCss( kSubButtonList[ i ] )
        }
        SetSubBuildButtonSelectCss( this );
        m_kBuildClassifySubSelectRegister.Type = $( this ).find( "data" ).text();
        m_strCurrentSubBuildClassify = m_kBuildClassifySubSelectRegister.Type;
        ShowBuildData();
    } );

	$(".cSubSearchBox_BuildType .cSubButtonBase").mouseover(function(){
		 SetSubBuildButtonSelectCss( this );
	});

	$(".cSubSearchBox_BuildType .cSubButtonBase").mouseout(function(){
		const kButtonName = $( this ).find( "data" ).text();
		if( kButtonName == m_strCurrentSubBuildClassify ){
			return;
		}
		SetSubBuildButtonUnSelectCss( this );
	});

	// -- Area( Position ) SubButton --
	$( ".cSubSearchBox_Area .cAreaBase" ).click( function ( event ) {
        event.preventDefault();
        $( ".cSubSearchBox_Area .cAreaBase" ).css( { "color" : "black" } );
		$( ".cSubSearchBox_Area .cArea_Button" ).css( { "border-bottom-color" : "rgba(0,0,0,0)" } );
        SetSubAreaButtonSelectCss( this );
        m_strTempMainPosition = $( this ).parent().parent().find( ".cArea_Button data" ).text();
        m_kBuildClassifySubSelectRegister.Position = $( this ).find( "data" ).text();
        m_strCurrentSubBuildClassify = m_kBuildClassifySubSelectRegister.Position;
        ShowBuildData();
    } );

    $(".cSubSearchBox_Area .cAreaBase").mouseover(function(){
		 SetSubAreaButtonSelectCss( this );
	});

	$(".cSubSearchBox_Area .cAreaBase").mouseout(function(){
		const kButtonName = $( this ).find( "data" ).text();
		if( kButtonName == m_strCurrentSubBuildClassify ){
			return;
		}
		SetSubAreaButtonUnSelectCss( this );
		if( $( this ).parent().parent().find( ".cArea_Button data" ).text() == m_strTempMainPosition ){
			$( this ).parent().parent().find( ".cArea_Button" ).css( { "border-bottom-color" : DEF_SPR_GREEN_1_COLOR } );
		}
	});

	$( ".cSubSearchBox_Area .cArea_Button" ).click( function ( event ) {
        event.preventDefault();
        $( ".cSubSearchBox_Area .cAreaBase" ).css( { "color" : "black" } );
		$( ".cSubSearchBox_Area .cArea_Button" ).css( { "border-bottom-color" : "rgba(0,0,0,0)" } );
		$( this ).css( { "border-bottom-color" : DEF_SPR_GREEN_1_COLOR } );
		const strAreaName = $( this ).find( "data" ).text();
		const strSubAreaName = m_kDefaultMainPosition2SubAreaMap.get( strAreaName );
		const kAreaBaseList = $( this ).parent().find( ".cAreaBase" )
		for ( let i = 0; i < kAreaBaseList.length; i++ ) {
			const strSubAreaTempName = $( kAreaBaseList[i] ).find( "data" ).text();
			if( strSubAreaTempName == strSubAreaName ) {
				$( kAreaBaseList[i] ).css( { "color" : DEF_SPR_GREEN_1_COLOR } );
			}
		}
        m_kBuildClassifySubSelectRegister.Position = strSubAreaName;
        m_strCurrentSubBuildClassify = m_kBuildClassifySubSelectRegister.Position;
        ShowBuildData();
    } );

    // -- StartYearButton --
    

    $( ".cSubSearchBox_Time .cNearToFar_Button" ).click( function ( event ) {
        event.preventDefault();
        
        ChangeImageUrl( $( ".cSubSearchBox_Time .cFarToNear_Button" ).find( ".cImage" ), "0.svg","1.svg" );
        ChangeImageUrl( $( this ).find( ".cImage" ), "1.svg","0.svg" );

        
        m_kBuildClassifySubSelectRegister.StartYear = $( this ).find( "data" ).text();
        m_strCurrentSubBuildClassify = m_kBuildClassifySubSelectRegister.StartYear;
        ShowBuildData();
    } );

    $( ".cSubSearchBox_Time .cFarToNear_Button" ).click( function ( event ) {
        event.preventDefault();
        function ChangeImageUrl( kImage, strNewImage, strOldImage ){
        	 var strBackgroundImageUrl = $( kImage ).css( "background-image" );
	        strBackgroundImageUrl = strBackgroundImageUrl.replace( strOldImage, strNewImage );
			$( kImage ).css( { "background-image" : strBackgroundImageUrl } );
        }
        ChangeImageUrl( $( ".cSubSearchBox_Time .cNearToFar_Button" ).find( ".cImage" ), "0.svg","1.svg" );
        ChangeImageUrl( $( this ).find( ".cImage" ), "1.svg","0.svg" );

        
        m_kBuildClassifySubSelectRegister.StartYear = $( this ).find( "data" ).text();
        m_strCurrentSubBuildClassify = m_kBuildClassifySubSelectRegister.StartYear;
        ShowBuildData();
    } );

    $(".cSubSearchBox_Time .cFarToNear_Button, .cNearToFar_Button").mouseover(function(){
		 ChangeImageUrl( $( this ).find( ".cImage" ), "1.svg","0.svg" );
	});

	$(".cSubSearchBox_Time .cFarToNear_Button, .cNearToFar_Button").mouseout(function(){
		const kButtonName = $( this ).find( "data" ).text();
		if( kButtonName == m_strCurrentSubBuildClassify ){
			return;
		}
		ChangeImageUrl( $( this ).find( ".cImage" ), "0.svg","1.svg" );
	});

	//-- PriceButton --
	$( ".cSubSearchBox_Money .cSubButtonBase" ).click( function ( event ) {
        event.preventDefault();
        
        const kImageList = $( ".cSubSearchBox_Money" ).find( ".cImage" );
        for (let i = 0; i < kImageList.length; i++) {
        	ChangeImageUrl( kImageList[i], "0.svg","1.svg" );
        }
        
        ChangeImageUrl( $( this ).find( ".cImage" ), "1.svg","0.svg" );
        var kButtonName =  $( this ).find( "data" ).text();
		if( $( this ).find( "data" ).text() != eSubBuildPriceEnum.All ){
			kButtonName = parseInt( kButtonName );
		}
        
        m_kBuildClassifySubSelectRegister.Price = kButtonName;
        m_strCurrentSubBuildClassify = m_kBuildClassifySubSelectRegister.Price;
        ShowBuildData();
    } );

	$(".cSubSearchBox_Money .cSubButtonBase").mouseover(function(){
		 ChangeImageUrl( $( this ).find( ".cImage" ), "1.svg","0.svg" );
	});

	$(".cSubSearchBox_Money .cSubButtonBase").mouseout(function(){
		var kButtonName =  $( this ).find( "data" ).text();
		if( $( this ).find( "data" ).text() != eSubBuildPriceEnum.All ){
			kButtonName = parseInt( kButtonName );
		}
		if( kButtonName == m_strCurrentSubBuildClassify ){
			return;
		}
		ChangeImageUrl( $( this ).find( ".cImage" ), "0.svg","1.svg" );
	});

	// -- MainSearchButton --
	$( ".cBuildCaseSystem .cMainSearchBox .cBuildTypeButton" ).click( function ( event ) {
        event.preventDefault();
        ProcesstMainSearchButtonSelect( this, $( ".cBuildCaseBox .cSubSearchBox_BuildType" ), eBuildClassifyEnum.Type, m_kBuildClassifySubSelectRegister.Type )
    } );

	$( ".cBuildCaseSystem .cMainSearchBox .cAreaButton" ).click( function ( event ) {
        event.preventDefault();
        ProcesstMainSearchButtonSelect( this, $( ".cBuildCaseBox .cSubSearchBox_Area" ), eBuildClassifyEnum.Position, m_kBuildClassifySubSelectRegister.Position )
    } );

    $( ".cBuildCaseSystem .cMainSearchBox .cTimeButton" ).click( function ( event ) {
        event.preventDefault();
        ProcesstMainSearchButtonSelect( this, $( ".cBuildCaseBox .cSubSearchBox_Time" ), eBuildClassifyEnum.StartYear, m_kBuildClassifySubSelectRegister.StartYear )
    } );

    $( ".cBuildCaseSystem .cMainSearchBox .cMoneyButton" ).click( function ( event ) {
        event.preventDefault();
        ProcesstMainSearchButtonSelect( this, $( ".cBuildCaseBox .cSubSearchBox_Money" ), eBuildClassifyEnum.Price, m_kBuildClassifySubSelectRegister.Price )
    } );

    $( ".cBuildCaseSystem .cMainSearchBox .cWonderfulButton" ).click( function ( event ) {
        event.preventDefault();
        ProcesstMainSearchButtonSelect( this, $( ".cBuildCaseBox .cSubSearchBox_Wonderful" ), eBuildClassifyEnum.Wonderful, m_kBuildClassifySubSelectRegister.Wonderful )
    } );

    $( ".cBuildCaseBox .cPageControlBox .cPreButton" ).click( function ( event ) {
    	event.preventDefault();
    	const nPage = m_nCurrentPage - 1;
    	const nPageKey = nPage - 1;
    	if( m_BuildCaseAttr.PagePositionMap.has( nPageKey ) ){
    		nPagePosition = m_BuildCaseAttr.PagePositionMap.get( nPageKey );
    		$('html , body').animate( { scrollTop : nPagePosition  } , 0);
    		SwitchBuildCasePage( nPage, m_nCurrentPage );
    		m_nCurrentPage = nPage;
    	}
    } );

    $( ".cBuildCaseBox .cPageControlBox .cNextButton" ).click( function ( event ) {
    	event.preventDefault();
    	const nPage = m_nCurrentPage + 1;
    	const nPageKey = nPage - 1;
    	if( m_BuildCaseAttr.PagePositionMap.has( nPageKey ) ){
    		nPagePosition = m_BuildCaseAttr.PagePositionMap.get( nPageKey );
    		$('html , body').animate( { scrollTop : nPagePosition  } , 0);
    		SwitchBuildCasePage( nPage, m_nCurrentPage );
    		m_nCurrentPage = nPage;
    	}
    } );

    $( ".cOriginBox .cAboutButton" ).click( function ( event ) {
    	event.preventDefault();
		GoToPage( DEF_ABOUT_HTML_PATH );
    } );

    $("select[ name='MainSearch_Phone' ]").on('change', function(){
    	event.preventDefault();
    	const strSelect = $("select[ name='MainSearch_Phone' ]").val()
    	switch( strSelect ){
    		case "BuildType" : {
    			const kButton = $( ".cBuildCaseSystem .cMainSearchBox .cBuildTypeButton" )[0];
    			ProcesstMainSearchButtonSelect( kButton, $( ".cBuildCaseBox .cSubSearchBox_BuildType" ), eBuildClassifyEnum.Type, m_kBuildClassifySubSelectRegister.Type )
    			break;
    		}
    		case "Area" : {
    			const kButton = $( ".cBuildCaseSystem .cMainSearchBox .cAreaButton" )[0];
    			ProcesstMainSearchButtonSelect( kButton, $( ".cBuildCaseBox .cSubSearchBox_Phone_Area" ), eBuildClassifyEnum.Position, m_kBuildClassifySubSelectRegister.Position )
    			break;
    		}
    		case "Time" : {
    			const kButton = $( ".cBuildCaseSystem .cMainSearchBox .cTimeButton" )[0];
    			ProcesstMainSearchButtonSelect( kButton, $( ".cBuildCaseBox .cSubSearchBox_Time" ), eBuildClassifyEnum.StartYear, m_kBuildClassifySubSelectRegister.StartYear )
    			break;
    		}
    		case "Money" : {
    			const kButton = $( ".cBuildCaseSystem .cMainSearchBox .cMoneyButton" )[0];
    			ProcesstMainSearchButtonSelect( kButton, $( ".cBuildCaseBox .cSubSearchBox_Money" ), eBuildClassifyEnum.Price, m_kBuildClassifySubSelectRegister.Price )
    			break;
    		}
    		case "Wonderful" : {
    			const kButton = $( ".cBuildCaseSystem .cMainSearchBox .cWonderfulButton" )[0];
    			ProcesstMainSearchButtonSelect( kButton, $( ".cBuildCaseBox .cSubSearchBox_Wonderful" ), eBuildClassifyEnum.Wonderful, m_kBuildClassifySubSelectRegister.Wonderful )
    			break;
    		}
    	}
    });

    $("select[ name='SubSearchBox_Area' ]").on('change', function(){
    	event.preventDefault();
    	const strSelect = $("select[ name='SubSearchBox_Area' ]").val()
    	m_kBuildClassifySubSelectRegister.Position = strSelect;
    	m_strCurrentSubBuildClassify = strSelect;
		ShowBuildData();
    });

}

function SwitchBuildCasePage( nNextPage, nLestPage ){
	if( m_strCurrentChangePageState == eChangePageState.strDoing ){
		return;
	}	
	const nPageKey = nNextPage - 1;
	const nLestPageKey = nLestPage - 1

	kPageDataList = [];
	if( m_PageDataMap.has( nPageKey ) ){
		kPageDataList = m_PageDataMap.get( nPageKey );
	}
	else{
		return;
	}

	var kShowBuildCaseBox = null;
	var strEndPosition = "0";
	if( nNextPage == nLestPage ){
		return;
	}
	else if( nNextPage > nLestPage ){
		kShowBuildCaseBox = $( ".cBuildCaseSlideBox .cNextImage .cShowBuildCaseBox" );
		strEndPosition = "-200vw"
	}
	else if( nNextPage < nLestPage  ){
		kShowBuildCaseBox = $( ".cBuildCaseSlideBox .cPreImage .cShowBuildCaseBox" );
		strEndPosition = "0vw"
	}
	m_strCurrentChangePageState = eChangePageState.strDoing;
	CreateShowBuildCase2Box( nPageKey, kPageDataList, kShowBuildCaseBox );

	PlaySwitchBuildCase( $( ".cBuildCaseSlideBox"), "-100vw", strEndPosition, nPageKey );
}

function PlaySwitchBuildCase( kPlayItem, strStartPosition, strEndPosition, nNextPageKey ){
	$( kPlayItem ).css( { left: strStartPosition } )
	$( kPlayItem ).animate( 
		{ left: strEndPosition }, 
		{ duration: 500, 
		done: function(){ ResetSwitchBuildCase( kPlayItem, strStartPosition, nNextPageKey ) }, 
		queue : false } 
	);
}

function ResetSwitchBuildCase( kPlayItem, strStartPosition, nNextPageKey ){
	
	//$( ".cBuildCaseSlideBox .cMainImage.cItemBase" ).remove();
	const kShowBuildCaseBox = $( ".cBuildCaseSlideBox .cMainImage .cShowBuildCaseBox" );

	kPageDataList = [];
	if( m_PageDataMap.has( nNextPageKey ) ){
		kPageDataList = m_PageDataMap.get( nNextPageKey );
	}
	CreateShowBuildCase2Box( nNextPageKey, kPageDataList, kShowBuildCaseBox );
	$( kPlayItem ).css( { left: strStartPosition } );
	m_nCurrentPage = ( nNextPageKey + 1 );
	m_strCurrentChangePageState = eChangePageState.strFinish;
}

function ChangeImageUrl( kImage, strNewImage, strOldImage ){
	var strBackgroundImageUrl = $( kImage ).css( "background-image" );
	strBackgroundImageUrl = strBackgroundImageUrl.replace( strOldImage, strNewImage );
	$( kImage ).css( { "background-image" : strBackgroundImageUrl } );
}

function SetSubAreaButtonSelectCss( kButton ){
	$( kButton ).css( { "color" : DEF_SPR_GREEN_1_COLOR } )
	$( kButton ).parent().parent().find( ".cArea_Button" ).css( { "border-bottom-color" : DEF_SPR_GREEN_1_COLOR } );       
}

function SetSubAreaButtonUnSelectCss( kButton ){
	$( kButton ).css( { "color" : "black" } )
	$( kButton ).parent().parent().find( ".cArea_Button" ).css( { "border-bottom-color" : "rgba(0,0,0,0)" } );
}

function SetSubBuildButtonSelectCss( kButton ){
	const kImage = $( kButton ).find( ".cImage" );
	var strBackgroundImageUrl = $( kImage ).css( "background-image" );
	strBackgroundImageUrl = strBackgroundImageUrl.replace("0.png", "1.png");
	$( kImage ).css( { "background-image" : strBackgroundImageUrl } );
}

function SetSubBuildButtonUnSelectCss( kButton ){
	const kImage = $( kButton ).find( ".cImage" );
	var strBackgroundImageUrl = $( kImage ).css( "background-image" );
	strBackgroundImageUrl = strBackgroundImageUrl.replace("1.png", "0.png");
	$( kImage ).css( { "background-image" : strBackgroundImageUrl } );
}

function ProcesstMainSearchButtonSelect( kButton, kShowBoxItem, eBuildClassify, strSubSelectRegister ){
	SetMainSearchButtonUnSelectCss(); 
	$( kButton ).css( { "background-color" : DEF_SPR_GREEN_1_COLOR, "color" : "#fff" } );
	$( kShowBoxItem ).css( { "display" : "flex" } );
	m_strCurrentBuildClassify = eBuildClassify;
	m_strCurrentSubBuildClassify = strSubSelectRegister;
	ShowBuildData();
}

function GoToFirstBuildCasePage(){
	const nPage = 1;
	const nPageKey = nPage - 1;
	if( m_BuildCaseAttr.PagePositionMap.has( nPageKey ) ){
		nPagePosition = m_BuildCaseAttr.PagePositionMap.get( nPageKey );
		$('html , body').animate( { scrollTop : nPagePosition  } , 0);
		SwitchBuildCasePage( nPage, m_nCurrentPage );
		m_nCurrentPage = nPage;
		$( ".cPageControlBox .cPageBox .cPage" + nPage.toString()  ).css( { "background-color" : DEF_SPR_GREEN_1_COLOR, "color" : "#fff" } );
	}
}

function SetMainSearchButtonUnSelectCss(){
	$( ".cBuildCaseBox .cMainSearchBox .cBuildTypeButton" ).css( { "background-color" : "#fff", "color" : DEF_SPR_GREEN_1_COLOR } );
	$( ".cBuildCaseBox .cMainSearchBox .cAreaButton" ).css( { "background-color" : "#fff", "color" : DEF_SPR_GREEN_1_COLOR } );
	$( ".cBuildCaseBox .cMainSearchBox .cTimeButton" ).css( { "background-color" : "#fff", "color" : DEF_SPR_GREEN_1_COLOR } );
	$( ".cBuildCaseBox .cMainSearchBox .cMoneyButton" ).css( { "background-color" : "#fff", "color" : DEF_SPR_GREEN_1_COLOR } );
	$( ".cBuildCaseBox .cMainSearchBox .cWonderfulButton" ).css( { "background-color" : "#fff", "color" : DEF_SPR_GREEN_1_COLOR } );

	$( ".cBuildCaseBox .cSubSearchBox_BuildType" ).css( { "display" : "none" } );
	$( ".cBuildCaseBox .cSubSearchBox_Area" ).css( { "display" : "none" } );
	$( ".cBuildCaseBox .cSubSearchBox_Time" ).css( { "display" : "none" } );
	$( ".cBuildCaseBox .cSubSearchBox_Money" ).css( { "display" : "none" } );
	$( ".cBuildCaseBox .cSubSearchBox_Wonderful" ).css( { "display" : "none" } );

	$( ".cBuildCaseBox .cSubSearchBox_Phone_Area" ).css( { "display" : "none" } );
}

function ProcessBannerData( kDataList ){
	
	m_BannerDataList.length = 0;
	m_kBannerTextureUrlList.length = 0;
	m_kInfoBannerTextList.length = 0;
	
	for( i = 0; i < kDataList.length; i++ ){
		
		kData = kDataList[ i ];
		
		kBannerData = {
			strID: i,
			strImagePath: kData.Image,
			strName: kData.Name,
			strYear: kData.Time
		}
		
		m_BannerDataList.push( kBannerData );
		
		m_kBannerTextureUrlList.push( kBannerData.strImagePath );
		m_kInfoBannerTextList.push( kBannerData.strName + " | " + kBannerData.strYear );
	}
	
	CreatBanner();
	CreatInfoBanner();
}


function GetBannerData(){
	$.ajax({
		url: DEF_DATABASE_HOME_PATH,
		method: "post",
		data: {},
		dataType: "json",
		success: function(res){
			ProcessBannerData( res.Banner )
			return;
		},
		error: function(res){
			console.log( "資料庫異常" );
		}
	})
}

function GetPriceRangeLowerValue( nPrice ){
	if( nPrice < 1000 ){
		return 500;
	}
	else if( nPrice >= 1000  && nPrice < 2500 ){
		return 1000;
	}
	else if( nPrice >= 2500  && nPrice < 5000 ){
		return 2500;
	}
	else if( nPrice >= 5000  && nPrice < 10000 ){
		return 5000;
	}
	else {
		return 10000;
	}
}

function SetNewData2ListByMap( strKey, kData, kMap ){
	var kDataList = [];
	if( kMap.has( strKey ) ){
		kDataList = kMap.get( strKey );
	}
	kDataList.push( kData );
	kMap.set( strKey, kDataList );
}

function ProcessAllBuildData( kDataList ){
	for( let i = 0; i < kDataList.length; i++ ){
		const kData = kDataList[i];
		if( kData.Display != "true" ){
			continue;
		}
		
		if( Array.isArray( kData.Type ) ) {
			for( let j = 0; j < kData.Type.length; j++ ){
				SetNewData2ListByMap( kData.Type[ j ], kData ,m_kBuild_TypeMap );
			}
		}
		else{
			SetNewData2ListByMap(  kData.Type, kData ,m_kBuild_TypeMap );
		}
		
		SetNewData2ListByMap(  kData.Position, kData ,m_kBuild_PositionMap );
		SetNewData2ListByMap(  parseInt( kData.StartYear ), kData ,m_kBuild_StartYearMap );
		SetNewData2ListByMap(  GetPriceRangeLowerValue( kData.Price ), kData ,m_kBuild_PriceMap );
		SetNewData2ListByMap(  kData.Wonderful, kData ,m_kBuild_WonderfulMap );
	}
	var kSortMap = SortMapByKey2( m_kBuild_StartYearMap )

	const kSmallToBigDataList = [];
	const iterator1 = kSortMap.values();
    for ( let i = 0; i < kSortMap.size; i++ ) {
        const kTempDataList = iterator1.next().value;
        for ( let j = 0; j < kTempDataList.length; j++ ) {
            kSmallToBigDataList.push( kTempDataList[j] );
        }
    }
    const kBigToSmallDataList = [];
    for (var i = kSmallToBigDataList.length - 1; i >= 0; i--) {
    	kBigToSmallDataList.push( kSmallToBigDataList[i] );
    }

	m_kBuild_YearSortMap.set( eSubBuildStartYearEnum.NearToFar, kBigToSmallDataList );
	m_kBuild_YearSortMap.set( eSubBuildStartYearEnum.FarToNear, kSmallToBigDataList );

}

function UpdateAreaButtonVisibility(){
	// 隱藏沒有建案的縣市按鈕
	const kAreaBaseList = $( ".cSubSearchBox_Area .cAreaBase" );
	for ( let i = 0; i < kAreaBaseList.length; i++ ) {
		const strArea = $( kAreaBaseList[ i ] ).find( "data" ).text();
		if ( !m_kBuild_PositionMap.has( strArea ) ) {
			$( kAreaBaseList[ i ] ).hide();
		}
	}

	// 若整個大區域底下的縣市都被隱藏，則隱藏該大區域按鈕
	const kRegionList = $( ".cSubSearchBox_Area .cSubButtonBase" );
	for ( let i = 0; i < kRegionList.length; i++ ) {
		const kRegion = kRegionList[ i ];
		const strRegionName = $( kRegion ).find( ".cArea_Button data" ).text();
		if ( strRegionName === eMainPositionEnum.All ) continue;
		if ( $( kRegion ).find( ".cAreaBase:visible" ).length === 0 ) {
			$( kRegion ).hide();
		}
	}

	// 同步更新手機版下拉選單
	$( "select[name='SubSearchBox_Area'] option" ).each( function() {
		const val = $( this ).val();
		if ( val !== "all" && !m_kBuild_PositionMap.has( val ) ) {
			$( this ).remove();
		}
	});
}

function GetAllBuildData(){
	// 優先使用 script 標籤預載的資料（支援直接開檔 file:// 或 AJAX 被阻擋時）
	if ( typeof window.PROJECT_JSON_DATA !== "undefined" && window.PROJECT_JSON_DATA && window.PROJECT_JSON_DATA.ProjectList ) {
		ProcessAllBuildData( window.PROJECT_JSON_DATA.ProjectList );
		UpdateAreaButtonVisibility();
		ShowBuildData( false );
		document.dispatchEvent( eventReadFileFinish );
		return;
	}
	$.ajax({
		url: DEF_DATABASE_PROJECT_PATH,
		method: "post",
		data: {},
		dataType: "json",
		success: function(res){
			ProcessAllBuildData( res.ProjectList );
			UpdateAreaButtonVisibility();
			ShowBuildData( false );
			document.dispatchEvent( eventReadFileFinish );
			return;
		},
		error: function(res){
			console.log( "資料庫異常" );
		}
	})
}

function ShowBuildData( bGotoFirstBuildCase = true ){
	let kMap = null;
	switch( m_strCurrentBuildClassify ){
		case eBuildClassifyEnum.Type :
			kMap = m_kBuild_TypeMap;
			break;
		case eBuildClassifyEnum.Position :
			kMap = m_kBuild_PositionMap;
			break;
		case eBuildClassifyEnum.StartYear :
			kMap = m_kBuild_YearSortMap;
			break;
		case eBuildClassifyEnum.Price :
			kMap = m_kBuild_PriceMap;
			break;
		case eBuildClassifyEnum.Wonderful :
			kMap = m_kBuild_WonderfulMap;
			break;
		default:
			console.log( " Error : ShowBuildData() " );
			return false;
	}

	$( ".cShowBuildCaseBox .cItemBase" ).remove();
	var kDataList = [];
	if( m_strCurrentSubBuildClassify == DEF_ALL ){
		const iterator1 = kMap.values();
        for ( let i = 0; i < kMap.size; i++ ) {
            const kTempDataList = iterator1.next().value;
            for ( let j = 0; j < kTempDataList.length; j++ ) {
				if( kTempDataList[ j ].Display != "true" ){
					continue;
				}
                kDataList.push( kTempDataList[j] );
            }
        }
	}
	else{
		const strKey = m_strCurrentSubBuildClassify;
		if(  kMap.has( strKey ) ){
			kDataList = kMap.get( strKey );
		}
	}

	function AddPage( nPageNumber ){
		const kPageTemplate = $( ".cPageControlBox .cPageBox .cPageTemplate" ).clone( true );
		$( kPageTemplate ).attr( 'class', "cPageBase" );
		$( kPageTemplate ).addClass( "cPage" + nPageNumber );
		$( kPageTemplate ).text( nPageNumber );
		$( kPageTemplate ).appendTo( ".cPageControlBox .cPageBox" );

		$( kPageTemplate ).click( function ( event ) {
			event.preventDefault();
			nPageKey = parseInt( $( this ).text() ) - 1;

			if( m_BuildCaseAttr.PagePositionMap.has( nPageKey ) ){
				nPagePosition = m_BuildCaseAttr.PagePositionMap.get( nPageKey );
				$('html , body').animate( { scrollTop : nPagePosition  } , 0);
			}
			

			//SwitchBuildCasePage( nPage, m_nCurrentPage );
		} );
	}
	
	$( ".cPageControlBox .cPageBox .cPageBase" ).remove();
	m_PageDataMap.clear()
	var nPageKey = 0;
	AddPage( nPageKey + 1 );
	let nPageContainItemNumber = 4;
	if( m_strCurrentDevice == m_eDeviceStete.pad ){
		nPageContainItemNumber = kDataList.length;
	}

	for ( let i = 0; i < kDataList.length; i++ ) {
		if(  i > 0 && i % nPageContainItemNumber == 0 ){
			nPageKey++;
			AddPage( nPageKey + 1 );
		}

		let kPageDataList = [];
		if( m_PageDataMap.has( nPageKey ) ){
			kPageDataList = m_PageDataMap.get( nPageKey );
		}
		kPageDataList.push( kDataList[ i ] );
		m_PageDataMap.set( nPageKey, kPageDataList );
	}

	let kPageDataList = [];
	if( m_PageDataMap.has( 0 ) ){
		kPageDataList = m_PageDataMap.get( 0 );
		m_nCurrentPage = 1;
	}

	CreateShowBuildCase2Box(  0, kPageDataList, $( ".cMainImage .cShowBuildCaseBox" ) );

	//--------------
	let nBuildCaseSlideAllHeight = 100 * 0.3 * ( nPageKey + 1 ) * 2;
	
	if(  m_strCurrentDevice == m_eDeviceStete.pad ){
		nBuildCaseSlideAllHeight = 100 * 1.16 + 100 * 0.3 * kDataList.length ;
	}
	const strBuildCaseSlideAllHeight = nBuildCaseSlideAllHeight.toString() + "vw";
	$( ".cBuildCaseBox" ).css( { "height" : strBuildCaseSlideAllHeight } );
	GetBuildCaseAttr();
	ProcessPagePositionForScroll();

	if( bGotoFirstBuildCase ){
		GoToFirstBuildCasePage();	
	}
}

function GetBuildCaseImageBase(){
	if ( typeof window === "undefined" || !window.location || (window.location.protocol !== "http:" && window.location.protocol !== "https:") ) return "";
	var p = window.location.pathname;
	var i = p.indexOf( "/Home" );
	if ( i < 0 ) return "";
	var base = window.location.origin + p.substring( 0, i );
	return base.charAt( base.length - 1 ) === "/" ? base : base + "/";
}

function CreateShowBuildCase2Box( nPageKey, kPageDataList, kShowBuildCaseBox ){
	$( kShowBuildCaseBox ).find( ".cItemBase" ).remove();
	
	if( kPageDataList.length == 0 ){
		$( ".cBuildCaseBox .cNoCaseInfoBox" ).css( { "display" : "flex" } );
		$( ".cBuildCaseBox .cBuildCaseSlideBox" ).css( { "display" : "none" } );
		return;
	}
	else{
		$( ".cBuildCaseBox .cNoCaseInfoBox" ).css( { "display" : "none" } );
		$( ".cBuildCaseBox .cBuildCaseSlideBox" ).css( { "display" : "flex" } );
	}

	var base = GetBuildCaseImageBase();
	var strBuildCasePathPrefix = base ? ( base + "Image/BuildCase/" ) : DEF_BUILD_CASE_PATH;

	for ( let i = 0; i < kPageDataList.length; i++ ) {
		var showImg = Array.isArray( kPageDataList[ i ].ShowImage ) ? kPageDataList[ i ].ShowImage[ 0 ] : kPageDataList[ i ].ShowImage;
		const strImagePath = strBuildCasePathPrefix + kPageDataList[ i ].ImagePath + "/" + DEF_SHOW_FOLDER_NAME + "/" + showImg;
		const strMapImagePath = strBuildCasePathPrefix + kPageDataList[ i ].ImagePath + "/map.png"

		const kItemTemplate = $( kShowBuildCaseBox ).find( ".cItemTemplate" ).clone( true );
		$( kItemTemplate ).attr( 'class', "cItemBase" );
		$( kItemTemplate ).find( ".cImage" ).css( { "background-image" : "url(" + strImagePath + ")" } );
		$( kItemTemplate ).find( "data" ).text( nPageKey.toString() + "_" + i.toString() );
		$( kItemTemplate ).find( ".cDetaiInfo .cTitle h1" ).text( kPageDataList[ i ].Name );
		
		if( kPageDataList[ i ].StartYear == DEF_BUILD_WORK_NAME ){
			$( kItemTemplate ).find( ".cDetaiInfo .cStartYear detaiData" ).text( kPageDataList[ i ].StartYear );
		}
		else{
			$( kItemTemplate ).find( ".cDetaiInfo .cStartYear detaiData" ).text( "民國" + kPageDataList[ i ].StartYear + "年" );
		}
		if( kPageDataList[ i ].FinishYear == DEF_BUILD_WORK_NAME ){
			$( kItemTemplate ).find( ".cDetaiInfo .cFinishYear detaiData" ).text( kPageDataList[ i ].FinishYear );
		}
		else{
			$( kItemTemplate ).find( ".cDetaiInfo .cFinishYear detaiData" ).text( "民國" + kPageDataList[ i ].FinishYear + "年" );
		}

		$( kItemTemplate ).find( ".cDetaiInfo .cBoss detaiData" ).text( kPageDataList[ i ].Owner );
		$( kItemTemplate ).find( ".cDetaiInfo .cDesign detaiData" ).text( kPageDataList[ i ].Design );
		$( kItemTemplate ).find( ".cDetaiInfo .cMap" ).css( { "background-image" : "url(" + strMapImagePath + ")" } );
		$( kItemTemplate ).appendTo( kShowBuildCaseBox );

		$( kItemTemplate ).click( function ( event ) {
			event.preventDefault();
			const kKeyList = $( this ).find( "data" ).text().split( "_" );
			let kDataList = m_PageDataMap.get( parseInt( kKeyList[ 0 ] ) );
			kData = kDataList[ parseInt( kKeyList[ 1 ] ) ];
			kData.nCurrentPosition = window.pageYOffset;
			kData.strCurrentBuildClassify = m_strCurrentBuildClassify;
			kData.strCurrentSubBuildClassify = m_strCurrentSubBuildClassify
			if (window.localStorage) {
            	localStorage.kData = JSON.stringify( kData );
				GoToPage( DEF_BUILD_CASE_HTML_PATH );
        	}
        	else {
        		alert("NOT SUPPORT");
        	}
		} );
	}
}

function ProcessPagePositionForScroll(){
	m_BuildCaseAttr.PagePositionMap.clear();
	const nTotalScrollHeight = m_BuildCaseAttr.BoxHeight - m_BuildCaseAttr.BoxTitleHeight// - m_BuildCaseAttr.SystemMarginTop;
	m_BuildCaseAttr.OnePageScrollHeight = nTotalScrollHeight / ( m_PageDataMap.size );

	const nStartTop = m_BuildCaseAttr.BoxTop + m_BuildCaseAttr.BoxTitleHeight// + m_BuildCaseAttr.SystemMarginTop;
	for ( let i = 0; i < m_PageDataMap.size; i++ ) {
		nPagePostion = nStartTop + m_BuildCaseAttr.OnePageScrollHeight * i - 10;
		m_BuildCaseAttr.PagePositionMap.set( i, nPagePostion );
	}
}

/// ---------------- Banner Tool --------------------
function CorrectShowBannerID( nID, nBannerCount ){
    if( nID > ( nBannerCount - 1) ){
      nID = 0;
    }
    else if( nID < 0 ){
      nID =  nBannerCount - 1;
    }
    return nID;
}

function CreatBanner(){  
	m_kShowBannerID.main = m_nBannerMainID;
	m_kShowBannerID.pre = CorrectShowBannerID( m_nBannerMainID - 1,  m_kBannerTextureUrlList.length );
	m_kShowBannerID.next = CorrectShowBannerID( m_nBannerMainID + 1,  m_kBannerTextureUrlList.length );
  
	$(".cBanner .cImageControl .cPreButton").click(function(event){
		event.preventDefault()
		clearTimeout( m_BannerTimeout );
		clearTimeout( m_InfoBannerTimeout );
		PreBanner();
		PreInfoBanner();
	})

	$(".cBanner .cImageControl .cNextButton").click(function(event){
		event.preventDefault()
		clearTimeout( m_BannerTimeout );
		clearTimeout( m_InfoBannerTimeout );
		NextBanner();
		NextInfoBanner();
	})
  
	$(".cBanner .cImage .cPreImage").css( { "background-image" : "url(" 
																	+ m_strBannerPath 
																	+ m_kBannerTextureUrlList[ m_kShowBannerID.pre ] + ")" } );
	$(".cBanner .cImage .cMainImage").css( { "background-image" : "url(" + m_strBannerPath + m_kBannerTextureUrlList[ m_kShowBannerID.main ] + ")" } );
	$(".cBanner .cImage .cNextImage").css( { "background-image" : "url(" + m_strBannerPath + m_kBannerTextureUrlList[ m_kShowBannerID.next ] + ")" } );
}

function NextBanner(){
	m_kShowBannerID.pre = CorrectShowBannerID( m_kShowBannerID.pre + 1, m_kBannerTextureUrlList.length );
	m_kShowBannerID.main = CorrectShowBannerID( m_kShowBannerID.main + 1, m_kBannerTextureUrlList.length );
	m_kShowBannerID.next = CorrectShowBannerID( m_kShowBannerID.next + 1, m_kBannerTextureUrlList.length );
	PlayBanner( "-200vw", m_kShowBannerID.pre, m_kShowBannerID.main, m_kShowBannerID.next );
	m_BannerTimeout = setTimeout( NextBanner, DEF_BANNER_SWITCH_TIMMER );
}

function PreBanner(){
	m_kShowBannerID.pre = CorrectShowBannerID( m_kShowBannerID.pre - 1, m_kBannerTextureUrlList.length );
	m_kShowBannerID.main = CorrectShowBannerID( m_kShowBannerID.main - 1, m_kBannerTextureUrlList.length );
	m_kShowBannerID.next = CorrectShowBannerID( m_kShowBannerID.next - 1, m_kBannerTextureUrlList.length );
	PlayBanner( "0vw", m_kShowBannerID.pre, m_kShowBannerID.main, m_kShowBannerID.next );
	m_BannerTimeout = setTimeout( PreBanner, DEF_BANNER_SWITCH_TIMMER );
}

function PlayBanner( strPositon, nPreTexturID, nMainTexturID , nNextTexturID ){
	var pxBannerwidth = $( ".cBanner .cMainImage" ).css( "width" );
	$(".cBanner .cImage").animate( 
		{ left: strPositon }, 
		{ duration: 1000, 
		done: function(){ ResetBanner( nPreTexturID, nMainTexturID , nNextTexturID ) }, 
		queue : false } 
	);
}

function ResetBanner( nPreTexturID, nMainTexturID, nNextTexturID ){
	$(".cBanner .cImage").css( { left: "-100vw" } );
	$(".cBanner .cImage .cPreImage").css( { "background-image" : "url('" 
														   + m_strBannerPath 
														   + m_kBannerTextureUrlList[ nPreTexturID ] + "')" } );
	$(".cBanner .cImage .cMainImage").css( { "background-image" : "url('" 
															+ m_strBannerPath 
															+ m_kBannerTextureUrlList[ nMainTexturID ] + "')" } );
	$(".cBanner .cImage .cNextImage").css( { "background-image" : "url('" 
																	+ m_strBannerPath 
																	+ m_kBannerTextureUrlList[ nNextTexturID ] + "')" } );
}

/// ---------------- Banner Tool End --------------------

/// ---------------- Info Banner Tool --------------------
function CreatInfoBanner(){
	m_kShowInfoBannerID.main = m_nInfoBannerMainID;
	m_kShowInfoBannerID.pre = CorrectShowBannerID( m_nInfoBannerMainID - 1,  m_kInfoBannerTextList.length );
	m_kShowInfoBannerID.next = CorrectShowBannerID( m_nInfoBannerMainID + 1,  m_kInfoBannerTextList.length );
	  
	$(".cBanner .cInfo .cPreInfo").text( m_kInfoBannerTextList[ m_kShowInfoBannerID.pre ] );
	$(".cBanner .cInfo .cMainInfo").text( m_kInfoBannerTextList[ m_kShowInfoBannerID.main ] );
	$(".cBanner .cInfo .cNextInfo").text( m_kInfoBannerTextList[ m_kShowInfoBannerID.next ] );
}

function NextInfoBanner(){
	m_kShowInfoBannerID.pre = CorrectShowBannerID( m_kShowInfoBannerID.pre + 1, m_kInfoBannerTextList.length );
	m_kShowInfoBannerID.main = CorrectShowBannerID( m_kShowInfoBannerID.main + 1, m_kInfoBannerTextList.length );
	m_kShowInfoBannerID.next = CorrectShowBannerID( m_kShowInfoBannerID.next + 1, m_kInfoBannerTextList.length );
	PlayInfoBanner( "-1.5vw", m_kShowInfoBannerID.pre, m_kShowInfoBannerID.main, m_kShowInfoBannerID.next );
	m_InfoBannerTimeout = setTimeout( NextInfoBanner, DEF_BANNER_SWITCH_TIMMER );
}

function PreInfoBanner(){
	m_kShowInfoBannerID.pre = CorrectShowBannerID( m_kShowInfoBannerID.pre - 1, m_kInfoBannerTextList.length );
	m_kShowInfoBannerID.main = CorrectShowBannerID( m_kShowInfoBannerID.main - 1, m_kInfoBannerTextList.length );
	m_kShowInfoBannerID.next = CorrectShowBannerID( m_kShowInfoBannerID.next - 1, m_kInfoBannerTextList.length );
	PlayInfoBanner( "1.5vw", m_kShowInfoBannerID.pre, m_kShowInfoBannerID.main, m_kShowInfoBannerID.next );
	m_InfoBannerTimeout = setTimeout( PreInfoBanner, DEF_BANNER_SWITCH_TIMMER );
}

function PlayInfoBanner( strPositon, nPreTexturID, nMainTexturID , nNextTexturID ){
	//var pxBannerwidth = $( ".cBanner .cMainImage" ).css( "width" );
	$(".cBanner .cInfo").animate( 
		{ top: strPositon }, 
		{ duration: DEF_BANNER_SWITCH_SPEED, 
		done: function(){ ResetInfoBanner( nPreTexturID, nMainTexturID , nNextTexturID ) }, 
		queue : false } 
	);
}

function ResetInfoBanner( nPreTexturID, nMainTexturID, nNextTexturID ){
	$(".cBanner .cInfo").css( { top: "0" } );
	$(".cBanner .cInfo .cPreInfo").text( m_kInfoBannerTextList[ nPreTexturID ] );
	$(".cBanner .cInfo .cMainInfo").text( m_kInfoBannerTextList[ nMainTexturID ] );
	$(".cBanner .cInfo .cNextInfo").text( m_kInfoBannerTextList[ nNextTexturID ] );
}

/// ---------------- Info Banner Tool End --------------------