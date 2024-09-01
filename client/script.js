async function adduser(event){
    event.preventDefault();
    console.log("reached here");
    

    let name = document.getElementById('name').value
    console.log("name : ",name);
    let email  = document.getElementById('email').value;
    console.log('email : ',email);

    let password = document.getElementById('password').value;
    console.log('password : ',password);
    
    let nameerror = document.getElementById('name-error');
    let emailerror = document.getElementById('email-error');
    let passworderror = document.getElementById('password-error');

    //validations
    if(!name){
        nameerror.innerHTML = "Name is required"
    }
    if(!email){
        emailerror.innerHTML = "Email is required"
    }
    if(!password){
        passworderror.innerHTML = "password is required"
    }
    

    let datas = {
        name : name,
        email : email,
        password : password,
    }
    console.log('datas : ',datas);

    let json_data = JSON.stringify(datas);
    console.log('json-data : ',json_data);

    let response = await fetch('/submit',{
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
        },
        body : json_data,
    });
    console.log('response',response);
    

    let parsed_response = await response.text();
    console.log("parsed_response",parsed_response);

    


    

}