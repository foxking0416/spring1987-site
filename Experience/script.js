const DEF_IMAGE_FILE_PATH = "../Image/"
const DEF_EXPERIENCE_IMAGE_PATH = DEF_IMAGE_FILE_PATH + "Experience/";
const DEF_BANNER_IMAGE_PATH = DEF_EXPERIENCE_IMAGE_PATH + "Banner/";

const DEF_DATABASE_PATH = "../Database/";
const DEF_DATABASE_EXPERIENCE_PATH = DEF_DATABASE_PATH + "Experience.json";
const DEF_SUB_DIR_IMAGE_PATH_IMAGE_PATH = "Image/"

const DEF_BANNER_SWITCH_TIMMER = 5000;

const DEF_COLOR_SPR_GREEN_1 = "#008a3a";
const DEF_DEFAULT_EXPERIENCE_TYPE = "1";

let m_kExperienceTypeMap = new Map();
let m_strCurrentType = DEF_DEFAULT_EXPERIENCE_TYPE;

GetBannerData();
GetTypeData();
ConnectionButton();

function ConnectionButton(){
    $(".cExperienceTypeBox .cType_1_Button, .cType_2_Button, .cType_3_Button").mouseover(function(){
        $( this ).css( { "background-color" : DEF_COLOR_SPR_GREEN_1, "color" : "#fff" } )
    });

    $(".cExperienceTypeBox .cType_1_Button, .cType_2_Button, .cType_3_Button").mouseout(function(){
        var strClassName = $( this ).attr( "class" );
        if( strClassName.split("_")[ 1 ] != m_strCurrentType ){
            $( this ).css( { "background-color" : "#fff", "color" : DEF_COLOR_SPR_GREEN_1 } )
        }
    });

    $( ".cExperienceTypeBox .cType_1_Button" ).click( function ( event ) {
        event.preventDefault();
        SelectExperienceType( "1" );
    } );

    $( ".cExperienceTypeBox .cType_2_Button" ).click( function ( event ) {
        event.preventDefault();
        SelectExperienceType( "2" );
    } );

    $( ".cExperienceTypeBox .cType_3_Button" ).click( function ( event ) {
        event.preventDefault();
        SelectExperienceType( "3" );
    } );

    $("select[ name='ExperienceType' ]").on('change', function(){
        const strSelect = $("select[ name='ExperienceType' ]").val()
        SelectExperienceType( strSelect.split("_")[ 1 ] );
    });
}

function GetBannerData(){
	$.ajax({
		url: DEF_DATABASE_EXPERIENCE_PATH,
		method: "get",
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

function ProcessBannerData( kDataList ){
    
    
	let kBannerTextureUrlList = [];
	let kShowBannerID = { pre : 0, main : 1, next : 2 };
    let nBannerMainID =  0;
    
    kBannerTextureUrlList = ProcessImageListByAbbreviation( kDataList );
    if( kBannerTextureUrlList.length == 1 ){
		kBannerTextureUrlList.push( kBannerTextureUrlList[ 0 ] );
		kBannerTextureUrlList.push( kBannerTextureUrlList[ 0 ] );
	}
	
	CreatBanner( kShowBannerID, nBannerMainID, kBannerTextureUrlList, DEF_BANNER_IMAGE_PATH, DEF_BANNER_SWITCH_TIMMER );
}

function GetTypeData(){
	$.ajax({
		url: DEF_DATABASE_EXPERIENCE_PATH,
		method: "get",
		data: {},
		dataType: "json",
		success: function(res){
			ProcessTypeData( res.Type )
			return;
		},
		error: function(res){
			console.log( "資料庫異常" );
		}
	})
}

function ProcessTypeData( kTypeDataList ){
    m_kExperienceTypeMap.clear();
    for( let i = 0; i < kTypeDataList.length; i++ ){
        const kTypeData = kTypeDataList[ i ];
        if( m_kExperienceTypeMap.has( kTypeData.TypeID ) ){
            Assert( false, "TypeID 有重複" );
        }
        m_kExperienceTypeMap.set( kTypeData.TypeID, kTypeData );
    }

    SelectExperienceType( m_strCurrentType );
}

function SelectExperienceType( strTypeID ){
    m_strCurrentType = strTypeID;
    $( ".cExperienceTypeBox .cType_1_Button, .cType_2_Button, .cType_3_Button" ).css( { "background-color" : "#fff", "color" : DEF_COLOR_SPR_GREEN_1 } )
    $( ".cExperienceTypeBox .cType_" + strTypeID + "_Button" ).css( { "background-color" : DEF_COLOR_SPR_GREEN_1, "color" : "#fff" } )
    $( ".cExperienceTypeBox_Phone select" ).val( "Type_" + strTypeID );

    const kData = m_kExperienceTypeMap.get( strTypeID );
    $( ".cTopInfoBox .cTitleInfo .cMainInfo par" ).text( kData.Introduction );
    Initialize_ShowImageTool( kData, DEF_EXPERIENCE_IMAGE_PATH, DEF_SUB_DIR_IMAGE_PATH_IMAGE_PATH )
}