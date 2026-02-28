// -- SPR BuildCase、Experience 頁面 專屬 Tool --
// -- 相依於 SprTool.js

let DEF_IMAGE_PATH_SHOW_IMAGE_TOOL = ""
let DEF_SUB_DIR_IMAGE_PATH_SHOW_IMAGE_TOOL = ""

let m_kShowImageData = null;
var m_PageDataMap = new Map();
var m_nCurrentPage = 0;

var m_strCurrentDevice = "";
var m_strCurrentChangePageState = "";

const eChangePageState = {
	strDoing : "Doing",
	strFinish: "Finish"
}

const m_eDeviceStete = {
	pc : "pc",
	pad : "pad"
}

const m_PhotoBoxAttr = {
	PhotoBoxHeight: 0,
	PhotoBoxTop: 0,
	PhotoBoxbottom: 0,
	LastPhotoSlideBoxHeight: 0,
	PagePositionMap: new Map()
}

//---- 360 Panorama Variable Start-----
var m_kPanorama = null;
var m_kViewer = null;
//---- 360 Panorama Variable End-----

const m_kCurrentPhotoLightBoxInfo = {
	nPage: 0,
	nImageNumber: 0
}

function Initialize_ShowImageTool( kBuildData, strImagePath, strImageSubDirPath ){
	DEF_IMAGE_PATH_SHOW_IMAGE_TOOL = strImagePath;
	DEF_SUB_DIR_IMAGE_PATH_SHOW_IMAGE_TOOL = strImageSubDirPath;
	m_strCurrentChangePageState = eChangePageState.strFinish;
	m_kShowImageData = kBuildData;
	UpdateCurrentDeviceData( false );
	ConnectionButton_ShowImageTool();
	ShowBuildCaseImage();
}

function GetCurrentDeviceState(){
	return m_strCurrentDevice;
}

function ConnectionButton_ShowImageTool() {
	$( window ).scroll( function() {
		var nBodyTop = window.pageYOffset;
		if( m_strCurrentDevice == m_eDeviceStete.pc ){
			ProcessPhotoSlideBoxPositioning( nBodyTop );
		}
	});

	$( window ).resize(function() {
		UpdateCurrentDeviceData();
		UpdatePhotoBoxAttr();
	});

	$( ".cPhotoBox .cImageControl .cPreButton" ).click( function ( event ) {
        event.preventDefault();
        if( m_nCurrentPage != 1 ){
        	nNextPage = m_nCurrentPage - 1;
        	const nPosition = GetBuildCasePositionByPage( nNextPage );
        	if( nPosition != -1 ){
        		$('html , body').animate( { scrollTop : ( nPosition )  } , 0);
        		SwitchBuildCasePage( nNextPage, m_nCurrentPage );
        	}
        }
    } );

    $( ".cPhotoBox .cImageControl .cNextButton" ).click( function ( event ) {
        event.preventDefault();
        nNextPage = m_nCurrentPage + 1;
        if( nNextPage <= m_PageDataMap.size ){
        	const nPosition = GetBuildCasePositionByPage( nNextPage );
        	if( nPosition != -1 ){
				const nTopBarHeight = $(".cPageBody .cTopBox .cTopBar").height();
        		$('html , body').animate( { scrollTop : ( nPosition - nTopBarHeight * 3 )  } , 0);
        		SwitchBuildCasePage( nNextPage, m_nCurrentPage );
        	}
        }
    } );	

	LightBoxConnectionButton();
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
		$( ".cPhotoSlideBox" ).css( { "top" : 0 } );
	}
	else if( strOldDevice == m_eDeviceStete.pad && m_strCurrentDevice == m_eDeviceStete.pc ){

	}

	if( bShowBuildData && m_strCurrentDevice != strOldDevice ){
		ShowBuildCaseImage();
	}
}

function ProcessPhotoSlideBoxPositioning( nBodyTop ){
	const nTopBarHeight = $(".cPageBody .cTopBox .cTopBar").height();
	const nTopShowPosition = nBodyTop + nTopBarHeight;
	const nSlideLowPosition =  m_PhotoBoxAttr.PhotoBoxbottom - m_PhotoBoxAttr.LastPhotoSlideBoxHeight - 100;

	if( nTopShowPosition > m_PhotoBoxAttr.PhotoBoxTop  && nTopShowPosition < nSlideLowPosition  ){
		//const nCurrentLocalTop = nTopShowPosition - m_PhotoBoxAttr.PhotoBoxTop;
		//$( ".cPhotoSlideBox" ).css( { "top" : nCurrentLocalTop } );
		$( ".cPhotoSlideBox" ).css( { "position" : "fixed" } );
		$( ".cPhotoSlideBox" ).css( { "top" : nTopBarHeight } );
		const nNextPage = GetBuildCasePage( nTopShowPosition );
		SwitchBuildCasePage( nNextPage, m_nCurrentPage );
	} 
	else if( nBodyTop < m_PhotoBoxAttr.PhotoBoxTop ){
		$( ".cPhotoSlideBox" ).css( { "position" : "absolute" } );
		$( ".cPhotoSlideBox" ).css( { "top" : 0 } );
	}
	else if( nTopShowPosition > nSlideLowPosition ){
		$( ".cPhotoSlideBox" ).css( { "position" : "absolute" } );
		$( ".cPhotoSlideBox" ).css( { "top" : nSlideLowPosition - m_PhotoBoxAttr.PhotoBoxTop } );
	}
}

function GetBuildCasePage( nTopShowPosition ){
	nTopShowPosition = nTopShowPosition + 0.25 * GetBrowserViewportDimensions().nVw;

	var nPageKey = 0;
	var iterator1 = m_PhotoBoxAttr.PagePositionMap.values();
	for( i = 0; i < m_PhotoBoxAttr.PagePositionMap.size; i++ ){
		const kPositionData = iterator1.next().value;
		if( nTopShowPosition > kPositionData.nTop ){
			nPageKey = i;
		}
	}
	console.log( nPageKey );
	return nPageKey + 1;
}

function GetBuildCasePositionByPage( nPage ){
	var nPageKey = nPage - 1;
	if( m_PhotoBoxAttr.PagePositionMap.has( nPageKey ) ){
		const kPositionData = m_PhotoBoxAttr.PagePositionMap.get( nPageKey )
		return kPositionData.nTop;
	}
	return -1;
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
		kShowBuildCaseBox = $( ".cPhotoSlideBox .cNextImage .cShowBuildCaseBox" );
		strEndPosition = "-200vw"
	}
	else if( nNextPage < nLestPage  ){
		kShowBuildCaseBox = $( ".cPhotoSlideBox .cPreImage .cShowBuildCaseBox" );
		strEndPosition = "0vw"
	}
	m_strCurrentChangePageState = eChangePageState.strDoing;
	CreateShowBuildCase2Box( nPageKey, kPageDataList, kShowBuildCaseBox );

	PlaySwitchBuildCase( $( ".cPhotoSlideBox"), "-100vw", strEndPosition, nPageKey );
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
	const kShowBuildCaseBox = $( ".cPhotoSlideBox .cMainImage .cShowBuildCaseBox" );

	kPageDataList = [];
	if( m_PageDataMap.has( nNextPageKey ) ){
		kPageDataList = m_PageDataMap.get( nNextPageKey );
	}
	CreateShowBuildCase2Box( nNextPageKey, kPageDataList, kShowBuildCaseBox );
	$( kPlayItem ).css( { left: strStartPosition } );
	m_nCurrentPage = ( nNextPageKey + 1 );
	ShowImageControl();
	m_strCurrentChangePageState = eChangePageState.strFinish;
}

function ShowImageControl(){
	if( m_nCurrentPage == 1 ){
		$( ".cPhotoBox .cImageControl .cPreButton" ).css( { "opacity" : "0" } );
	}
	else{
		$( ".cPhotoBox .cImageControl .cPreButton" ).css( { "opacity" : "1" } );
	}

	if( m_nCurrentPage == m_PageDataMap.size ){
		$( ".cPhotoBox .cImageControl .cNextButton" ).css( { "opacity" : "0" } );
	}
	else{
		$( ".cPhotoBox .cImageControl .cNextButton" ).css( { "opacity" : "1" } );
	}
}

function ShowBuildCaseImage(){
	let kImageDescriptionMap = new Map()
	if( m_kShowImageData.Image_Description != undefined && m_kShowImageData.Image_Description != null ){
		for ( let i = 0; i <  m_kShowImageData.Image_Description.length; i++) {
			let kDataList = m_kShowImageData.Image_Description[ i ].split( "_" );
			kImageDescriptionMap.set( kDataList[ 0 ], kDataList[ 1 ] );
		}
	}
	let kImage360DescriptionMap = new Map()
	if( m_kShowImageData.Image_360_Description != undefined && m_kShowImageData.Image_360_Description != null ){
		for ( let i = 0; i <  m_kShowImageData.Image_360_Description.length; i++) {
			let kDataList = m_kShowImageData.Image_360_Description[ i ].split( "_" );
			kImage360DescriptionMap.set( kDataList[ 0 ], kDataList[ 1 ] );
		}
	}

	var kImage_VideoList = [];
	var kImage_VideoImageList = [];
	if( m_kShowImageData.Image_Video != undefined && m_kShowImageData.Image_Video != null ){
		kImage_VideoList = ProcessVideoList( m_kShowImageData.Image_Video );
		kImage_VideoImageList = ProcessVideoImageList(  m_kShowImageData.Image_Video );
	}

	var kImage_360List = [];
	if( m_kShowImageData.Image_360 != undefined && m_kShowImageData.Image_360 != null ){
		kImage_360List = ProcessImageListByAbbreviation( m_kShowImageData.Image_360 );
	}
	const kImageList = ProcessImageListByAbbreviation( m_kShowImageData.Image );

	const kAllImageList = [];
	for ( let i = 0; i < kImage_VideoList.length; i++) {
		let kData = {
			strImage: kImage_VideoImageList[ i ],
			htmlVideo: kImage_VideoList[ i ],
			bIs360: false,
			bIsVideo: true,
			strDescription: ""
		}
		kAllImageList.push( kData );
	}
	for ( let i = 0; i < kImage_360List.length; i++) {
		let kData = {
			strImage: kImage_360List[ i ],
			bIs360: true,
			bIsVideo: false,
			strDescription: ""
		}
		if( kImage360DescriptionMap.has( kImageList[ i ] ) ){
			kData.strDescription = kImage360DescriptionMap.get( kImageList[ i ] );
		}
		kAllImageList.push( kData );
	}
	for ( let i = 0; i < kImageList.length; i++) {
		
		let kData = {
			strImage: kImageList[ i ],
			bIs360: false,
			bIsVideo: false,
			strDescription: ""
		}
		if( kImageDescriptionMap.has( kImageList[ i ] ) ){
			kData.strDescription = kImageDescriptionMap.get( kImageList[ i ] );
		}
		kAllImageList.push( kData );
	}

	m_PageDataMap.clear()
	let nPageKey = 0;
	//AddPage( nPageKey + 1 );

	let nPageContainItemNumber = 12;
	if( m_strCurrentDevice == m_eDeviceStete.pad ){
		nPageContainItemNumber = kAllImageList.length;
	}

	for ( let i = 0; i < kAllImageList.length; i++ ) {
		if(  i > 0 && i % nPageContainItemNumber == 0 ){
			nPageKey++;
			//AddPage( nPageKey + 1 );
		}

		let kPageDataList = [];
		if( m_PageDataMap.has( nPageKey ) ){
			kPageDataList = m_PageDataMap.get( nPageKey );
		}
		kPageDataList.push( kAllImageList[ i ] );
		m_PageDataMap.set( nPageKey, kPageDataList );
	}

	let kPageDataList = [];
	if( m_PageDataMap.has( 0 ) ){
		kPageDataList = m_PageDataMap.get( 0 );
		m_nCurrentPage = 1;
	}
	ShowImageControl();
	CreateShowBuildCase2Box(  0, kPageDataList, $( ".cMainImage .cShowBuildCaseBox" ) );
	UpdatePhotoBoxAttr();
}

function UpdatePhotoBoxAttr(){
	m_PhotoBoxAttr.PhotoBoxTop = $(".cPhotoBox").offset().top;
	m_PhotoBoxAttr.PagePositionMap.clear();

	const kViewData = GetBrowserViewportDimensions();

	let nTotalPhotoSlideBoxHeight = 0;
	var iterator1 = m_PageDataMap.values();
	for( i = 0; i < m_PageDataMap.size; i++ ){
		const kDataList = iterator1.next().value;
		const kAttrData = GetItemAndSlideBoxAttr( kDataList.length );
		if( m_strCurrentDevice == m_eDeviceStete.pad ){
			nTotalPhotoSlideBoxHeight = nTotalPhotoSlideBoxHeight + kAttrData.nPhotoSlideBoxHeight * kDataList.length;
		}
		else{
			nTotalPhotoSlideBoxHeight = nTotalPhotoSlideBoxHeight + kAttrData.nPhotoSlideBoxHeight;	
		}
		
		kPositionData = {
			nTop : 0,
			nButtom: 0
		}
		if( i != 0 ){
			let kLastPositionData = m_PhotoBoxAttr.PagePositionMap.get( i - 1 );
			kPositionData.nTop = kLastPositionData.nButtom
			kPositionData.nButtom = kLastPositionData.nButtom + ( kAttrData.nPhotoSlideBoxHeight * kViewData.nVw / 100 )
		}
		else{
			kPositionData.nTop = m_PhotoBoxAttr.PhotoBoxTop;
			kPositionData.nButtom = m_PhotoBoxAttr.PhotoBoxTop + ( kAttrData.nPhotoSlideBoxHeight * kViewData.nVw / 100 )
		}
		
		m_PhotoBoxAttr.PagePositionMap.set( i, kPositionData );
		if( i == m_PageDataMap.size - 1 ){
			m_PhotoBoxAttr.LastPhotoSlideBoxHeight = kAttrData.nPhotoSlideBoxHeight * kViewData.nVw / 100;
		}
	}

	$( ".cPhotoBox" ).css( { "height" : nTotalPhotoSlideBoxHeight.toString() + "vw" } );
	m_PhotoBoxAttr.PhotoBoxHeight = $(".cPhotoBox").height();
	m_PhotoBoxAttr.PhotoBoxbottom = m_PhotoBoxAttr.PhotoBoxTop + m_PhotoBoxAttr.PhotoBoxHeight;
}

function CreateShowBuildCase2Box( nPageKey, kPageImageList, kShowBuildCaseBox ){
	$( kShowBuildCaseBox ).find( ".cItemBase" ).remove();

	const kAttrData = GetItemAndSlideBoxAttr( kPageImageList.length );

	$( ".cPhotoBox .cPhotoSlideBox" ).css( { "height" : kAttrData.nPhotoSlideBoxHeight.toString() + "vw" } );

	for ( let i = 0; i < kPageImageList.length; i++ ) {
		const kItemTemplate = $( kShowBuildCaseBox ).find( ".cItemTemplate" ).clone( true );
		$( kItemTemplate ).attr( 'class', "cItemBase" );
		const kImageData = kPageImageList[ i ];
		var strImageName = kImageData.strImage;
		if( kImageData.bIs360 ){
			strImageName = "360/" + kImageData.strImage;
			$( kItemTemplate ).find( ".c360Tag" ).css( { "display" : "flex" } );
		}
		if( kImageData.bIsVideo ){
			const strImagePath = kImageData.strImage;
			$( kItemTemplate ).find( ".cImage" ).css( { "background-image" : "url(" + strImagePath + ")" } );
			$( kItemTemplate ).find( ".cVideoTag" ).css( { "display" : "flex" } );
			//const kIframe = $(  kImageData.strImage );
			//$( kIframe ).appendTo( $( kItemTemplate ).find( ".cImage" ) );
		}
		else{
			// 360 or Image
			const strImagePath = DEF_IMAGE_PATH_SHOW_IMAGE_TOOL + m_kShowImageData.ImagePath + "/" + DEF_SUB_DIR_IMAGE_PATH_SHOW_IMAGE_TOOL + "/" + strImageName;
			$( kItemTemplate ).find( ".cImage" ).css( { "background-image" : "url(" + strImagePath + ")" } );
		}
		$( kItemTemplate ).find( "data" ).text( nPageKey.toString() + "_" + i.toString() );
		$( kItemTemplate ).css( { "height" : kAttrData.strItemHeight } );
		$( kItemTemplate ).css( { "width" : kAttrData.strItemWidth } );
		$( kItemTemplate ).appendTo( kShowBuildCaseBox );

		$( kItemTemplate ).click( function ( event ) {
			event.preventDefault();
			const kKeyList = $( this ).find( "data" ).text().split( "_" );
			let kDataList = m_PageDataMap.get( parseInt( kKeyList[ 0 ] ) );
			kData = kDataList[ parseInt( kKeyList[ 1 ] ) ];

			m_kCurrentPhotoLightBoxInfo.nPage = parseInt( kKeyList[ 0 ] );
			m_kCurrentPhotoLightBoxInfo.nImageNumber = parseInt( kKeyList[ 1 ] );

			const strImagePath = DEF_IMAGE_PATH_SHOW_IMAGE_TOOL + m_kShowImageData.ImagePath + "/" + DEF_SUB_DIR_IMAGE_PATH_SHOW_IMAGE_TOOL + "/";
			if ( kData.bIs360) {
            	LightBoxShowImage_360( strImagePath + "360/" + kData.strImage, kData.strDescription );
        	}
			else if( kData.bIsVideo ){
				LightBoxShowImage( kData.htmlVideo, kData.strDescription, true );
			}
        	else {
        		LightBoxShowImage( strImagePath + kData.strImage, kData.strDescription );
        	}
		} );
	}

	if( kAttrData.strItemHeight == "15vw" && kPageImageList.length != 0 ){
		const nEmptyImageNumber = 12 - kPageImageList.length;
		for( let i = 0; i < nEmptyImageNumber; i++ ){
			const kItemTemplate = $( kShowBuildCaseBox ).find( ".cItemTemplate" ).clone( true );
			$( kItemTemplate ).attr( 'class', "cItemBase" );
			$( kItemTemplate ).css( { "height" : kAttrData.strItemHeight } );
			$( kItemTemplate ).css( { "width" : kAttrData.strItemWidth } );
			$( kItemTemplate ).css( { "cursor" : "auto" } );
			$( kItemTemplate ).appendTo( kShowBuildCaseBox );
		}
	}
}

function GetItemAndSlideBoxAttr( kImageNumber ){
	let strItemWidth = "0%";
	let strItemHeight = "0vw";
	let	nItemHeight = 0;
	if( m_strCurrentDevice == m_eDeviceStete.pad ){
		strItemWidth = "100%";
		nItemHeight = 60;
	}
	else if( kImageNumber <= 2 ){
		strItemWidth = "50%";
		nItemHeight = 30;
	}
	else if( kImageNumber == 3  ){
		strItemWidth = "33%";
		nItemHeight = 20;
	}
	else if( kImageNumber > 3 ){
		strItemWidth = "25%";
		nItemHeight = 15;
	}
	strItemHeight = nItemHeight.toString() + "vw";

	let strPhotoSlideBoxHeight = "0vw";
	if( m_strCurrentDevice == m_eDeviceStete.pad ){
		nPhotoSlideBoxHeight = nItemHeight * 1;
	}
	else{
		nPhotoSlideBoxHeight = 15 * 3
	}

	/*else if(  kImageNumber <= 4 ){
		// 1 列
		nPhotoSlideBoxHeight = nItemHeight * 1;
	}
	else if( kImageNumber > 4 && kImageNumber <= 8 ){
		// 2 列
		nPhotoSlideBoxHeight = nItemHeight * 2;
	}
	else{
		// 3 列
		nPhotoSlideBoxHeight = nItemHeight * 3;
	}*/

	const kAttrData = {
		strItemWidth : strItemWidth,
		strItemHeight: strItemHeight,
		nPhotoSlideBoxHeight: nPhotoSlideBoxHeight
	}

	return kAttrData;
}

/// ---------------- Photo Light Box ---------------

function LightBoxConnectionButton(){
	$( ".cPhotoLightBox .cMask" ).click( function ( event ) {
        event.preventDefault();
        $( ".cPhotoLightBox" ).css( { "display" : "none" } );
		$( ".cPhotoLightBox .cImage" ).find( "iframe" ).remove();
    } );

    $( ".cPhotoLightBox .cEscButton" ).click( function ( event ) {
        event.preventDefault();
        $( ".cPhotoLightBox" ).css( { "display" : "none" } );
		$( ".cPhotoLightBox .cImage" ).find( "iframe" ).remove();
    } );

    $( ".cPhotoLightBox .cInfoButton" ).click( function ( event ) {
        event.preventDefault();
        const strState = $( ".cPhotoLightBox .cDescription" ).css( "display" );
        if( strState == "none" ){
        	$( ".cPhotoLightBox .cDescription" ).css( { "display" : "flex" } );
        }
        else{
        	$( ".cPhotoLightBox .cDescription" ).css( { "display" : "none" } );	
        }
        
    } );

    $( ".cPhotoLightBox .cControlBox .cLastButton" ).click( function ( event ) {
    	event.preventDefault();
    	let kData = null;
    	if( m_kCurrentPhotoLightBoxInfo.nImageNumber > 0 ){
    		const nImageNumber = m_kCurrentPhotoLightBoxInfo.nImageNumber - 1;
    		let kDataList = m_PageDataMap.get( m_kCurrentPhotoLightBoxInfo.nPage );
    		kData = kDataList[ nImageNumber ];
    		m_kCurrentPhotoLightBoxInfo.nImageNumber = nImageNumber;
    	}
    	else{
    		const nPage = m_kCurrentPhotoLightBoxInfo.nPage - 1;
    		if( m_PageDataMap.has( nPage ) ){
    			let kDataList = m_PageDataMap.get( nPage );
    			kData = kDataList[ kDataList.length - 1 ];
    			m_kCurrentPhotoLightBoxInfo.nPage = nPage;
    			m_kCurrentPhotoLightBoxInfo.nImageNumber = kDataList.length - 1;
    		}
    	}
    	if( kData == null ){
    		return;
    	}

    	const strImagePath = DEF_IMAGE_PATH_SHOW_IMAGE_TOOL + m_kShowImageData.ImagePath + "/" + DEF_SUB_DIR_IMAGE_PATH_SHOW_IMAGE_TOOL + "/";
    	if ( kData.bIs360) {
    		LightBoxShowImage_360( strImagePath + "360/" + kData.strImage, kData.strDescription );
    	}
		else if( kData.bIsVideo ){
			LightBoxShowImage( kData.htmlVideo, kData.strDescription, true );
		}
    	else {
    		LightBoxShowImage( strImagePath + kData.strImage, kData.strDescription );
    	}
    } );

    $( ".cPhotoLightBox .cControlBox .cNextButton" ).click( function ( event ) {
    	event.preventDefault();
    	let kDataList = m_PageDataMap.get( m_kCurrentPhotoLightBoxInfo.nPage );
    	let kData = null;
    	if( m_kCurrentPhotoLightBoxInfo.nImageNumber + 1 < kDataList.length ){
    		const nImageNumber = m_kCurrentPhotoLightBoxInfo.nImageNumber + 1;
    		kData = kDataList[ nImageNumber ];
    		m_kCurrentPhotoLightBoxInfo.nImageNumber = nImageNumber;
    	}
    	else{
    		const nPage = m_kCurrentPhotoLightBoxInfo.nPage + 1;
    		if( m_PageDataMap.has( nPage ) ){
    			kDataList = m_PageDataMap.get( nPage );
    			kData = kDataList[ 0 ];
    			m_kCurrentPhotoLightBoxInfo.nPage = nPage;
    			m_kCurrentPhotoLightBoxInfo.nImageNumber = 0;
    		}
    	}
    	if( kData == null ){
    		return;
    	}

    	const strImagePath = DEF_IMAGE_PATH_SHOW_IMAGE_TOOL + m_kShowImageData.ImagePath + "/" + DEF_SUB_DIR_IMAGE_PATH_SHOW_IMAGE_TOOL + "/";
    	if ( kData.bIs360) {
    		LightBoxShowImage_360( strImagePath + "360/" + kData.strImage, kData.strDescription );
    	}
		else if( kData.bIsVideo ){
			LightBoxShowImage( kData.htmlVideo, kData.strDescription, true );
		}
    	else {
    		LightBoxShowImage( strImagePath + kData.strImage, kData.strDescription );
    	}
    } );
}

function LightBoxShowImage( strImagePath, strDescription, bIsVideo = false ){
	$( ".cPhotoLightBox" ).css( { "display" : "flex" } );
	$( ".cPhotoLightBox .cImage" ).css( { "display" : "block" } );

	$( ".cPhotoLightBox .cImage_360" ).css( { "display" : "none" } );
	$( ".cPhotoLightBox .cDescription" ).css( { "display" : "none" } );

	$( ".cPhotoLightBox .cImage" ).find( "iframe" ).remove();
	if( bIsVideo ){
		const kIframe = $(  strImagePath );
		$( kIframe ).appendTo( $( ".cPhotoLightBox .cImage" ) );
		$( ".cPhotoLightBox .cImageBox" ).css( { "width" : "55%", "height" : "calc( 100vw * 0.36 )"  } )
	}
	else{
		$( ".cPhotoLightBox .cImage" ).css( { "background-image" : "url(" + strImagePath + ")" } );
		// 設定長寬
		const imgImageTemp = new Image();
		imgImageTemp.onload = function() {
			if( this.height > this.width ){
				$( ".cPhotoLightBox .cImageBox" ).css( { "width" : "calc( 100vw * 0.27 )", "height" : "41.25vw"  } )
			}
			else{
				$( ".cPhotoLightBox .cImageBox" ).css( { "width" : "55%", "height" : "calc( 100vw * 0.36 )"  } )
			}
		}
		imgImageTemp.src = strImagePath;
	}
	
	if( strDescription != "" ){
		$( ".cPhotoLightBox .cInfoButton" ).css( { "display" : "flex" } );
		$( ".cPhotoLightBox .cDescription pre" ).text( strDescription );
	}
	else{
		$( ".cPhotoLightBox .cInfoButton" ).css( { "display" : "none" } );
	}
}

function LightBoxShowImage_360( strImagePath, strDescription ){
	$( ".cPhotoLightBox" ).css( { "display" : "flex" } );
	$( ".cPhotoLightBox .cImage_360" ).css( { "display" : "block" } );

	$( ".cPhotoLightBox .cImage" ).css( { "display" : "none" } );
	$( ".cPhotoLightBox .cDescription" ).css( { "display" : "none" } );

	// 設定長寬
	$( ".cPhotoLightBox .cImageBox" ).css( { "width" : "55%", "height" : "calc( 100vw * 0.36 )"  } )

	var kContainer = $( ".cPhotoLightBox .cImage_360" )[0];
	if( m_kPanorama != null ){
		m_kViewer.remove( m_kPanorama )
	}
	else{
		m_kViewer = new PANOLENS.Viewer( { container: kContainer } );
	}

	m_kPanorama = new PANOLENS.ImagePanorama( strImagePath );
	m_kPanorama.add( new THREE.PointLight( 0xffffbb, 0.9 ) );
	m_kViewer.add( m_kPanorama );
	m_kViewer.setPanorama( m_kPanorama );
	
	if( strDescription != "" ){
		$( ".cPhotoLightBox .cInfoButton" ).css( { "display" : "flex" } );
		$( ".cPhotoLightBox .cDescription pre" ).text( strDescription );
	}
	else{
		$( ".cPhotoLightBox .cInfoButton" ).css( { "display" : "none" } );
	}
}
