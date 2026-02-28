const DEF_VERSION = "v Demo 0.1"

const DEF_IMAGE_PATH = "../Image/";
const DEF_LOGO_IMAGE_PATH = DEF_IMAGE_PATH + "Icon/Logo/0.svg";
const DEF_LOGO_WHITE_IMAGE_PATH = DEF_IMAGE_PATH + "Icon/Logo/1.svg";

const DEF_LOGING_IMAGE_PATH = DEF_IMAGE_PATH + "Loading_Small.gif";

const DEF_COLOR_SPR_GERRN = "#008a3a"

const DEF_HOME_PAGE_NAME = "Home";
const DEF_ABOUT_PAGE_NAME = "About";
const DEF_BUILD_CASE_PAGE_NAME = "BuildCase";
const DEF_WINNING_RECORD_PAGE_NAME = "WinningRecord";
const DEF_EXPERIENCE_PAGE_NAME = "Experience";
const DEF_CONNECTION_PAGE_NAME = "Connection";

const MOUSE_DEF_URL_KEY = "Info";
const MOUSE_DEF_URL_VAULE_BUILD_CASE = "BuildCase";
const MENU_DEF_URL_KEY_VERSION = "version";

const strMenuUrl = ".cTopBar_phone .cMenu";
var m_kPhoneMenu = { 
  nButtonState : 0,
  nSpeed : 500,
}
var kUlCssSetting = {
    height          : "0px",
    height_Show     : "calc( 100vh * 1 )",
    width           : "100%",
    fontSize        : "calc( 100vw * 0.06 )",
    borderRadius    : "30px",
    color           : "#fff",
    backgroundColor : "rgba( 0, 0, 0, 0.7 )",
    listStyle       : "none",
    boxShadow       : "3px 3px 15px #000",
    padding         : "0px",
    overflow        : "hidden",
    userSelect      : "none",
    marginTop       : "30px",
    marginBottom    : "0px"
}

var kLiCssSetting = {
    height                 : "0px",
    padding                : "0px",
    height_Show            : "calc( 100vw * 0.07 )",
    padding_Show           : "calc( 100vw * 0.1 )",
    fontSize               : "calc( 100vw * 0.06 )",
    textAlign              : "center",
    hover_BackgroundCcolor : "#00b9fc"
}

ShowVersionNumber();
CreatLogingPage();
CreateTitleBar();
CreateTitleBar_Phone();
CreateFooter();
SDK_ConnectionButton();
SetCurrentPageTopButtonCss();

function ShowVersionNumber(){
	kUrlDataMap = new Map;
	GetUrlInfo( kUrlDataMap );
	if( kUrlDataMap.has( MENU_DEF_URL_KEY_VERSION ) ){
		ShowInfo( DEF_VERSION );
	}
}

function SetCurrentPageTopButtonCss(){
	const strCurrentLocalUrl = window.location.pathname;
	if( strCurrentLocalUrl.indexOf( DEF_ABOUT_PAGE_NAME ) != -1 ){
		$( ".cTopBar .cAbout" ).css( { "background-color" : DEF_COLOR_SPR_GERRN, "color" : "#fff" } );
	}
	else if( strCurrentLocalUrl.indexOf( DEF_BUILD_CASE_PAGE_NAME ) != -1 ){
		$( ".cTopBar .cBuildCase" ).css( { "background-color" : DEF_COLOR_SPR_GERRN, "color" : "#fff" } );
	}
	else if( strCurrentLocalUrl.indexOf( DEF_WINNING_RECORD_PAGE_NAME ) != -1 ){
		$( ".cTopBar .cWinningRecord" ).css( { "background-color" : DEF_COLOR_SPR_GERRN, "color" : "#fff" } );
	}
	else if( strCurrentLocalUrl.indexOf( DEF_EXPERIENCE_PAGE_NAME ) != -1 ){
		$( ".cTopBar .cExperience" ).css( { "background-color" : DEF_COLOR_SPR_GERRN, "color" : "#fff" } );
	}
	else if( strCurrentLocalUrl.indexOf( DEF_CONNECTION_PAGE_NAME ) != -1 ){
		$( ".cTopBar .cConnection" ).css( { "background-color" : DEF_COLOR_SPR_GERRN, "color" : "#fff" } );
	}
}

function SDK_ConnectionButton(){
	$(window).scroll( function() {
		var nBodyTop = window.pageYOffset;
		ProcessTopBarByScrollEven( nBodyTop );
		//ProcessScrollButtomByScrollEven( nBodyTop )
	});
	
	$( ".cTopBar .cLogo" ).click( function( event ){
		event.preventDefault();
		GoToPage( "../" + DEF_HOME_PAGE_NAME + "/" )
	});
	
	$( ".cTopBar .cAbout" ).click( function( event ){
		event.preventDefault();
		GoToPage( "../" + DEF_ABOUT_PAGE_NAME + "/" );
	});
	
	$( ".cTopBar .cBuildCase" ).click( function( event ){
		event.preventDefault();
		const strCurrentLocalUrl = window.location.pathname;
		if( strCurrentLocalUrl.indexOf( DEF_HOME_PAGE_NAME ) != -1 ){
			const nPosition = $('.cBuildCaseBox').offset().top;
			$('html , body').animate( { scrollTop : nPosition } , 800);
		}
		else{
			GoToPage( "../" + DEF_HOME_PAGE_NAME + "/?" + MOUSE_DEF_URL_KEY + "=" + MOUSE_DEF_URL_VAULE_BUILD_CASE );
		}
	});
	
	$( ".cTopBar .cWinningRecord" ).click( function( event ){
		event.preventDefault();
		GoToPage( "../" + DEF_WINNING_RECORD_PAGE_NAME + "/" );
	});

	$( ".cTopBar .cExperience" ).click( function( event ){
		event.preventDefault();
		GoToPage( "../" + DEF_EXPERIENCE_PAGE_NAME + "/" )
	});

	$( ".cTopBar .cConnection" ).click( function( event ){
		event.preventDefault();
		GoToPage( "../" + DEF_CONNECTION_PAGE_NAME + "/" )
	});

	$( ".cFooterBox .cContact" ).click( function( event ){
		event.preventDefault();
		GoToPage( "../" + DEF_CONNECTION_PAGE_NAME + "/" );
	});

	$( ".cTopBar_phone .cLogo" ).click( function( event ){
		event.preventDefault();
		GoToPage( "../" + DEF_HOME_PAGE_NAME + "/" );
	});

	$( ".cTopBar_phone .cHome" ).click( function( event ){
		event.preventDefault();
		GoToPage( "../" + DEF_HOME_PAGE_NAME + "/" )
	});
	
	$( ".cTopBar_phone .cAbout" ).click( function( event ){
		event.preventDefault();
		GoToPage( "../" + DEF_ABOUT_PAGE_NAME + "/" );
	});
	
	$( ".cTopBar_phone .cBuildCase" ).click( function( event ){
		event.preventDefault();
		const strCurrentLocalUrl = GetUrl();
		if( strCurrentLocalUrl.indexOf( DEF_HOME_PAGE_NAME ) != -1 ){
			const nPosition = $('.cBuildCaseBox').offset().top;
			$('html , body').animate( { scrollTop : nPosition } , 800);
		}
		else{
			GoToPage( "../" + DEF_HOME_PAGE_NAME + "/?" + MOUSE_DEF_URL_KEY + "=" + MOUSE_DEF_URL_VAULE_BUILD_CASE );
		}
	});

	$( ".cTopBar_phone .cWinningRecord" ).click( function( event ){
		event.preventDefault();
		GoToPage( "../" + DEF_WINNING_RECORD_PAGE_NAME + "/" );
	});

	$( ".cTopBar_phone .cExperience" ).click( function( event ){
		event.preventDefault();
		GoToPage( "../" + DEF_EXPERIENCE_PAGE_NAME + "/" );
	});

	$( ".cTopBar_phone .cConnection" ).click( function( event ){
		event.preventDefault();
		GoToPage( "../" + DEF_CONNECTION_PAGE_NAME + "/" )
	});
	
	$( strMenuUrl + " .cShowButton" ).click( function(event){
    event.preventDefault();
    if( m_kPhoneMenu.nButtonState == 0 )
    {
		 $( strMenuUrl ).css( { "z-index" : "5" } )
      $( strMenuUrl + " .cShowButton .cLine1" ).css( { "visibility" : "hidden",
                                                       "transition" : "0.1s" } );
      $( strMenuUrl + " .cShowButton .cLine2" ).css( { "transform" : "rotate(45deg)", 
                                                       "margin-top" : "10px", 
                                                       "transition" : "0.2s" } );
      $( strMenuUrl + " .cShowButton .cLine3" ).css( { "transform" : "rotate(-45deg)", 
                                                       "margin-top" : "-5px",
                                                       "transition" : "0.2s" } );
      
      //$( strMenuUrl + " ul" ).slideDown( m_kPhoneMenu.nSpeed );
      $( strMenuUrl + " ul " ).css( { "height" : kUlCssSetting.height_Show, "transition" : "0.2s", "overflow" : "hidden" } );
      $( strMenuUrl + " li " ).css( { "height" : kLiCssSetting.height_Show, "padding" : kLiCssSetting.padding_Show , "opacity" : "1", "transition" : "0.2s" } );
      m_kPhoneMenu.nButtonState = 1;
    }
    else{
	  $( strMenuUrl ).css( { "z-index" : "auto" } )	
      $( strMenuUrl + " .cShowButton .cLine1" ).css( { "visibility" : "visible", 
                                                       "transition" : "0.1s" } );
      $( strMenuUrl + " .cShowButton .cLine2" ).css( { "transform" : "rotate(0deg)", 
                                                       "margin-top" : "15px", 
                                                       "transition" : "0.2s" } );
      $( strMenuUrl + " .cShowButton .cLine3" ).css( { "transform" : "rotate(0deg)", 
                                                       "margin-top" : "15px", 
                                                       "transition" : "0.2s" } ); 
      //$( strMenuUrl + " ul" ).slideUp( m_kPhoneMenu.nSpeed );
      $( strMenuUrl + " ul " ).css( { "height" : "0px", "transition" : "0.3s", "overflow" : "hidden" } );
      $( strMenuUrl + " li " ).css( { "padding" : "0", "opacity" : "0", "transition" : "0.1s" } );
      $( strMenuUrl + " li " ).css( { "height" : "0px", "padding" : "0", "opacity" : "0", "transition" : "0.3s" } );
      m_kPhoneMenu.nButtonState = 0;
    }
  })
  
  $( strMenuUrl + " li" ).click( function(event){
      $( strMenuUrl + " .cShowButton .cLine1" ).css( { "visibility" : "visible", 
                                                       "transition" : "0.1s" } );
      $( strMenuUrl + " .cShowButton .cLine2" ).css( { "transform" : "rotate(0deg)", 
                                                       "margin-top" : "15px", 
                                                       "transition" : "0.2s" } );
      $( strMenuUrl + " .cShowButton .cLine3" ).css( { "transform" : "rotate(0deg)", 
                                                       "margin-top" : "15px", 
                                                       "transition" : "0.2s" } ); 
      //$( strMenuUrl + " ul" ).slideUp( m_kPhoneMenu.nSpeed );
      $( strMenuUrl + " ul " ).css( { "height" : "0px", "transition" : "0.3s", "overflow" : "hidden" } );
      $( strMenuUrl + " li " ).css( { "padding" : "0", "opacity" : "0", "transition" : "0.1s" } );
      $( strMenuUrl + " li " ).css( { "height" : "0px", "padding" : "0", "opacity" : "0", "transition" : "0.3s" } );
      m_kPhoneMenu.nButtonState = 0;
  })
}

function CreatLogingPage(){
	const kLoadingPage  = $("<div></div>").attr("class", "cLoadingPage");
	const kImageBox     = $("<div></div>").attr("class", "cImageBox");
	const kImg          = $("<img>").attr("src", DEF_LOGING_IMAGE_PATH );

	var kBody = $(".cPageBody");
    $( kLoadingPage ).appendTo( kBody );
    $( kImageBox ).appendTo( kLoadingPage );
    $( kImg ).appendTo( kImageBox );

	$( kLoadingPage ).css( {  "background-color" : "#fff",
							  "position" : "fixed",
							  "top" : "0",
							  "left": "0",
							  "width" : "100vw",
							  "height" : "100vh",
							  "display" : "flex",
							  "justify-content" : "center",
							  "align-items" : "center",
							  "clip-path" : "circle(100%)",
							  "z-index" : "10",
                              "opacity" : "1", } )

	window.onload = function (){
		$(".cLoadingPage").css( { "clip-path" : "circle(5%)", "transition-duration" : "0.7s" } )
		setTimeout( function(){ 
			$(".cLoadingPage").css( { "opacity" : "0", "transition-duration" : "1.0" } )
		}, 500 )
	}

}

function GoToPage( strUrl ){
	$(".cLoadingPage").css( { "clip-path" : "circle(100%)",  "opacity" : "1", "transition-duration" : "0.7s" } )
	setTimeout( function(){ 
		location.href = strUrl;
	}, 1000 )
}

function CreateTitleBar(){
    /* example
    .cTopBar -> Root
	  .cLogo
        .cImage
          img( src = urlImageLogoImage )
      .cAbout
        h2 關於華春
      .cBuildCase
        h2 工程實績
      .cWinningRecord
        h2 得獎紀錄
      .cExperience 
        h2 經驗分享
      .cConnection
        h2 展望/聯絡我們
    */
    
    const kLogo      = $("<div></div>").attr("class", "cLogo");
    const kImage     = $("<div></div>").attr("class", "cImage");
    const kImg       = $("<img>").attr("src", DEF_LOGO_IMAGE_PATH );

    const kAbout      = $("<div></div>").attr("class", "cAbout");
	const kBuildCase      = $("<div></div>").attr("class", "cBuildCase");
	const kWinningRecord = $("<div></div>").attr("class", "cWinningRecord");
	const kExperience    = $("<div></div>").attr("class", "cExperience");
	const kConnection  = $("<div></div>").attr("class", "cConnection");

	const kAboutName         = $("<h2>").text("關於華春");
	const kBuildCaseName     = $("<h2>").text("工程實績");
	const kWinningRecordName = $("<h2>").text("得獎紀錄");
	const kExperienceName    = $("<h2>").text("經驗分享");
	const kConnectionName    = $("<h2>").text("展望/聯絡我們");
    
    var kTopBar = $(".cTopBar");
    $( kLogo ).appendTo( kTopBar );
    $( kImage ).appendTo( kLogo );
    $( kImg ).appendTo( kImage );
    
	$( kAbout ).appendTo(kTopBar);
	$( kBuildCase ).appendTo(kTopBar);
	$( kWinningRecord ).appendTo(kTopBar);
	$( kExperience ).appendTo(kTopBar);
	$( kConnection ).appendTo(kTopBar);

	$( kAboutName ).appendTo(kAbout);
	$( kBuildCaseName ).appendTo(kBuildCase);
	$( kWinningRecordName ).appendTo(kWinningRecord);
	$( kExperienceName ).appendTo(kExperience);
	$( kConnectionName ).appendTo(kConnection);
}

function CreateTitleBar_Phone(){
	/*
	.cTopBar_phone -> Root
      .cText
        img( src = urlImageLogoText )
      .cMenu
        .cShowButton
          .cLine1
          .cLine2
          .cLine3
        ul.cComboBoxList
          li.cData.cHome 首頁
          li.cData.cAbout 關於華春
          li.cData.cBuildCase 建案實績
          li.cData.cExperience 經驗分享
          li.cData.cConnection 展望/聯絡我們
	*/
	
	const kText      = $("<div></div>").attr("class", "cText");
		const kImg       = $("<img>").attr("src", DEF_LOGO_WHITE_IMAGE_PATH );
	
	const kMenu   = $("<div></div>").attr("class", "cMenu");
		const kShowButton   = $("<div></div>").attr("class", "cShowButton");
			const kLine1          = $("<div></div>").attr("class", "cLine1");
			const kLine2          = $("<div></div>").attr("class", "cLine2");
			const kLine3          = $("<div></div>").attr("class", "cLine3");
		const kUl           = $("<ul>").attr("class", "cComboBoxList" );
			const kLi_Home        = $("<li>").attr("class", "cHome" );
			const kLi_About       = $("<li>").attr("class", "cAbout" );
			const kLi_BuildCase   = $("<li>").attr("class", "cBuildCase" );
			const kLi_WinningRecord  = $("<li>").attr("class", "cWinningRecord" );
			const kLi_Experience  = $("<li>").attr("class", "cExperience" );
			const kLi_Connection  = $("<li>").attr("class", "cConnection" );
			
	$( kLi_Home ).addClass( "cData" );
	$( kLi_Home ).text( "首頁" )
	$( kLi_About ).addClass( "cData" );
	$( kLi_About ).text( "關於華春" )
	$( kLi_BuildCase ).addClass( "cData" );
	$( kLi_BuildCase ).text( "工程實績" )
	$( kLi_WinningRecord ).addClass( "cData" );
	$( kLi_WinningRecord ).text( "得獎紀錄" )
	$( kLi_Experience ).addClass( "cData" );
	$( kLi_Experience ).text( "經驗分享" )
	$( kLi_Connection ).addClass( "cData" );
	$( kLi_Connection ).text( "展望/聯絡我們" )
	
	var kTopBar_phone = $(".cTopBar_phone");
	
	$( kText ).appendTo( kTopBar_phone );
	$( kImg ).appendTo( kText );
	
    $( kMenu ).appendTo( kTopBar_phone );
	$( kShowButton ).appendTo( kMenu );
	$( kLine1 ).appendTo( kShowButton );
	$( kLine2 ).appendTo( kShowButton );
	$( kLine3 ).appendTo( kShowButton );
	
	$( kUl ).appendTo( kMenu );
	$( kLi_Home ).appendTo( kUl );
	$( kLi_About ).appendTo( kUl );
	$( kLi_BuildCase ).appendTo( kUl );
	$( kLi_WinningRecord ).appendTo( kUl );
	$( kLi_Experience ).appendTo( kUl );
	$( kLi_Connection ).appendTo( kUl );
}

function CreateFooter(){
	/* example
	.cFooterBox
	    .cLogo
	      .cImage
	        img( src = urlImageLogoImage )
	    .cInfoBox
	      .cAddress
	        .cImageBox
	          .cImage
	        .cText
	          .cName 地址
	          .cInfo 高雄市三民區建國一路 411 號 6 樓之 1
	      .cDivider
	      .cPhone
	        .cImageBox
	          .cImage
	        .cText
	          .cName 電話
	          .cInfo (07) 224-0999
	      .cDivider
	      .cFax
	        .cImageBox
	          .cImage
	        .cText
	          .cName 傳真
	          .cInfo (07) 224-6607
	      .cDivider
	      .cEmail
	        .cImageBox
	          .cImage
	        .cText
	          .cName Email 
	          .cInfo building@spring1987.com
	      .cDivider
	      .cContact
	        .cImageBox
	          .cImage
	        .cText
	          .cName 聯絡我們
  	.cCopyrightBox
    	.cCopyright Copyright © 2020華春營造有限公司, All Rights Reserved.
	*/
	
	const kLogo   = $("<div></div>").attr("class", "cLogo");
    const kImage  = $("<div></div>").attr("class", "cImage");
    const Img     = $("<img>").attr("src", DEF_LOGO_IMAGE_PATH);
    
    function CreateItem( strItemClassName, strName, strInfo ){
    	/*.cAddress -> Item
	        .cImageBox
	          .cImage
	        .cText
	          .cName 地址
	          .cInfo 高雄市三民區建國一路 411 號 6 樓之 1*/
    	const kItem      = $("<div></div>").attr("class", strItemClassName);
	    const kImageBox  = $("<div></div>").attr("class", "cImageBox");
	    const kImage     = $("<div></div>").attr("class", "cImage");
	    const kText      = $("<div></div>").attr("class", "cText");
	    const kName      = $("<div></div>").attr("class", "cName");
	    const kInfo      = $("<div></div>").attr("class", "cInfo");

	    $( kName ).text( strName );
	    $( kInfo ).text( strInfo );

	    $( kImageBox ).appendTo( kItem );
	    $( kImage ).appendTo( kImageBox );
	    $( kText ).appendTo( kItem );
	    $( kName ).appendTo( kText );
	    if( strInfo != "" ){
	    	$( kInfo ).appendTo( kText );	
	    }

	    return kItem;
    }

    const kInfoBox      = $("<div></div>").attr("class", "cInfoBox");

    const kAddress = CreateItem( "cAddress", "地址", "高雄市三民區建國一路 411 號 6 樓之 1" );
    const kPhone = CreateItem( "cPhone", "電話", "(07) 224-0999" );
    const kFax = CreateItem( "cFax", "傳真", "(07) 224-6607" );
    const kEmail = CreateItem( "cEmail", "Email", "building@spring1987.com" );
    const kContact = CreateItem( "cContact", "聯絡我們", "" );

    const kDivider_1 = $("<div></div>").attr("class", "cDivider");
    const kDivider_2 = $("<div></div>").attr("class", "cDivider");
	const kDivider_3 = $("<div></div>").attr("class", "cDivider");
	const kDivider_4 = $("<div></div>").attr("class", "cDivider");

	
	
	var kFooter = $(".cFooterBox");
    $( kLogo ).appendTo( kFooter );
	$( kImage ).appendTo( kLogo );
	$( Img ).appendTo( kImage );

	$( kInfoBox ).appendTo( kFooter );
	$( kAddress ).appendTo( kInfoBox );
	$( kDivider_1 ).appendTo( kInfoBox );
	$( kPhone ).appendTo( kInfoBox );
	$( kDivider_2 ).appendTo( kInfoBox );
	$( kFax ).appendTo( kInfoBox );
	$( kDivider_3 ).appendTo( kInfoBox );
	$( kEmail ).appendTo( kInfoBox );
	$( kDivider_4 ).appendTo( kInfoBox );
	$( kContact ).appendTo( kInfoBox );


	const kCopyright = $("<div></div>").attr("class", "cCopyright");
	$( kCopyright ).text( "Copyright © 2021華春營造有限公司, All Rights Reserved." );
	const kcCopyrightBox = $(".cCopyrightBox");
	$( kCopyright ).appendTo( kcCopyrightBox );
}


// ProcessTopBar
function ProcessTopBarByScrollEven( nBodyTop )
{
    if( nBodyTop > 0 )
    {
        ShowSmallTopBar();
    }
    else
    {
        ShowBigTopBar();
    }
}

function ShowSmallTopBar()
{
	$( ".cTopBar" ).css( { "height" : "3vw", "background-color" : "rgba( 255, 255, 255, 0.9 )", "transition-duration" : "0.5s" } );
    $( ".cTopBar .cLogo" ).css( { "width" : "10%",
								"opacity" : "0.5",
                                "transition-duration" : "0.5s" } );
	//$( ".cTopBar .cMenu" ).css( { "height" : "100%", "transition-duration" : "0.5s" } );
	//$( ".cTopBar .cMenu .cMenuBox" ).css( { "color" : "rgb( 255, 255, 255 )", "transition-duration" : "0.5s" } );			
}

function ShowBigTopBar()
{
    $( ".cTopBar" ).css( { "height" : "5vw", "background-color" : "rgba( 255, 255, 255, 1.0 )","transition-duration" : "0.5s" } );
    $( ".cTopBar .cLogo" ).css( { "width" : "20%",
												 "opacity" : "1",
												 "transition-duration" : "0.5s" } );
	//$( ".cTopBar .cMenu" ).css( { "height" : "30%", "transition-duration" : "0.5s" } );
	//$( ".cTopBar .cMenu .cMenuBox" ).css( { "color" : "rgb( 0, 0, 0 )", "transition-duration" : "0.5s" } );	
}