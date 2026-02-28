const DEF_IMAGE_FILE_PATH = "../Image/"
const DEF_WINNING_IMAGE_PATH = DEF_IMAGE_FILE_PATH + "WinningRecord/";
const DEF_BANNER_IMAGE_PATH = DEF_WINNING_IMAGE_PATH + "Banner/";

const DEF_DATABASE_PATH = "../Database/";
const DEF_DATABASE_WINNING_PATH = DEF_DATABASE_PATH + "WinningRecord.json";

const DEF_BANNER_SWITCH_TIMMER = 5000;

let m_WinningRecordDataMap = new Map();

ConnectionButton();
GetBannerData();
GetWinningRecordData();

function ConnectionButton() {
    $( window ).resize(function() {
		UpdateConnectionLine();
	});
}

function UpdateConnectionLine(){
    const kItemList = $( ".cContent .cRecordBox .cDataBase" );
    for( let i = 0; i < kItemList.length; i++ ){
        $( kItemList[ i ] ).find( ".cConnectionLine .cLine" ).height( $( kItemList[ i ] ).height() );
    }
}

function GetBannerData(){
	$.ajax({
		url: DEF_DATABASE_WINNING_PATH,
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

function GetWinningRecordData(){
    $.ajax({
		url: DEF_DATABASE_WINNING_PATH,
		method: "post",
		data: {},
		dataType: "json",
		success: function(res){
			ProcessWinningData( res.Winning )
			return;
		},
		error: function(res){
			console.log( "資料庫異常" );
		}
	})
}

function ProcessWinningData( kDataList ){
    for( i = 0; i < kDataList.length; i++ ){
		
        kData = kDataList[ i ];
        
        nYear = parseInt( kData.Time );
		
        if( m_WinningRecordDataMap.has( nYear ) ){
            const kWinningRecordDataList = m_WinningRecordDataMap.get( nYear );
            kWinningRecordDataList.push( kData );
        }
        else{
            const kWinningRecordDataList = [ kData ];
            m_WinningRecordDataMap.set( nYear, kWinningRecordDataList );
        }
    }
    m_WinningRecordDataMap = SortMapByKey( m_WinningRecordDataMap );
    const kSmallToBigDataList = [];
	const iterator1 = m_WinningRecordDataMap.values();
    for ( let i = 0; i < m_WinningRecordDataMap.size; i++ ) {
        const kTempDataList = iterator1.next().value;
        kSmallToBigDataList.push( kTempDataList );
    }
    const kBigToSmallDataList = [];
    for (var i = kSmallToBigDataList.length - 1; i >= 0; i--) {
    	kBigToSmallDataList.push( kSmallToBigDataList[i] );
    }
    ShowWinningRecord( kBigToSmallDataList );
}

function ShowWinningRecord( kDataByYearList ){

    for( let i = 0; i < kDataByYearList.length; i++ ){
        const kDataList = kDataByYearList[ i ];
        const kFirstData = kDataList[ 0 ];
        const kItemTemplate = $( ".cContent .cRecordBox .cDataTemplate" ).clone( true );
        $( kItemTemplate ).attr( 'class', "cDataBase" );
        $( kItemTemplate ).find( ".cYearBox .cYear" ).text( kFirstData.Time )

        for( let j = 0; j < kDataList.length; j++ ){
            const kData = kDataList[ j ];
            const kProjectTemplate = $( kItemTemplate ).find( ".cProjectBox .cProjectTemplate" ).clone( true );
            $( kProjectTemplate ).attr( 'class', "cProjectBase" );
            $( kProjectTemplate ).find( ".cName" ).text( kData.Name );
            let strWinningName = ""
            for( let k = 0; k < kData.WinningNameList.length; k++ ){
                if( k == 0 ){
                    strWinningName = kData.WinningNameList[ k ];
                    continue;
                }
                strWinningName = strWinningName + "<br>" + kData.WinningNameList[ k ];
            }
            $( kProjectTemplate ).find( ".cWinningName" ).html( strWinningName );
            $( kProjectTemplate ).appendTo( $( kItemTemplate ).find( ".cProjectBox" ) );
        }
        $( kItemTemplate ).appendTo( ".cContent .cRecordBox" );
        $( kItemTemplate ).find( ".cConnectionLine .cLine" ).height( $( kItemTemplate ).height() );

        if( i + 1 == kDataByYearList.length ){
            $( kItemTemplate ).find( ".cConnectionLine" ).css( { "display" : "none" } )
        }
    }
}
