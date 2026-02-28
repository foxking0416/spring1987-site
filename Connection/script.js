const DEF_SPR_LOCATION = "華春營造有限公司";
const DEF_COLOR_SPR_GREEN_2 = "#dddda7";

var m_phpSendContactMailUrl = "SPR_SendingMail.php";
var m_strConnectEmail = "building@spring1987.com";
var m_strSenderEmail = ""; //寄件者
var m_strTitl = "華春營造官網需求單";

// Sent Email
$(".cSentButtom").click(function(event){
      
    if( !GetInfomation() )
    {
        return;
    }
    
    $(".cConnectionBox .cContent").css( { "z-index" : "0" } )

    $(".cConnectionBox .cContent").css( { "clip-path" : "circle(5%)", "transition-duration" : "2.5s" } )
    sleep(2500).then(() => {
      $(".cConnectionBox .cSentSuccessImage").css( { "opacity" : "1", "transition-duration" : "1s" } )
      $(".cConnectionBox .cSentSuccessText").css( { "opacity" : "1", "transition-duration" : "1s" } )
      $(".cConnectionBox .cContent").css( { "opacity" : "0", "transition-duration" : "0.5s" } )
      $(".cConnectionBox").css( { "background-color" : DEF_COLOR_SPR_GREEN_2, "transition-duration" : "0.5s" } )
    })
});

$(".cConnectionBox input[ name='Name' ]").on('input', function(){
  $( ".cConnectionBox remind" ).text( "標註 * 者為必填" );
  $( ".cConnectionBox remind" ).css( { "transition-duration":"0.2s", "color":"#e27676", "font-weight":"normal" } );
});

$(".cConnectionBox input[ name='Email' ]").on('input', function(){
  $( ".cConnectionBox remind" ).text( "標註 * 者為必填" );
  $( ".cConnectionBox remind" ).css( { "transition-duration":"0.2s", "color":"#e27676", "font-weight":"normal" } );
});

ShowMap();

function ShowMap(){
	var strMapSrc = "<iframe id='mapposition' width={{mapWidth}} height={{mapHeight}} frameborder='0' scrolling='yes' marginheight='20' marginwidth='100' src='https://maps.google.com.tw/maps?f=q&hl=zh-TW&geocode=&q={{mapAddr}}&z={{mapScale}}&output=embed&t={{mapType}}'></iframe>";
	var kType=['p','h'];

	var strMapData = strMapSrc.replace("{{mapAddr}}", DEF_SPR_LOCATION)
                              .replace("{{mapWidth}}",'100%')
                              .replace("{{mapHeight}}",'100%')
                              .replace("{{mapType}}",kType[0])
                              .replace("{{mapScale}}",16);
    $( ".cMapBox .cMap" ).html( strMapData);
}

function GetInfomation(){
	
	
	var strName          = $(".cConnectionBox input[ name='Name' ] ").val();
	var strEmail         = $(".cConnectionBox input[ name='Email' ] ").val();
	var strPhone         = $(".cConnectionBox input[ name='Phone' ] ").val();
	var strTime          = $(".cConnectionBox input[ name='Time' ] ").val();
	var strContent       = $(".cConnectionBox textarea[ name='Demand' ] ").val();
	
	
	if( !InputCheck( strName, "姓名不能空白" ) ){
		return false;
	}
	if( !InputCheck( strEmail, "mail 不能空白" ) ){
		return false;
	}
	if( !EmailCheck( strEmail ) ){
		return false;
	}
	
	SendMail( strName, strEmail, strPhone, strTime, strContent );
	
	return true;
}

function EmailCheck( strEmail )
{
    if( strEmail.length == 0 )
    {
        $( ".cConnectionBox remind" ).text( "不能空白" );
		$( ".cConnectionBox remind" ).css( { "transition-duration":"0.2s", "color":"#fa0110", "font-weight":"bold" } );
        return false;
    }
    if ( !validateEmail( strEmail ) ) 
    {
        $( ".cConnectionBox remind" ).text( "mail 格式錯誤" );
		$( ".cConnectionBox remind" ).css( { "transition-duration":"0.2s", "color":"#fa0110", "font-weight":"bold" } );
        return false;
    }
    return true;
}

function InputCheck( strInput, stRemind )
{
    if( strInput.length == 0 )
    {
        $( ".cConnectionBox remind" ).text( stRemind );
		$( ".cConnectionBox remind" ).css( { "transition-duration":"0.2s", "color":"#fa0110", "font-weight":"bold" } );
        return false;
    }
    return true;
}

function SendMail( strName, strEmail, strPhone, strTime, strContent )
{  
    if( m_strSenderEmail == "" ){
        m_strSenderEmail = strEmail;
    }
    $.ajax({
        url: m_phpSendContactMailUrl,
        method  : "POST",
        data    : { connectEmail       : m_strConnectEmail,
					title              : m_strTitl,
					from_email         : m_strSenderEmail,
					eDataBase_Error    : 0,
			        senderName         : strName,
			        senderEmail        : strEmail,
                    senderPhone        : strPhone,
			        senderContactTime  : strTime,
                    content            : strContent },
	    dataType: "text",
	    success: function(res)
        {
            console.log("Send Mail Success");
        },
        error: function(res)
        {
            console.log("DataBase Error");
        }
    });
}