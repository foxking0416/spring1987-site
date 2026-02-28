// -- SPR 專屬 Tool --

/// ---------------- Banner Tool --------------------
var m_strBannerPath = "";
var m_kBannerTextureUrlList = [ "0.jpg", "0.jpg", "0.jpg" ];
var m_kShowBannerID = { pre : 0, main : 1, next : 2 };
var m_nBannerMainID =  0;
var m_kBannerTimeout = null; //setTimeout( NextBanner, DEF_BANNER_SWITCH_TIMMER );
var m_nSwitchTimmer = 0;

function CorrectShowBannerID( nID, nBannerCount ){
    if( nID > ( nBannerCount - 1) ){
      nID = 0;
    }
    else if( nID < 0 ){
      nID =  nBannerCount - 1;
    }
    return nID;
}

function CreatBanner( kShowBannerID, nBannerMainID, kBannerTextureUrlList, strBannerPath, nSwitchTimmer ){  
	m_kShowBannerID = kShowBannerID;
	m_nBannerMainID = nBannerMainID;
	m_kBannerTextureUrlList = kBannerTextureUrlList;
	m_strBannerPath = strBannerPath;
	m_kBannerTimeout = setTimeout( NextBanner, nSwitchTimmer );
	m_nSwitchTimmer = nSwitchTimmer


	m_kShowBannerID.main = m_nBannerMainID;
	m_kShowBannerID.pre = CorrectShowBannerID( m_nBannerMainID - 1,  m_kBannerTextureUrlList.length );
	m_kShowBannerID.next = CorrectShowBannerID( m_nBannerMainID + 1,  m_kBannerTextureUrlList.length );
  
	$(".cBanner .cImageControl .cPreButton").click(function(event){
		event.preventDefault()
		clearTimeout( m_kBannerTimeout );
		PreBanner();
	})

	$(".cBanner .cImageControl .cNextButton").click(function(event){
		event.preventDefault()
		clearTimeout( m_kBannerTimeout );
		NextBanner();
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
	m_kBannerTimeout = setTimeout( NextBanner, m_nSwitchTimmer );
}

function PreBanner(){
	m_kShowBannerID.pre = CorrectShowBannerID( m_kShowBannerID.pre - 1, m_kBannerTextureUrlList.length );
	m_kShowBannerID.main = CorrectShowBannerID( m_kShowBannerID.main - 1, m_kBannerTextureUrlList.length );
	m_kShowBannerID.next = CorrectShowBannerID( m_kShowBannerID.next - 1, m_kBannerTextureUrlList.length );
	PlayBanner( "0vw", m_kShowBannerID.pre, m_kShowBannerID.main, m_kShowBannerID.next );
	m_kBannerTimeout = setTimeout( PreBanner, m_nSwitchTimmer );
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

function ProcessImageListByAbbreviation( kImageDataList )
{
	let kTextureUrlList = [];
	for (let i = 0; i < kImageDataList.length; i++) {
		let kDataList = kImageDataList[i].split("-");
		if( kDataList.length == 2 ){
			kStringTemp = kDataList[1].split(".");
			nEnd = parseInt( kStringTemp[0] );
			strExtension = kStringTemp[1];
			nStart = parseInt( kDataList[0] );
			for (let j = nStart; j <= nEnd; j++) {
				const strImageName = j + "." + strExtension;
				kTextureUrlList.push( strImageName );
			}
		}
		else{
			kTextureUrlList.push( kImageDataList[i] );
		}
	}
	return kTextureUrlList;
}

function ProcessVideoList( kVideoDataList ){
	let kIframeList = [];
	for (let i = 0; i < kVideoDataList.length; i++) {
		const kIframe = "<iframe width='100%' height='100%' src=https://www.youtube.com/embed/" + kVideoDataList[ i ] + " title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>";
		kIframeList.push( kIframe );
	}
	return kIframeList;
}

function ProcessVideoImageList( kVideoDataList ){
	let kVideoImageList = [];
	for (let i = 0; i < kVideoDataList.length; i++) {
		const strVideoImage  ="http://img.youtube.com/vi/" + kVideoDataList[ i ] +"/sddefault.jpg"
		kVideoImageList.push( strVideoImage );
	}
	return kVideoImageList;
}