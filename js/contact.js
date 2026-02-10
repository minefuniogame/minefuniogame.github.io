// Init EmailJS
(function(){emailjs.init("SJTn_hClPmNz8zF4V");})();
document.getElementById("contact-form").addEventListener("submit",function(e){
    e.preventDefault();
    emailjs.sendForm("service_a8c7ise","template_gqn2k68",this)
    .then(function(){
        document.getElementById("success-msg").style.display="block";
        document.getElementById("contact-form").reset();
    },function(error){
        alert("Error sending message ❌");
        console.log(error);
    });
});
