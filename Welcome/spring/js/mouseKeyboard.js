var keyboard = new THREEx.KeyboardState();

		var dragging = false;
		function onDocumentMouseMove( event ) {

			pmouseX = mouseX;
			pmouseY = mouseY;

			mouseX = event.clientX - window.innerWidth * 0.5;
			mouseY = event.clientY - window.innerHeight * 0.5;

			if(dragging){
				if(keyboard.pressed("shift") == false){
					//cameraTheta += (mouseX - pmouseX) * .1;
					//cameraPhi -= (mouseY - pmouseY) * .1;
					cameraPhi +=(mouseX - pmouseX) * .1;
					cameraTheta += (mouseY - pmouseY) * .1;
					//cameraUpAngle += (mouseY - pmouseY) * .1;
					if(cameraPhi > 90)
						cameraPhi = 90;
					else if(cameraPhi < -90)
						cameraPhi = -90;
						
					if(cameraTheta > 180)
						cameraTheta = 180;
					else if(cameraTheta < 0)
						cameraTheta = 0;
					//console.log('cameraTheta = ' + cameraTheta);
					//console.log('cameraPhi = ' + cameraPhi);
				}
				else{
					lookAtPosX += (mouseX - pmouseX) * .1 * Math.cos(cameraTheta);
					lookAtPosZ += (mouseX - pmouseX) * .1 * Math.sin(cameraTheta);
					//lookAtPosZ -= (mouseY - pmouseY) * .1 * Math.sin(cameraTheta);
				}			
			}
			/*else{
				var pos3D = screenToWorld(0,0);
			}*/
		}
		
		function onDocumentMouseDown( event ) {	
			if(event.target.className.indexOf('noMapDrag') !== -1) {
				return;
			}
			dragging = true;			   
		}	

		function onDocumentMouseUp( event ){
			dragging = false;
		}

		function onMouseWheel( event ){
			var delta = 0;

			if (event.wheelDelta) { /* IE/Opera. */
					delta = event.wheelDelta/120;
			} 
			//	firefox
			else if( event.detail ){
				delta = -event.detail/3;
			}

			if (delta)
					handleMWheel(delta);

			event.returnValue = false;			
		}	
		
		function handleMWheel( delta ) {
			cameraDistance += delta;
			updateCamera();
			//if(cameraDistance > 210)
			//	cameraDistance = 210;
			//else if(cameraDistance < 150)
			//	cameraDistance = 150;
		}
		
		function onKeyDown( event ){	
			if(event.keyCode === 85){
				if(drop !== 1)
					drop = 1;
				else
					drop = 2;
			}
			else if(event.keyCode === 84){
				trigger();
				//updateCamera();
			}
			else if(event.keyCode === 37){//left
				lookAtPosX += 1;
				updateCamera();
			}
			else if(event.keyCode === 38){//up
				lookAtPosZ += 1;
				updateCamera();
			}
			else if(event.keyCode === 39){//right
				lookAtPosX -= 1;
				updateCamera();
			}
			else if(event.keyCode === 40){//down
				lookAtPosZ -= 1;
				updateCamera();
			}
			else if(event.keyCode === 65){//a
				cameraPhi -= 1;
				updateCamera();
			}
			else if(event.keyCode === 87){//w
				cameraTheta -= 1;
				updateCamera();
			}
			else if(event.keyCode === 83){//s
				cameraTheta += 1;
				updateCamera();
			}
			else if(event.keyCode === 68){//d
				cameraPhi += 1;
				updateCamera();
			}
			else if(event.keyCode === 66){//b
				var q = new THREE.Quaternion().copy(camera.quaternion);
				var targetQ = new THREE.Quaternion(-0.2716, -0.71, -0.354, 0.5448);
				var qm = new THREE.Quaternion();
				THREE.Quaternion.slerp(q, targetQ, qm, 0.07);
				camera.quaternion.set(qm.x, qm.y, qm.z, qm.w);
				var tes = true;
				//updateCamera();
			}
			
			if(cameraPhi > 90)
				cameraPhi = 90;
			else if(cameraPhi < 0)
				cameraPhi = 0;
				

			
		}