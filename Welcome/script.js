const DEF_HOME_PAGE_NAME = "Home";
const MOUSE_DEF_URL_KEY = "Info";
const MOUSE_DEF_URL_VAULE_BUILD_CASE = "BuildCase";

const DEF_SHOW_BUILD_CASE_TIME = 100;

//Jump to Home page
function jumpToHomePage(){
  sessionStorage.setItem('session', 'home');
  window.location.href='../Home';
}

//Detect whether the browser support the WebGL, if not then jump to home page
var webglAva = webglAvailable();
if(webglAva === false){
  jumpToHomePage();
}


var count = 0;
var isRotate = true;
rotate();
function rotate() {
  
  var elem = document.getElementById('spinner');
  elem.style.MozTransform = 'scale(0.5) rotate('+count+'deg)';
  elem.style.WebkitTransform = 'scale(0.5) rotate('+count+'deg)';
  
  if (count==360) { count = 0 }
  count+=45;
  if(isRotate)
    window.setTimeout(function(){rotate()}, 100);
  else{
    $('#spinner').html('');
  }
}
  


var scene = new THREE.Scene();
var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight -180;
var canvasHalfWidth = canvasWidth / 2;
var canvasHalfHeight = canvasHeight / 2;

var cameraDistance = 23;
var cameraTheta = 90;//0~180
var cameraPhi = 0;//-90~90
var cameraUpAngle = 180;
var lookAtPosX = 0;
var lookAtPosZ = 2;
var mouseX = 0, mouseY = 0;

var camera = new THREE.PerspectiveCamera( 75, canvasWidth / canvasHeight, 0.1, 1000 );	
camera.position.x = cameraDistance * Math.sin(cameraPhi / 180 * Math.PI) * Math.sin(cameraTheta / 180 * Math.PI) + lookAtPosX;
camera.position.y = cameraDistance * Math.cos(cameraPhi / 180 * Math.PI);
camera.position.z = -cameraDistance * Math.sin(cameraPhi / 180 * Math.PI) * Math.cos(cameraTheta / 180 * Math.PI) + lookAtPosZ;
camera.up = new THREE.Vector3(0, 0, -1);



var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize( canvasWidth , canvasHeight);
document.body.appendChild( renderer.domElement );


var taiwanModelScaleY = 0.01;
var logoScaleTarget = 0.1;
var logoScaleInit = 0.000001;

var taiwanObj;
var penObj;
var logoObjArray=[];
var logoObjPosition=[];//=logoPosition;
var labelHasAdded = [];//false;
var region;
var cube, ball;

loadModel();


function loadModel(){
  //OBJLoader manager
  var manager = new THREE.LoadingManager();
  manager.onProgress = function ( item, loaded, total ) {
    console.log( item, loaded, total );
  };
  
  var onProgress = function ( xhr ) {
    if ( xhr.lengthComputable ) {
      var percentComplete = xhr.loaded / xhr.total * 100;
      console.log( Math.round(percentComplete, 2) + '% downloaded' );
    }
  };

  var onError = function ( xhr ) {
  };
  
  var texture = new THREE.Texture();
  var imageLoader = new THREE.ImageLoader( manager );
  var objLoader = new THREE.OBJLoader( manager );
  var objMtlLoader = new THREE.OBJMTLLoader();

  $.getJSON('projectRegion.json', function(data) {
    region = data.ProjectListByCity;
    for(var i = 0; i < region.length; i++){
      var position = {x:region[i].pos.x, y:region[i].pos.y, z:region[i].pos.z}
      logoObjPosition.push(position);				
    }
    
    
    //Load the Taiwan texture image first
    imageLoader.load( 'spring/model/taiwan.jpg', function ( image ) {

      texture.image = image;
      texture.needsUpdate = true;
      
      //After loading the Taiwan texture image, start to load the taiwan.obj file
      objLoader.load( 'spring/model/taiwan.obj', function ( object ) {
        object.traverse( function ( child ) {
          if ( child instanceof THREE.Mesh ) {
              child.material.map = texture;
              child.material.opacity = 0.1;
              child.material.transparent = false;
              child.material.blending = THREE[ "AdditiveBlending" ];
          }
        } );

        object.scale.y = taiwanModelScaleY;
        taiwanObj = object;
      
        //After loaded taiwan obj, start to load logo
        objLoader.load( 'spring/model/logo.obj', function ( object ) {
          var material = new THREE.MeshPhongMaterial( { ambient: 0x000000, color: 0x007700, specular: 0x555555, shininess: 70} );	
          object.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh ) {
                child.material = material;
            }
          });
          object.scale.x = logoScaleInit;
          object.scale.y = logoScaleInit;
          object.scale.z = logoScaleInit;
              
          for(var i = 0; i < logoObjPosition.length; i++){
            var logoClone = object.clone();
            logoClone.position.x = logoObjPosition[i].x * 1.8 - 13.79;
            logoClone.position.y = logoObjPosition[i].y;
            logoClone.position.z = logoObjPosition[i].z * 1.79 - 15.56;
            logoObjArray.push(logoClone);
          }
        
          //After loaded logo.obj, start to load pen obj
          objMtlLoader.load( 'spring/model/lapiz.obj', 'spring/model/lapiz.mtl', function ( object ) {

            object.rotation.x = Math.PI/2;
            object.position.y = 2;
            
            penObj = object;
            
            scene.add( penObj );
            isRotate = false;
            init();
            animate();

          }, onProgress, onError );
        }, onProgress, onError );		
      }, onProgress, onError );
    } );
  });
}

function init(){
  updateCamera();

  //Add Ambient Light
  var ambient = new THREE.AmbientLight( 0xffffff );
  scene.add( ambient );

  //Add Direction Light
  var directionalLight = new THREE.DirectionalLight( 0x333333 );
  directionalLight.position.set( 1, 1, 1 );
  scene.add( directionalLight );
  

  var silhouetteGroup = new THREE.Group();
  scene.add( silhouetteGroup );
  
  var lineGeometry = new THREE.Geometry();
  var positionCol = taiwanpoints;
  var tar = {x:[], y:[], z:[]};
  
  //Create Taiwan Silhouette Points positions
  for (var i=0; i < positionCol.length; i++){		
    positionCol[i].x = positionCol[i].x * 2.1 - 9.8;
    positionCol[i].y = positionCol[i].y * 1.5;
    positionCol[i].z = positionCol[i].z * 1.9 - 16.9;
    
    tar.x.push(positionCol[i].x);
    tar.y.push(positionCol[i].y);
    tar.z.push(positionCol[i].z);
        
    lineGeometry.vertices.push(new THREE.Vector3(positionCol[0].x, positionCol[0].y, positionCol[0].z));
  }
  
  //Define silhouette line material
  var lineMaterial = new THREE.LineBasicMaterial( { linewidth: 12, color: 0x111111, opacity: 1.0 } );
  var silhouetteLine = new THREE.Line( lineGeometry, lineMaterial );
  silhouetteGroup.add( silhouetteLine );
  
  
  
  var pointIndex = 0;
  
  //Animation 1:Create draw silhouette line animation
  function drawSilhouetteAnim(){
  
    var target = positionCol[pointIndex+1];
    var tween = new TWEEN.Tween(silhouetteLine.geometry.vertices[positionCol.length-1]).to(target, 1);
    tween.easing(TWEEN.Easing.Linear.None);
    tween.onUpdate(function() {
      silhouetteLine.geometry.verticesNeedUpdate = true;	

      penObj.position.x = silhouetteLine.geometry.vertices[positionCol.length-1].x;
      penObj.position.y = silhouetteLine.geometry.vertices[positionCol.length-1].y+2.5;
      penObj.position.z = silhouetteLine.geometry.vertices[positionCol.length-1].z;
    });
    tween.onComplete(function() {
      pointIndex++;
      if(pointIndex < positionCol.length-1)	{
        silhouetteLine.geometry.vertices.push(silhouetteLine.geometry.vertices.shift()); //shift the array
        lineGeometry.vertices[positionCol.length-1]= new THREE.Vector3( positionCol[pointIndex].x, positionCol[pointIndex].y, positionCol[pointIndex].z );
        silhouetteLine.geometry.verticesNeedUpdate = true;
        
        //In order to draw silhouetteLine segment by segment, after drawing each segment complete, call the twennAnimation again
        drawSilhouetteAnim();
      }
      else{
        //After finishing the silhouette drawing animation, remove the silhouette and add Taiwan obj model.
        scene.remove(silhouetteGroup);
        scene.remove(penObj)
        scene.add(taiwanObj);
        opacityTaiwanAnim();
      }
    });
    tween.start();
  }
  
  //Animation 2:Create animation of Taiwan texture opacity from 0 to 1
  function opacityTaiwanAnim(){
    var taiwanOpacityTarget = {opacity:1.0};
    var tweenTaiwanOpacity = new TWEEN.Tween(taiwanObj.children[0].material).to(taiwanOpacityTarget, 1000);
    tweenTaiwanOpacity.easing(TWEEN.Easing.Linear.None);
    tweenTaiwanOpacity.onComplete( function(){
      moveCameraAnim({x: -11.6132, y:7.4189, z:-0.4685}, {w:0.6049, x: -0.1735, y:-0.7470, z:-0.2142}, -1);
    });
    tweenTaiwanOpacity.start();
  }
  
  
  //Create animation of Taiwan height from 0 to 1
  function scaleTaiwanAnim(){
    var taiwanScaleTarget = {x:1, y:1, z:1};//TODO: Change the height of Taiwan model by changing y
    var tweenTaiwanScale = new TWEEN.Tween(taiwanObj.scale).to(taiwanScaleTarget, 2000);
    tweenTaiwanScale.easing(TWEEN.Easing.Linear.None);
    tweenTaiwanScale.onComplete(function(){
      lookAtCity(0);
    });
    tweenTaiwanScale.start();
  }
        
  function lookAtCity(city){
    switch(city){
      case 0:
        moveCameraAnim({x:0.2158, y:3.7094, z:-15.3354},{w:0.5984, x:-0.1716, y:-0.7523, z:-0.2157}, city);//move to 台北
        break;
      case 1:
        //moveCameraAnim({x:-0.8027, y:22.986, z:2},{w:0.5087, x:-0.4912, y:-0.5087, z:-0.4912}, -2);//move to whole island
        moveCameraAnim({x:-3.2787, y:5.6639, z:-12.5887},{w:-0.3834, x:0.1358, y:0.8611, z:0.3049}, city);//move to 苗栗
        break;
      case 2:
        //moveCameraAnim({x:-0.8027, y:22.986, z:2},{w:0.5087, x:-0.4912, y:-0.5087, z:-0.4912}, -2);//move to whole island
        moveCameraAnim({x:-5.8754, y:4.2394, z:-5.3922},{w:0.4879, x:-0.1399, y:-0.8283, z:-0.2375}, city);//move to 南投
        break;
      case 3:
        moveCameraAnim({x:-11.7338, y:4.2394, z:3.1732},{w:0.637, x:-0.1826, y:-0.72, z:-0.2064}, city);//move to 嘉義
        break;
      case 4:
        moveCameraAnim({x:-12.1978, y:4.2394, z:8.7595},{w:0.8062, x:-0.2317, y:-0.5235, z:-0.1501}, city);//move to 台南
        break;
      case 5:
        moveCameraAnim({x:-8.7128, y:4.2394, z:15.8803},{w:0.8881, x:-0.2547, y:-0.3679, z:-0.1055}, city);//move to 高雄
        break;
      case 6:
        moveCameraAnim({x:-6.9618, y:4.2394, z:19.627},{w:0.8815, x:-0.2528, y:-0.3833, z:-0.1099}, city);//move to 屏東
        break;
      case 7:
        moveCameraAnim({x:7.1202, y:4.2394, z:14.451},{w:0.8747, x:-0.2528, y:0.3986, z:0.1143}, city);//move to 台東
        break;
      /*case 8:
        moveCameraAnim({x:-12.1738, y:3.7094, z:7.8786},{w:0.9589, x:-0.275, y:0.0671, z:0.0192}, city);//move to 澎湖
        break;*/
      case 8:
        moveCameraAnim({x:-0.8027, y:17.986, z:2},{w:0.5087, x:-0.4912, y:-0.5087, z:-0.4912}, -2);//move to whole island
        break;
    }
  }

  drawSilhouetteAnim();
  
  //Move camera position and rotate the camera
  function moveCameraAnim(p, q, city){
    var posStart = {x: camera.position.x, y:camera.position.y, z:camera.position.z};
    var posTarget = {x: p.x, y:p.y, z:p.z};
    var quaternionStart = new THREE.Quaternion().copy(camera.quaternion);
    var quaternionTarget = new THREE.Quaternion(q.x, q.y, q.z, q.w);

    var qm = new THREE.Quaternion();
    
    var dEnd = {duration: 1};
    var d = {duration: 0};
    var tween = new TWEEN.Tween(d).to(dEnd, 1000);
    tween.easing(TWEEN.Easing.Linear.None);
    tween.onUpdate(function(){
      
      THREE.Quaternion.slerp(quaternionStart, quaternionTarget, qm, d.duration);
      camera.quaternion.set(qm.x, qm.y, qm.z, qm.w);
      
      camera.position.x = posStart.x + d.duration*(posTarget.x-posStart.x); 
      camera.position.y = posStart.y + d.duration*(posTarget.y-posStart.y);
      camera.position.z = posStart.z + d.duration*(posTarget.z-posStart.z);
      
      updateLabelPos();
      
    });
    tween.onComplete(function(){
      if(city === -1)
        scaleTaiwanAnim();
      else if(city === -2){
        //Display the "畫面將在X秒鐘後自動跳轉" after the animation finished.
        $('#skipDescription').css("display", "block");
        var time = 25;
        showLeftTime();
        function showLeftTime(){
          $('#skipDescription').find('p')
                     .remove();
          $('#skipDescription').append('<p>畫面將在'+time+'秒鐘後自動跳轉</p>')
          time--;
          if(time < 0)
            jumpToHomePage();
            
          setTimeout(function(){
            showLeftTime()
          }, 1000);
        }
        
        
        
        
        //Let the project be able to click after the animation
        $('.phraseOfMajorProject').hover(function(e){
          $(this).css("font-weight", e.type === "mouseenter"?"bold":"normal");
          $(this).css("cursor", e.type === "mouseenter"?"pointer":"auto");
        })
        
        //While adding the event listener through a for loop, we have to wrap it with a function call
        //Below code is the incorrect example:
        /*for(var i = 0; i < region.length; i++){
          for(var j = 0; j < region[i].linkPathList.length; j++){
            $('#region' + i + '_' + j).click(function(){ 
              jumpToProjectPage(region[i].linkPathList[j]);
            });
          }
        }*/
        for(var i = 0; i < region.length; i++){
          for(var j = 0; j < region[i].linkPathList.length; j++){
            (function (i, j){
              $('#region' + i + '_' + j).click(function(){ 
                jumpToProjectPage(region[i].linkPathList[j]);
              });
            }(i, j));
          }
        }			
      }
      else{
        addLogoToScene(city);
        scaleLogoAnim(city);
      }
    });
    tween.start();
  }
  
  //Create animation of Logo scale
  function scaleLogoAnim(logoIndex){
    var logoTarget = {x:logoScaleTarget, y:logoScaleTarget, z:logoScaleTarget};
    var logoScale = {x:logoScaleInit, y:logoScaleInit, z:logoScaleInit};
    var tweenLogoScale = new TWEEN.Tween(logoScale).to(logoTarget, 500);
    tweenLogoScale.easing(TWEEN.Easing.Linear.None);
    tweenLogoScale.onUpdate(function(){
      setLogoScale(logoIndex, logoScale.x, logoScale.y, logoScale.z);
    });
    tweenLogoScale.onComplete(function(){
      rotateLogoAnim(logoIndex);
      
      $('body').append('<div id= "region'+logoIndex+'" class="labelexpand"></div>');
      $('#region'+logoIndex).append('<h3>' + region[logoIndex].city + '</h3>');
      labelHasAdded[logoIndex] = true;
      updateLabelPos();

      appendP(0);
      
      function appendP(j){
        if(j < region[logoIndex].projectList.length){
          $('#region'+logoIndex).append('<p id="region'+logoIndex+'_'+j+'" class="phraseOfMajorProject">' + region[logoIndex].projectList[j] + '</p>');
          
          
          $('#region'+logoIndex+'_'+j).css("display", "none");
          $('#region'+logoIndex+'_'+j).toggle( "slide", {}, DEF_SHOW_BUILD_CASE_TIME, function(){
            $('#region'+logoIndex).scrollTop($('#region'+logoIndex).height());
            appendP(j+1);
          });
        }
        else{
          $('#region' + logoIndex).mouseleave(function(){ 
            $('#region'+logoIndex).scrollTop(0);
          });
          setTimeout(function(){ 
            $('#region'+logoIndex).scrollTop(0);
            lookAtCity(logoIndex+1); 
            $('#region'+logoIndex).addClass('labelfold');
            $('#region'+logoIndex).removeClass('labelexpand');
            
          }, 500);
        }
      }
      
    });
    tweenLogoScale.start();
  }
  
  //Create animation of Logo rotation
  function rotateLogoAnim(logoIndex){
    var cameraQ = camera.quaternion;
  
    var logoRotationAngleTarget = {x:0, y:2*Math.PI, z:0};
    var logoRotationAngle = {x:0, y:0, z:0};
    var tweenLogoRotation = new TWEEN.Tween(logoRotationAngle).to(logoRotationAngleTarget, 3000);
    tweenLogoRotation.easing(TWEEN.Easing.Linear.None);
    tweenLogoRotation.onUpdate(function(){
      rotateLogo(logoIndex, logoRotationAngle.y);
    });
    tweenLogoRotation.repeat(Infinity);
    tweenLogoRotation.start();
  }

  //Add mouse listener
  /*document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  document.addEventListener( 'mousedown', onDocumentMouseDown, true );	
  document.addEventListener( 'mouseup', onDocumentMouseUp, false );	
  document.addEventListener( 'mousewheel', onMouseWheel, false );	
  //Add key down listener
  document.addEventListener( 'keydown', onKeyDown, false);	*/
  //Add window resize listener
  window.addEventListener( 'resize', onWindowResize, false );		
}	

function trigger(){
  /*cameraDistance = 23;
  cameraTheta = 90;//0~180
  cameraPhi = 0;//-90~90
  cameraUpAngle = 180;
  lookAtPosX = 0;
  lookAtPosZ = 2;*/
  
  //$( "#region0" ).effect( "scale", { percent: 0 }, 500 );
  $('#region0').toggle( "slide", {}, 1500, function(){} );
  $('#skip').toggle( "slide", {}, 1500, function(){} );
}


function onWindowResize() {
  canvasHalfWidth = window.innerWidth / 2;
  canvasHalfHeight = (window.innerHeight-180) / 2;

  camera.aspect = canvasWidth / canvasHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( canvasWidth, canvasHeight );
}

function addLogoToScene(logoIndex){
  logoObjArray[logoIndex].quaternion.set(camera.quaternion.x, camera.quaternion.y, camera.quaternion.z, camera.quaternion.w);
  scene.add(logoObjArray[logoIndex]);
}

function setLogoScale(logoIndex, scaleX, scaleY, scaleZ){
    logoObjArray[logoIndex].scale.x = scaleX;
    logoObjArray[logoIndex].scale.y = scaleY;
    logoObjArray[logoIndex].scale.z = scaleZ;
}

function rotateLogo(logoIndex, angle){
  var logoRotateQ = new THREE.Quaternion();
  logoRotateQ.set(0, 0, 1*Math.sin(angle/2.0), Math.cos(angle/2.0));
  var combinationQ = QuaternionMultiply(camera.quaternion, logoRotateQ);
  logoObjArray[logoIndex].quaternion.set(combinationQ.x, combinationQ.y, combinationQ.z, combinationQ.w);
}

function QuaternionMultiply(q1, q2){
  var w = q1.w * q2.w - q1.x * q2.x - q1.y * q2.y - q1.z * q2.z;
  var x = q1.w * q2.x + q1.x * q2.w + q1.y * q2.z - q1.z * q2.y;
  var y = q1.w * q2.y + q1.y * q2.w + q1.z * q2.x - q1.x * q2.z;
  var z = q1.w * q2.z + q1.z * q2.w + q1.x * q2.y - q1.y * q2.x;
  var quaternion = new THREE.Quaternion();
  quaternion.set(x,y,z,w);
  return quaternion;
}		

function addLabel(index){
  labelHasAdded[index] = true;
  $('#region'+index).addClass('labelexpand');
  $('#region'+index).removeClass('labelfold');
}

function updateLabelPos(){
  for(var i = 0; i < logoObjArray.length; i++){
    var vector = new THREE.Vector3(logoObjArray[i].position.x, logoObjArray[i].position.y, logoObjArray[i].position.z);
    vector = vector.project(camera);
    vector.x = ( vector.x * canvasHalfWidth ) + canvasHalfWidth;
    vector.y = - ( vector.y * canvasHalfHeight ) + canvasHalfHeight;
    
    if(vector.x > canvasWidth || vector.x < 0 || vector.y > canvasHeight || vector.y < 0 || labelHasAdded[i] !== true){
      $('#region'+i).css({display: 'none'});
    }
    else{
      $('#region'+i).css({display: 'block'});
      $('#region'+i).css({top: vector.y+100, left: vector.x, position:'absolute'});//display: 'block', 
    }
  }
}

function updateCamera(){
  camera.position.x = cameraDistance * Math.sin(cameraPhi / 180 * Math.PI) * Math.sin(cameraTheta / 180 * Math.PI) + lookAtPosX;
  camera.position.y = cameraDistance * Math.cos(cameraPhi / 180 * Math.PI);
  camera.position.z = -cameraDistance * Math.sin(cameraPhi / 180 * Math.PI) * Math.cos(cameraTheta / 180 * Math.PI) + lookAtPosZ;
  if(cameraPhi === 0){
    camera.up = new THREE.Vector3(0,0,-1);
  }
  else {
    var frontVec = new THREE.Vector3(-Math.sin(cameraPhi / 180 * Math.PI) * Math.sin(cameraTheta / 180 * Math.PI), -Math.cos(cameraPhi / 180 * Math.PI), Math.sin(cameraPhi / 180 * Math.PI) * Math.cos(cameraTheta / 180 * Math.PI));

    
    var worldUp = new THREE.Vector3(0, 1, 0);
    var rightVec = new THREE.Vector3();
    rightVec.crossVectors(frontVec, worldUp);
    var upVec = new THREE.Vector3();
    upVec.crossVectors(rightVec, frontVec);
    upVec.normalize();
    camera.up = upVec;
    console.log("theta = " + cameraTheta + "  phi = " + cameraPhi);
    console.log("position: x = " + camera.position.x + "  y = " + camera.position.y + "  z = " + camera.position.z);
    console.log("quaternion w = : " + camera.quaternion.w + "  x = " + camera.quaternion.x + "  y = " + camera.quaternion.y + "  z = " + camera.quaternion.z)
    console.log("camera distance: " + cameraDistance)
  }

  
  camera.lookAt( new THREE.Vector3(lookAtPosX,0,lookAtPosZ) );
}

function animate(){
  /*cube.position.x = lookAtPosX;
  cube.position.z = lookAtPosZ;
  ball.position.x = lookAtPosX;
  ball.position.z = lookAtPosZ;*/

  requestAnimationFrame( animate );
  TWEEN.update();
      
  //updateLabelPos();
  
  renderer.render( scene, camera );
}

function webglAvailable() {
  try {
    var canvas = document.createElement("canvas");
    return !!
      window.WebGLRenderingContext && 
      (canvas.getContext("webgl") || 
        canvas.getContext("experimental-webgl"));
  } catch(e) { 
    return false;
  } 
}

function jumpToProjectPage(pg) {
  //sessionStorage.setItem('projectIndex', pg);
  //window.open('projectInfo.html', '_blank');
  //sessionStorage.setItem('session', 'project');
  document.location.href = "../" + DEF_HOME_PAGE_NAME + "/?" + MOUSE_DEF_URL_KEY + "=" + MOUSE_DEF_URL_VAULE_BUILD_CASE;
}