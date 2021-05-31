function validateFormLogin(){
			
			var status = true; 

			
			var mail = document.getElementById('txtMail').value;
			var pass = document.getElementById('txtPass').value;
			

			
			if(mail == ""){
				document.getElementById("lbMail").innerHTML = "Email không được để trống";
				document.getElementById("txtMail").style.border = "1px solid red";
				document.getElementById("lbMail").style.display = "block";
				status = false;
			}else{
				if(e_reg.test(mail)==false){
					document.getElementById("lbMail").innerHTML = "Email không đúng định dạng";
					document.getElementById("txtMail").style.border = "1px solid red";
					document.getElementById("lbMail").style.display = "block";
					status = false;
				}else{
					document.getElementById("lbMail").innerHTML = "";
					document.getElementById("txtMail").style.border = "1px solid #ddd";
				}
			}


			if(pass == ""){
				
				document.getElementById("lbPass").innerHTML = "Mật khẩu không được để trống";
				document.getElementById("txtPass").style.border = "1px solid red";
				document.getElementById("lbPass").style.display = "block";
				status = false;
			}else{
				document.getElementById("lbPass").innerHTML = "";
				document.getElementById("txtPass").style.border = "1px solid #ddd";
				
			}


			
			if(status == false){
				return false;
			}else{
				return true;
			}

		}