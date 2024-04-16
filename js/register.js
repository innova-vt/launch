const getCurrentHost=()=>{
  if (window.location.host.includes("smartdvm.com")){
    return "https://bck.uat.smartdvm.com"
  }
  return  "http://localhost:8000"
}
const getEventId=()=>{
  if (window.location.host.includes("smartdvm.com")){
    return "SM1345"
  }
  return  "SM4539"
}

const getRegistrationDetail = () => {
  const firstName = document.getElementById("fname").value;
  const lastName = document.getElementById("lname").value;
  const email = document.getElementById("email").value;
  const phoneNumber = document.getElementById("phone_number").value;
  const practiceName = document.getElementById("practice_name").value;
  const raffleSwitch= document.getElementById("raffleSwitch").checked;
  const eventId = getEventId();
  console.log(raffleSwitch)

  const registrationDetail = {
    event: eventId,
    first_name: firstName,
    last_name: lastName,
    email: email,
    phone_number: phoneNumber,
    practice_name: practiceName,
    raffle_switch:raffleSwitch
  };
  return registrationDetail;
};
function successCallback(data) {
  document.getElementById("regResponse").innerHTML =
    `<i class="fa fa-check-circle-o" style='margin-right:10px; font-size:20px' aria-hidden="true"></i>Registration successful. Your registration ID is ` + data.id;
    document.getElementById("regResponse").className="reg-success"

}
function errorCallback(err) {
  document.getElementById("regResponse").innerHTML = `<i class="fa fa-exclamation-triangle" style='margin-right:10px; font-size:20px' aria-hidden="true"></i>Error occurred. try again or contact smartdvm`;
  document.getElementById("regResponse").className="reg-error"
}
function handleSubmit(event) {
  event.preventDefault();
  const regDetail = getRegistrationDetail();
  console.log(regDetail);
  const baseUrl = getCurrentHost()
  const apiUrl = `/api/event/smartdvm_events_register/list/${regDetail.event}/`;
  $.ajax({
    contentType: "application/json",
    dataType: "json",
    url: baseUrl + apiUrl,
    type: "POST",
    data: JSON.stringify(regDetail),
  })
    .done(successCallback)
    .fail(errorCallback);
}
$("#pageForm").on("submit", handleSubmit);
